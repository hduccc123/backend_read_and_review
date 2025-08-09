import express from 'express';
import bcrypt from 'bcryptjs/dist/bcrypt.js';
import db from '../models/models/index.js';

const getUserList = async () => {
    const userList = await db.User.findAll();
    return userList;
};

const createNewUser = async (name, email, password, phone, address, role, gender) => {
    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = await db.User.create({
        name: name,
        password_hash: hashedPassword,
        address: address,
        email: email,
        phone: phone,
        gender: gender,
        role: role
    });
    return newUser;
};

const deleteUser = async (id) => {
    const user = await db.User.findByPk(id);
    if (!user) {
        throw new Error('User not found');
    }
    await user.destroy();
};

const getUserById = async (id) => {
    const userId = await db.User.findByPk(id);
    if (!userId) {
        throw new Error('User not found');
    }
    return userId;
};

export {
    getUserList,
    createNewUser,
    deleteUser,
    getUserById
};

