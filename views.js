var GUI = (function(){ //IIFE for all Views

var TaskView = Backbone.View.extend({
  tagName: 'p',
  className: 'task',
  render: function(){
    console.log('RENDER TaskView!!\n===================');
    console.log('the model im rendering is ', this.model.get('title'));
    var description = this.model.get('title') + '<br>description: ' + this.model.get('description') + '<br>creator: ' + this.model.get('creator') + '<br>assigned to: ' + this.model.get('assignee') + '<br>status: ' + this.model.get('status');
    this.$el.html(description);
  },
  initialize: function(){
    $('#app').append(this.$el);
  }
});

var UnassignedTasksView = Backbone.View.extend({
	render: function () {
			// var usernames = UserModel.model.get("value");
			var btn = '<button id="newTask">New</button>';
			this.$el.html('<h1>Unassigned Tasks</h1>' + btn);
	},
	initialize: function () {
			this.listenTo(app.tasks, 'change', this.render);
			this.render();
	},
	events : {
			'click #newTask' : 'newTask'
	},
	newTask: function () {
		console.log('pushed NewTask button');
	},
});

var UserTasksView = Backbone.View.extend({
	render: function () {
			// var usernames = UserModel.model.get("value");
			var btn = '<button id="removeTask">New</button>';
			this.$el.html('<h1>User Tasks</h1>' + btn);
	},
	initialize: function () {
			this.listenTo(app.tasks, 'change', this.render);
			this.render();
	},
	events : {
			'click #removeTask' : 'removeTask'
	},
	removeTask: function () {
		console.log('pushed removeTask button');
	},

});

var UserView = Backbone.View.extend({
	render: function() {
			var logout = '<button id = "logout">Log-Out</button>';
			var header = '<h1>Welcome, '+app.currentUser+'!</h1>';
			var userTasksViewHeader = '<h1>User Tasks View</h1>';
			var userTasksView = new UserTasksView();
			userTasksView.render();
			var unassignedTasksViewHeader = '<h1>Unassigned Tasks View</h1>';
			var unassignedTasksView = new UnassignedTasksView();
			unassignedTasksView.render();
			var stuff = header + logout;
      this.$el.append(unassignedTasksView.$el);
      this.$el.append(userTasksView.$el);
      this.$el.prepend( stuff );
	},
	events: {
		"click #logout" : "logout"
	},
	logout: function() {
		console.log("logging out");
		// this.$el.empty();
    $('#app').html('');
		app.gui.switchToLogin();
	}
});

var LoginView = Backbone.View.extend({
	render: function() {
		var button = '<button id = "login">Login</button>';
		console.log(app.users.pluck("username"));
		var users = app.users.pluck("username");
		var dropdown = '<select id = "dropdown">'
    users.forEach(function(element){dropdown += "<option>"+element+"</option>";})
		dropdown += ('</select>');
		var title = '<h1>Please Choose A Username</h1>';
		var all =  title + dropdown + button;
		this.$el.html(  all );
	},
	delete: function() {
			this.$el.html('');
	},
	initialize: function() {
		console.log("initializing");
		// this.on("logout", this.delete, this);

	},
	events: {
		"click #logout" : "logout",
		"click #login" : "login"
	},
	login: function() {
		app.currentUser = $('#dropdown').val();
		console.log(app.currentUser);
		console.log("loging in");
    this.remove();
			app.gui.switchToUser();
	},
	logout: function() {
		console.log("logging out");
		this.$el.empty();
		this.remove();
		app.gui.switchToLogin();
	}

});


// generic ctor to represent interface:
function GUI(users,tasks,el) {
	// users is collection of User models
	// tasks is collection of Task models
	// el is selector for where GUI connects in DOM
	this.switchToUser = function (){
		var userView = new UserView();
		userView.render();
		$('#app').append(userView.$el);
	};
	 this.switchToLogin = function() {
		 var login = new LoginView();
		 login.render();
		 $("#app").append(login.$el);
};
	var currentUser = this.currentUser;
this.switchToLogin();

	console.log( 'CONSTRUCTION gui\n===================');

  // users is collection of User models: app.users
  //===================================

  // tasks is collection of Task models: app.tasks
  //===================================
  console.log( 'the task collection is: ', tasks);

  // el is selector for where GUI connects in DOM: #app
  //===================================
  console.log('GUI thinks el is ', el);



  // render each task and append them
  //===================================

  // tasks.each( function(task){
  //
  //   console.log('LOOP tasks.each!!\n=================\n the current task is =>', task);
  //
  //   console.log( 'task.title: "', task.get('title'), '"' );
  //
  //   var issue = new TaskView({ model : task });
  //
  //   console.log('renamed it issue: ', issue)
  //   issue.render();
  //
  // })



}
return GUI;

})();
