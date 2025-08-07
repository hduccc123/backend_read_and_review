import express from 'express';
const dbconnect = require('../configs/databaseConfig.js');

const reigister = (req, res) => {
    res.render('reigister');
}
// Ham dang ki tai khoan moi
const reigisterCreate = async (req, res) => {
    let username = req.body.username;
    let password = req.body.password;
    let email = req.body.email;
    try {
        const [rows] = await dbconnect.query('INSERT INTO users (username, password, email) VALUES (?, ?, ?)', [username, password, email]);
        res.send('User registered successfully: ' + username + ' ' + password + ' ' + email);
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Lỗi server' });
    }
}

export default {
    reigister,
    reigisterCreate
};