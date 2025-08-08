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
}

export {
    getUserList,
    createNewUser
};

