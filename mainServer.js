
var express = require('express');
var bodyParser = require('body-parser');
//Nate's
var db = require('orchestrate')('e12dde45-d9d1-40dc-b7cc-185b1b716f7f');

// //Mine
// var db = require('orchestrate')('ccbb65c6-d9ab-4d26-9691-c38d21fe2fc6');


var app = express();
// var count = 0;
// var counter = 3;

// var tasks = [];


app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(__dirname));

// app.get('/tasks/:id', function (req, res) {
//     console.log("counter has been requested");
//     console.log(tasks);
//     res.send(tasks);
// });



//------------------*Done*----------------------
app.get('/tasks', function (req, res) {
    console.log("this is the first thing");

    db.list('tasks')
    .then(function (result){
      var tasks = [];
      var resultBody = result.body.results;
      resultBody.map(function(element, index, array) {
        tasks.push(element.value);
      });
      res.send(tasks);
    });
});


//------------------*Done*----------------------
app.put('/tasks/:id', function (req, res) {
  console.log("this is a put request");
  var object = req.body;
  object.id = Date();
  console.log(object);
  db.post('tasks', object)
  .then(function (result) {
    res.send(object);
  })
  .fail(function (err) {
    console.log(err);
  });
});


app.patch('/tasks/:id', function (req,res) {
  console.log("this is a patch request");
  var id = req.params.id;
  res.send({id: id});
  console.log(tasks);
});



app.post('/tasks', function(req,res) {
  var object = req.body;
  var length = tasks.length;
  tasks[length] = object;
  res.send({id: length});
  // count = count + 1;
  console.log('i am changing attributes', tasks);
});


app.post('/users', function(req,res) {
  var newArr = [];
  //
  // var object = req.body;
  // length = users.length;
  // users[length] = object;
  // res.send({id: length});
  console.log("this is app.post/users", users);

  db.post('users', {
    'username': req.body.username,
  })
  .then(function (result) {
    db.list('users')
    .then(function (result) {
      result.body.results.forEach(function(element, index, array){
      newArr.push(element.value);
    }).fail(function(error){console.log(error);});
    });

  });
  console.log('This is users', users);
  console.log('This is newArr', newArr);
});

app.get('/users', function(req,res){
  console.log('getting users');
  var arr = [];
  db.list('users').then(function(result){
    console.log("list is running:");
    var resultBody = result.body.results;
    resultBody.map(function(element, index, array){
    console.log(element.value);
    arr.push(element.value);
    });
    console.log("This is arr:", arr);
    res.send(arr);
  });
});
// app.put('/tasks', function (req, res) {
//
// });
//
// app.put('/counter/1', function (req, res) {
//     console.log(req.body);
//     counter1 = req.body.value;
//     res.send({id: '1'});
// });
//
// app.get('/counter/2', function (req, res) {
//     console.log("counter has been requested");
//     res.send("hello");
// });
//
// app.put('/counter/2', function (req, res) {
//     console.log(req.body);
//     counter1 = req.body.value;
//     res.send({id: '2'});
// });
app.listen(3000, function () {

    console.log("server started");
});
