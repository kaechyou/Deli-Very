const express = require('express');
const multer = require('multer');
const {
  User, Product, Order, Role,
} = require('../db/models');

const router = express.Router();

const storage = multer.diskStorage({
  destination(req, file, cb) {
    cb(null, './public/uploads');
  },
  filename(req, file, cb) {
    cb(null, file.originalname);
  },
});

const upload = multer({ storage });

router.get('/', async (req, res) => {
  const products = await Product.findAll({
    where: {
      status: 'placed',
    },
  });
  res.render('orders', { products });
});

router.get('/new', (req, res) => {
  res.render('newOrder');
});

router.post('/new', upload.single('image'), async (req, res) => {
  try {
    const {
      title, price, discount, location,
    } = req.body;
    const currOrder = Product.create({
      title,
      price,
      discount,
      location,
      courier_id: 1,
      status: 'placed',
      img: `/uploads/${req.file.originalname}`,
    });
    res.sendStatus(200);
  } catch (error) {
    res.sendStatus(418);
  }
});

module.exports = router;
