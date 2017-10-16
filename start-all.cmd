vagrant up
start "Backend" .\polymorphs-master\start-server.cmd
sleep 5
start "Frontend" .\polymorphs-frontend-master\start-server.cmd
