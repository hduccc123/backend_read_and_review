import express from 'express';
import db from '../models/models/index.js';
import upload from '../config/multer.js';
import { raw } from 'body-parser';

const getBookList = async (limit, page) => {
    const offset = (page - 1) * limit;

    try {
        const books = await db.Book.findAndCountAll({
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
            ],
            offset,
            limit,
            order: [['id', 'ASC']]
        });
        const images = await db.Image.findAll({ raw: true });
        const categories = await db.Category.findAll({ raw: true });
        return {
            books: books.rows, // ✅ chỉ lấy rows để render
            meta: {
                totalItems: books.count,
                totalPages: Math.ceil(books.count / limit),
                currentPage: page
            },
            images,
            categories
        };
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
        let finalUrl = null;
        if (image) {
            // image có thể là "filename.jpg" hoặc "images/filename.jpg"
            if (typeof image === 'string') {
                finalUrl = image.startsWith('images/') ? image : `images/${image}`;
            } else if (image.filename) {
                finalUrl = `images/${image.filename}`;
            }
        } else {
            // Không có ảnh mới & không gửi oldImage -> giữ nguyên
            finalUrl = existingImage ? existingImage.url : null;
        }

        // Chỉ update ảnh nếu có URL hợp lệ và khác giá trị cũ
        if (finalUrl) {
            if (existingImage) {
                if (existingImage.url !== finalUrl) {
                    await existingImage.update({ url: finalUrl });
                }
            } else {
                await db.Image.create({ url: finalUrl, book_id: id, is_cover: true });
            }
        }

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