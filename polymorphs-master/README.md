# Polymorphs

This repository contains the code and preset genome files for the backend of the GeneScape Viewer. The GeneScape viewer was a senior design project (2016-2017) with the goal of processing and/or identifying genes within given gene files. This project currently only processes genbank files (preset or uploaded) and serves the processed result back to the client in JSON format.

The project is implemented in Python3 and uses builtin libraries for HTTP handling. It is dependent on [BioPython](https://github.com/biopython/biopython).

Other notes:
This was attempted to be rewritten using Flask, which is a much more suitable and extensible simple HTTP api framework, but there was a bug in how it handle ajax POSTed files that resulted in us dropping it. The rewrite is in the repository but does not work with the front end.

## Development

### setup
You will need Python3 to run the server. Depending on your operating system, you may want to install manually (windows) https://www.python.org/downloads/ or use your built in package manager (ubuntu/debian) `apt-get install -y python3` (macOs) `brew install python3`.

run the following in a command line to check which version of python you have.
```
python -V
```

If you're on ubuntu or windows, you might have `python3` aliased for python3 instead.
```
python3 -V
```

You will also need a python package installer `conda` or `pip`. Configuration will depend on your machine.

*windows*
If you have Python 3.4 or above, pip should already be installed. otherwise, google instructions to download and install.

*ubuntu/debian*
```
sudo apt-get -y install python3-pip
```
*macOS*
If your OS / python package didn't come with it, try this: `easy_install pip`

*install Biopython*
```bash
pip3 install Biopython
```

on some versions of linux, you may also need python development headers. These are usually contained in devel / development versions of packages, etc: `apt-get install python3-devel` or `apt-get install python3-dev`. If you run into issues with pip running into compilation issues while compiling Biopython.h, something like `Python.h could not be found` on windows, you should google that error.

### getting started
```
git clone git@github.com:euclideansphere/polymorphs.git
cd polymorphs
```
### (optional) - create a virtualenv

*macOS/linux*
```
virtualenv -p python3 myenv
source ./myenv/bin/activate
```

example verification of virtualenv -
```
$ python --version
Python 3.5.2+
$ which python pip
/home/jake/Code/myenv/bin/python
/home/jake/Code/myenv/bin/pip
```
You will have to reinstall Biopython in your virtualenv.

### starting the server
`./prodigal.py` will start the server. Ctrl+C to kill it. some operating systems may leave the port hanging open after killing it while it cleans up. Rerunning the application may result in a port bind error and you will either have to wait for the system to close the connection or close it manually.

## contributing
fork this project.
