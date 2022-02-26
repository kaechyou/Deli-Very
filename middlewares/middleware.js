const addSessionCookies = function (req, res, next) {
  res.locals.name = req.session?.name;
  res.locals.email = req.session?.email;
  res.locals.user_id = req.session?.user_id;
  res.locals.phone = req.session?.phone;
  res.locals.role_id = req.session?.role_id;
  // console.log(typeof res.locals.role_id, 'role id');
  // console.log(req.session.role_id === 1);
  if (Number(req.session.role_id) === 1 && req.session) {
    console.log('TUT');
    res.locals.courier = true;
    // console.log(req.locals.courier, 'cour');
  } else if (Number(req.session.role_id) === 2 && req.session) {
    res.locals.client = true;
    // console.log(res.locals.client, 'client');
  }
  // console.log(res.session?.id);
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
  try {
  if (req.session.user_id) {
    if (Number(req.session.role_id) === 1) {
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
} catch (e) {
  console.log(e);
  res.redirect('/');
}
};

const clientRouter = (req, res, next) => {
  try {
  if (req.session.user_id) {
    if (Number(req.session.role_id) === 2) {
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
} catch (e) {
  res.redirect('/');
}
};

module.exports = {
  addSessionCookies,
  checkUser,
  courierRouter,
  clientRouter,
};
