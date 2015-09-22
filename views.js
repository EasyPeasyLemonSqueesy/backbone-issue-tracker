var GUI = (function(){ //IIFE for all Views

var TaskView = Backbone.View.extend({
  render: function(){
    console.log('RENDER TaskView!!\n===================')
    console.log('the model im rendering is ', this.model.get('title'));
    var description = '<p>'+ this.model.get('title') + '<br>description: ' + this.model.get('description') + '<br>creator: ' + this.model.get('creator') + '<br>assigned to: ' + this.model.get('assignee') + '<br>status: ' + this.model.get('status') + '</p>';
  },
  initialize: function(){
    $('#app').append(this)
  }
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

});


// generic ctor to represent interface:
function GUI(users,tasks,el) {
	console.log( 'CONSTRUCTION gui\n===================')
  
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

  tasks.each( function(task){

    console.log('LOOP tasks.each!!\n=================\n the current task is =>', task);

    console.log( 'task.title: "', task.get('title'), '"' );
    
    var issue = new TaskView({ model : task });
    
    console.log('renamed it issue: ', issue)
    issue.render();

  })
}

return GUI;
}()
);
