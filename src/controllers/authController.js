import authService from '../service/authService.js';

const show = (req, res) => {
    res.render('login', { layout: false });
}

const login = async (req, res) => {
    const { username, password } = req.body;
    const user = await authService.checkCredentials(username, password);
    if (user) {
        // Authentication successful
        res.render('admin');
    } else {
        // Authentication failed
        res.render('login', { layout: false, error: 'Invalid username or password' });
    }
}

export default {
    show,
    login
};