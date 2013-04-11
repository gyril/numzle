//FirstView Component Constructor
function FirstView() {
	//create object instance, a parasitic subclass of Observable
	var self = Ti.UI.createView();
	
	//label using localization-ready strings from <app dir>/i18n/en/strings.xml
	var label = Ti.UI.createLabel({
		color:'#000000',
		font: { fontSize:24 },
		text:String.format(L('welcome'),'Numzle'),
		height:'auto',
		width:'auto',
		top:'30px'
	});
	self.add(label);
	
	var matchmaking = Ti.UI.createButton({
		color:'#000000',
		title:"Find match",
		height:50,
		width:250,
		top:'140px'
	});
	self.add(matchmaking);
	
	var private_lobby = Ti.UI.createButton({
		color:'#000000',
		title:"Private lobby",
		height:50,
		width:250,
		top:'190px'
	});
	self.add(private_lobby);
	
	var training = Ti.UI.createButton({
		color:'#000000',
		title:"Training",
		height:50,
		width:250,
		top:'240px'
	});
	self.add(training);
	
	var credits = Ti.UI.createLabel({
		color:'#000000',
		font: { fontSize:12 },
		text:"Copyright M&C studios - 2013",
		height:'auto',
		width:'auto',
		top:'400px'
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
