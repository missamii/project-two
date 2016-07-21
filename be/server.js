var express = require('express');
var cors = require('cors');
var bodyParser = require('body-parser');
var mongodb = require('mongodb');
var app = express();

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// connect to the database server
var MongoClient = mongodb.MongoClient;
var url = 'mongodb://localhost:27017/books';
mongodb.MongoClient.connect(process.env.MONGODB_URI || url, function (err, database) {
  if (err) {
    console.log(err);
    process.exit(1);
  }
}
