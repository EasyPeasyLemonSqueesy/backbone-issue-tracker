var app = {};

$(function() { //when DOM is ready...
	app.users = new UserCollection(
	// 	[
	// 	{username:'Joseph'},
	// 	{username:'Nathaniel'},
	// 	{username:'Adam'}
	// ]

);


	app.tasks = new IssueCollection([
		// {
		// 	title: 'GHUEHGUEHUGHUEHUHG',
		// 	description: 'schedule a tea party.',
		// 	creator: 'Monster',
		// 	assignee:'',
		// 	id: '1'
		// },
		// {
		// 	title: 'Test the issue render',
		// 	description: 'make sure that the page can render tasks',
		// 	creator: 'Joseph',
		// 	assignee:'Nathaniel',
		// 	status: 'assigned',
		// 	id: '2'
		// },
		// {
		// 	title: 'Test the issue Collection',
		// 	description: 'make sure the collection holds more than one task',
		// 	creator: 'Adam',
		// 	assignee:'Joseph',
		// 	status: 'assigned',
		// 	id: '3'
		// },
		// {
		// 	title: 'Test the button',
		// 	description: 'make sure each task has a dropdown of statuses',
		// 	creator: 'Nathaniel',
		// 	assignee:'Adam',
		// 	status: 'assigned',
		// 	id: '4'
		// }
	]);
	app.gui = new GUI(app.users,
						app.tasks,
						'#app');// selector of main div
	// app.tasks.fetch();
	app.Router = Backbone.Router.extend({
			routes: {
				// '*filter' : 'setFilter',
				'' : 'index',
				'loggedin' : 'loggedin',
				'loggedout' : 'loggedout',
				'users' : 'users',
				'show/:id' : 'show'
			},
			index : function() {
				console.log("you are on the main page");
				// app.gui.switchToLogin();
			},
			setFilter: function(params) {
				console.log('app.router.params = ' + params); // just for didactical purposes.
				// window.filter = params.trim() || '';
				// app.todoList.trigger('reset');
			},
			loggedin: function() {
				console.log('you are in login ');
				app.currentUser = $('#dropdown').val();
				// .remove();
					app.gui.switchToUser();
			},
			loggedout: function() {
				console.log('you are logging out');
				app.gui.switchToLogin();
			},
			users : function() {
				console.log('you are in users');
				var users = new IssueCollection();
				users.fetch();
			},
			show: function(id){
			$(document.body).append("Show route has been called.. id = ", id);
		}
		});
	    app.router = new app.Router();
	    Backbone.history.start();
});
