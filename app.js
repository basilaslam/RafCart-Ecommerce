const createError = require('http-errors');
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const hbs = require('express-handlebars');
const session = require('express-session')
const db= require('./config/connection');

const dotenv = require("dotenv")
dotenv.config();

const userRouter = require('./routes/user');
const adminRouter = require('./routes/admin');


const app = express();

app.use((req, res, next) => {
  res.set('Cache-Control', 'no-store')
  next()
})
// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs');
app.engine('hbs', hbs.engine({extname : 'hbs',defaultLayout : 'layout',layoutsDir:__dirname+'/views/layout/',partialsDir : __dirname+'/views/partials/',
helpers : {
  isActiveOrNotActive : (activity,options)=>{
    if(activity==="active"){
      return options.fn(this)
    }else{
      return options.inverse(this)
    }
  }
 }
}));



app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname,'public')));


db.database();

app.use(session({
  secret: 'secret',
  cookie : {
    maxAge : 1000*10*6*10
  },
  saveUninitialized: true,
  resave : true,
}))



app.use('/admin', adminRouter);
app.use('/', userRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  // res.locals.message = err.message;
  // res.locals.error = req.app.get('env') === 'development' ? err : {};

  // // render the error page
  // res.status(err.status || 500);
  // // console.log(err);
  
  // if(req.session.user){
  //   res.render('user/404');
  // }else if(req.session.admin){
  //   res.render('admin/page-404',{noHeader:true,noFooter:true});
  // }else{
  //   res.render('user/404');
  // }
  if (req.accepts('html')) {
    if(req.session.admin){
      res.render('admin/page-404',{error:true,url : req.url,noHeader :true,noFooter : true})

    }else{
    res.render('user/404',{error:true,url : req.url})

    }
    
  }
 
  // res.render('user/404',{error:true})
});

module.exports = app;
