APP_ROOT=$1
scp -r APP_ROOT/settingFiles proto-story-ec2-user:/home/centos/settingFiles
scp APP_ROOT/awsSettingFiles/ec2Provision.sh proto-story-ec2-user:/home/centos/settingFiles/ec2Provision.sh