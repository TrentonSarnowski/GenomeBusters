#!/bin/bash

vagrant up
./polymorphs-master/start-server.sh &
sleep 5
./polymorphs-frontend-master/start-server.sh
