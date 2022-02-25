const express = require('express');

const multer = require('multer');
const mailClient = require('../sendEmailer');
const {
  User, Product, Order, Role,
} = require('../db/models');
const { checkUser } = require('../middlewares/middleware');

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

// router.get('/details/:id', async (req, res)=> {
//   let product = await Product.findOne({where: {id: req.params.id}});
//   const {title,img,price,discount} = product;
//   console.log(product);
//   if (product?.status === 'placed') {
//     return res.render('product', { title, price, img, discount, finalPrice: Math.floor(product.price * ((100 - product.discount) / 100)) });
//   }
//   res.redirect('/orders');
// });

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
    console.log('tut');
    let product;

    try {
      product = await Product.findOne({
        where: {
          id: Number(req.params.id),
          status: 'placed',
        },
        include: User,
      });
  // console.log(product.createdAt.toString());
    // return res.render('product', { title, price, img, discount, finalPrice: Math.floor(product.price * ((100 - product.discount) / 100)) });
      if (product) {

        // console.log(product);
        const discountedPrice = Math.floor(product.price * ((100 - product.discount) / 100));
        // const timeCreatedAt = product.createdAt;
        // const options = {
        //   month: 'long', day: 'numeric', hour: 'numeric', minute: 'numeric',
        // };
        // const localTimeCreatedAt = timeCreatedAt.toLocaleDateString('ru', options);
        // console.log(req.session.user_id, product?.User.id, req.session.id);
        if (req.session.user_id === product?.User.id) {
          res.render('product', { product, discountedPrice, "isAuthor": true, date: product.createdAt.toString().slice(8, 24) });
        } else {
          res.render('product', { product, discountedPrice, "isAuthor": false, date: product.createdAt.toString().slice(0, 24)});
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
  })
  .delete(checkUser, async (req, res) => {
    // try {
    // console.log(req.params.id)
    try {
    await Product.destroy({ where: { id: req.params.id } });
    } catch (e) {
      
    }
    // } catch (error) {
    //   return res.json({ isDeleteSuccessful: false, errorMessage: 'Не удалось удалить запись из базы данных.' });
    // }
    // return res.json({ isDeleteSuccessful: true });
  })
  .put(async (req,res)=>{
    try{
    const newOrder = await Order.create({product_id: req.params.id, client_id: req.session.user_id, location: req.body.location});
    const product = await Product.findByPk(req.params.id);
    const courierMail = product.client_id;
    try {
    mailClient(courierMail, 'Привет, я хочу купить еду)');
    } catch (e) {
      console.log('Не удалось отправить сообщение');
    }
    res.sendStatus(200);
    }
 catch (e) {
  return res.render('error', {
    message: 'Не удалось получить запись из базы данных.',
    error: {},
  });
 }  
});

module.exports = router;
