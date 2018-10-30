# Horizon 2080 Back-end

Using Python's Django Framework

### About this App

<b>tech stack used</b>:<br>
Front-End: React, Material-UI<br>
Back-End: Python3.4, Django2.0.9, MySql8<br>
Testing: Cypress<br>

### Configuration

1. install python 3
2. install pip3
3. install virtualenv:
   -> pip3 install virtualenv (if there's network error, add <151.101.1.63 files.pythonhosted.org> to host file)
   https://stackoverflow.com/questions/52551595/cant-get-virtualenv-working-due-to-ssl-error
4. create a virtualenv:<br>
   `virtualenv venv --python=python3.4`
5. start venv:<br>
   `source venv/bin/activate`<br>
   quit venv:<br>
   `deactivate`
6. <b>After activating the virtual environment</b> install the following packages:<br>
   `pip3 install django==2.0.9` (python3.4 only supports up to 2.0.9)<br>
   `pip3 install pymysql` ( in /project/**init**.py add:<br>
    ```
    import pymysql
    pymysql.install_as_MySQLdb()
    ```
    )<br>
    `pip3 install djangorestframework`<br>
    `pip3 install coverage`
7. run app:<br>
   `python3 manage.py runserver`
8. to migrate database:<br>
   `python3 manage.py migrate`

### Dev Setup

1.  install npm modules
    ```
    npm install --global gulp-cli (gulp cli for workflow automation)
    npm install // rest of the packages
    ```
    run scripts:<br>
    ```
    npm run dev // dev bundle
    npm run build // production bundle
    npm run e2e // testing
    gulp // start gulpfile.js
    ```
2.  `pip3 install django-livereload-server` Add 'livereload' to the INSTALLED_APPS before 'django.contrib.staticfiles':

    ```
    INSTALLED_APPS = (
         ...
         'livereload',
         ...
         )
         MIDDLEWARE = [
         ...
         'livereload.middleware.LiveReloadScript',
         ]

     python3 manage.py livereload
     python3 manage.py runserver
    ```

### Server Setup
1. URL: https://horizon2080.chinacloudsites.cn
2. https://JLL_TDIM@horizon2080.scm.chinacloudsites.cn:443/Horizon2080.git / zaq1@WSX
3. 



### Frequently appeared problems

1. django.db.utils.OperationalError: (1045, "Access denied for user 'root'@'localhost' (using password: NO)")<br>
   solution 1: check settings.py database configuration<br>
   solution 2 execute this in database:<br>
    ```
    ALTER USER 'root'@'localhost' IDENTIFIED WITH mysql_native_password BY 'newpassword';
    FLUSH PRIVILEGES;
    ```
    then use newpassword in settings.py
