import express from 'express';
import db from '../models/models/index.js';
import upload from '../config/multer.js';
import { raw } from 'body-parser';

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

const getCategories = async () => {
    try {
        const categories = await db.Category.findAll({ raw: true });
        return categories;
    } catch (error) {
        throw error;
    }
};

const createBook = async (newBook, image) => {
    try {
        const createdBook = await db.Book.create(newBook);
        if (image) {
            await db.Image.create({
                url: 'images/' + image.filename,
                book_id: createdBook.id,
                is_cover: true
            });
        }
        return createdBook;
    } catch (error) {
        throw error;
    }
};

const getBookById = async (id) => {
    try {
        const book = await db.Book.findByPk(id, {
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
        console.log('Book found:', book);
        return book;
    } catch (error) {
        throw error;
    }
};

const updateBook = async (id, updatedData, image) => {
    try {
        const existingImage = await db.Image.findOne({ where: { book_id: id } });
        const book = await db.Book.findByPk(id, {
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
        if (!book) {
            throw new Error('Book not found');
        }
        const newBook = await book.update(updatedData);
        await existingImage.update({
            url: 'images/' + image.filename,
            book_id: newBook.id,
            is_cover: true
        });
        return newBook;
    } catch (error) {
        throw error;
    }
};

const deleteBook = async (id) => {
    try {
        const image = await db.Image.findOne({ where: { book_id: id } });
        const book = await db.Book.findByPk(id);
        if (!book) {
            throw new Error('Book not found');
        }
        await book.destroy();
        await image.destroy();
        return book;
    } catch (error) {
        throw error;
    }
};

const getImageByBookId = async (bookId) => {
    try {
        const image = await db.Image.findOne({ where: { book_id: bookId } });
        return image;
    } catch (error) {
        throw error;
    }
};

export {
    getBookList,
    createBook,
    getCategories,
    getImageByBookId,
    getBookById,
    updateBook,
    deleteBook
};