import { getBookList, getBookById, getImageByBookId, getBookListByCategories } from '../service/bookService.js';
import productService from '../service/productService.js';
const getHomePage = async (req, res) => {
    let { limit, page } = req.query;
    limit = parseInt(limit) || 10;
    page = parseInt(page) || 1;
    try {
        const { books, meta, images } = await getBookList(limit, page);
        const { rows: products } = await productService.getAllProducts(limit, page);
        console.log('Book 1:', books[0]);
        console.log('Book 9:', books[8]);
        res.render('home', {
            title: 'Home Page', books,
            featuredBooks: books.slice(0, 8),   // 8 sp nổi bật
            otherBooks: books.slice(8, 16),
            remainingBooks: books.slice(16),
            meta,
            products,
            featuredProducts: products.slice(0, 8), // 8 sp nổi bật       // ✅ truyền meta để EJS dùng vẽ nút phân trang
            images
        });
    } catch (error) {
        console.error('Error fetching featured books:', error);
        res.status(500).send('Internal Server Error');
    }
}
const getDetailPage = async (req, res) => {
    const bookId = req.params.id;
    try {
        const book = await getBookById(bookId);
        const images = await getImageByBookId(bookId);
        res.locals.breadcrumbs = [
            { name: "Trang chủ", url: "/" },
            { name: book.category ? book.category.name : 'Chưa có', url: `/category/${book.category ? book.category.id : ''}` },
            { name: book.name }
        ];
        res.render('description', {
            title: 'Book Details',
            book,
            images
        });
    } catch (error) {
        console.error('Error fetching book details:', error);
        res.status(500).send('Internal Server Error');
    }
}
const getProducts = async (req, res) => {
    let { limit, page } = req.query;
    limit = parseInt(limit) || 10;
    page = parseInt(page) || 1;
    try {
        const { products, meta } = await productService.getProductList(limit, page);
        res.render('home', {
            title: 'Homepage',
            products,
            featuredProducts: products.slice(0, 8), // 8 sp nổi bật
            meta
        });
    } catch (error) {
        console.error('Error fetching products:', error);
        res.status(500).send('Internal Server Error');
    }
}

const getCategoryPage = async (req, res) => {
    let { limit, page } = req.query;
    limit = parseInt(limit) || 10;
    page = parseInt(page) || 1;
    const categoryId = parseInt(req.params.id);

    console.log('Category ID:', categoryId);

    try {
        // Kiểm tra categoryId hợp lệ
        if (isNaN(categoryId) || categoryId <= 0) {
            console.log('Invalid categoryId:', categoryId);
            return res.status(404).render('categoryPage', {
                title: 'Category Page',
                books: [],
                meta: { total: 0, page, limit },
                categoryName: 'Danh mục không tồn tại',
                categoryId
            });
        }

        const { books, meta, categoryName, images } = await getBookListByCategories([categoryId], limit, page);
        console.log('Books in category:', books);
        res.render('categoryPage', {
            title: 'Category Page',
            books,
            meta,
            images,
            categoryName,
            categoryId
        });
    } catch (error) {
        console.error('Error fetching category products:', error);
        res.status(500).render('categoryPage', {
            title: 'Category Page',
            books: [],
            meta: { total: 0, page, limit },
            categoryName: 'Lỗi khi tải danh mục',
            categoryId
        });
    }
}

export default {
    getHomePage,
    getDetailPage,
    getCategoryPage,
    getProducts
};

