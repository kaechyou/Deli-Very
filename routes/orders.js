const express = require('express');
const {
  User, Product, Order, Role,
} = require('../db/models');

const router = express.Router();

router.get('/', async (req, res) => {
  const products = await Product.findAll();
  res.render('orders', { products });
});

module.exports = router;
