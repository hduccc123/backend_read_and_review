import express from 'express';
import db from '../models/models/index.js';
import upload from '../config/multer.js';

const getBookList = async () => {
    try {
        const books = await db.Book.findAll({
            include: [
                {
                    model: db.Image,
                    as: 'images',
                    attributes: ['id', 'url', 'is_cover']
                },
                {
                    model: db.Category,
                    as: 'category',
                    attributes: ['id', 'name']
                }
            ]
        });
        const images = await db.Image.findAll({ raw: true });
        const categories = await db.Category.findAll({ raw: true });
        console.log({ books, images, categories });
        return { books, images, categories };
    } catch (error) {
        throw error;
    }
};


export {
    getBookList
};