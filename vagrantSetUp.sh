 
 WORK_DIR=/usr/src/app
 SETTING_FILE_DIR=/home/vagrant/settingFiles/
 PROJECT_NAME=protostory
 mkdir $WORK_DIR
 chown vagrant $WORK_DIR 
 chgrp vagrant $WORK_DIR 
 cd $WORK_DIR

 mv -f $SETTING_FILE_DIR/seLinuxConfig /etc/selinux/config

 dnf -y install dnf-utils nginx python36 python36-devel
 dnf -y install groupinstall "Development Tools"
 rm -rf /var/lib/apt/lists/*

 #Install pip and python modules
 curl https://bootstrap.pypa.io/get-pip.py -o get-pip.py
 python3 get-pip.py
 python3 -m pip install -r $SETTING_FILE_DIR/requirements.txt
 
 # Setting of selinux,but i'm not sure about it works properly.Just disable when you use in vagrant.
 #dnf provides semanage
 #dnf install policycoreutils-python-utils-2.9-9.el8.noarc
 #semanage fcontext -a -t httpd_sys_content_t "/usr/src/app(/.*)?"
 #restorecon -R "/usr/src/app"
 setenforce 0

 #Seting nginx
 cp $SETTING_FILE_DIR/nginx.moduole /etc/dnf/modules.d/nginx.module
 cp $SETTING_FILE_DIR/nginx.conf /etc/nginx/nginx.conf
 nginx -s reload

 #Setting uwsgi
 mkdir /etc/uwsgi/
 cp $SETTING_FILE_DIR/uwsgi.ini /etc/uwsgi/uwsgi.ini

 #Install & setting of postgresserver
 dnf -y module disable postgresql:10
 dnf -y module enable postgresql:12
 dnf -y install postgresql-server postgresql-devel
 /usr/bin/postgresql-setup --initdb
 systemctl start postgresql
 sudo -u postgres psql < $SETTING_FILE_DIR/psqlSetting.sql
 cp $SETTING_FILE_DIR/pg_hba.conf /var/lib/pgsql/data/pg_hba.conf
 systemctl restart postgresql

 #setup redis
 dnf install -y wget-1.19.5-8.el8_1.1.x86_64
 wget http://download.redis.io/releases/redis-6.0.7.tar.gz
 mkdir /etc/redis/ /var/log/ /var/redis/
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
 dnf localinstall -y google-chrome-stable_current_x86_64.rpm
 rm -f google-chrome-stable_current_x86_64.rpm
 wget https://chromedriver.storage.googleapis.com/86.0.4240.22/chromedriver_linux64.zip
 unzip chromedriver_linux64.zip
 rm -f chromedriver_linux64.zip
 mv chromedriver /usr/local/bin

 #set nodejs
 dnf -y install nodejs
 cd $WORK_DIR/$PROJECT_NAME/
 npm init
 python3 $WORK_DIR/$PROJECT_NAME/manage.py collectstatic

 
 #setting supervisord
 mkdir /etc/supervisor
 cp $SETTING_FILE_DIR/supervisord.conf /etc/supervisor/supervisord.conf
 mkdir /var/log/supervisor/
 touch /tmp/supervisor.sock
 /usr/local/bin/supervisord 