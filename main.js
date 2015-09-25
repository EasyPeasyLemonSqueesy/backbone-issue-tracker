var app = {};

$(function() { //when DOM is ready...
	console.log("main is running");
	app.users = new UserCollection([
		{username:'Joseph'},
		{username:'Nathaniel'},
		{username:'Adam'}
	]);

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
	app.tasks.fetch();
});
