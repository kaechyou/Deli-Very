const express = require('express');
const { User, Product, Order } = require('../db/models');

const router = express.Router();

router.get('/courier', async (req, res) => {
  try {
    const products = await Product.findAll({ where: { courier_id: 1 } });
    const options = {
      hour: 'numeric', minute: 'numeric', month: 'long', day: 'numeric',
    };
    products.map((el) => el.date = el.updatedAt.toLocaleDateString('ru', options));
    res.render('courier', { products });
  } catch (e) {
    console.log(e);
    res.sendStatus(500);
  }
});

router.put('/courier', async (req, res) => {
  const product = await Product.findByPk(req.body.id);
  if (product.status === req.body.statusProduct) {
    res.sendStatus(234);
  } else {
    try {
      await Product.update({ status: req.body.statusProduct }, { where: { id: req.body.id } });
      res.sendStatus(200);
    } catch (e) {
      console.log(e);
    }
  }
});

router.delete('/courier', async (req, res) => {
  try {
    const order = await Order.findOne({ where: { product_id: req.body.id } });
    if (order) {
      res.sendStatus(234);
    } else {
      await Product.destroy({ where: { id: Number(req.body.id) } });
      res.sendStatus(200);
    }
  } catch (e) {
    console.error(e);
    res.sendStatus(500);
  }
});

router.get('/client', async (req, res) => {
  try {
    const orders = await Order.findOne({ where: { client_id: req.session.user_id } });
    res.render('client', { orders });
  } catch (e) {
    console.log(e);
    res.sendStatus(500);
  }
});

module.exports = router;
