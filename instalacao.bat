instala mysql
instala nodejs
instala git
instala github
altera usuario mysql
baixa pacote
starta aplicacao
cria icone de inicializacao na area de trabalho
inicializa a aplicacao


#sudo apt update
#sudo apt upgrade

#sudo apt install git
#git --version

#git clone https://github.com/binhojulix/gefi.git

#sudo apt install nodejs

#sudo apt install npm

#nodejs -v

#npm -v

#sudo npm install -g @angular/cli

cd gefi

#npm install






#sudo apt install mysql-server
#sudo mysql_secure_installation

#sudo mysql

#ALTER USER 'root'@'localhost' IDENTIFIED WITH mysql_native_password BY 'password';
#FLUSH PRIVILEGES;
#exit;

#GRANT ALL PRIVILEGES ON *.* TO 'admin'@'localhost' IDENTIFIED BY 'password';
#exit;


sudo apt install build-essential

sudo npm install pm2@latest -g

pm2 start server.js

pm2 startup systemd

sudo env PATH=$PATH:/usr/bin /usr/lib/node_modules/pm2/bin/pm2 startup systemd -u ubuntu --hp /home/ubuntu