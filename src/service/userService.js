import express from 'express';
import bcrypt from 'bcryptjs/dist/bcrypt.js';
import db from '../models/models/index.js';

const getUserList = async (limit, page) => {
    const offset = (page - 1) * limit;

    const userList = await db.User.findAndCountAll({
        limit: limit,
        offset: offset,
        order: [['id', 'ASC']]
    });
    return {
        userList: userList.rows, // ✅ chỉ lấy rows để render
        meta: {
            totalItems: userList.count,
            totalPages: Math.ceil(userList.count / limit),
            currentPage: page
        }
    };
};

const createUser = async (name, email, password, phone, address, role, gender) => {
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
    const user = await db.User.findByPk(id);
    if (!user) {
        throw new Error('User not found');
    }

    console.log('User found:', user);
    return user.get({ plain: true });
};

const updateUser = async (id, name, email, phone, address, role, gender) => {
    const user = await db.User.findByPk(id);
    if (!user) {
        throw new Error('User not found');
    }
    user.name = name;
    user.email = email;
    user.phone = phone;
    user.address = address;
    user.role = role;
    user.gender = gender;
    await user.save();
    return user.get({ plain: true });
};

export {
    getUserList,
    createUser,
    deleteUser,
    getUserById,
    updateUser
};

