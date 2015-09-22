var GUI = (function(){ //IIFE for all Views

var TaskView = Backbone.View.extend({

});

var CreateTaskView = Backbone.View.extend({

});

var UnassignedTasksView = Backbone.View.extend({
	render: function() {
		var header = '<h1>Unassigned Tasks View</h1>';
		this.$el.html ( header );
	}
});

var UserTasksView = Backbone.View.extend({
	render: function() {
		var header = '<h1>User Tasks View</h1>';
		this.$el.html ( header );
	}
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
	// users is collection of User models
	// tasks is collection of Task models
	// el is selector for where GUI connects in DOM
	var login = new LoginView();
	login.render();
	$("#app").append(login.$el);
	// login.rerender();

	//...
}

return GUI;
}());
