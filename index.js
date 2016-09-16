var express = require('express');
var bodyParser = require('body-parser');
var validator = require('validator');
var app = express();

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

//MONGO URI mongodb://heroku_cg298mb6:33hagtgt4p1bimt1ruiht6vt6j@ds029106.mlab.com:29106/heroku_cg298mb6
var mongoUri = process.env.MONGOLABURI || process.env.MONGOHQ_URL || 'mongodb://heroku_cg298mb6:33hagtgt4p1bimt1ruiht6vt6j@ds029106.mlab.com:29106/heroku_cg298mb6';
var MongoClient = require('mongodb').MongoClient, format = require('util').format;
var db = MongoClient.connect(mongoUri, function(error, databaseConnection) {
    db = databaseConnection;
});

app.post('/add', function(request, response) {
    var book_info = {
        "book_name": request.body.book_name,
        "book_author": request.body.book_author,
        "book_volume": request.body.book_volume,
        "book_edition": request.body.book_edition,
        "book_condition": request.body.book_condition,
        "book_price": request.body.book_price,
        "seller_name": request.body.seller_name,
        "seller_id": request.body.seller_id,
        "class_name": request.body.class_name,
        "class_id": request.body.class_id,
        "class_prof": request.body.class_prof,
        "date": new Date()
    };

    db.collection("books").insert(book_info, function(error, saved) {
            if (error) {
                response.sendStatus(500);
            } else {
                response.sendStatus(200);
            }
    });
});

app.get('/search', function(request, response) {
});

// app.get('/search', function(request, response) {

// })

// views is directory for all template files

// app.get('/', function(request, response) {
//   	response.render('index.html');
// });

app.listen(process.env.PORT || 8000);
console.log("after listen");
