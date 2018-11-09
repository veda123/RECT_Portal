# Repair Equipment Configuration Tool

Live Demo
The application is hosted on Heroku. 

Check out the live demo at https://rect-app-portal.herokuapp.com/login.

Steps to Setup the Front end app.

1) Clone the application

git clone https://github.com/veda123/RECT_Portal.git

2) Then type the following commands to install the dependencies and start the application -

#Global

npm uninstall -g angular-cli

npm cache verify

npm install -g @angular/cli@latest

#Inside the project - If you had an earlier version of angular cli

rm -rf node_modules

npm uninstall --save-dev angular-cli

npm install --save-dev @angular/cli@latest

npm install

The front-end server will start on port 4200 (localhost)
