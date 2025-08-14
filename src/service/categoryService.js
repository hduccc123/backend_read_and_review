import express from 'express';
import { getCategories } from './bookService';
import db from '../models/models/index.js';

const addCategory = async (categoryData) => {

    const data = await db.Category.create(categoryData);
    return data;
}

const getCategoryById = async (id) => {
    const category = await db.Category.findByPk(id);
    return category;
}

const deleteCategory = async (id) => {
    await db.Category.destroy({ where: { id } });
}

const updateCategory = async (id, categoryData) => {
    const updatedCategory = await db.Category.update(categoryData, { where: { id }, returning: true });
    return updatedCategory;
}


export {
    addCategory,
    getCategoryById,
    updateCategory,
    deleteCategory
}