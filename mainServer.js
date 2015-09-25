
var express = require('express');
var bodyParser = require('body-parser');

var app = express();
var count = 0;
var counter = 3;
var tasks = [];
var users = [
  {username:'Joseph'},
  {username:'Nathaniel'},
  {username:'Adam'}
];

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(__dirname));

app.get('/tasks/:id', function (req, res) {
    console.log("counter has been requested");
    console.log(tasks);
    res.send(tasks);
});
app.get('/tasks', function (req, res) {
    console.log("this is the get for /tasks");
    console.log(tasks);
    res.send(tasks);
});

app.put('/tasks/:id', function (req, res) {
    console.log("this is a put request");
    var object = req.body;
    var id = req.params.id;
    tasks[id] = object;
    res.send({id: id});
    // console.log(tasks);

});

app.patch('/tasks/:id', function (req,res) {
  console.log("this is a patch request");
  var id = req.params.id;
  res.send({id: id});
  console.log(tasks);
});

app.post('/tasks', function(req,res) {
  var object = req.body;
  tasks[count] = object;
  res.send({id: count});
  count = count + 1;
  console.log('i am changing attributes', tasks);
});

app.post('/users', function(req,res) {
  var object = req.body;
  users[counter] = object;
  res.send({id: counter});
  counter = counter + 1;
  console.log(users);
});

app.get('/users', function(req,res){
  console.log('getting users');
  console.log(users);
  res.send(users);
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
