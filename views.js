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
  });
var TaskView = Backbone.View.extend({
  tagName: 'p',
  className: 'task',

  render: function(){

    var description = this.model.get('title') + '<br>description: ' + this.model.get('description') + '<br>creator: ' + this.model.get('creator') + '<br>assigned to: ' + this.model.get('assignee') + '<br>status: ' + this.model.get('status') + '<br>';

    this.$el.html(description);
  },

  initialize: function(options){
    this.index = options.index;
    this.render();
  }
});

var UnassignedTasksView = Backbone.View.extend({
	tagName: 'div',
	className: 'appendThisThingPlease',
	initialize: function () {
    this.listenTo(app.tasks, 'change', this.render);
},

  render: function () {
		var btn = '<button id="newTask">New</button>';
		this.$el.html('<h1>Unassigned Tasks</h1>'+ btn);

    for(var i = 0; i < app.tasks.length; i++){
      if(app.tasks.at(i).get('status') == 'unassigned'){
      var viewB = new TaskView({index: i, model: app.tasks.at(i)});
      this.$el.append(viewB.$el);
    }
  }
},

	events : {
			'click #newTask' : 'newTask'
	},

});


  var UserTasksView = Backbone.View.extend({
  	render: function () {
			// var usernames = UserModel.model.get("value");
			var btn = '<button id="removeTask">New</button>';
			this.$el.html('<h1>User Tasks</h1>' + btn);

      for(var i = 0; i < app.tasks.length; i++){
        if(app.tasks.at(i).get('assignee') == app.currentUser){
          var viewB = new TaskView({index: i, model: app.tasks.at(i)});
          this.$el.append(viewB.$el);
        }
    }

  	},
  	initialize: function () {
			this.listenTo(app.tasks, 'change', this.render);
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
		var users = app.users.pluck("username");
		var dropdown = '<select id = "dropdown">';
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
