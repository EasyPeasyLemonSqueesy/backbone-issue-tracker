var GUI = (function(){ //IIFE for all Views

var TaskView = Backbone.View.extend({
  tagName: 'p',
  className: 'task',
  render: function(){
    var description = this.model.get('title') + '<br>description: ' + this.model.get('description') + '<br>creator: ' + this.model.get('creator') + '<br>assigned to: ' + this.model.get('assignee') + '<br>status: ' + this.model.get('status');
    this.$el.html(description);
  },
  initialize: function(options){
    console.log("my parent is: ", options.parent);
    var parent = options.parent[0];
    console.log('parent', parent);
    $(parent).html(this.$el);
  }
});

var UnassignedTasksView = Backbone.View.extend({
	tagName: 'div',
	className: 'appendThisThingPlease',
	initialize: function () {
		console.log("ran UnassignedTasksView");
		var btn = '<button id="newTask">New</button>';

		this.$el.html('<h1>Unassigned Tasks</h1>' + btn);
		this.listenTo(app.tasks, 'change', this.render);

},
render: function () {
		// var usernames = UserModel.model.get("value");
		var btn = '<button id="newTask">New</button>';
    var contain = this.$el;
    app.tasks.each( function(task){
			this.viewB = new TaskView({ model : task, parent: contain });
			this.viewB.render();
      console.log( "the rendered objects fruit is: ", viewB.fruit);
			// this.viewB.parentView = this;
      contain += '<br>' + this.viewB;
			$('.appendThisThingPlease').append(this.viewB);
		});
    $('.appendThisThingPlease').append(contain);

    console.log(this.el, this.$el);

		this.$el.html('<h1>Unassigned Tasks</h1>' + btn);
},

	events : {
			'click #newTask' : 'newTask'
	},
	newTask: function () {
		console.log(app.tasks);
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

  var login = new LoginView();
  login.render();
  $(el).append(login.$el);
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



}

return GUI;
}()
);
