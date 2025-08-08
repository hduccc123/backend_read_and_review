import express from 'express';
import bcrypt from 'bcryptjs/dist/bcrypt.js';
import db from '../models/models/index.js';

const getUserList = async () => {
    const userList = await db.User.findAll();
    return userList;
};

const createUser = async (userData) => {
    const hashedPassword = await bcrypt.hash(userData.password, 10);
    const newUser = await db.User.create({
        ...userData,
        password_hash: hashedPassword
    });
    return newUser;
};

export {
    getUserList,
    createUser,
};