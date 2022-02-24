const express = require('express');
const sha256 = require('sha256');
const { User } = require('../db/models');

const router = express.Router();

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
      console.log(req.body);
      console.log(req.params);
      const userFromDB = await User.findOne({ where: { email: req.body.email } });
      if (userFromDB) {
        return res.send('Этот email уже используется, попробуйте другой');
      } else {
        const { name, email, phone, role_id, pass } = req.body;
        if (name && email && phone && role_id && pass) {
          // если все поля формы заполнены - записываем в базу
          const password = sha256(pass);
          const user = await User.create({ name, email, phone, role_id, password });
          req.session.user = user;
          return res.redirect('/');
        } else {
          return res.send('Вы заполнили не все поля. Заполните все поля и попробуйте заново.');
        }
      }
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
    try {
      // проверить, есть ли кто-то в рек сессии
      if(req.session.user_id) {
        res.send('Вы уже вошли в систему');
      } else {
        const { email, pass } = req.body;
        if (email && pass) {
          // если все поля формы заполнены - ошибка
          const password = sha256(pass);
          const user = await User.findOne({ where: { email } });
          if (user) {
            if (user.password === password) {
              req.session.user_id = user.id;
              req.session.user_name = user.name;
              req.session.user_role = user.role_id;
              return res.redirect('/');
            } else {
              return res.send('Неверный пароль. Попробуйте заново.');
            }
          } else {
            return res.send('Пользователя с таким email не существует. Зарегистрируйтесь или введите существующий email.');
          }
        } else {
          return res.send('Вы заполнили не все поля. Заполните все поля и попробуйте заново.');
        }
      }
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
