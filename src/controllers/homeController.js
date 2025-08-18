import { getBookList } from '../service/bookService.js';

const getHomePage = async (req, res) => {
    let { limit, page } = req.query;
    limit = parseInt(limit) || 10;
    page = parseInt(page) || 1;
    try {
        const { books, meta, images } = await getBookList(limit, page);
        res.render('home', {
            title: 'Home Page', books,
            meta,       // ✅ truyền meta để EJS dùng vẽ nút phân trang
            images
        });
    } catch (error) {
        console.error('Error fetching featured books:', error);
        res.status(500).send('Internal Server Error');
    }
}

export default {
    getHomePage
};

