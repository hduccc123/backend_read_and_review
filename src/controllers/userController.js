import express from 'express';
import { getUserList, createUser, deleteUser, getUserById, updateUser } from '../service/userService';

const index = async (req, res) => {
    let { limit, page } = req.query;
    limit = parseInt(limit) || 10;
    page = parseInt(page) || 1;
    try {
        const { userList, meta } = await getUserList(limit, page);
        res.render('manageUser', { userList, meta });
    } catch (err) {
        console.error('Error fetching user list:', err);
        res.status(500).send('Internal Server Error');
    }
}

const create = async (req, res) => {
    const name = req.body.name;
    const email = req.body.email;
    const password = req.body.password;
    const phone = req.body.phone;
    const address = req.body.address;
    const role = req.body.role;
    const gender = req.body.gender;
    try {
        await createUser(name, email, password, phone, address, role, gender);
        res.render('manageUser', { message: 'User created successfully', userList: await getUserList() });
    } catch (err) {
        console.error('Error creating user:', err);
        res.status(500).send('Internal Server Error');
    }
};

const destroy = async (req, res) => {
    const userId = req.params.id;
    try {
        await deleteUser(userId);
        res.render('manageUser', { message: 'User deleted successfully', userList: await getUserList() });
    } catch (err) {
        console.error('Error deleting user:', err);
        res.status(500).send('Internal Server Error');
    }
};

const edit = async (req, res) => {
    const userId = req.params.id;
    try {
        const user = await getUserById(userId);
        res.render('updateUser', { user });
    } catch (err) {
        console.error('Error fetching user:', err);
        res.status(500).send('Internal Server Error');
    }
};
const update = async (req, res) => {
    const id = req.params.id;
    const name = req.body.name;
    const email = req.body.email;
    const phone = req.body.phone;
    const address = req.body.address;
    const role = req.body.role;
    const gender = req.body.gender;
    try {
        await updateUser(id, name, email, phone, address, role, gender);
        res.render('manageUser', { message: 'User updated successfully', userList: await getUserList() });
    } catch (err) {
        console.error('Error updating user:', err);
        res.status(500).send('Internal Server Error');
    }
};

export default {
    index,
    create,
    destroy,
    edit,
    update
};

