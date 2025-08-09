import express from 'express';
import homeController from '../controllers/userController.js';
import userController from '../controllers/userController.js';

const router = express.Router();


const webRoutes = (app) => {
    // Define your routes here
    router.get('/', homeController.login);
    router.get('/manage-user', userController.gotoManageUser);
    router.post('/create-user', userController.createUser);
    router.get('/delete-user/:id', userController.gotoDeleteUser);
    app.use('/', router);
}

export default webRoutes;