const express = require('express');
const cookieParser = require('cookie-parser');
const session = require('express-session');
const FileStore = require('session-file-store')(session);
const path = require('path');
const logger = require('morgan');
require('dotenv').config();

const PORT = process.env.PORT ?? 3000;
const app = express();

app.set('view engine', 'hbs');

const userRouter = require('./routes/user');
const indexRouter = require('./routes/index');
const ordersRouter = require('./routes/orders');

const { addSessionCookies } = require('./middlewares/middleware');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(express.static(path.join(process.env.PWD, 'public')));

app.use(session({
  secret: process.env.SESSION_SECRET,
  resave: false,
  saveUninitialized: false,
  store: new FileStore(),
  cookie: { secure: false },
  name: 'auth',
}));

// locals
app.use(addSessionCookies);

app.use('/user', userRouter);
app.use('/', indexRouter);
app.use('/orders', ordersRouter);

app.listen(PORT, () => {
  console.log('Port is ok');
});
