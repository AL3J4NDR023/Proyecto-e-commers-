// ************ Require's ************
const createError = require('http-errors');
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');

// ************ express() ************
const app = express();

// ************ Middlewares ************
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, './public')));

// ************ Template Engine ************
app.set('views', path.join(__dirname, 'src/views')); // Define la ubicación de la carpeta de las Vistas
app.set('view engine', 'ejs');

// ************ Route System require and use() ************
const mainrouter = require('./src/routes/mainrouter');
//const productsRouter = require('./src/routes/Products')
const usersRouter = require('./src/routes/users');

app.use('/', mainrouter);
//app.use('/products', productsRouter);
app.use('/users', usersRouter);

// ************ catch 404 and forward to error handler ************
app.use((req, res, next) => next(createError(404)));

// ************ error handler ************
app.use((err, req, res, next) => {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.path = req.path;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

// ************ exports app ************
module.exports = app;
