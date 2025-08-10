import express from 'express';
import homeController from '../controllers/userController.js';
import userController from '../controllers/userController.js';
import productController from '../controllers/productController.js';
import multer from 'multer';

const upload = multer({ dest: 'uploads/' });
const router = express.Router();


const webRoutes = (app) => {
    // Define your routes here
    router.get('/', homeController.login);


    router.get('/manage-user', userController.index);
    router.post('/create-user', userController.create);
    router.get('/delete-user/:id', userController.destroy);
    router.get('/edit-user/:id', userController.edit);
    router.post('/update-user/:id', userController.update);

    router.get('/manage-product', productController.index);

    router.post(
        '/create-product',
        upload.fields([
            { name: 'mainImage', maxCount: 1 },
            { name: 'detailImages', maxCount: 10 }
        ]),
        productController.create
    );
    router.get('/delete-product/:id', productController.destroy);
    router.get('/edit-product/:id', productController.edit);
    router.post('/update-product/:id', productController.update);

    app.use('/', router);
}

export default webRoutes;