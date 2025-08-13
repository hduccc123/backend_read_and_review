import express from 'express';
import homeController from '../controllers/userController.js';
import userController from '../controllers/userController.js';
import bookController from '../controllers/bookController.js';

const upload = require('../config/multer.js'); // Assuming multer is configured in this file
const router = express.Router();


const webRoutes = (app) => {
    // Define your routes here
    router.get('/', homeController.login);

    // User routes
    router.get('/manage-user', userController.index);
    router.post('/create-user', userController.create);
    router.get('/delete-user/:id', userController.destroy);
    router.get('/edit-user/:id', userController.edit);
    router.post('/update-user/:id', userController.update);
    //Book routes
    router.get('/manage-book', bookController.index);
    router.post('/create-book', upload.single('cover'), bookController.create);
    router.get('/create-book', upload.single('cover'), bookController.getcreate);


    app.use('/', router);
}

export default webRoutes;