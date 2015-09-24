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

      var task = this.model.get('title') + '<br>description: ' + this.model.get('description') + '<br>creator: ' + this.model.get('creator') + '<br>assigned to: ' + this.model.get('assignee') + '<br>status: ' + this.model.get('status') + '<br><br>';

      this.$el.html(task);
      this.$el.append([$unclaim, $claim, dropdown, $complete]);
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
      //console.log( 'unclaiming a task' );
      this.model.set({ 'assignee' : '' });
      this.model.set({ 'status' : 'unassigned' });

      // console.log( this.model );
      // console.log( 'the new assignee is: ', this.model.get('assignee') );
      // console.log( 'the new status is: ', this.model.get('status') );
    },

    claim : function() {
      //console.log( 'claiming a task' );
      this.model.set({ 'assignee' : app.currentUser });
      this.model.set({ 'status' : 'assigned' });
      // console.log( 'the new assignee is: ', this.model.get('assignee') );
      // console.log( 'the new status is: ', this.model.get('status') );
    },
    assignTo : function(event) {
      console.log("I'm assigning a task!");
      var username = event.target.value;
      console.log('assigning to',username);
      this.model.set({ 'assignee' : username });
      this.model.set({ 'status' : 'assigned'});
    },

    complete : function (){
      //console.log( 'complete a task' );
      this.model.set({ 'assignee' : '' });
      this.model.set({ 'status' : 'completed' });
      // console.log( 'the new assignee is: ', this.model.get('assignee') );
      // console.log( 'the new status is: ', this.model.get('status') );
    }
});

// var AssignToView = Backbone.View.extend({
//   render: function() {
//     console.log("rendering AssignToView");
//     var users = app.users.pluck("username");
//     var dropdown = '<select id = "assignTo" onchange="this.form.submit()">';
//     users.forEach(function(element){dropdown += "<option>"+element+"</option>";});
//     dropdown += ('</select>');
//     var title = '<h1>Assign This Task To A User</h1>';
//     var all =  title + dropdown;
//     // this.$el.html(  all );
//     $('#app').append(all);
//   },
//   events: {
//     'click #assignTo' : 'assignTo'
//   },
//   assignTo : function() {
//     console.log("Button Works!");
//   }
// });
//=============================================
// 3. UnassignedTasksView:
//      View for all unassigned
//    Called by :
//      UserView
//=============================================
//buggy version:
  // var UnassignedTasksView = Backbone.View.extend({
  // 	tagName: 'div',
  // 	className: 'UnassignedTasksView column',
  //
  // 	initialize: function () {
  //     this.listenTo( app.tasks, 'change', this.render);
  //     this.listenTo( app.tasks, 'update', this.render);
  //   },
  //
  //   render: function () {
  //     console.log('ive entered the rendering phase');
  // 		var $h1 = $('<h1>').html('Unassigned Tasks');
  //     this.$el.append($h1);
  //     for(var i = 0; i < app.tasks.length; i++){
  //
  //       var status = app.tasks.at(i).get('status');
  //       var assignee = app.tasks.at(i).get('assignee');
  //
  //       if((status === 'unassigned' || status === '') && assignee === ''){
  //         console.log('ive entered the if loop');
  //         var viewB = new TaskView({model: app.tasks.at(i)});
  //         this.$el.append(viewB.$el);
  //       }
  //     }
  //   }
  // });
  //working version:
  var UnassignedTasksView = Backbone.View.extend({
    	tagName: 'div',
    	className: 'UnassignedTasksView column',

    	initialize: function () {
        this.listenTo( app.tasks, 'change', this.render);
        this.listenTo( app.tasks, 'update', this.render);
      },

      render: function () {
        console.log('ive entered the rendering phase');
    		var btn = '<button id="newTask">Create A New Task</button>';
        var header = '<h1>Unassigned Tasks</h1>';
    		this.$el.append().html(header); // TODO: If not .html it adds header multiple times on button click (aka THIS IS CRAYZBALLS)
        // this.$el.append(btn);

        for(var i = 0; i < app.tasks.length; i++){

          var status = app.tasks.at(i).get('status');
          var assignee = app.tasks.at(i).get('assignee');

          if((status === 'unassigned' || status === '') && assignee === ''){
            console.log('ive entered the if loop');
            var viewB = new TaskView({model: app.tasks.at(i)});
            this.$el.append(viewB.$el);
          }
        }
      },
      // events: {
    	// 	'click #newTask' : 'newTask'
    	// },
      //
      // newTask: function () {
      //   var addTask = new AddTaskView();
      //   addTask.render();
      //   this.$el.append(addTask.$el);
      // }
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
      console.log('UserTasksView');
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
      console.log('AssignedTasksView');
      this.$el.html('<h1>Assigned Tasks</h1>');

      for(var i = 0; i < app.tasks.length; i++){
        if(app.tasks.at(i).get('assignee') ){
          var viewB = new TaskView({model: app.tasks.at(i)});
          this.$el.append(viewB.$el);
        }
    }

    },
    initialize: function () {
      this.listenTo(app.tasks, 'change', this.render);
      this.listenTo(app.tasks, 'update', this.render);
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
      console.log('CompletedTasksView');
      this.$el.html('<h1>Completed Tasks</h1>');

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
  	render: function() {
			var $header   = $('<div id="greeting">')
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

    events: {
      'click #newTask' : 'newTask',
      'click #logout'  : "logout"
    },

    newTask: function () {
      console.log( 'newTask' );
      var addTask = new AddTaskView();
      addTask.render();
      this.$el.append(addTask.$el);
    },

    initialize : function() {
    },

  	// events: {
  	// 	"click #logout" : "logout"
  	// },

  	logout: function() {
  		console.log("logging out");
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
