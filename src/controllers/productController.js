import productService from "../service/productService";

const index = async (req, res) => {
    let { limit, page } = req.query;
    limit = parseInt(limit) || 10;
    page = parseInt(page) || 1;
    try {
        const products = await productService.getAllProducts(limit, page);
        res.render("manageProduct", { products: products.rows, total: products.count, page, limit });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};
const create = async (req, res) => {
    try {
        const imagePath = req.file ? `/images/${req.file.filename}` : null;

        if (!imagePath) {
            return res.status(400).json({ error: "Image is required" });
        }

        const product = await productService.createProduct({
            name: req.body.name,
            description: req.body.description,
            price: req.body.price,
            stock: req.body.stock,
            image: imagePath
        });

        res.redirect("/manage-product") // Quay lại danh sách sau khi thêm
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

const edit = async (req, res) => {
    try {
        const product = await productService.getProductById(req.params.id);
        if (product) {
            res.render("editProduct", { product });
        } else {
            res.status(404).json({ error: "Product not found" });
        }
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};
const update = async (req, res) => {
    try {
        const { id } = req.params;
        const oldProduct = await productService.getProductById(id);

        if (!oldProduct) {
            return res.status(404).json({ error: "Product not found" });
        }

        let imagePath = oldProduct.image; // Giữ ảnh cũ
        if (req.file) {
            imagePath = `/images/${req.file.filename}`; // Nếu upload ảnh mới
        }

        await productService.updateProduct(id, {
            name: req.body.name,
            description: req.body.description,
            price: req.body.price,
            stock: req.body.stock,
            image: imagePath
        });

        res.redirect("/manage-product") // Quay lại danh sách sản phẩm
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};


const destroy = async (req, res) => {
    try {
        await productService.deleteProduct(req.params.id);
        res.redirect("/manage-product"); // Quay lại danh sách sau khi xóa
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}
export default {
    index,
    create,
    edit,
    update,
    destroy
};