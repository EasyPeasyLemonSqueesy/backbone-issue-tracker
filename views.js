var GUI = (function(){ //IIFE for all Views

var AddTask = Backbone.View.extend({
  className: 'modal',

  render: function(){
    var $form = $('<form>');
    var $title = $('<input type="text" name="title" class="title">');
    var $description = $('<input type="text" name="description" class="description">');
    //var $creator = $();
    //var $assignee = $();
    //var $status = $();
    var $submit = $('<button class="submit">');
    $form.append([$title, $description, $submit] )
    this.$el.html($form);
  },

  initialize: function(){
    $('#app').addClass('faded');
    $('body').append(this.$el);
  },

  events: {
    'click .submit' : 'addTask'
  },

  addTask : function() {
    var task = {
      title : $(this).closest('.title').html(),
      description : $(this).closest('.description').html(),
      creator : app.currentUser
    }
    app.tasks.add( task );

    $('#app').removeClass('faded');
  }

})

var TaskView = Backbone.View.extend({
  tagName: 'p',
  className: 'task',
  render: function(){
    console.log('RENDER TaskView!!\n===================')
    console.log('the model im rendering is ', this.model.get('title'));
    var description = this.model.get('title') + '<br>description: ' + this.model.get('description') + '<br>creator: ' + this.model.get('creator') + '<br>assigned to: ' + this.model.get('assignee') + '<br>status: ' + this.model.get('status');
    this.$el.html(description);
  },
  initialize: function(){

  },
  events : {
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
	delete: function() {
			$('#app').html('');
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
  
  // tasks is collection of Task models: app.tasks
  //===================================
  console.log( 'the task collection is: ', tasks);

  // el is selector for where GUI connects in DOM: #app
  //===================================
  console.log('GUI thinks el is ', el);
}

return GUI;
}()
);
