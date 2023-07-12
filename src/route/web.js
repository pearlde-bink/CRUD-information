import express from 'express'
import homeController from '../controller/homeController';
import multer from 'multer';
import path from 'path';
var appRoot = require('app-root-path');

let router = express.Router();

//to upload file
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, appRoot + "/src/public/image/");
    },

    // By default, multer removes file extensions so let's add them back
    filename: function (req, file, cb) {
        cb(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname));
    }
});
const imageFilter = function (req, file, cb) {
    // Accept images only
    if (!file.originalname.match(/\.(jpg|JPG|jpeg|JPEG|png|PNG|gif|GIF)$/)) {
        req.fileValidationError = 'Only image files are allowed!';
        return cb(new Error('Only image files are allowed!'), false);
    }
    cb(null, true);
};
let upload = multer({ storage: storage, fileFilter: imageFilter });
let uploadMul = multer({storage: storage, fileFilter: imageFilter}).array('multiple_images', 3);

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
    //some website to navigate in search bar
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

    //upload file
    router.get('/upload', homeController.getUploadFilePage);
    router.post('/upload-profile-pic', upload.single('profile_pic'), homeController.handleUploadFile); //the center one is middle ware (middleware locates between url link and method)
    router.post('/upload-multiple-images', (req, res, next) => {
        uploadMul(req, res, (err) => {
            if (err instanceof multer.MulterError && err.code === "LIMIT_UNEXPECTED_FILE") {
                // handle multer file limit error here
                res.send('LIMIT_UNEXPECTED_FILE')
            } else if (err) {
                res.send(err)
            }

            else {
                // make sure to call next() if all was well
                next();
            }
        })
    },homeController.handleUploadMultipleFiles);

    // back to home page in newPage
    router.get('/home', homeController.getHomePage);

    return app.use('/', router)
    //if you return app.use('/asb', router), when accessing your website, you must add '/asb' before 'index', 'newPage' or 'about'
}

export default initWebRoute;