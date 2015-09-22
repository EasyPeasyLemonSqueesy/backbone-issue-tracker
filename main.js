var app = {};

$(function() { //when DOM is ready...
	app.users = new UserCollection([
		{username:'Person1'},
		{username:'Person2'},
		{username:'Person3'}
	]);

	app.tasks = new IssueCollection([
		{
			title: 'Test the issue render',
			description: 'make sure that the page can render tasks',
			creator: 'Joseph'
		},
		{
			title: 'Test the issue Collection',
			description: 'make sure the collection holds more than one task',
			creator: 'Adam'
		},
		{
			title: 'Test the button',
			description: 'make sure each task has a dropdown of statuses',
			creator: 'Nate'
		}
	]);

	app.gui = new GUI(app.users,
						app.tasks,
						'#app');// selector of main div
});
