//FirstView Component Constructor
function TrainingView() {
	//create object instance, a parasitic subclass of Observable
	var self = Ti.UI.createView();
	
	//label using localization-ready strings from <app dir>/i18n/en/strings.xml
	var label = Ti.UI.createLabel({
		color:'#ffffff',
		font: { fontSize:32 },
		text:L("train","Training"),
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
	
	function generateNumbers(grid) {
		var tgrid = grid.slice(0, grid.length-1);
		var number = tgrid[Math.floor(Math.random()*tgrid.length)];
		tgrid.splice(tgrid.indexOf(number), 1);
		var operands = 2 + Math.floor(Math.random()*3);
		
		for (var i = 1; i < operands; i++) {
			var operator = Math.floor(Math.random()*3);
			var d = tgrid[Math.floor(Math.random()*tgrid.length)];
			tgrid.splice(tgrid.indexOf(number), 1);
			switch(operator) {
				case 0:
					number += d;
					break;
				case 1:
					number -= d;
					break;
				case 2:
					number *= d;
					break;
				default:
					console.log(operand);
			}
		}
		console.log(grid);
		return [number];
	}
	
	function refreshProposition() {
		propDisplay.text = proposition;
		if(numbers[0] == parseInt(proposition)) {
			alert("Gagné");
			numbers = generateNumbers(grid);
			objectif.text = String.format(L('find', "Find "+numbers[0]),numbers[0]);
			proposition = 0;
			operation = 0;
			propDisplay.text = "";
		}
	}
	
	var plusSign = Ti.UI.createButton({
			color:'#000000',
			title:"+",
			height:100,
			width:100,
			visible:true,
			zIndex:1,
			top: 220,
			left: 360
		}),
		minusSign = Ti.UI.createButton({
			color:'#000000',
			title:"-",
			height:100,
			width:100,
			visible:true,
			zIndex:1,
			top: 330,
			left: 360
		}),
		multiplySign = Ti.UI.createButton({
			color:'#000000',
			title:"x",
			height:100,
			width:100,
			visible:true,
			zIndex:1,
			top: 440,
			left: 360
		}),
		propDisplay = Ti.UI.createLabel({
			color:'#ffffff',
			font: { fontSize:26 },
			text:"",
			height:'auto',
			width:'auto',
			top:'150px'
		});
		
	self.add(plusSign);
	self.add(minusSign);
	self.add(multiplySign);
	self.add(propDisplay);
	
	plusSign.addEventListener("touchend", function() { operation = 0; }, false);
	minusSign.addEventListener("touchend", function() { operation = 1; }, false);
	multiplySign.addEventListener("touchend", function() { operation = 2; }, false);
	
	var proposition = 0;
	var operation = 0;
	var grid = generateGrid(9, [5,4,0]);
	
	for(var i in grid) {
		
		var digit = Ti.UI.createButton({
			color:'#000000',
			title:grid[i],
			height:100,
			width:100,
			top:220+Math.floor(i/3)*110,
			left:20+i%3*110,
			backgroundImage:'/images/case.png'
		});
		
		(function(digit) {
			digit.addEventListener("touchend", function() {
				
//				function touchend() {
//					self.removeEventListener("touchend", touchend);
//				}
				console.log(digit.title);
				switch(operation) {
					case 0:
						proposition += parseInt(digit.title);
						break;
					case 1:
						proposition -= parseInt(digit.title);
						break;
					case 2:
						proposition *= parseInt(digit.title);
						break;
					default:
						console.log("default");
				}
				
				refreshProposition();
				
//				self.addEventListener("touchend", touchend);
			});
		})(digit)
		
		self.add(digit);
	}
	
	var numbers = generateNumbers(grid);

	var objectif = Ti.UI.createLabel({
		color:'#ffffff',
		font: { fontSize:24 },
		text:String.format(L('find', "Find "+numbers[0]),numbers[0]),
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
	
	var validate = Ti.UI.createButton({
		backgroundColor: '#00FF00',
		color:'#FFFFFF',
		title:"OK",
		height:50,
		width:150,
		top:660,
		left:250
	});
	self.add(validate);
	
	var cancel = Ti.UI.createButton({
		backgroundColor: '#FF0000',
		color:'#FFFFFF',
		title:"X",
		height:50,
		width:150,
		top:660,
		left:100
	});
	self.add(cancel);
	cancel.addEventListener("touchend", function() {
		proposition = 0;
		operation = 0;
		refreshProposition();
	}, false);
	
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