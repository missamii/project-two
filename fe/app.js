window.onload = function() {
  console.log('js loaded');




  //ajax stuff
    $.ajax({
      url: url,
      dataType: 'json'
    }).done(function(response){
      console.log("response: ", response);  
};
