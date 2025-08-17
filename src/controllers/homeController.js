const getHomePage = (req, res) => {
    res.render('home', { title: 'Home Page' });
}

export default {
    getHomePage
};