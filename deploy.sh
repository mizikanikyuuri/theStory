WORK_DIR=/usr/src/app
SETTING_FILE_DIR=$1
PROJECT_NAME=protostory

sudo cp -r ./app /usr/src/app
sudo python3 ./app/protostory/manage.py collectstatic --noinput
sudo sh $SETTING_FILE_DIR/updateSettings.sh $SETTING_FILE_DIR $WORK_DIR $PROJECT_NAME
/usr/local/bin/supervisorctl restart all