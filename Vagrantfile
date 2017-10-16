# -*- mode: ruby -*-
# vi: set ft=ruby :

Vagrant.configure("2") do |config|
  config.vm.box = "ubuntu/xenial64"

  # Setup Port Forwards
  config.vm.network 'forwarded_port', guest: 8080, host: 8080
  config.vm.network 'forwarded_port', guest: 3000, host: 3000

  # Provider-specific configurations
  config.vm.provider 'virtualbox' do |vb|
    vb.memory = 2048
    vb.cpus = 2
  end

  # General Provisioning
  config.vm.provision 'shell', inline: <<-SHELL
    echo ''\
    '============================================================\n'\
    '==                  GENERAL PROVISIONING                  ==\n'\
    '============================================================'
    apt-get update
    apt-get -y install python3-pip
  SHELL

  # Backend Provisioning
  config.vm.provision 'shell', inline: <<-SHELL
    echo ''\
    '============================================================\n'\
    '==                  BACKEND PROVISIONING                  ==\n'\
    '============================================================'
    pip3 install Biopython
  SHELL

  # Frontend Provisioning
  config.vm.provision 'shell', inline: <<-SHELL
    echo ''\
    '============================================================\n'\
    '==                  FRONTEND PROVISIONING                 ==\n'\
    '============================================================'
    apt-get -y install nodejs
    apt-get -y install nodejs-legacy
    apt-get -y install npm

    cd /vagrant/polymorphs-frontend-master/
    npm install --verbose --no-bin-links
  SHELL
end
