# DouMi blog platform

[![Build Status](https://travis-ci.org/linxiaowu66/douMiBlog-Sailsjs.svg?branch=master)](https://travis-ci.org/linxiaowu66/douMiBlog-Sailsjs)
[![Coverage Status](https://coveralls.io/repos/github/linxiaowu66/douMiBlogPlatform/badge.svg?branch=master)](https://coveralls.io/github/linxiaowu66/douMiBlogPlatform?branch=master)
[![Analytics](https://ga-beacon.appspot.com/UA-85522412-2/welcome-page)](https://github.com/igrigorik/ga-beacon)
[![stable](https://badges.github.io/stability-badges/dist/stable.svg)](http://github.com/badges/stability-badges)
[![MIT Licence](https://badges.frapsoft.com/os/mit/mit.svg?v=103)](https://opensource.org/licenses/mit-license.php)


A [Sails](http://sailsjs.org) application. It is used for recording the process from the loving to marriage, all happiness and happy time are showing with only five pages. Each pages has the unique theme:

This blog platform is based on the [sailsjs](http://sailsjs.org) web framework. It contains three parts:

+ blog index page. It shows the navigation of blog platform and some key information about DouMi blog.
+ blog show page. It shows all posts which were published in this blog platform.
+ about DouMi page. It will introduce the DouMi in details.

This blog platform has following tech stack:

+ SailsJs
+ MongoDb
+ Async
+ RequireJs
+ Jquery
+ Bootstrap
+ bcrypt + passport
+ swig
+ SASS
+ grunt
+ marked
+ node-schedule

Now DouMi blog has been deployed in the AliYun, you can visit it via: http://blog.5udou.cn

# How to contribute

If you has intrested in developing this project, your correction/addition is so welcome.Just fork it and the pull a new request.


# How to deploy it in the local environment

**Step 1** Install nodejs and npm:

https://nodejs.org/download/

And npm has been imbedded with nodejs, and it will be installed with nodejs installation.

**Step 2** Install sails:
``` bash
$ npm -g install sails
```

**Step 3** Clone the codes from gitlab:
``` bash
$ git clone https://github.com/linxiaowu66/sails-blog-platform.git
```

**Step 4** Install Dependency and devDependency packages:

Move to the project root directory, and run below commands to install other packages, it is because in this project we also used some third-party package. **Bower** is an enhanced package management tool which can handle the package dependence well.

``` bash
$ npm -g install bower
$ npm i
$ bower i
```

This project is dependence with the SASS, so you should install the ruby and compass before run the app. Install steps as follow(AliYun--Ubuntu):

``` bash
# apt-get install Python-software-properties
# apt-add-repository ppa:brightbox/ruby-ng
# apt-get update
# apt-get install ruby2.1 ruby2.1-dev
# gem sources --add https://ruby.taobao.org/ --remove https://rubygems.org/
# gem install compass
```
> NOTE: If you can assess the http://rubygem.org, you can add the taobao mirrors to gem source just as step 3.


> deploy it under `root` is really a bad idea, but in case you're basted, try:

```bash
# npm install --unsafe-perm
# bower i --allow-root
```

**Step 5** In development mode, you can use 'localDiskDb'. Then no need to install database in development mode. But in production mode, MongoDb is used in this project.

Running the mongoDb,you can type these:

```
mongod -fork --dbpath=/home/mongodb_data/ --logpath=/home/mongodb_log/mongodb.log --logappend &

```

Then forever run the sails app:

```
cd yourProject

NODE_ENV=production forever start app.js
```

**Step 6** In this project, we use mocha [ http://mochajs.org/ ] for unit test. Unit test is a good way to protect your code. To install mocha:

``` bash
$ npm install -g mocha
```

**Step 7** In local, you can run 'sails lift' or 'sails console' in the root directory of this project to startup the server. Suppose the port 1337 used by server to listen the connect request, then you can visit the server in
browser with url 'http://localhost:1337'.

Troubleshooting tips:

```
You can run 'sails lift --silly', then all detail log will be printed in console. Also for troubleshooting, it is better to use the interactive mode with 'sails conole'
```

## TODO

  - [ ] 标签支持根据标签下文章个数进行大小调整并排序(或者使用云标签的方式)
  - [ ] 文章增加每天阅读人数的统计
  - [ ] 支持RSS
