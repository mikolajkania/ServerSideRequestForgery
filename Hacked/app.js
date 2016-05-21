var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var http = require('http');
var request = require('request');
var fs = require('fs');

var routes = require('./routes/index');
var users = require('./routes/users');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
//app.set('view engine', 'jade');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', routes);
app.use('/users', users);

// catch 404 and forward to error handler
/*app.use(function(req, res, next) {  //todo why it always ends here?
 var err = new Error('Not Found');
 err.status = 404;
 next(err);
 });*/

// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
    app.use(function (err, req, res, next) {
        res.status(err.status || 500);
        res.render('error', {
            message: err.message,
            error: err
        });
    });
}

// production error handler
// no stacktraces leaked to user
app.use(function (err, req, res, next) {
    res.status(err.status || 500);
    /*res.render('error', {
     message: err.message,
     error: {}
     });*/
});

// Add headers
app.use(function (req, res, next) {

    // Website you wish to allow to connect
    res.setHeader('Access-Control-Allow-Origin', 'http://127.0.0.1:2000');

    // Request methods you wish to allow
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');

    // Request headers you wish to allow
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');

    // Set to true if you need the website to include cookies in the requests sent
    // to the API (e.g. in case you use sessions)
    res.setHeader('Access-Control-Allow-Credentials', true);

    // Pass to next layer of middleware
    next();
});

app.post('/', function (req, res) {
    res.send('Got a POST request');
});

app.get('/genQuot/:author', function (req, res) {
    //send
    res.send('The wise are wise only because they love.');

});

app.get('/getImage', function (req, res) {
    var url = req.param('url');
    var author = req.param('author');

    var download = function (uri, filename, callback) {
        request.head(uri, function (err, res, body) {
            console.log('content-type:', res.headers['content-type']);
            console.log('content-length:', res.headers['content-length']);

            request(uri).pipe(fs.createWriteStream(filename)).on('close', callback);
        });
    };

    download(url, 'public/images/' + author + '.jpg', function () {
        console.log('done');
        res.send('http://127.0.0.1:2000/images/' + author +'.jpg');
    });

});


module.exports = app;
