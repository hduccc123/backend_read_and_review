import { getBookList } from '../service/bookService.js';

const index = async (req, res) => {
    try {
        const { books, images, categories } = await getBookList();
        res.render('manageBook', { books, images, categories });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

export default {
    index
};