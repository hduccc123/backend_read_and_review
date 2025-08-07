import express from 'express';


const home = (req, res) => {
    res.render('home'); // Render the home view
}

export default {
    home
};
