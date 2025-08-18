import { getCategories } from "./bookService";

const getCustomersLayout = async (req, res, next) => {
    const categories = await getCategories();
    res.locals.categories = categories;
    try {
        // load categories cho sidebar
        const categories = await getCategories();
        res.locals.categories = categories;

        // gán layout đang dùng
        res.locals.layout = 'customerLayout';  // sẽ dùng views/customerLayout.ejs

        return next();
    } catch (err) {
        console.error("Error in customer layout middleware:", err);
        return res.status(500).render('500', { title: 'Server Error' });
    }
}
export default getCustomersLayout;