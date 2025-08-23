import { getBookById } from "../service/bookService.js";

const setBreadcrumbs = async (req, res, next) => {
    res.locals.breadcrumbs = [
        { name: "Trang chủ", url: "/" }
    ];

    try {
        // Nếu URL có /category/:id
        if (req.path.includes("/category/") && req.params.id) {
            const category = await db.Category.findByPk(req.params.id);
            if (category) {
                res.locals.breadcrumbs.push({
                    name: category.name,
                    url: `/category/${category.id}`
                });
            }
        }

        // Nếu URL có /books/:id
        if (req.path.includes("/books/") && req.params.id) {
            const book = await getBookById(req.params.id);
            if (book) {
                if (book.category) {
                    res.locals.breadcrumbs.push({
                        name: book.category.name,
                        url: `/category/${book.category.id}`
                    });
                }
                res.locals.breadcrumbs.push({
                    name: book.name,
                    url: `/books/${book.id}`
                });
            }
        }

        next(); // 🔥 chỉ gọi sau khi dữ liệu đã có
    } catch (err) {
        console.error("Error in breadcrumbs middleware:", err);
        next();
    }
};

export default setBreadcrumbs;
