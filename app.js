var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var exphbs = require('express-handlebars');
var expressValidator = require('express-validator');
var flash = require('connect-flash');
var session = require('express-session');
var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;
var mongo = require('mongodb');
var mongoose = require('mongoose');
var multer  =   require('multer');

//ffile upload

mongoose.connect('mongodb://localhost/miniproj');
var db = mongoose.connection;

var routes = require('./routes/index');
var users = require('./routes/users');


// Init App
var app = express();

app.use(express.static('public'));
// View Engine
app.set('views', path.join(__dirname, 'views'));
app.engine('handlebars', exphbs({defaultLayout:'layout'}));
app.set('view engine', 'handlebars');


// BodyParser Middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());

//gallery
function showImages(Images) {
        res.writeHead(200, {"Content-Type" : "text/html"});
        for (i = 0; i < Images.length; i++) {
            res.write("<img src='/home/alaakurdi/Desktop/Miniproj/public/uploadss" + images[i] + "' />");
        }
        res.end();
    }

// Set Static Folder
app.use(express.static(path.join(__dirname, 'public')));

app.use(express.static('/public/uploads'));

// Express Session
app.use(session({
    secret: 'secret',
    saveUninitialized: true,
    resave: true
}));

// Passport init
app.use(passport.initialize());
app.use(passport.session());
// Express Validator
app.use(expressValidator({
  errorFormatter: function(param, msg, value) {
      var namespace = param.split('.')
      , root    = namespace.shift()
      , formParam = root;

    while(namespace.length) {
      formParam += '[' + namespace.shift() + ']';
    }
    return {
      param : formParam,
      msg   : msg,
      value : value
    };
  }
}));
app.use(flash());


// Global Vars
app.use(function (req, res, next) {
  res.locals.success_msg = req.flash('success_msg');
  res.locals.error_msg = req.flash('error_msg');
  res.locals.error = req.flash('error');
  res.locals.user = req.user || null;
  next();
});

//
var storage =   multer.diskStorage({
  destination: function (req, file, callback) {
    callback(null, '/home/alaakurdi/Desktop/Miniproj/public/uploads');
  },
  filename: function (req, file, callback) {
    callback(null, file.fieldname + '-' + Date.now());
  }
});

var upload = multer({ storage : storage}).single('userPhoto');



app.post('/api/photo',function(req,res){
    upload(req,res,function(err) {
        if(err) {
            return res.end("Error uploading file.");
        }
        res.end("File is uploaded");
    });
});

var fs = require('fs');
var Images=[];
fs.readdir('/home/alaakurdi/Desktop/Miniproj/public/uploads',function(err,files){
    if(err) throw err;
    files.forEach(function(file){
        // do something with each file HERE!
Images.push(file);
console.log(Images);
    });
 });
 //
 function displayAllImages() {
 // Here has to be some error!!! //
  for (i=0;i<Images.length;i++) {
     document.write("<li><img src='" + Images[i] + "' width='160' height='120'/><span>" + Image[i] + "</span></li>");
 }
 }


//
app.use('/', routes);
app.use('/users', users);
app.set('port', (process.env.PORT || 3000));

app.listen(app.get('port'), function(){
	console.log('Server started on port '+app.get('port'));
});
