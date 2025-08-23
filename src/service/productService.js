import db from "../models/models";

const Product = db.Product;

const productService = {
    async createProduct(productData) {
        try {
            const product = await Product.create({ ...productData });
            return product;
        } catch (error) {
            throw error;
        }
    },

    async getAllProducts(limit, page) {
        let offset = (page - 1) * limit;
        try {
            const products = await Product.findAndCountAll({
                limit,
                offset
            });
            return products;
        } catch (error) {
            throw error;
        }
    },

    async getProductById(productId) {
        try {
            const product = await Product.findByPk(productId);
            return product;
        } catch (error) {
            throw error;
        }
    },

    async updateProduct(productId, productData) {
        try {
            const [updated] = await Product.update({ ...productData }, {
                where: { id: productId }
            });
            return updated;
        } catch (error) {
            throw error;
        }
    },

    async deleteProduct(productId) {
        try {
            const deleted = await Product.destroy({
                where: { id: productId }
            });
            return deleted;
        } catch (error) {
            throw error;
        }
    }
};

export default productService;


