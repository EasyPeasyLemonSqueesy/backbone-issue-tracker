var GUI = (function(){ //IIFE for all Views

var TaskView = Backbone.View.extend({

});

var CreateTaskView = Backbone.View.extend({

});

var UnassignedTasksView = Backbone.View.extend({

});

var UserTasksView = Backbone.View.extend({

});

var UserView = Backbone.View.extend({

});

var LoginView = Backbone.View.extend({
	render: function() {
		var button = '<button id = "login">Login</button>';
		console.log(app.users.pluck("username"));
		var users = app.users.pluck("username");
		var dropdown = '<select id = "dropdown">'
		users.forEach(function(element){dropdown += "<option>"+element+"</option>"; console.log(dropdown)})
		dropdown += ('</select>');
		// console.log(dropdown)
		var title = '<h1>Please Choose A Username</h1>';
		var all =  title + dropdown + button;
		this.$el.html(  all );

	},
	rerender: function() {
		console.log("re-rendering");
		var header = '<h1>Welcome User</h1>';
		this.$el.html ( header );
		// this.rerender();
	},
	initialize: function() {
		// this.model.on("change", this.render, this);

	},
	events: {
		"click button" : "login"
	},
	login: function() {
		console.log("loging in");
			this.undelegateEvents();
	    this.$el.removeData().unbind();
			this.remove();
			Backbone.View.prototype.remove.call(this);
			this.rerender();
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
