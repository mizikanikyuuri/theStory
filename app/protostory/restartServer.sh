#!/bin/sh
 WORK_DIR=/usr/src/app
 PROJECT_NAME=protostory
 python3 $WORK_DIR/$PROJECT_NAME/manage.py makemigrations
 python3 $WORK_DIR/$PROJECT_NAME/manage.py migrate
 python3 $WORK_DIR/$PROJECT_NAME/manage.py collectstatic
 systemctl restart httpd