WORK_DIR=/usr/src/app
SETTING_FILE_DIR=$1
PROJECT_NAME=protostory
APP_ADMIN_USER=$2

. /etc/profile.d/setProtoStoryValues.sh
sudo cp -r ./app /usr/src
sudo -E bash python3 ./app/protostory/manage.py collectstatic --noinput
sudo -E bash sh $SETTING_FILE_DIR/updateSettings.sh $SETTING_FILE_DIR $WORK_DIR $PROJECT_NAME $APP_ADMIN_USER
sudo /usr/local/bin/supervisorctl restart all