// controllers/productController.js
import {
    getAllProducts,
    getProductById,
    createProduct,
    updateProduct,
    deleteProduct
} from '../service/productService.js';

// Trang quản lý sản phẩm
const index = async (req, res) => {
    try {
        const { products, categories, publishers, authors } = await getAllProducts();
        res.render('manageProduct', { products, categories, publishers, authors });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal server error' });
    }
};

// Trang sửa sản phẩm
const edit = async (req, res) => {
    const { id } = req.params;
    try {
        const product = await getProductById(id);
        if (!product) {
            return res.status(404).send('Product not found');
        }
        res.render('editProduct', { product }); // render view edit
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal server error' });
    }
};

// API tạo sản phẩm
const create = async (req, res) => {
    console.log("req.body:", req.body);
    const { title, description, price, stock, category_id, author_id, publisher_id } = req.body;
    try {
        const productData = { title, description, price, stock, category_id, author_id, publisher_id };
        await createProduct(productData);
        res.redirect('/manage-product');
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal server error' });
    }
};

// API cập nhật sản phẩm
const update = async (req, res) => {
    const { id } = req.params;
    try {
        const productData = req.body;
        await updateProduct(id, productData);
        res.redirect('/manage-product');
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal server error' });
    }
};

// API xoá sản phẩm
const destroy = async (req, res) => {
    const { id } = req.params;
    try {
        await deleteProduct(id);
        res.redirect('/manage-product');
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal server error' });
    }
};

export default {
    index,
    edit,
    create,
    update,
    destroy
};
