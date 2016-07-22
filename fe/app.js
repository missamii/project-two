window.onload = function() {
  console.log('js loaded');

//get elements
var div = document.querySelector('#content');
var search = document.querySelector('#titlesearch');
var button = document.querySelector('#searchBtn');

//submit button gets it started
searchBtn.addEventListener('click', function(ev) {
  ev.preventDefault();
  console.log(search.value);
});

var drop = document.querySelector('#dropbox');
console.log(drop);
var searchValue = search.value;
var chosenEndPoint = drop.value;
console.log(chosenEndPoint);
var queryStr = '';
if (chosenEndPoint === 'booktitle') {
  queryStr = '?name=';
} else if (chosenEndPoint === 'author') {
  queryStr = '?title=';
}
queryStr += searchValue;
console.log(queryStr);
var endPoint = 'https://www.googleapis.com/books/v1/volumes?q=search+terms' + chosenEndPoint;
var googleApiKey = '&apikey=' + GOOGLE_BOOKS_API_KEY;
var url = endPoint + queryStr + googleApiKey;
console.log(url);

  //ajax stuff
    $.ajax({
      url: url,
      dataType: 'json'
    }).done(function(response){
      console.log("response: ", response);
    }

)};
