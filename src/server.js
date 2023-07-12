// const express = require('express')
import express from 'express';
import configViewEngine from './configs/viewEngine';
import initWebRoute from './route/web';
import connection from './configs/connectDB';
import initAPIRoute from './route/api';

   
const path = require('path');

//if there are any sub path in 'env' folder
// add path in brackets of 'config'
//such as: require('dotenv).config({path: 'local.env});
require('dotenv').config() 

const serveStatic = require('serve-static');

const app = express()
const port = process.env.PORT || 8080;

app.use(express.urlencoded({extended: true}));
app.use(express.json());

//set up view engine
configViewEngine(app);

//init web route
initWebRoute(app);

//init API route
initAPIRoute(app);

app.set('view cache', false);

app.listen(port, () => {
  console.log(`Example app listening on http://localhost:${port}`)
})