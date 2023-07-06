import express from "express";

const configViewEngine = (app) => {
    //accept accessing static file
    //app.use(express.static('./src/public/'));
    app.use(express.static('./src/public/css'))
    //config view engine la ejs
    app.set("view engine", "ejs"); 
    //congfig src cua view engine, tat ca file ejs se tu dong tim trong thu muc src/views
    app.set("views", "./src/views"); 
}

//share cac function giua cac lenh voi nhau thi dung export
export default configViewEngine;            