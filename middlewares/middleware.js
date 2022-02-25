const addSessionCookies = function (req, res, next) {
  res.locals.name = req.session?.name;
  res.locals.email = req.session?.email;
  res.locals.user_id = req.session?.user_id;
  res.locals.phone = req.session?.phone;
  res.locals.role_id = req.session?.role_id;
  console.log(res.session?.id);
  next();
};

const checkUser = (req, res, next) => {
  try {
    if (req.session.name) { // проверяем, есть ли в сессии name, если есть - next();
      next();
    } else {
      // если в сессии нет name, тогда рендерим страницу ошибки
      return res.render('error', {
        message: 'Что-то пошло не так. Либо такой записи не существует, либо у вас не хватает прав для данной операции. Войдите или зарегистрируйтесь.',
        error: {},
      });
    }
  } catch (error) {
    return res.render('error', {
      message: error,
      error: {},
    });
  }
};

const courierRouter = (req, res, next) => {
  if (req.session.user_id) {
    if (req.session.role_id === 1) {
      next();
    } else {
      res.render(('error', {
        message: 'Что-то пошло не так. Либо такой записи не существует, либо у вас не хватает прав для данной операции. Войдите или зарегистрируйтесь.',
        error: {},
      }));
    }
  } else {
    res.render(('error', {
      message: 'Что-то пошло не так. Либо такой записи не существует, либо у вас не хватает прав для данной операции. Войдите или зарегистрируйтесь.',
      error: {},
    }));
  }
};

const clientRouter = (req, res, next) => {
  if (req.session.user_id) {
    if (req.session.role_id === 2) {
      next();
    } else {
      res.sendStatus(404);
    }
  } else {
    res.sendStatus(404);
  }
};

module.exports = {
  addSessionCookies,
  checkUser,
  courierRouter,
  clientRouter,
};
