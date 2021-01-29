PROJECT_NAME=protostory
WORK_DIR=/usr/src/app
SETTING_FILE_DIR=$1
APP_ADMIN_USER=$2

 mkdir $WORK_DIR
 chown $APP_ADMIN_USER $WORK_DIR 
 chgrp $APP_ADMIN_USER $WORK_DIR 
 cd $WORK_DIR

#install from packages
 dnf update -y
 dnf -y install dnf-utils nginx python36 python36-devel
 dnf -y group install "Development Tools"
 dnf -y module disable postgresql:10
 dnf -y module enable postgresql:12
 dnf -y install postgresql-server postgresql-devel
 dnf -y install wget-1.19.5-10.el8.x86_64 
 dnf localinstall -y google-chrome-stable_current_x86_64.rpm
 dnf -y install nodejs

 rm -rf /var/lib/apt/lists/*

#create required directories
 mkdir /etc/uwsgi/
 mkdir /etc/redis/ /var/log/ /var/redis/
 mkdir /etc/supervisor /var/log/supervisor/
 
#place settingFiles
 sh updateSetting.sh $SETTING_FILE_DIR $WORK_DIR $APP_ADMIN_USER

 #Install pip and python modules
 curl https://bootstrap.pypa.io/get-pip.py -o get-pip.py
 python3 get-pip.py
 python3 -m pip install -r $SETTING_FILE_DIR/requirements.txt
 
 # Setting of selinux,but i'm not sure about it works properly.Just disable when you use in $APP_ADMIN_USER.
 #dnf provides semanage
 #dnf install policycoreutils-python-utils-2.9-9.el8.noarc
 #semanage fcontext -a -t httpd_sys_content_t "/usr/src/app(/.*)?"
 #restorecon -R "/usr/src/app"
 setenforce 0

 #Setting uwsgi
 cp $SETTING_FILE_DIR/uwsgi.ini /etc/uwsgi/uwsgi.ini

 #Seting nginx
 nginx -s reload

 #Install & setting of postgresserver
 /usr/bin/postgresql-setup --initdb
 systemctl start postgresql
 sudo -u postgres psql < $SETTING_FILE_DIR/psqlSetting.sql
 cp $SETTING_FILE_DIR/pg_hba.conf /var/lib/pgsql/data/pg_hba.conf
 systemctl stop postgresql

 #setup redis
 wget http://download.redis.io/releases/redis-6.0.7.tar.gz
 cd /etc/redis/
 tar xzf $WORK_DIR/redis-6.0.7.tar.gz
 cd redis-6.0.7
 make 
 cd $WORK_DIR
 cp $SETTING_FILE_DIR/redis.conf /etc/redis/redis-6.0.7/redis.conf 
 rm -f redis-6.0.7.tar.gz

 #django settings
 # /usr/local/bin/django-admin startproject $PROJECT_NAME
 # python3 $WORK_DIR/$PROJECT_NAME/manage.py startapp portal
 # python3 $WORK_DIR/$PROJECT_NAME/manage.py startapp gamemain
 python3 $WORK_DIR/$PROJECT_NAME/manage.py makemigrations
 python3 $WORK_DIR/$PROJECT_NAME/manage.py migrate
 #非対話方式でadminuserが作れるのか要確認
 #python3 $WORK_DIR/$PROJECT_NAME/manage.py createsuperuser

 #Setting django test environment
 wget https://dl.google.com/linux/direct/google-chrome-stable_current_x86_64.rpm #install for selenium test tools
 rm -f google-chrome-stable_current_x86_64.rpm
 wget https://chromedriver.storage.googleapis.com/86.0.4240.22/chromedriver_linux64.zip
 unzip chromedriver_linux64.zip
 rm -f chromedriver_linux64.zip
 mv chromedriver /usr/local/bin

 #set nodejs
 cd $WORK_DIR/$PROJECT_NAME/
 python3 $WORK_DIR/$PROJECT_NAME/manage.py collectstatic

 
 #setting supervisord
 cp $SETTING_FILE_DIR/supervisord.conf /etc/supervisor/supervisord.conf
 touch /tmp/supervisor.sock
 cd ~
 /usr/local/bin/supervisord 