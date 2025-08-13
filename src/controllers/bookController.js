import { getBookList, getCategories, createBook } from '../service/bookService.js';

const index = async (req, res) => {
    try {
        const { books, images, categories } = await getBookList();
        res.render('manageBook', { books, images, categories });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

const create = async (req, res) => {
    try {
        console.log("req", req.body, req.file);
        const newBook = req.body;
        const image = req.file;
        await createBook(newBook, image);
        console.log('Book created successfully:', newBook);
        res.redirect('/manage-book');
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

const getcreate = async (req, res) => {
    const categories = await getCategories();
    try {
        res.render('addBook', { categories });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

export default {
    index,
    create,
    getcreate
};