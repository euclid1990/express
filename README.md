# Express Application

## Overview
- This application built with Express, Socket.io
- Features
  - Minification and copying of all JavaScript files, stylesheets, static images with Gulp
  - Monitor for any changes in your node.js application and automatically restart the server by Nodemon, Browser-sync
  - MVC structure (Model, View, Controller, Helper, Route(restful))
  - Setup pooled MySQL connections
  - Avoiding Callback Hell, managing callbacks in MySQL with Async.js.
  - Mack socket.io work fine with the Express generator setup.

## Setup and Run Project

```bash
$ git clone git@github.com:euclid1990/express.git my-proj
$ cd my-proj
$ yarn install / npm install
$ bower install
```

- Create new database name: `express`

```
CREATE DATABASE express
    DEFAULT CHARACTER SET utf8
    DEFAULT COLLATE utf8_general_ci;
```

- Import `database.sql` into `express` Mysql database

```
mysql -u{your_username} -p{your_password} express < database.sql
```

- After copy `app/config/database.example.js` into folder `app/config/` and rename file to `database.js`, please change configuration for correspondence.

```
$ gulp start
```

## Access Application

```
http://localhost:8000/
```

## Stop Browser-sync and Nodemon server

Press `Ctr+C` or

```bash
$ sudo apt-get install lsof
$ sudo kill -9 (lsof -i :3000 -t)
$ sudo kill -9 (lsof -i :8000 -t)
```