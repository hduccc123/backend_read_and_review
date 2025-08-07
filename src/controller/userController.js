import express from 'express';
import reigisterService from '../service/userService.js';
import e from 'express';

const handleReigister = (req, res) => {
    let email = req.body.email;
    let username = req.body.username;
    let password = req.body.password;
    let confirmPassword = req.body.confirm - password;
    if (!email || !username || !password) {
        return res.status(400).json({ message: 'Vui lòng điền đầy đủ thông tin' });
    }
    else if (password !== confirmPassword) {
        return res.status(400).json({ message: 'Vui lòng xác nhận đúng mật khẩu' });
    }
    reigisterService.reigisterSevrvice(email, username, password)
    res.status(200).json({ message: 'Đăng ký thành công' });
}

const gotoReigister = (req, res) => {
    return res.render('reigister.ejs');
}

const handleLogin = async (req, res) => {
    let login_username = req.body['login-username'];
    let login_password = req.body['login-password'];
    if (!login_username || !login_password) {
        return res.status(400).json({ message: 'Vui lòng điền đầy đủ thông tin đăng nhập' });
    }
    const result = await reigisterService.loginService(login_username, login_password);
    if (result.success) {
        // Đăng nhập thành công
        return res.status(200).json({ message: 'Đăng nhập thành công', user: result.user });
    } else {
        // Đăng nhập thất bại
        return res.status(401).json({ message: result.message });
    }
}

export default {
    handleReigister,
    gotoReigister,
    handleLogin
};