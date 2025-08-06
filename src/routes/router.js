import express from 'express';

const router = express.Router();

const webRoutes = (app) => {
    // Define your routes here
    router.get('/', (req, res) => {
        res.send('hello world'); // Render the index view
    });

    // Add more routes as needed
    return app.use('/', router);
}

export default webRoutes;