import express from 'express';
import viewEngine from './configs/viewEngine.js';
import webRoutes from './routes/router.js';
import dotenv from 'dotenv';

dotenv.config();


const app = express();
//configure view engine
viewEngine(app);
//configure body parser
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
//configure routes
webRoutes(app);

const PORT = process.env.PORT;

app.listen(PORT, () => {
    console.log(`>>> Server is running on port ${PORT} <<<`);
});