const getCustomersLayout = (req, res, next) => {
    if (req.locals.layout == 'customerLayout') {
        return next();
    }
    res.redirect('/404');
}
export default getCustomersLayout;