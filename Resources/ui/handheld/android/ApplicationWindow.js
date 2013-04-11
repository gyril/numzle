//Application Window Component Constructor
function ApplicationWindow() {
	//load component dependencies
	var FirstView = require('ui/common/FirstView'),
		TrainingView = require('ui/common/TrainingView');
		
	//create component instance
	var self = Ti.UI.createWindow({
		backgroundColor:'#ffffff',
		navBarHidden:true,
		exitOnClose:true
	});
		
	//construct UI
	var firstView = new FirstView();
	self.add(firstView);
	
	firstView.addEventListener('training', function(e) {
		var trainingView = new TrainingView();
		var trainingContainerWindow = Ti.UI.createWindow({
			title:'Training',
			navBarHidden:true,
			backgroundColor:'#ffffff'
		});
		trainingContainerWindow.add(trainingView);
		trainingContainerWindow.open();
	});
	
	return self;
}

//make constructor function the public component interface
module.exports = ApplicationWindow;
