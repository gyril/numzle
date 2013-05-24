//FirstView Component Constructor
function TrainingView() {
	//create object instance, a parasitic subclass of Observable
	var self = Ti.UI.createView();
	
	/*
	 * CLASSES
	 * 
	 * Label, Bouton
	 * 
	 */
	
	function Label (text, size, top, left) {
		this.object = Ti.UI.createLabel({
			color:'#ffffff',
			font: { fontSize: size},
			text: text,
			height:'auto',
			width:'auto',
			top:top
		});
		
		if(typeof left != 'undefined')
			this.object.left = left;
		
		this.setText = function(text) {
			this.object.text = text;
		}
		
		this.setRight = function(pos) {
			this.object.right = pos;
		}
		
		this.setColor = function(color) {
			this.object.color = color;
		}
		
		self.add(this.object);
	};
	
	function Bouton (title, height, width, top, left, zindex) {
		this.object = Ti.UI.createButton({
			color:'#000000',
			title:title,
			height:height,
			width:width,
			top: top,
			left: left
		});
		
		if(typeof zindex != 'undefined')
			this.object.zIndex = zindex;
		
		this.setTitle = function(text) {
			this.object.title = text;
		}
		
		this.setColor = function(color) {
			this.object.color = color;
		}
		
		this.setBackgroundColor = function(hex) {
			this.object.backgroundColor = hex;
		}
		
		this.click = function(fn) {
			this.object.addEventListener("click", fn);
		}
		
		self.add(this.object);
	};
	

	/*
	 * GAME FUNCTIONS
	 * 
	 * generateGrid, generateResult, addEventListeners, etc.
	 * 
	 */
	
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
	
	function endGame() {
		timer.setText("00:00");
		alert("Game over");
	}

	
	/*
	 * STAGE
	 * 
	 * Title, Objective, Timer, Signs, Grid, Proposition
	 * 
	 */
	
	var title = new Label(L("train","Training"), 32, 20);
	var propDisplay = new Label("", 26, 150);

	var plusSign = new Bouton("+", 100, 100, 220, 360),
		minusSign = new Bouton("-", 100, 100, 330, 360),
		plusSign = new Bouton("x", 100, 100, 440, 360);
		 
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
				
			});
		})(digit)
		
		self.add(digit);
	}
	
	var numbers = generateNumbers(grid);

	var objectif = new Label(String.format(L('find', "Find "+numbers[0]),numbers[0]), 24, 120),
		timer = new Label("2:00", 18, 10);
	timer.setRight(10);
	
	var validate = new Bouton("OK", 50, 150, 660, 250),
		cancel = new Bouton("X", 50, 150, 660, 100);
		
	validate.setBackgroundColor("#00FF00");
	cancel.setBackgroundColor("#FF0000");
	cancel.click(function(e) {
		proposition = 0;
		operation = 0;
		refreshProposition();
	});
	
	var endTime = (new Date()).getTime() + 120*1000;
	var setTimer = setInterval(function() {
		var now = (new Date()).getTime();
		if(now > endTime) {
			endGame();
			clearInterval(setTimer);
		} else {
			var sec = Math.round((endTime - now) / 1000);
			timer.setText( Math.floor(sec/60) + ":" +((sec%60) >9 ? "" : "0") + sec%60 );
		}
	}, 500);
	
	
	return self;
}

module.exports = TrainingView;