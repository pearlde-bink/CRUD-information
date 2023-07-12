import pool from '../configs/connectDB';

let getAllUsers = async (req, res) => {
    const [rows, fields] = await pool.execute('select * from users');

    return res.status(200).json({
        message: 'ok',
        data: rows,
    })
}

let createNewUser = async (req, res) => {
    let {firstName, lastName, email, address} = req.body;
    if(!firstName || !lastName || !email || !address){
        return res.status(400).json({
            message:'missing required information',
        })
    }
    await pool.execute('insert into users (firstName, lastName, email, address) values (?, ?, ?, ?)', [firstName, lastName, email, address]);

    return res.status(200).json({
        message: 'oke',
    })
}

let deleteUser = async (req, res) => {
    let id = req.params.id;
    await pool.execute('delete from users where id = ?', [id]);

    return res.status(200).json({
        message: 'oke',
    })
}

let updateUser = async (req, res) => {
    //get id to update user 
    let id = req.params.id;
    await pool.execute('select * from users where id = ?', [id]);

    //update user's in4 with provided id
    let {firstName, lastName, email, address} = req.body;
    await pool.execute('update users set firstName = ?, lastName = ?, email = ?, address = ? where id = ?', [firstName, lastName, email, address, id]);

    return res.status(200).json({
        message: 'oke',
        data: id,
    })
}

module.exports = {
    getAllUsers,
    createNewUser,
    deleteUser,
    updateUser
}
