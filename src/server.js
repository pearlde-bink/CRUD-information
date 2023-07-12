// const express = require('express')
import express from 'express';
import configViewEngine from './configs/viewEngine';
import initWebRoute from './route/web';
import connection from './configs/connectDB';
import initAPIRoute from './route/api';
import serveStatic from 'serve-static';
// const serveStatic = require('serve-static');

const path = require('path');

//if there are any sub path in 'env' folder
// add path in brackets of 'config'  //such as: require('dotenv).config({path: 'local.env});
require('dotenv').config();
var morgan = require('morgan');

const app = express()
const port = process.env.PORT || 8080;

app.use((req, res, next) => {
  console.log(">>>run into middelware");
  console.log(req.method);
  next();
})

app.use(morgan('combined'));

app.use(express.urlencoded({extended: true}));
app.use(express.json());

//set up view engine
configViewEngine(app);

//init web route
initWebRoute(app);

//init API route
initAPIRoute(app);

//static file
app.use('/static', express.static(path.join(__dirname, 'public')))

// handle 404 not found
app.use((req, res) => {
  return res.render('test/404');
})

app.set('view cache', false);

app.use((req, res) => {
  console.log('>>>run into middlewear: ');
  console.log(req);
}) 

app.use(express.json())

app.listen(port, () => {
  console.log(`Example app listening on http://localhost:${port}`)
})