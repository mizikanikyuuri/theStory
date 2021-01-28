WORK_DIR=/usr/src/app
SETTING_FILE_DIR=$1

sudo cp ./app /usr/src/app
sudo python3 ./app/protostory/manage.py collectstatic --noinput
sudo sh $SETTING_FILE_DIR/updateSettings.sh $SETTING_FILE_DIR $WORK_DIR
/usr/local/bin/supervisorctl restart all