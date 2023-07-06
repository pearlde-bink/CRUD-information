import express from 'express'
import homeController from '../controller/homeController';

let router = express.Router();

//declare common vars 
//middleware declaring common vars
const commVars = (req, res, next) => {
    res.locals.name = 'Bink';
    res.locals.age = 30;
    res.locals.title1 = 'Welcome bro';
    next();
}
router.use(commVars);

const requestedTime = function(req, res, next){
    const d = new Date()
    req.requestedTime = d.toLocaleTimeString();
    next();
}
router.use(requestedTime);

const initWebRoute = (app) => {
    router.get('/', homeController.getmainWeb)
    
    router.get('/about', homeController.getabout)

    router.get('/index', homeController.getIndex);
    
    router.get('/newPage', homeController.getnewPage)

    //those routers are sub router of newPage's function button
    router.get('/detail/user/:userId', homeController.getDetailPage); //':userId' is used to specify the url of page, 

    router.post('/create-new-user', homeController.createNewUser);

    router.post('/delete-user', homeController.deleteUser);

    router.get('/change-user/:id', homeController.getChangePage);

    router.post('/update-user', homeController.postUpdateUser)

    return app.use('/', router)
    //if you return app.use('/asb', router), when accessing your website, you must add '/asb' before 'index', 'newPage' or 'about'
}

export default initWebRoute;