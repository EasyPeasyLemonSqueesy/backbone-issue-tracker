var GUI = (function(){ //IIFE for all Views

var TaskView = Backbone.View.extend({
  render: function(){
    console.log('RENDER TaskView!!\n===================')
    console.log('the model im rendering is ', this.model.get('title'));
    var description = '<p>'+ this.model.get('title') + '<br>description: ' + this.model.get('description') + '<br>creator: ' + this.model.get('creator') + '<br>assigned to: ' + this.model.get('assignee') + '<br>status: ' + this.model.get('status') + '</p>';
  },
  initialize: function(){
    $('#app').append(this)
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

});

var LoginView = Backbone.View.extend({
	render: function() {
		// this.remove();
		var button = '<button id = "login">Login</button>';
		console.log(app.users.pluck("username"));
		var users = app.users.pluck("username");
		// var logout = '<button id = "logout">Log-Out</button>';
		var dropdown = '<select id = "dropdown">'
		users.forEach(function(element){dropdown += "<option>"+element+"</option>";})
		dropdown += ('</select>');

		var title = '<h1>Please Choose A Username</h1>';
		var all =  title + dropdown + button;
		this.$el.html(  all );
	},
	rerender: function() {
		console.log("re-rendering");

		this.$el.empty();
		// this.$el.append( this.subView.render().el );

		var logout = '<button id = "logout">Log-Out</button>';

		var header = '<h1>Welcome, '+this.currentUser+'!</h1>';
		var stuff =  this.$el.html ( header + logout);
		$('#app').append(stuff);
		var unassigned = new UnassignedTasksView();
		var usertasks = new UserTasksView();
		unassigned.render();
		usertasks.render();
		$('#app').append(unassigned.$el);
		$('#app').append(usertasks.$el);
		// this.subView.delegateEvents();


	},
	delete: function() {
			this.remove();
	},
	initialize: function() {
		console.log("initializing");
		this.on("logout", this.delete, this);

	},
	events: {
		"click #logout" : "logout",
		"click #login" : "login"
	},
	login: function() {
		this.currentUser = $('#dropdown').val();
		// console.log(this.currentUser);
		console.log("loging in");
			// this.undelegateEvents();
	    // this.$el.removeData().unbind();
			// Backbone.View.prototype.remove.call(this);
			this.rerender();
	},
	logout: function() {
		console.log("logging out");
		// unassigned.remove();
		// usertasks.remove();
		this.delete();
		this.render();
	}

});


// generic ctor to represent interface:
function GUI(users,tasks,el) {
	console.log( 'CONSTRUCTION gui\n===================')

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

  tasks.each( function(task){

    console.log('LOOP tasks.each!!\n=================\n the current task is =>', task);

    console.log( 'task.title: "', task.get('title'), '"' );

    var issue = new TaskView({ model : task });

    console.log('renamed it issue: ', issue)
    issue.render();

    var login = new LoginView();
    login.render();
    $("#app").append(login.$el);
  })
}

return GUI;
}()
);
