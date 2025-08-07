import express from 'express';
import homeController from '../controller/homeController.js';
import userController from '../controller/userController.js';

const router = express.Router();


const webRoutes = (app) => {
    // Define your routes here
    router.get('/', homeController.home);
    router.get('/reigister', userController.gotoReigister);
    router.post('/reigister/register', userController.handleReigister);
    router.post('/login', userController.handleLogin);
    // Add more routes as needed
    app.use('/', router);
}

export default webRoutes;