import express from 'express';
import { getUserList, createNewUser } from '../service/userService';

const login = (req, res) => {
    res.render('login'); // Render the login view
}

const gotoManageUser = async (req, res) => {
    try {
        const userList = await getUserList();
        res.render('manageUser', { userList });
    } catch (err) {
        console.error('Error fetching user list:', err);
        res.status(500).send('Internal Server Error');
    }
}

const createUser = async (req, res) => {
    const name = req.body.name;
    const email = req.body.email;
    const password = req.body.password;
    const phone = req.body.phone;
    const address = req.body.address;
    const role = req.body.role;
    const gender = req.body.gender;
    try {
        await createNewUser(name, email, password, phone, address, role, gender);
        res.render('manageUser', { message: 'User created successfully', userList: await getUserList() });
    } catch (err) {
        console.error('Error creating user:', err);
        res.status(500).send('Internal Server Error');
    }
};

export default {
    login,
    gotoManageUser,
    createUser
};
