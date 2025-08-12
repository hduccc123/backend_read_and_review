import express from 'express';
import homeController from '../controllers/userController.js';
import userController from '../controllers/userController.js';
import bookController from '../controllers/bookController.js';
import multer from 'multer';

const upload = multer({ dest: 'uploads/' });
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


    app.use('/', router);
}

export default webRoutes;