
var express = require('express');
var bodyParser = require('body-parser');

var app = express();
var count = 0;
var tasks = [];

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(__dirname));

app.get('/tasks/:id', function (req, res) {
    console.log("counter has been requested");
    console.log(tasks);

    res.send("hello");
});
app.get('/tasks', function (req, res) {
    console.log("this is the get for /tasks");
    console.log(tasks);
    res.send(tasks);
});

app.put('/tasks/:id', function (req, res) {
    console.log("this is a put request");
    var id = req.params.id;
    res.send({id: id});
    console.log(tasks);

});
app.post('/tasks', function(req,res) {
  var object = req.body;
  tasks[count] = object;
  res.send({id: count});
  count = count + 1;
  console.log(tasks);
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
