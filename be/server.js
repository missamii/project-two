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

//get books
app.get("/books", function(req, res){
  MongoClient.connect(mongoUrl, function (err, db) {
    var favbooksCollection = db.collection('books');
    if (err) {
      // console.log('Unable to connect to the mongoDB server. ERROR:', err);
    } else {
      //get all
      favbooksCollection.find().toArray(function (err, result) {
     if (err) {
       console.log("ERROR!", err);
       response.json("error");
     } else if (result.length) {
       console.log('Found:', result);
       response.json(result);
     } else { //
       console.log('No document(s) found with defined "find" criteria');
       response.json("no favorite books found");
     }
     db.close(function() {
       console.log( "database CLOSED");
     });
   }); // end find


  // res.json({"description":"HI TIFFANY"});
// });//end get

app.get("/books/search", function(req, res){
  res.json({"description":"taco"});
});//end get


// add to favorites
app.post("/books/favorites", function(req, res){

  // response.json({"description":"add new"});
console.log("request.body", request.body);

MongoClient.connect(mongoUrl, function (err, db) {
  var boooksCollection = db.collection('books');
  if (err) {
    console.log('Unable to connect to the mongoDB server. ERROR:', err);
  } else {
    // We are connected!
    console.log('Connection established to', mongoUrl);
    console.log('Adding new user...');

  // res.send("queryId" + req.query.id);
  // console.log('queryId' + JSON.stringify(req.query));

  } // end else
}); // end mongo connect
}); // end add new


/* delete */
app.delete('/books/:title', function(request, response) {
  // response.json({"description":"delete by name"});

  console.log("request.body:", request.body);
  console.log("request.params:", request.params);

  MongoClient.connect(mongoUrl, function (err, db) {
    var favbooksCollection = db.collection('books');
    if (err) {
      console.log('Unable to connect to the mongoDB server. ERROR:', err);
    } else {
      // We are connected!
      console.log('Deleting by title... ');

      /* Delete */
      favbooksCollection.remove(request.params, function(err, numOfRemovedDocs) {
        console.log("numOfRemovedDocs:", numOfRemovedDocs);
        if(err) {
          console.log("error!", err);
        } else { // after deletion, retrieve list of all
          favbooksCollection.find().toArray(function (err, result) {
            if (err) {
              console.log("ERROR!", err);
              response.json("error");
            } else if (result.length) {
              console.log('Found:', result);
              response.json(result);
            } else { //
              console.log('No document(s) found with defined "find" criteria');
              response.json("none found");
            }
            db.close(function() {
              console.log( "database CLOSED");
            });
          }); // end find

        } // end else
      }); // end remove

    } // end else
  }); // end mongo connect

}); // end delete


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
