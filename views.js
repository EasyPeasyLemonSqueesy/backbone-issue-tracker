var GUI = (function(){ //IIFE for all Views

//=============================================
//              TABLE OF CONTENTS
//  -----------------------------------------
//  1. AddTaskView
//  2. TaskView
//  3. UnassignedTasksView
//  4. UserTasksView
//  5. AssignedTasksView
//  6. CompletedTasksView
//  7. UserView
//  8. LoginView
//  9. GUI
//
//=============================================



//=============================================
// 1. AddTaskView :
//      Modal view for adding a task to the model
//    Called by :
//      UnassignedTaskView
//=============================================

  var AddTaskView = Backbone.View.extend({
    className: 'modal',

    render: function(){
      var $form = $('<form>');
      var $title = $('<input type="text" name="title" id="title" placeholder="task title">');
      var $description = $('<input type="text" name="description" id="description" placeholder="task description">');
      var $submit = $('<button id="submit">Submit</button>');
      $form.append([$title, $description, $submit] );
      this.$el.html($form);
    },

    initialize: function(){
      $('#app').addClass('faded');
      this.render();
      $('#app').append(this.$el);
    },

    events: {
      'click #submit' : 'addTask'
    },

    addTask : function(event) {
      event.preventDefault();
      var task = {
        title : this.$el.find('#title').val(),
        description : this.$el.find('#description').val(),
        creator : app.currentUser,
        // id : app.tasks.length
      };
      // app.tasks.fetch({wait:true});
      app.tasks.create( task );
      app.tasks.fetch({wait:true});
      // id = app.tasks.length;
      console.log('task length is now ',app.tasks.length);
      this.remove();
      $('#app').removeClass('faded');
    },
  });



//=============================================
// 2. TaskView :
//      View for an individual task
//    Called by :
//      UnassignedTaskView
//      UserTaskView
//=============================================
//Not working version with CSS:
  var TaskView = Backbone.View.extend({
    tagName: 'p',
    className: 'task',

    render: function(){
      var $unclaim  = $('<button class="btn-unclaim">').html('unclaim');
      var $claim    = $('<button class="btn-claim">').html('claim');
      // var $assign   = $('<select class="btn-assign" onchange="this.form.submit()">').html('Assign To User');

      var users = app.users.pluck("username");
      var dropdown = '<form><label for = "Assign To">Assign To</label><select class = "assignTo" name = "Assign">';
      users.forEach(function(element){dropdown += "<option>"+element+"</option>";});
      dropdown += '</form>';
      var $complete = $('<button class="btn-complete">').html('complete');

      var task = '<br>title: ' + this.model.get('title') + '<br>description: ' + this.model.get('description') + '<br>creator: ' + this.model.get('creator') + '<br>assigned to: ' + this.model.get('assignee') + '<br>status: ' + this.model.get('status') + '<br><br>';

      this.$el.html(task);
      if(this.model.get('assignee') === app.currentUser || this.model.get('assignee') === "" && this.model.get('status') !== 'completed'){this.$el.append([$unclaim, $claim, dropdown, $complete]);}
    },

    initialize: function(){
      this.render();
    },

    events: {
      'click .btn-unclaim'  : 'unclaim',
      'click .btn-claim'    : 'claim',
      'click .btn-assign'   : 'assign',
      'click .btn-complete' : 'complete',
      'change .assignTo' : 'assignTo'
    },

    unclaim : function() {
      this.model.save({ 'assignee' : '' });
      this.model.save({ 'status' : 'unassigned' });
    },

    claim : function() {
      this.model.save({ 'assignee' : app.currentUser });
      this.model.save({ 'status' : 'assigned' });
    },
    assignTo : function(event) {
      var username = event.target.value;
      this.model.save({ 'assignee' : username });
      this.model.save({ 'status' : 'assigned'});
    },

    complete : function (){
      this.model.save({ 'assignee' : '' });
      this.model.save({ 'status' : 'completed' });
    }
});

//=============================================
// 3. UnassignedTasksView:
//      View for all unassigned
//    Called by :
//      UserView
//=============================================

  //working version:
  var UnassignedTasksView = Backbone.View.extend({
    	tagName: 'div',
    	className: 'UnassignedTasksView column',

    	initialize: function () {
        this.listenTo( app.tasks, 'change', this.render);
        this.listenTo( app.tasks, 'update', this.render);
        app.tasks.fetch();
      },

      render: function () {
    		var btn = '<button id="newTask">Create A New Task</button>';
        var header = '<h1>Unassigned</h1>';
    		this.$el.append().html(header); // TODO: If not .html it adds header multiple times on button click (aka THIS IS CRAYZBALLS)
        // this.$el.append(btn);

        for(var i = 0; i < app.tasks.length; i++){

          var status = app.tasks.at(i).get('status');
          var assignee = app.tasks.at(i).get('assignee');

          if((status === 'unassigned' || status === '') && assignee === ''){
            var viewB = new TaskView({model: app.tasks.at(i)});
            this.$el.append(viewB.$el);
          }
        }
      }
    });


//=============================================
// 4. UserTasksView :
//    View for tasks filtered by active user
//    Called by :
//      UserView
//=============================================

  var UserTasksView = Backbone.View.extend({
    tagName: 'div',
  	className: 'UserTasksView column',

  	render: function () {
			// var usernames = UserModel.model.get("value");
			this.$el.html('<h1>My Tasks</h1>');

      for(var i = 0; i < app.tasks.length; i++){
        if(app.tasks.at(i).get('assignee') == app.currentUser){
          var viewB = new TaskView({model: app.tasks.at(i)});
          this.$el.append(viewB.$el);
        }
    }

  	},
  	initialize: function () {
      this.listenTo(app.tasks, 'change', this.render);
      this.listenTo(app.tasks, 'update', this.render);
      app.tasks.fetch();
  	},
  	events : {
  	},
  });


//=============================================
// 5. AssignedTasksView :
//    View for tasks filtered by active user
//    Called by :
//      UserView
//=============================================

  var AssignedTasksView = Backbone.View.extend({
    tagName: 'div',
    className: 'AssignedTasksView column',

    render: function () {
      // var usernames = UserModel.model.get("value");
      this.$el.html('<h1>Assigned Tasks</h1>');

      for(var i = 0; i < app.tasks.length; i++){
        if(app.tasks.at(i).get('assignee') && app.tasks.at(i).get('assignee') !== app.currentUser){
          var viewB = new TaskView({model: app.tasks.at(i)});
          this.$el.append(viewB.$el);
        }
    }

    },
    initialize: function () {
      this.listenTo(app.tasks, 'change', this.render);
      this.listenTo(app.tasks, 'update', this.render);
      app.tasks.fetch();
    },
    events : {
    },
  });


//
// =============================================
// 6. CompletedTasksView :
//    View for tasks filtered by active user
//    Called by :
//      UserView
// =============================================

  var CompletedTasksView = Backbone.View.extend({
    tagName: 'div',
    className: 'CompletedTasksView column',

    render: function () {
      // var usernames = UserModel.model.get("value");
      this.$el.html('<h1>Completed</h1>');

      for(var i = 0; i < app.tasks.length; i++){
        if(app.tasks.at(i).get('status') === 'completed' ){
          var viewB = new TaskView({model: app.tasks.at(i)});
          this.$el.append(viewB.$el);
        }
      }
    },

    initialize: function () {
      this.listenTo(app.tasks, 'change', this.render);
      this.listenTo(app.tasks, 'update', this.render);
      app.tasks.fetch();

    },

    events : {
    }

  });


//=============================================
// 7. UserView:
//      View for whole page after logging in
//    Called by :
//      LoginView
//=============================================

  var UserView = Backbone.View.extend({
    id : 'UserView',
    initialize: function () {
      this.listenTo(app.tasks, 'sync', this.hi);
      // app.tasks.on('sync', this.hi);
      app.tasks.fetch();
      },
  	render: function() {
			var $header   = $('<div id="greeting">');
      var greeting = '<h1>Welcome, '+ app.currentUser + '!</h1>';
      var logout   = '<button id = "logout">Log-Out</button>';
      var btn = '<button id="newTask">Create A New Task</button>';

      $header.append([greeting, logout]);
			var $row     = $('<div id="row">');

			var userTasksView = new UserTasksView();
			userTasksView.render();

			var unassignedTasksView = new UnassignedTasksView();
			unassignedTasksView.render();

      var assignedTasksView = new AssignedTasksView();
      assignedTasksView.render();

      var completedTasksView = new CompletedTasksView();
      completedTasksView.render();

      $row.append(unassignedTasksView.$el);
      $row.append(userTasksView.$el);
      $row.append(assignedTasksView.$el);
      $row.append(completedTasksView.$el);

      this.$el.prepend( $header );
      this.$el.append($row);
      this.$el.prepend( btn );
      $('#app').append(this.$el); // TODO: check if this works or not?
	  },
    hi: function() {
      // console.log("you have successfully listened to a sync event");
    },
    events: {
      'click #newTask' : 'newTask',
      'click #logout'  : "logout"
    },
    display: function() {
      console.log("you are clicking logout");
       app.router.navigate('loggedout', true);
       this.remove();
    },
    newTask: function () {
      var addTask = new AddTaskView();
      addTask.render();
      this.$el.append(addTask.$el);
    },

  	logout: function() {
  		// this.$el.empty();
      $('#app').html('');
  		app.gui.switchToLogin();
  	}
});



//=============================================
// 8. LoginView :
//      View for initial login page
//    Called by :
//      GUI
//=============================================

var LoginView = Backbone.View.extend({
  id : 'LoginView',
	render: function() {
		var button = '<button id = "login">Login</button>';
    // app.users.fetch();
		var users = app.users.pluck("username");
    // console.log('client sees these users',app.users);
		var dropdown = '<select id = "dropdown">';
    users.forEach(function(element){dropdown += "<option>"+element+"</option>";});
		dropdown += ('</select>');
		var title = '<h1>Please Choose A Username</h1>';
    var title1 = '<br><br><h3>Not A User? Sign Up:</h3>';
    var form = '<form id = "form"><input id = "input" placeholder="Add a user"></input><button type = "submit" id = "submit">Submit</button></form>';
		var all =  title + dropdown + button + title1 + form;
		this.$el.html(  all );
	},
	delete: function() {
			this.$el.html('');
	},
	initialize: function() {
		this.listenTo(app.users, "update", this.render);
    // this.listenTo(app.users, 'change', this.render);
    app.users.fetch();
    app.tasks.fetch();
    // app.users.invoke('save');
    this.render();
	},
  display : function() {
    console.log("you are clicking login");
     app.router.navigate('loggedin', true);
     this.remove();
  },
	events: {
		"click #logout" : "logout",
		"click #login" : "login",
    'click #submit' : "newUser",
    // 'click #login' : 'display'
	},
	login: function() {
		app.currentUser = $('#dropdown').val();
    this.remove();
			app.gui.switchToUser();
	},
	logout: function() {
		this.$el.empty();
		this.remove();
		app.gui.switchToLogin();
	},
  newUser : function (event) {
    console.log('newUser event triggered');
    event.preventDefault();
    var username = $('#input').val();
    // app.users.fetch();
    app.users.create({username: username });
    // app.users.save();
  }

});



//=============================================
// 9. GUI
//    Function that builds everything at the end
//=============================================

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
