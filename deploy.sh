WORK_DIR=/usr/src/app
SETTING_FILE_DIR=$1

cp ./app /usr/src/app
python3 ./app/protostory/manage.py collectstatic
sh updateSettings.sh $SETTING_FILE_DIR $WORK_DIR
/usr/local/bin/supervisorctl restart all