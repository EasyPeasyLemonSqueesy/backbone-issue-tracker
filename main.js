var app = {};

$(function() { //when DOM is ready...
	console.log("main is running");
	app.users = new UserCollection([
		{username:'Joseph'},
		{username:'Nathaniel'},
		{username:'Adam'}
	]);

	app.tasks = new IssueCollection([
		// test data here
	]);

	app.gui = new GUI(app.users,
						app.tasks,
						'#app');// selector of main div
} //end of inner function
); //end of parameter
//(); //call $
// console.log($);
