import express from 'express';
import expressLayouts from 'express-ejs-layouts';

const viewEngine = (app) => {
    app.set('view engine', 'ejs');
    app.set('views', './src/views');
    app.use(expressLayouts);
    app.use(express.static('./src/public'));
}

export default viewEngine;