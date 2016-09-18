var menuState = {
	create: function() {
		game.add.image(0, 0, 'background');//add a background image
		
		//display the name of the  //change position from 80 to -50
		var nameLabel = game.add.text(game.width/2, -50, 'Super Coin Box', {font: '50px Arial', fill: '#ffffff'});
		nameLabel.anchor.setTo(0.5, 0.5);
		/*//create a tween on the label
		var tween = game.add.tween(nameLabel);
		//change the y position of the label to 80 in 1000ms
		tween.to({y: 80}, 1000);
		//start the tween
		tween.start();*/
		game.add.tween(nameLabel).to({y: 80}, 1000).easing(Phaser.Easing.Bounce.Out).start();
		
		//show the score at the center of the screen
		var scoreLabel = game.add.text(game.width/2, game.height/2, 'score: ' + game.global.score, {font: '25px Arial', fill: '#ffffff'});
		scoreLabel.anchor.setTo(0.5, 0.5);
		
		//explain how to start the game
		var startLabel = game.add.text(game.width/2, game.height-80, 'press the up arrow key to start', {font: '25px Arial', fill: '#ffffff'});
		startLabel.anchor.setTo(0.5, 0.5);
		/*//create the tween
		var tween = game.add.tween(startLabel);
		//rotate the label to -2 degrees in 500ms
		tween.to({angle: -2}, 500);
		//rotate the label to +2 degrees in 500ms
		tween.to({angle: 2}, 500);
		//rotate the label to our initial position in 500ms
		tween.to({angle: 0}, 500);
		//loop indefinitely the tween
		tween.loop();
		//start the tween
		tween.start();*/
		game.add.tween(startLabel).to({angle: -2}, 500).to({angle: 2}, 1000).to({angle: 0}, 500).loop().start();
		
		
		
		//create a new phaser keyboard variable:  the up arrow key
		//when pressed, call the 'start'
		var upKey = game.input.keyboard.addKey(Phaser.Keyboard.UP);
		upKey.onDown.add(this.start, this);
	},
	
	start: function() {
		//start the actual game
		game.state.start('play');
	}
};