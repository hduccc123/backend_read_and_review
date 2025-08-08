import express from 'express';
import { getUserList } from '../service/userService';

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



export default {
    login,
    gotoManageUser
};
