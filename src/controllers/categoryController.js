import { getCategories } from "../service/bookService";
import { addCategory, getCategoryById, updateCategory, deleteCategory } from "../service/categoryService";

const index = async (req, res) => {
    const categories = await getCategories();
    res.render('manageCategory', { categories });
}

const create = async (req, res) => {
    const name = req.body;
    await addCategory(name);
    res.redirect('/manage-category');
}

const edit = async (req, res) => {
    const { id } = req.params;
    const category = await getCategoryById(id);
    if (!category) {
        return res.status(404).send('Category not found');
    }
    res.render('updateCategory', { category });
}
const update = async (req, res) => {
    const { id } = req.params;
    const { name } = req.body;
    const updatedCategory = await updateCategory(id, name);
    if (!updatedCategory) {
        return res.status(404).send('Category not found');
    }
    res.redirect('/manage-category');
}

const destroy = async (req, res) => {
    const { id } = req.params;
    await deleteCategory(id);
    res.redirect('/manage-category');
}

export default {
    index,
    create,
    edit,
    update,
    destroy
}