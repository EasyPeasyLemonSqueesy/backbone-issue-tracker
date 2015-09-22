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
		var dropdown = '<select id = "dropdown></select>';
		var title = '<h1>EZPZLemonSQZ</h1>';
		this.$el.html(title + dropdown + button);

	},
	initialize: function() {
		// this.model.on("change", this.render, this);

	},
	events: {

	},
	login: function() {

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

	//...
}

return GUI;
}());
