const express = require('express');

const multer = require('multer');
const mailClient = require('../sendEmailer');
const {
  User, Product, Order, Role,
} = require('../db/models');

const { courierRouter } = require('../middlewares/middleware');

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
  let products = await Product.findAll({
    where: {
      status: 'placed',
    },
  });
  products = products.map((el) => {
    el.finalPrice = Math.floor(el.price * ((100 - el.discount) / 100));
    el.title = el.title.length > 12 ? `${el.title.slice(0, 12)}...` : el.title;
    return el;
  });
  res.render('orders', { products });
});

router.get('/details/:id', async (req, res) => {
  const product = await Product.findOne({ where: { id: req.params.id } });
  const {
    title, img, price, discount,
  } = product;
  console.log(product);
  if (product?.status === 'placed') {
    return res.render('product', {
      title,
      price,
      img,
      discount,
      finalPrice: Math.floor(product.price * ((100 - product.discount) / 100)),
    });
  }
  res.redirect('/orders');
});

router.get('/new', courierRouter, (req, res) => {
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
