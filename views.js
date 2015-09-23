var GUI = (function(){ //IIFE for all Views

//=============================================
//              TABLE OF CONTENTS
//  -----------------------------------------
//  1. AddTaskView
//  2. TaskView
//  3. UnassignedTasksView
//  4. UserTasksView
//  5. UserView
//  6. LoginView
//  7. GUI
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
        creator : app.currentUser
      };

      app.tasks.add( task );
      $('#app').removeClass('faded');
    }
  });



//=============================================
// 2. TaskView :
//      View for an individual task
//    Called by :
//      UnassignedTaskView
//      UserTaskView
//=============================================

  var TaskView = Backbone.View.extend({
    tagName: 'p',
    className: 'task',

    render: function(){

      var $unclaim  = $('<button class="btn-unclaim">').html('unclaim');
      var $claim    = $('<button class="btn-claim">').html('claim');
      var $assign   = $('<button class="btn-assign">').html('assign');
      var $complete = $('<button class="btn-complete">').html('complete');

      var task = this.model.get('title') + '<br>description: ' + this.model.get('description') + '<br>creator: ' + this.model.get('creator') + '<br>assigned to: ' + this.model.get('assignee') + '<br>status: ' + this.model.get('status') + '<br>'

      this.$el.html(task);
      this.$el.append([$unclaim, $claim, $assign, $complete]);
    },

    initialize: function(){
      this.render();
    },

    events: {
      'click .btn-unclaim'  : 'unclaim',
      'click .btn-claim'    : 'claim',
      'click .btn-assign'   : 'assign',
      'click .btn-complete' : 'complete'
    },

    unclaim : function() {
      console.log( 'unclaiming a task' );
      this.model.set({ 'assignee' : '' });
      this.model.set({ 'status' : 'unnassigned' });
      console.log( 'the new assignee is: ', this.model.get('assignee') );
      console.log( 'the new status is: ', this.model.get('status') );
    },

    claim : function() {
      console.log( 'claiming a task' );
      this.model.set({ 'assignee' : app.currentUser });
      this.model.set({ 'status' : 'assigned' });
      console.log( 'the new assignee is: ', this.model.get('assignee') );
      console.log( 'the new status is: ', this.model.get('status') );
    },

    assign : function() {
      console.log( 'delegating a task' );

      /* FIX THIS UP
      *=======================
      *
      * this.model.set({ 'assignee' : app.currentUser });
      *
      */

      this.model.set({ 'status' : 'assigned' });
      console.log( 'the new assignee is: ', this.model.get('assignee') );
      console.log( 'the new status is: ', this.model.get('status') );
    },

    complete : function (){
      console.log( 'complete a task' );
      this.model.set({ 'assignee' : '' });
      this.model.set({ 'status' : 'completed' });
      console.log( 'the new assignee is: ', this.model.get('assignee') );
      console.log( 'the new status is: ', this.model.get('status') );
    }
});


//=============================================
// 3. UnassignedTasksView:
//      View for all unassigned
//    Called by :
//      UserView
//=============================================

  var UnassignedTasksView = Backbone.View.extend({
  	tagName: 'div',
  	className: 'UnassignedTasksView',
  	initialize: function () {
      this.listenTo(app.tasks, 'change', this.render);
      this.listenTo(app.tasks, 'update', this.render);

  },

    render: function () {
  		var btn = '<button id="newTask">Create A New Task</button>';
  		this.$el.html('<h1>Unassigned Tasks</h1>'+ btn);

      for(var i = 0; i < app.tasks.length; i++){
        if(app.tasks.at(i).get('status') == 'unassigned' || app.tasks.at(i).get('status') == ''){
          var viewB = new TaskView({index: i, model: app.tasks.at(i)});
          this.$el.append(viewB.$el);
        }
      }
    },
    changeBack: function() {
      this.model.set({'assignee' : ''});
      this.model.set({'status' : 'unassigned'});
      console.log("Unclaiming A Task");
    },
    complete: function() {
      console.log("Task Completed");
      this.model.set({'status' : 'completed'});
      this.addDiv();
    },
    addDiv: function() {
      console.log("Adding Div");
      this.remove();
      this.initialize();
    },
    events: {
  			'click #newTask' : 'newTask'
  	},

    newTask: function () {
      var addTask = new AddTaskView();
      addTask.render();
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
  	className: 'UserTasksView',

  	render: function () {
			// var usernames = UserModel.model.get("value");
      console.log('UserTasksView');
			this.$el.html('<h1>My Tasks</h1>');

      for(var i = 0; i < app.tasks.length; i++){
        if(app.tasks.at(i).get('assignee') == app.currentUser){
          var viewB = new TaskView({index: i, model: app.tasks.at(i)});
          this.$el.append(viewB.$el);
        }
    }

  	},
  	initialize: function () {
      this.listenTo(app.tasks, 'update', this.removeTask);
			this.listenTo(app.tasks, 'change', this.removeTask);
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
    className: 'AssignedTasksView',

    render: function () {
      // var usernames = UserModel.model.get("value");
      console.log('AssignedTasksView');
      this.$el.html('<h1>Assigned Tasks</h1>');

      for(var i = 0; i < app.tasks.length; i++){
        if(app.tasks.at(i).get('assignee') ){
          var viewB = new TaskView({index: i, model: app.tasks.at(i)});
          this.$el.append(viewB.$el);
        }
    }

    },
    initialize: function () {
      this.listenTo(app.tasks, 'update', this.removeTask);
      this.listenTo(app.tasks, 'change', this.removeTask);
    },
    events : {
    },
  });



//=============================================
// 5. UserView:
//      View for whole page after logging in
//    Called by :
//      LoginView
//=============================================

  var UserView = Backbone.View.extend({
    id : 'UserView',
  	render: function() {
			var logout = '<button id = "logout">Log-Out</button>';
			var header = '<h1>Welcome, '+app.currentUser+'!</h1>';
			
      //var userTasksViewHeader = '<h1>User Tasks View</h1>';
			var userTasksView = new UserTasksView();
			userTasksView.render();
			
      //var unassignedTasksViewHeader = '<h1>Unassigned Tasks View</h1>';
			var unassignedTasksView = new UnassignedTasksView();
			unassignedTasksView.render();

      //var assignedTasksViewHeader = '<h1>Unassigned Tasks View</h1>';
      var assignedTasksView = new AssignedTasksView();
      assignedTasksView.render();

			var stuff = header + logout;
      this.$el.append(unassignedTasksView.$el);
      this.$el.append(userTasksView.$el);
      this.$el.append(assignedTasksView.$el);
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



//=============================================
// 6. LoginView :
//      View for initial login page
//    Called by :
//      GUI
//=============================================

var LoginView = Backbone.View.extend({
  id : 'LoginView',
	render: function() {
		var button = '<button id = "login">Login</button>';
		var users = app.users.pluck("username");
		var dropdown = '<select id = "dropdown">';
    users.forEach(function(element){dropdown += "<option>"+element+"</option>";});
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



//=============================================
// 7. GUI
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
