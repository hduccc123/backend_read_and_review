import db from '../models/models/index.js';

const checkCredentials = async (username, password) => {
    // Implement your authentication logic here
    const name = username.trim();
    const password_hash = password.trim();
    const user = await db.User.findOne({ where: { name, password_hash } });
    if (user !== undefined) {
        return user;
    }
    return null;
};

export default {
    checkCredentials
};
