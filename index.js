var express = require('express');
var bodyParser = require('body-parser');
var validator = require('validator');
var app = express();

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

//MONGO URI mongodb://heroku_cg298mb6:33hagtgt4p1bimt1ruiht6vt6j@ds029106.mlab.com:29106/heroku_cg298mb6
var mongoUri = process.env.MONGOLABURI || process.env.MONGOHQ_URL || 'mongodb://heroku_cg298mb6:33hagtgt4p1bimt1ruiht6vt6j@ds029106.mlab.com:29106/heroku_cg298mb6';
var mongodb = require('mongodb');
var MongoClient = mongodb.MongoClient, format = require('util').format;
var db = MongoClient.connect(mongoUri, function(error, databaseConnection) {
    db = databaseConnection;
});

app.use(express.static(__dirname + '/public'));

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

    // All search fields and values
    var search_by = request.query;

    // Array of search fields
    var search_fields = Object.keys(search_by);

    // Loop by search fields, update search values to regex object
    for (var i = 0; i < search_fields.length; i++) {
        var search_value = search_by[search_fields[i]];
        var new_object = { $regex : new RegExp(search_value, 'i')};

        search_by[search_fields[i]] = new_object;
    }

    db.collection("books").find(search_by).toArray(function(error, cursor) {
        if (error) {
            // response.send("Oh no, something went wrong!");
            response.sendStatus(500);
        } else {
            response.send(JSON.stringify(cursor));
        }
    });
});

app.delete('/delete', function(request, response) {
    db.collection('books').remove({"_id": new mongodb.ObjectId(request.body._id)}, function(error, results) {
        response.send("Deleted the book id: " + request.body._id);
    });
});



app.listen(process.env.PORT || 8000);
