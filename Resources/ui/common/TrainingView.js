//FirstView Component Constructor
function TrainingView() {
	//create object instance, a parasitic subclass of Observable
	var self = Ti.UI.createView();
	
	//label using localization-ready strings from <app dir>/i18n/en/strings.xml
	var label = Ti.UI.createLabel({
		color:'#ffffff',
		font: { fontSize:32 },
		text:"Training",
		height:'auto',
		width:'auto',
		top:'20px'
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
	
	function generateNumbers() {
		var tgrid = grid;
		var d1 = tgrid[Math.floor(Math.random()*tgrid.length)];
		tgrid.splice(tgrid.indexOf(d1), 1);
		var d2 = tgrid[Math.floor(Math.random()*tgrid.length)];
		tgrid.splice(tgrid.indexOf(d2), 1);
		
		return [d1 * d2];
	}
	
	var plusSign = Ti.UI.createButton({
			color:'#000000',
			title:"+",
			height:100,
			width:100,
			visible:false
		}),
		minusSign = Ti.UI.createButton({
			color:'#000000',
			title:"-",
			height:100,
			width:100,
			visible:false
		}),
		multiplySign = Ti.UI.createButton({
			color:'#000000',
			title:"x",
			height:100,
			width:100,
			visible:false
		}),
		divideSign = Ti.UI.createButton({
			color:'#000000',
			title:"/",
			height:100,
			width:100,
			visible:false
		});
	
	var grid = generateGrid(12, [6,4,2]);
	
	for(var i in grid) {
		
		var digit = Ti.UI.createButton({
			color:'#000000',
			title:grid[i],
			height:100,
			width:100,
			top:220+Math.floor(i/3)*110,
			left:20+i%3*110
		});
		
		digit.addEventListener("touchstart", function() {
			function touchend() {
				self.removeEventListener("touchend", touchend);
				plusSign.visible = false;
				minusSign.visible = false;
				multiplySign.visible = false;
				divideSign.visible = false;
			}
			
			plusSign.visible = true;
			minusSign.visible = true;
			multiplySign.visible = true;
			divideSign.visible = true;
			plusSign.top = digit.top - 110;
			plusSign.left = digit.left;
			minusSign.top = digit.top + 110;
			minusSign.left = digit.left;
			multiplySign.top = digit.top;
			multiplySign.left = digit.left + 110;
			divideSign.top = digit.top;
			divideSign.left = digit.left - 110;
			
			self.addEventListener("touchend", touchend);
		});
		
		self.add(digit);
	}
	
	var numbers = generateNumbers();

	var objectif = Ti.UI.createLabel({
		color:'#ffffff',
		font: { fontSize:24 },
		text:"Find "+numbers[0],
		height:'auto',
		width:'auto',
		top:'120px'
	});
	self.add(objectif);
	
	var timer = Ti.UI.createLabel({
		color:'#ffffff',
		font: { fontSize:18 },
		text:"2:00",
		height:'auto',
		width:'auto',
		top:'10px',
		right:'10px'
	});
	self.add(timer);
	
	var endTime = (new Date()).getTime() + 120*1000;
	var setTimer = setInterval(function() {
		var now = (new Date()).getTime();
		if(now > endTime) {
			endGame();
			clearInterval(setTimer);
		} else {
			var sec = Math.round((endTime - now) / 1000);
			timer.text = Math.floor(sec/60) + ":" +((sec%60) >9 ? "" : "0")+ sec%60;
		}
	}, 500);
	
	function endGame() {
		alert("Game over");
	}
	
	return self;
}

module.exports = TrainingView;