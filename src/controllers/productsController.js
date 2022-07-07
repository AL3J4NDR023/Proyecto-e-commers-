// ************ Require's ************
const fs = require('fs');
const path = require('path');

const productsFilePath = path.join(__dirname, '../data/product.json');
const products = JSON.parse(fs.readFileSync(productsFilePath, 'utf-8'));

const toThousand = n => n.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");

const controller = {
    crete: (req, res) => {
        res.render('create')
    },

    store: (req, res) => {
        let image = req.file ? req.file.filename : 'default-imge.png';

        let newProduct = {
            id: products[products.length - 1].id + 1,
            ...req.body,
            image: image
        };

        products.push(newProduct);
        fs.writeFileSync(productsFilePath, JSON.stringify(products, null, ' '));
        res.redirect('/');
    }
}

module.exports = controller;
