import { getBookList, getCategories, createBook, getBookById, updateBook, deleteBook, getImageByBookId } from '../service/bookService.js';

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

const getCreate = async (req, res) => {
    const categories = await getCategories();
    try {
        res.render('addBook', { categories });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}
const edit = async (req, res) => {
    const categories = await getCategories();
    try {
        const bookId = req.params.id;
        const image = await getImageByBookId(bookId);
        const book = await getBookById(bookId);
        if (!book) {
            return res.status(404).json({ error: 'Book not found' });
        }
        console.log('updateBook', { book, categories, image });
        res.render('updateBook', { book, categories, image });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

const destroy = async (req, res) => {
    try {
        const bookId = req.params.id;
        await deleteBook(bookId);
        res.redirect('/manage-book');
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

const update = async (req, res) => {
    try {
        const bookId = req.params.id;
        const updatedBook = req.body;
        const image = req.file;
        await updateBook(bookId, updatedBook, image);
        console.log('Book updated successfully:', updatedBook);
        res.redirect('/manage-book');
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

export default {
    index,
    create,
    getCreate,
    update,
    edit,
    destroy
};