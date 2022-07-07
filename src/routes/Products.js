// ************ Require's ************
const express = require('express');
const router = express.Router();
const multer = require('multer');

// ************ Controller Require ************
const productsController = require('../controllers/productsController');

let storage = multer.diskStorage({
    destination:(req, File, cb) => cb(null, '/public/img/products'),
    filename: (req, file, cb) => (null, Date.now() + '-' + file.originalname)
});

var upload = multer({storage});

/*** GET ALL PRODUCTS ***/ 
router.get('/', productsController.home)

/*** CREATE ONE PRODUCT ***/ 
router.get('/create/', productsController.create); 
router.post('/', upload.single('image'), productsController.store); 

module.exports = router;
