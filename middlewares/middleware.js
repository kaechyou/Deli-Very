const addSessionCookies = function(req, res, next) {
  res.locals.name = req.session?.name;
  res.locals.email = req.session?.email;
  res.locals.id = req.session?.id;
  res.locals.phone = req.session?.phone;
  res.locals.role_id = req.session?.role_id;
  next();
}

const checkUser = (req, res, next) => {
  try {
    if (req.session.name) { // проверяем, есть ли в сессии name, если есть - next();
      next();
    } else {
      // если в сессии нет name, тогда рендерим страницу ошибки
      return res.render('error', {
        message: 'Что-то пошло не так. Либо такой записи не существует, либо у вас не хватает прав для данной операции. Войдите или зарегистрируйтесь.',
        error: {}
      }); 
    }
  } catch (error) {
    return res.render('error', {
      message: error,
      error: {}
    });
  }
};

module.exports = {
  addSessionCookies,
  checkUser,
}
