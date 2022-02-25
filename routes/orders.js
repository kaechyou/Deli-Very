const express = require('express');
const multer = require('multer');
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
    order: [['createdAt', 'DESC']],
  });
  products = products.map(el => {
    el.finalPrice = Math.floor(el.price * ((100 - el.discount) / 100));
    el.title = el.title.length > 12 ? el.title.slice(0, 12) + '...' : el.title;
    return el;
  });
  res.render('orders', { products });
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
      courier_id: req.session.user_id,
      status: 'placed',
      img: `/uploads/${req.file.originalname}`,
    });
    res.sendStatus(200);
  } catch (error) {
    res.sendStatus(418);
  }
});

router
  .route('/:id')
  .get(async (req, res) => {
    let product;

    try {
      product = await Product.findOne({ where: { id: Number(req.params.id) }, include: User });
      if (product) {
        console.log(product);
        const discountedPrice = (product.price - (product.price / product.discount)).toFixed(2);
        // const timeCreatedAt = product.createdAt;
        // const options = {
        //   month: 'long', day: 'numeric', hour: 'numeric', minute: 'numeric',
        // };
        // const localTimeCreatedAt = timeCreatedAt.toLocaleDateString('ru', options);
        if (req.session.user_id === product?.User.id) {
          res.render('product', { product, discountedPrice, "isAuthor": true });
        } else {
          res.render('product', { product, discountedPrice, "isAuthor": false });
        }
      } else {
        return res.render('error', {
          message: 'Такой записи не существует.',
          error: {},
        });
      }
    } catch (error) {
      return res.render('error', {
        message: 'Не удалось получить запись из базы данных.',
        error: {},
      });
    }
  });

module.exports = router;
