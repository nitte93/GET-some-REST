// Code goes here

var mySearchApp = angular.module("mySearchApp", []);

mySearchApp.factory("bookLists", function(){
  var bookList = [];
  //bookList.push({title:"I'mbook 1", author:"someAuthor", discription:"someDiscription"});
  return bookList;
})
mySearchApp.controller("mySearchController", function(bookLists, $http){
  
        var first = this;
        //bookLists.push({title:"I'mbook 1", author:"someAuthor", discription:"someDiscription"});
        first.currentPage = 0;
        first.pageSize = 1;
        first.inputISBN = "";
        first.book = bookLists;
        first.numberOfPages=function(){
           return Math.ceil(bookLists.length/first.pageSize);                
        }
        first.getData =  function(){
          var request;
          request = $http({
            url: "https://www.googleapis.com/books/v1/volumes",
            method: 'GET',
            params: {q:first.inputISBN}
          }).then(function(response, status, xhrObject){
              //console.log(response.data.items);
               bookLists.splice(0,bookLists.length);
               Array.prototype.push.apply(bookLists, response.data.items);      
          }, function(x,y,z){
            console.log(x,y,z);
          }).finally(function(){
            //console.log(bookLists.length);
            console.log(first.book.length);
            console.log("complete");
          })
          
        }
});

mySearchApp.filter('startFrom', function() {
    return function(input, start) {
        start = +start; 
        return input.slice(start);
    }
});
