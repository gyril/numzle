//FirstView Component Constructor
function TrainingView() {
	//create object instance, a parasitic subclass of Observable
	var self = Ti.UI.createView();
	
	//label using localization-ready strings from <app dir>/i18n/en/strings.xml
	var label = Ti.UI.createLabel({
		color:'#000000',
		font: { fontSize:24 },
		text:"Training",
		height:'auto',
		width:'auto',
		top:'50px'
	});
	self.add(label);
	
	function shuffle(o){
	    for(var j, x, i = o.length; i; j = parseInt(Math.random() * i), x = o[--i], o[i] = o[j], o[j] = x);
	    return o;
	};
	
	function generateGrid(size, digits) {
		var grid = [];
			
		for(var i in digits)
			for(var j=0; j<digits[i]; j++)
				grid.push(Math.ceil(Math.random()*9*(1-i)*(2-i)*0.5 + (Math.random()*90 + 9)*i*(2-i)+ + (Math.random()*900 + 99)*i*(1-i)*(-0.5)));
				
		return shuffle(grid);
	}
	
	var grid = generateGrid(12, [6,4,2]);
	
	for(var i in grid) {
		
		var digit = Ti.UI.createButton({
			color:'#000000',
			title:grid[i],
			height:100,
			width:100,
			top:200+Math.floor(i/3)*110,
			left:20+i%3*110,
		});
		
		self.add(digit);
	}
	
	return self;
}

module.exports = TrainingView;