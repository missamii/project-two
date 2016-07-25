var PORT = 3000;
var express = require('express');
var cors = require('cors');
var bodyParser = require('body-parser');
var mongodb = require('mongodb');
var app = express();
var request = require('request');

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// connect to the database server
var MongoClient = mongodb.MongoClient;
var url = 'mongodb://localhost:27017/books_db';
mongodb.MongoClient.connect(process.env.GOOGLE_BOOKS_API_KEY || url, function (err, database) {
  if (err) {
    console.log(err);
    process.exit(1);
  }
});

app.get("/", function(req, res){
  res.json({"description":"HI TIFFANY"});
});//end get

app.get("/books/search", function(req, res){
  res.json({"description":"taco"});
});//end get

app.post("/books/favorites", function(req, res){
  res.send("queryId" + req.query.id);
  console.log('queryId' + JSON.stringify(req.query));
});

app.post("/books", function(req, res){

// stuff will go here

var searchValue = req.body.searchValue;
var chosenEndPoint = req.body.chosenEndPoint;

request({
  url: "https://www.googleapis.com/books/v1/volumes?q=search+terms" + searchValue,
  method: "get",
  callback: function(error, response, body){
res.send(body);
        }
    });
});//end post

app.listen(PORT, function(){
  console.log('listening on 3000...');
});
