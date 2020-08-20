 
 WORK_DIR=/usr/src/app
 SETTING_FILE_DIR=/home/vagrant/settingFiles/
 PROJECT_NAME=protostory
 mkdir $WORK_DIR
 chown vagrant $WORK_DIR 
 chgrp vagrant $WORK_DIR 
 cd $WORK_DIR

 mv -f $SETTING_FILE_DIR/seLinuxConfig /etc/selinux/config

 # If use nginx activate below commands.
 #sudo yum install yum-utils
 #cp $SETTING_FILE_DIR/nginx.repo /etc/yum.repos.d/nginx.repo
 #sudo yum install nginx
 dnf -y install httpd httpd-devel httpd-manual httpd-tools

 # Setting of selinux,but i'm not sure about it works properly.Just disable when you use in vagrant.
 #dnf provides semanage
 #dnf install policycoreutils-python-utils-2.9-9.el8.noarc
 #semanage fcontext -a -t httpd_sys_content_t "/usr/src/app(/.*)?"
 #restorecon -R "/usr/src/app"
 setenforce 0
 
 dnf -y install groupinstall "Development Tools"
 dnf -y install python36 python36-devel
 rm -rf /var/lib/apt/lists/*
 curl https://bootstrap.pypa.io/get-pip.py -o get-pip.py
 python3 get-pip.py
 python3 -m pip install mod-wsgi
 mv /usr/local/lib64/python3.6/site-packages/mod_wsgi/server/mod_wsgi-py36.cpython-36m-x86_64-linux-gnu.so /etc/httpd/modules/mod_wsgi-py36.cpython-36m-x86_64-linux-gnu.so
 cp $SETTING_FILE_DIR/httpd.conf /etc/httpd/conf/httpd.conf
 python3 -m pip install Django
 systemctl start httpd
 # /usr/local/bin/django-admin startproject $PROJECT_NAME
 # python3 $WORK_DIR/$PROJECT_NAME/manage.py startapp portal

#from here install & setting of postgresserver
 dnf -y module disable postgresql:10
 dnf -y module enable postgresql:12
 dnf -y install postgresql-server
 dnf -y install postgresql-devel
 /usr/bin/postgresql-setup --initdb
 systemctl start postgresql
 python3 -m pip install psycopg2-binary
 sudo -u postgres psql < $SETTING_FILE_DIR/psqlSetting.sql
 cp $SETTING_FILE_DIR/pg_hba.conf /var/lib/pgsql/data/pg_hba.conf
 systemctl restart postgresql

 #django settings
 python3 $WORK_DIR/$PROJECT_NAME/manage.py makemigrations
 python3 $WORK_DIR/$PROJECT_NAME/manage.py migrate
 #非対話方式でadminuserが作れるのか要確認
 #python3 $WORK_DIR/$PROJECT_NAME/manage.py createsuperuser

#set nodejs
 dnf -y install nodejs

