import express from 'express';

const router = express.Router();

const apiRoutes = (app) => {
    app.use('/api/v1', router);
};

export default apiRoutes;
