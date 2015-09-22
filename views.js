var GUI = (function(){ //IIFE for all Views

var TaskView = Backbone.View.extend({

});

var CreateTaskView = Backbone.View.extend({

});

var UnassignedTasksView = Backbone.View.extend({
	render: function() {
		var header = '<h1>Unassigned Tasks View</h1>';
		this.$el.html ( header );
	},
	delete: function() {
			this.remove();
		},
		logout: function() {
			console.log("logging out");
			// unassigned.remove();
			// usertasks.remove();
			// this.delete(this.$el);
			console.log();
			this.render();
		}
});

var UserTasksView = Backbone.View.extend({
	render: function() {
		var header = '<h1>User Tasks View</h1>';
		this.$el.html ( header );
	},
	delete: function() {
			this.remove();
		},
		logout: function() {
			console.log("logging out");
			// unassigned.remove();
			// usertasks.remove();
			// this.delete(this.$el);
			console.log();
			this.render();
		}
});

var UserView = Backbone.View.extend({
	render: function() {
			this.remove();
			var logout = '<button id = "logout">Log-Out</button>';
			var header = '<h1>Welcome, '+app.currentUser+'!</h1>';
			var userTasksViewHeader = '<h1>User Tasks View</h1>';
			var new1 = new UserTasksView();
			var userTasksView = new1.render();
			var unassignedTasksViewHeader = '<h1>Unassigned Tasks View</h1>';
			var new2 = new UnassignedTasksView();
			var unassignedTasksView = new2.render();
			var stuff = header + logout + userTasksViewHeader + userTasksView + unassignedTasksViewHeader + unassignedTasksView;
			this.$el.html ( stuff );
	},
	events: {
		"click #logout" : "logout"
	},
	logout: function() {
		console.log("logging out");
		this.$el.empty();
		this.remove();
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
			this.remove();
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
}
return GUI;
})();
