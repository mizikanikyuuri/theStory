 
SETTING_FILE_DIR=$1
WORK_DIR=$2
PROJECT_NAME=$3

 #place setting files
 #because overriding setting on sql will be error. settingSql should not be in here. 
 cp -f $SETTING_FILE_DIR/seLinuxConfig /etc/selinux/config
 python3 -m pip install -r $SETTING_FILE_DIR/requirements.txt
 cp $SETTING_FILE_DIR/nginx.module /etc/dnf/modules.d/nginx.module
 cp $SETTING_FILE_DIR/nginx.conf /etc/nginx/nginx.conf
 cp $SETTING_FILE_DIR/uwsgi.ini /etc/uwsgi/uwsgi.ini
 cp $SETTING_FILE_DIR/pg_hba.conf /var/lib/pgsql/data/pg_hba.conf
 cp $SETTING_FILE_DIR/redis.conf /etc/redis/redis-6.0.7/redis.conf 
 python3 $WORK_DIR/$PROJECT_NAME/manage.py makemigrations
 python3 $WORK_DIR/$PROJECT_NAME/manage.py migrate
 python3 $WORK_DIR/$PROJECT_NAME/manage.py collectstatic
 cp $SETTING_FILE_DIR/supervisord.conf /etc/supervisor/supervisord.conf