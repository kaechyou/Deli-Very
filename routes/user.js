const express = require('express');
const sha256 = require('sha256');
const { User, Product, Order } = require('../db/models');

const { courierRouter, clientRouter } = require('../middlewares/middleware');
const mailClient = require('../sendEmailer');

const router = express.Router();
const multer = require('multer');

router.get('/courier', courierRouter, async (req, res) => {
  try {
    const products = await Product.findAll({ where: { courier_id: req.session.user_id } });
    const options = {
      hour: 'numeric', minute: 'numeric', month: 'long', day: 'numeric',
    };
    products.map((el) => el.date = el.updatedAt.toLocaleDateString('ru', options));
    res.render('courier', { products });
  } catch (e) {
    console.log(e);
    // console.log('HERE!!!')
    res.sendStatus(500);
  }
});

router.put('/courier', courierRouter, async (req, res) => {
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

router.delete('/courier', courierRouter, async (req, res) => {
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

router.get('/client', clientRouter, async (req, res) => {
  try {
    const orders = await Order.findAll({
      where: {
        client_id: req.session.user_id,
      },
      include: Product,
    });
    const options = {
      hour: 'numeric', minute: 'numeric', month: 'long', day: 'numeric',
    };
    orders.map((el) => el.date = el.updatedAt.toLocaleDateString('ru', options));
    res.render('clientProfile', { orders });
  } catch (e) {
    console.log(e);
    res.sendStatus(500);
  }
});

router.delete('/client', clientRouter, async (req, res) => {
  try {
    const order = await Order.findOne({ where: { id: req.body.id } });
    if (order) {
      if (order.status === 'complete') {
        return res.sendStatus(234);
      }
      const client = await User.findOne({ where: { id: order.client_id } });
      const courierMail = client.email;
      await Order.destroy({ where: { id: req.body.id } });

      try {
        await mailClient(courierMail, 'Привет, я передумал покупать еду)');
      } catch (e) {
        console.log('Не удалось отправить сообщение');
      }
      res.sendStatus(200);
    } else {
      res.sendStatus(404);
    }
  } catch (e) {
    console.error(e);
    res.sendStatus(500);
  }
});

// Регистрация: user/signup
router
  .route('/signup')
  .get((req, res) => {
    try {
      return res.render('signup');
    } catch (error) {
      return res.send(error);
    }
  })
  .post(async (req, res) => {
    try {
      const userFromDB = await User.findOne({ where: { email: req.body.email } });
      if (userFromDB) {
        return res.json({ message: 'email занят' });
      }
      const {
        name, email, phone, role_id, pass,
      } = req.body;
      if (name && email && phone && role_id && pass) {
        // если все поля формы заполнены - записываем в базу
        const password = sha256(pass);
        const user = await User.create({
          name, email, phone, role_id, password,
        });
        req.session.name = name;
        req.session.email = email;
        req.session.user_id = user.id;
        req.session.phone = phone;
        req.session.role_id = role_id;
        return res.json({ message: 'Ok' });
      }
      return res.json({ message: 'не все поля' });
    } catch (error) {
      return res.send(error);
    }
  });

// Вход: user/signin

router
  .route('/signin')
  .get((req, res) => {
    try {
      return res.render('signin');
    } catch (error) {
      return res.send(error);
    }
  })
  .post(async (req, res) => {
    console.log('==================>', req.session.userId);

    try {
      // проверить, есть ли кто-то в рек сессии
      if (req.session.user_id) {
        return res.json({ message: 'Вы уже вошли в систему' });
      }
      const { email, pass } = req.body;
      if (email && pass) {
        // если все поля формы заполнены - ошибка
        const password = sha256(pass);
        const user = await User.findOne({ where: { email } });
        if (user) {
          if (user.password === password) {
            req.session.name = user.name;
            req.session.email = email;
            req.session.user_id = user.id;
            req.session.phone = user.phone;
            req.session.role_id = user.role_id;
            return res.json({ message: 'Ok' });
          }
          return res.json({ message: 'Неверный пароль' });
        }
        return res.json({ message: 'Неверный email' });
      }
      return res.json({ message: 'Не все поля' });
    } catch (error) {
      return res.redirect('/user/signup');
    }
  });

// Выход и удаление сессии: user/logout
router
  .route('/logout')
  .get((req, res) => {
    try {
      req.session.destroy();
      res.clearCookie('auth');
      return res.redirect('/');
    } catch (error) {
      return res.send(error);
    }
  });

module.exports = router;
