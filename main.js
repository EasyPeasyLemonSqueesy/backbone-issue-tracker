var app = {};

$(function() { //when DOM is ready...
	console.log("this is running");
	app.users = new UserCollection([
		{username:'Person1'},
		{username:'Person2'},
		{username:'Person3'}
	]);

	app.tasks = new TaskCollection([
		// test data here
	]);

	app.gui = new GUI(app.users,
						app.tasks,
						'#app');// selector of main div
} //end of inner function
); //end of parameter
//(); //call $
// console.log($);
