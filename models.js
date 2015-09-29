var UserModel = Backbone.Model.extend({
	defaults: {
		username:''
	},
	// url : "/tasks",
	currentUser : ''
});


var IssueModel = Backbone.Model.extend({
	defaults: {
		title:'',
		description:'',
		creator:'',
		assignee:'',
		status:'unassigned'
	},
	// ur : "/tasks"

	// Add methods if needed...
});

// IssueModel.fetch();
var UserCollection = Backbone.Collection.extend({
	model:UserModel, url: "/users"
});

var IssueCollection = Backbone.Collection.extend({
	model:IssueModel, url: "/tasks"
});



	//--------------
	 // Initializers
	 //--------------

		// 	app.appView = new app.AppView();
