const express = require("express");
const {
    getProducts,
    getProductsById,
    createProducts,
    updateProducts,
    deleteProducts
} = require('../controllers/Product.js');
const { verifyUser } = require("../middleware/AuthUser.js");

const router1 = express.Router();

router1.get('/product', verifyUser, getProducts);
router1.get('/product/:id', verifyUser, getProductsById);
router1.post('/product', verifyUser, createProducts);
router1.patch('/product/:id', verifyUser, updateProducts);
router1.delete('/product/:id', verifyUser, deleteProducts)

module.exports = router1;