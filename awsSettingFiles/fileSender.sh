APP_ROOT=$1
scp -r APP_ROOT/settingFiles proto_story_admin:/home/proto_story_admin/settingFiles
scp APP_ROOT/awsSettingFiles/ec2Provision.sh proto_story_admin:/home/proto_story_admin/settingFiles/ec2Provision.sh