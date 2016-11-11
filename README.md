# Express Application

## Overview
- This application built with Express, Socket.io
- Features
  - Using Gulp, Nodemon, Browser-sync

## Setup and Run Project

```bash
$ git clone git@github.com:euclid1990/express.git my-proj
$ cd my-proj
$ yarn install
$ bower install
```

- Edit `app/config/database.example.js` and rename file to `database.js`

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
$ sudo kill -9 (lsof -i :8000 -t)
```