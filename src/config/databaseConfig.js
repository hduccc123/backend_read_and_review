import Sequelize from "sequelize/lib/sequelize"
import dotenv from 'dotenv';

dotenv.config();

const sequelize = new Sequelize({
    dialect: "mysql",
    host: process.env.DB_HOST,
    username: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME
});

const connection = async () => {
    try {
        await sequelize.authenticate();
        console.log('>>> Database connection has been established successfully <<<');
    } catch (error) {
        console.error('>>> Unable to connect to the database <<<', error);
    }
}

export default connection;
