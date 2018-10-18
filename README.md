# Horizon 2080 Back-end

Using Python's Django Framework

### About this App

tech stack used:
Front-End: React, Material-UI
Back-End: Python3.4, Django2.0.9, MySql8
Testing: Cypress

### Configuration

1. install python 3
2. install pip3
3. install virtualenv:
   -> pip3 install virtualenv (if there's network error, add <151.101.1.63 files.pythonhosted.org> to host file)
   https://stackoverflow.com/questions/52551595/cant-get-virtualenv-working-due-to-ssl-error
4. create a virtualenv:
   -> virtualenv venv --python=python3.4
5. start venv:
   -> source venv/bin/activate
   quit venv:
   -> deactivate
6. <b>After activating the virtual environment</b> install the following packages:
   -> pip3 install django==2.0.9 (python3.4 only supports up to 2.0.9)
   -> pip3 install pymysql ( in /project/**init**.py add:
   import pymysql
   pymysql.install_as_MySQLdb() )
   -> pip3 install djangorestframework
   -> pip3 install coverage
7. run app:
   -> python3 manage.py runserver
8. to migrate database:
   -> python3 manage.py migrate

### Dev Setup

1. install gulp (for workflow automation)
   npm install --global gulp-cli
   npm install --save-dev gulp@next
   run gulp by:
   -> gulp
2. pip3 install django-livereload-server
   Add 'livereload' to the INSTALLED_APPS before 'django.contrib.staticfiles':
   INSTALLED_APPS = (
   ...
   'livereload',
   ...
   )
   MIDDLEWARE = [
   ...
   'livereload.middleware.LiveReloadScript',
   ]

    -> python3 manage.py livereload
    -> python3 manage.py runserver

### scripts

npm run dev (dev bundle)
npm run build (production bundle)
npm run e2e (testing)

### Frequently appeared problems

1. django.db.utils.OperationalError: (1045, "Access denied for user 'root'@'localhost' (using password: NO)")
   solution 1: check settings.py database configuration
   solution 2 execute this in database:
   ALTER USER 'root'@'localhost' IDENTIFIED WITH mysql_native_password BY 'newpassword';  
   FLUSH PRIVILEGES;
   then use newpassword in settings.py
