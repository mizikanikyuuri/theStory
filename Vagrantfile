# -*- mode: ruby -*-
# vi: set ft=ruby :

# All Vagrant configuration is done below. The "2" in Vagrant.configure
# configures the configuration version (we support older styles for
# backwards compatibility). Please don't change it unless you know what
# you're doing.
Vagrant.configure("2") do |config|
  # The most common configuration options are documented and commented below.
  # For a complete reference, please see the online documentation at
  # https://docs.vagrantup.com.

  # Every Vagrant development environment requires a box. You can search for
  # boxes at https://vagrantcloud.com/search.
  config.vm.box = "centos/8"
  config.vm.boot_timeout = 6000
  # Disable automatic box update checking. If you disable this, then
  # boxes will only be checked for updates when the user runs
  # `vagrant box outdated`. This is not recommended.
  # config.vm.box_check_update = false

  # Create a forwarded port mapping which allows access to a specific port
  # within the machine from a port on the host machine. In the example below,
  # accessing "localhost:8080" will access port 80 on the guest machine.
  # NOTE: This will enable public access to the opened port
  # config.vm.network "forwarded_port", guest: 80, host: 8080

  # Create a forwarded port mapping which allows access to a specific port
  # within the machine from a port on the host machine and only allow access
  # via 127.0.0.1 to disable public access
   config.vm.network "forwarded_port", guest: 80, host: 8080, host_ip: "127.0.0.1", protocol: "tcp"
   config.vm.network "forwarded_port", guest: 80, host: 8080, host_ip: "127.0.0.1", protocol: "udp"
   config.vm.network "forwarded_port", guest: 8080, host: 1234, host_ip: "127.0.0.1", protocol: "tcp"

  # Create a private network, which allows host-only access to the machine
  # using a specific IP.
  config.vm.network "private_network", ip: "192.168.33.10"

  # Create a public network, which generally matched to bridged network.
  # Bridged networks make the machine appear as another physical device on
  # your network.
  # config.vm.network "public_network"

  # Using vagrant-vbguest
  # check https://github.com/dotless-de/vagrant-vbguest
  #config.vbguest.iso_path = "http://company.server/VirtualBox/%{version}/VBoxGuestAdditions.iso"
  config.vbguest.auto_update = true
  config.vbguest.no_remote = false
  
  # Monkey patch for https://github.com/dotless-de/vagrant-vbguest/issues/367
  class Foo < VagrantVbguest::Installers::CentOS
    def has_rel_repo?
      unless instance_variable_defined?(:@has_rel_repo)
        rel = release_version
        @has_rel_repo = communicate.test("yum repolist")
      end
      @has_rel_repo
    end

    def install_kernel_devel(opts=nil, &block)
      cmd = "yum update kernel -y"
      communicate.sudo(cmd, opts, &block)

      cmd = "yum install -y kernel-devel"
      communicate.sudo(cmd, opts, &block)

      cmd = "shutdown -r now"
      communicate.sudo(cmd, opts, &block)

      begin
        sleep 5
      end until @vm.communicate.ready?
    end
  end
  config.vbguest.installer = Foo

  #if you are not usign windwos pc host and using winnfsd comment out below
  #config.winnfsd.uid = 1000
  #config.winnfsd.gid = 1000
  
  # Share an additional folder to the guest VM. The first argument is
  # the path on the host to the actual folder. The second argument is
  # the path on the guest to mount the folder. And the optional third
  # argument is a set of non-required options.
  config.vm.provision "shell",inline: "dnf -y install nfs-utils nfs4-acl-tools"
  config.vm.synced_folder "./app", "/usr/src/app\/",type: "nfs"

  # Provider-specific configuration so you can fine-tune various
  # backing providers for Vagrant. These expose provider-specific options.
  # Example for VirtualBox:
  #
  config.vm.provider "virtualbox" do |vb|
    # Display the VirtualBox GUI when booting the machine
  #  vb.gui = true
  #
  #   # Customize the amount of memory on the VM:
    vb.memory = "4096"
  end
  #
  # View the documentation for the provider you are using for more
  # information on available options.

  # Enable provisioning with a shell script. Additional provisioners such as
  # Ansible, Chef, Docker, Puppet and Salt are also available. Please see the
  # documentation for more information about their specific syntax and use.
  config.vm.provision "file", source: "./settingFiles", destination: "/home/vagrant/settingFiles"
  config.vm.provision "shell", path: "./settingFiles/init.sh" ,args:["/home/vagrant/settingFiles","vagrant"]
end
