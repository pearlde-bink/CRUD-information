import express from "express";
import APIController from '../controller/APIController';

let router = express.Router();

const initAPIRoute = (app) => {
    router.get('/users', APIController.getAllUsers); //method get -> read dara
    router.post('/create-user', APIController.createNewUser); //method post -> create data
    router.delete('/delete-user/:id', APIController.deleteUser);
    router.put('/update-user/:id', APIController.updateUser);

    return app.use('/api/v1/', router)
}

export default initAPIRoute;