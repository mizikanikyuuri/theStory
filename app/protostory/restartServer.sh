#!/bin/sh
 systemctl start httpd
 python3 $WORK_DIR/$PROJECT_NAME/manage.py makemigrations
 python3 $WORK_DIR/$PROJECT_NAME/manage.py migrate
 python3 $WORK_DIR/$PROJECT_NAME/manage.py collectstatic
 