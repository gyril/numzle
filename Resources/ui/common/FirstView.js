//FirstView Component Constructor
function FirstView() {
	//create object instance, a parasitic subclass of Observable
	var self = Ti.UI.createView();
	
	//label using localization-ready strings from <app dir>/i18n/en/strings.xml
	var label = Ti.UI.createLabel({
		color:'#ffffff',
		font: { fontSize:32 },
		text:String.format(L('welcome'),'Nummies'),
		height:'auto',
		width:'auto',
		top:'50px'
	});
	self.add(label);
	
	var matchmaking = Ti.UI.createButton({
		color:'#000000',
		title:L("matchmake","Find match"),
		height:80,
		width:250,
		top:'180px',
		backgroundImage:'/images/bouton.png'
	});
	self.add(matchmaking);
	
	var private_lobby = Ti.UI.createButton({
		color:'#000000',
		title:L("private_lobby","Private lobby"),
		height:80,
		width:250,
		top:'270px',
		backgroundImage:'/images/bouton.png'
	});
	self.add(private_lobby);
	
	var training = Ti.UI.createButton({
		color:'#000000',
		title:L("train","Training"),
		height:80,
		width:250,
		top:'360px',
		backgroundImage:'/images/bouton.png'
	});
	self.add(training);
	
	var credits = Ti.UI.createLabel({
		color:'#ffffff',
		font: { fontSize:12 },
		text:L("credits","Copyright M&C studios - 2013"),
		height:'auto',
		width:'auto',
		top:'740px'
	});
	self.add(credits);
		
	//Add behavior for UI
	matchmaking.addEventListener('click', function(e) {
		alert("Still unavailable");
	});
	private_lobby.addEventListener('click', function(e) {
		alert("Still unavailable");
	});
	training.addEventListener('click', function(e) {
		self.fireEvent('training');
	});
	
	return self;
}

module.exports = FirstView;
