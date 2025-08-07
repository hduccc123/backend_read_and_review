import express from 'express';
import bcrypt from 'bcryptjs/dist/bcrypt.js';

const dbconnect = require('../configs/databaseConfig.js');

const salt = bcrypt.genSaltSync(10);

const hashedPassword = (password) => {
    let hashedPassword = bcrypt.hashSync(password, salt);
    return hashedPassword;
}

const reigisterSevrvice = async (email, username, password) => {
    let hashedPass = hashedPassword(password);
    try {
        const [rows] = await dbconnect.query('INSERT INTO users (username, password, email) VALUES (?, ?, ?)', [username, hashedPass, email]);
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Lỗi server' });
    }
}

const loginService = async (login_username, login_password) => {
    try {
        const [rows] = await dbconnect.query('SELECT * FROM users WHERE username = ?', [login_username]);
        if (rows.length > 0) {
            const user = rows[0];
            const isMatch = bcrypt.compareSync(login_password, user.password);
            if (isMatch) {
                return { success: true, user };
            } else {
                return { success: false, message: 'Mật khẩu không đúng' };
            }
        } else {
            return { success: false, message: 'Người dùng không tồn tại' };
        }
    } catch (err) {
        console.error(err);
        throw new Error('Lỗi truy vấn cơ sở dữ liệu');
    }
}

export default {
    reigisterSevrvice,
    loginService
}