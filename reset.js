(function(){

var db = require('orchestrate')('e12dde45-d9d1-40dc-b7cc-185b1b716f7f');



console.log("I'm reseting");

db.deleteCollection('users');
db.deleteCollection('task');

db.post('task', {
  "title" : "1st task",
  "description" : "Dummy data task",
  "creator" : "Nathaniel",
  "id" : "Mon Sep 28 2015 20:01:04 GMT-0700 (Pacific Daylight Time)",
  "assignee" : "",
  "status" : "unassigned"
});

db.post('users', {
  "username" : "Dummy User"
});


})();
