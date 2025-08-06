import express from 'express';
import viewEngine from './configs/viewEngine.js';
import webRoutes from './routes/router.js';
import dotenv from 'dotenv';

dotenv.config();

const app = express();

viewEngine(app);

webRoutes(app);

const PORT = process.env.PORT;

app.listen(PORT, () => {
    console.log(`>>> Server is running on port ${PORT} <<<`);
});