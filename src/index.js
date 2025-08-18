import express from 'express';
import viewEngine from './config/viewEngine.js';
import webRoutes from './routes/router.js';
import apiRoutes from './routes/api.js';
import dotenv from 'dotenv';
import connection from './config/databaseConfig.js';
import path from 'path';

dotenv.config();


const app = express();
//configure view engine
viewEngine(app);
//configure static file serving
app.use("/uploads", express.static(path.join(__dirname, "uploads")));
//configure body parser
app.use(express.urlencoded({ extended: true }));
app.use(express.json());


//configure routes
webRoutes(app);
apiRoutes(app);
//test database connection
connection();

const PORT = process.env.PORT;

app.listen(PORT, () => {
    console.log(`>>> Server is running on port ${PORT} <<<`);
});