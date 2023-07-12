import pool from '../configs/connectDB';
import multer from 'multer';

let getHomePage = async (req, res) => {
    const [rows, fields] = await pool.execute('SELECT * FROM users');
    return res.render('test/newPage', {dataUser: rows});
}

let getnewPage = async (req, res) => {
    const [rows, fields] = await pool.execute('SELECT * FROM users');
    //we can remove 'fields' variable if we dont need metadata about the returned columns
    //just const [rows] is enough if u just need the queried information
    return res.render('test/newPage', {dataUser: rows});
}

let getabout = (req, res) => {
    return res.render('test/about');
}

let getIndex = (req, res) => {
    return res.render('test/index');
}

let getmainWeb = (req, res) => {
    let responseText = "You just require moment ";
    responseText += `<big> at ... ${req.requestedTime}</big>`;
    return res.send(responseText);
}

let getDetailPage = async (req, res) => { //because of using database query, it cant return result immediately, so we need to use async function
    let userId = req.params.userId; //to get the value of the user's ID 
    let [user] = await pool.execute(`SELECT * FROM users WHERE id = ?`, [userId]);
    return res.send(JSON.stringify(user));
}

let createNewUser = async (req, res) => {
    // console.log('check request', req.body);
    // let {firstName, lastName, email, address} = req.body; //shortened syntax to get the data from request body
    // to get data from request body with more easy way to understand
    let firstName = req.body.firstName;
    let lastName = req.body.lastName;
    let email = req.body.email;
    let address = req.body.address;
    await pool.execute('insert into users (firstName, lastName, email, address) values (?, ?, ?, ?)', [firstName, lastName, email, address]);
    return res.redirect('/newPage'); //this api to redirect to url provided inside
}

let deleteUser = async (req, res) => {
    let userId = req.body.userId;
    await pool.execute('delete from users where id = ?', [userId]);
    // return res.send(`Hello from delete user ${req.body.userId}`); //lay thong tin tu input voi ten la "userId"
    return res.redirect('/newPage');
}

let getChangePage = async (req, res) => {
    let id = req.params.id;
    let [user] = await pool.execute('select * from users where id = ?', [id]);
    return res.render('test/update', {dataUser: user[0]});
}

let postUpdateUser = async (req, res) => {
    let {firstName, lastName, email, address, id} = req.body;
    await pool.execute('update users set firstName = ?, lastName = ?, email = ?, address = ? where id = ?', [firstName, lastName, email, address, id]);
    // console.log('check request: ', req.body)
    return res.redirect('/newPage')
}

let getUploadFilePage = async (req, res) => {
    return res.render('test/upload')
}

// const upload = multer().single('profile_pic')
// const uploadMul = multer().array('multiple_images', 3);

let handleUploadFile = async (req, res) => {
    // console.log(req.file.filename);
    // upload(req, res, function(err) {
        // req.file contains information of uploaded file
        // req.body contains information of text fields, if there were any
        if (req.fileValidationError) {
            return res.send(req.fileValidationError);
        }
        else if (!req.file) {
            return res.send('Please select an image to upload');
        }

        // Display uploaded image for user validation
        res.send(`You have uploaded this image: <hr/><img src="/image/${req.file.filename}" width="400" alt = "mr Bink dep trai" style="border:5px solid black"><hr /><a href="/upload">Upload another image</a>`);
    // });
}

let handleUploadMultipleFiles = async (req, res) => {
    if (req.fileValidationError) {
        return res.send(req.fileValidationError);
    }
    else if (!req.files) {
        return res.send('Please select an image to upload');
    }

    let result = "You have uploaded these images: <hr />";
    const files = req.files;
    console.log("check req.file: ", req.files);
    let index, len;
    len = files.length;
    for(index = 0; index < len; index++){
        result += `<img src="/image/${files[index].filename}" width="300" style="margin-right: 20px;">`; 
    }
    result += '<hr/><a hred = "./upLoad"> Upload more images</a>';

    res.send(result);
}

module.exports = {
    getHomePage,
    getnewPage,
    getIndex,
    getabout,
    getmainWeb, 
    getDetailPage,
    createNewUser,
    deleteUser,
    getChangePage,
    postUpdateUser,
    getUploadFilePage,
    handleUploadFile,
    handleUploadMultipleFiles
}


