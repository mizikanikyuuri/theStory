#create user 
#get app sorce
sudo dnf install git -y
mkdir ~/gitdir
cd ~/gitdir
git clone https://github.com/mizikanikyuuri/theStory.git
#setting directory permission for supervisor_user
sudo mkdir /usr/src/app
sudo chown proto_story_admin /usr/src/app
sudo chmod -R 775 /usr/src/app
sudo chmod -R 775 /var/www
sudo mkdir /var/log/supervisor
sudo chown supervisor_user /var/log/supervisor
sudo chmod -R 775 /var/log/supervisor
sudo mkdir /var/log/nginx
sudo chown supervisor_user /var/log/nginx
sudo chmod -R 775 /var/log/nginx
sudo chgrp -R supervisor_user /var/lib/nginx
sudo chown proto_story_admin /usr/src/app
sudo touch /var/log/redis.log
sudo chown supervisor_user /var/log/redis.log
mv ~/gitdir/theStory/app/* /usr/src/app
#install environment
cp ~/gitdir/theStory/settingFiles home/proto_story_admin/settingFiles
cp ~/gitdir/theStory/awsSettingFiles/ec2Provision.sh home/proto_story_admin/settingFiles
sudo sh /home/proto_story_admin/settingFiles/provision.sh /home/proto_story_admin/settingFiles proto_story_admin