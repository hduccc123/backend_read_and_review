import express from 'express';
import userController from '../controllers/userController.js';
import bookController from '../controllers/bookController.js';
import categoryController from '../controllers/categoryController.js'
import authController from '../controllers/authController.js';
import getCustomersLayout from '../service/layoutSevice.js';
import homeController from '../controllers/homeController.js';
import productController from '../controllers/productController.js';

const upload = require('../config/multer.js'); // Assuming multer is configured in this file
const router = express.Router();


const webRoutes = (app) => {
    //Homepage
    router.get('/', getCustomersLayout, homeController.getHomePage);
    //Book details page
    router.get('/books/:id', getCustomersLayout, homeController.getDetailPage);

    // Define your routes here
    // Admin routes
    router.get('/login', authController.show);
    router.post('/login', authController.login);

    // User routes
    router.get('/users', userController.index);
    router.get('/manage-user', userController.index);
    router.post('/create-user', userController.create);
    router.get('/delete-user/:id', userController.destroy);
    router.get('/edit-user/:id', userController.edit);
    router.post('/update-user/:id', userController.update);
    //Book routes
    router.get('/books', bookController.index);
    router.get('/manage-book', bookController.index);
    router.post('/create-book', upload.single('cover'), bookController.create);
    router.get('/create-book', upload.single('cover'), bookController.getCreate);
    router.get('/edit-book/:id', upload.single('cover'), bookController.edit);
    router.post('/update-book/:id', upload.single('cover'), bookController.update);
    router.get('/delete-book/:id', bookController.destroy);
    // Category routes
    router.get('/manage-category', categoryController.index);
    router.post('/create-category', categoryController.create);
    router.get('/edit-category/:id', categoryController.edit);
    router.post('/update-category/:id', categoryController.update);
    router.get('/delete-category/:id', categoryController.destroy);
    // Product routes
    router.get('/manage-product', productController.index);
    router.post('/create-product', upload.single('image'), productController.create);
    router.post('/update-product/:id', upload.single('image'), productController.update);
    router.get('/edit-product/:id', productController.edit);
    router.get('/delete-product/:id', productController.destroy);

    app.use('/', router);
}

export default webRoutes;