var app = {};

$(function() { //when DOM is ready...
	console.log("main is running");
	app.users = new UserCollection([
		{username:'Joseph'},
		{username:'Nathaniel'},
		{username:'Adam'}
	]);

	app.tasks = new IssueCollection([
		{
			title: 'Test the issue render',
			description: 'make sure that the page can render tasks',
			creator: 'Joseph',
			assignee:'Nathan'
		},
		{
			title: 'Test the issue Collection',
			description: 'make sure the collection holds more than one task',
			creator: 'Adam',
			assignee:'Joseph',
			status: 'assigned'
		},
		{
			title: 'Test the button',
			description: 'make sure each task has a dropdown of statuses',
			creator: 'Nate',
			assignee:'Adam',
			status: 'assigned'
		}
	]);

	app.gui = new GUI(app.users,
						app.tasks,
						'#app');// selector of main div
});
