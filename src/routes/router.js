import express from 'express';
import homeController from '../controller/homeController.js';
import userController from '../controller/userController.js';

const router = express.Router();


const webRoutes = (app) => {
    // Define your routes here
    router.get('/', homeController.home);
    router.get('/reigister', userController.reigister);
    router.post("/reigister/register", userController.reigisterCreate); // Assuming you want to handle registration via POST
    // Add more routes as needed
    app.use('/', router);
}

export default webRoutes;