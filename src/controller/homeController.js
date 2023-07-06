import pool from '../configs/connectDB';

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
    console.log('check request: ', req.body)
    return res.redirect('/newPage')
}

module.exports = {
    getnewPage,
    getIndex,
    getabout,
    getmainWeb, 
    getDetailPage,
    createNewUser,
    deleteUser,
    getChangePage,
    postUpdateUser
}


