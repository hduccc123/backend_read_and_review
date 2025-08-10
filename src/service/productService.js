// service/productService.js
import db from '../models/models/index.js';

// Lấy tất cả sản phẩm
const getAllProducts = async () => {
    const products = await db.Book.findAll({ include: ["images"] });
    const categories = await db.Category.findAll();
    const publishers = await db.Publisher.findAll();
    const authors = await db.Author.findAll();
    return { products, categories, publishers, authors };
};

// Lấy sản phẩm theo ID
const getProductById = async (id) => {
    const product = await db.Book.findByPk(id, { include: ["images"] });
    return product;
};

// Tạo sản phẩm mới
const createProduct = async (productData) => {
    const newProduct = await db.Book.create(productData);
    return newProduct;
};

// Cập nhật sản phẩm
const updateProduct = async (id, productData) => {
    const [updated] = await db.Book.update(productData, { where: { id } });
    if (!updated) throw new Error('Product not found');
    return db.Book.findByPk(id, { include: ["images"] });
};

// Xoá sản phẩm
const deleteProduct = async (id) => {
    const deleted = await db.Book.destroy({ where: { id } });
    if (!deleted) throw new Error('Product not found');
};

export {
    getAllProducts,
    getProductById,
    createProduct,
    updateProduct,
    deleteProduct
};
