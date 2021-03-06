var mainState = {
	
	preload: function(){
		game.load.image("player", "assets/player.png");//add player
		game.load.image('wallV','assets/wallVertical.png');
		game.load.image('wallH','assets/wallHorizontal.png');
		game.load.image('coin', 'assets/coin.png');//load coin sprite
	},
	
	create: function(){
		game.stage.backgroundColor = '#3498db'; //change background
		game.physics.startSystem(Phaser.Physics.ARCADE);
		game.renderer.renderSession.roundPixels = true;
		this.player = game.add.sprite(game.width/2, game.height/2, 'player');
		this.player.anchor.setTo(0.5, 0.5);
		game.physics.arcade.enable(this.player); //tell Phaser that the player will use the arcade physics engine
		this.player.body.gravity.y = 100; //add vertical gravity to the player
		this.cursor = game.input.keyboard.createCursorKeys();
		this.player.tint = 0xff0000;
		this.createWorld();
		
		this.coin = game.add.sprite(60, 140, 'coin');//display the coin
		game.physics.arcade.enable(this.coin);//add arcade physics to the coin
		this.coin.anchor.setTo(0.5, 0.5);
		
		this.scoreLabel = game.add.text(30, 30, 'score: 0', {font: '18px Arial', fill: '#ffffff'});//display score
		this.score = 0;//initialize score variable
	},
	
	update: function(){
		game.physics.arcade.collide(this.player, this.walls);
		this.movePlayer(); //put it here because update function is called when there are events
		if (!this.player.inWorld) {
			this.playerDie();
		}
		game.physics.arcade.overlap(this.player, this.coin, this.takeCoin, null, this);
	},
	
	movePlayer: function(){
		if (this.cursor.left.isDown){
			this.player.body.velocity.x = -200;
		}
		else if (this.cursor.right.isDown){
			this.player.body.velocity.x = 200;
		}
		else {
			this.player.body.velocity.x = 0;
		}
		if (this.cursor.up.isDown && this.player.body.touching.down){
			this.player.body.velocity.y = -320;
		}
	},
	
	createWorld: function() {
		this.walls = game.add.group();//create new group
		this.walls.enableBody = true;//add arcade physics to the group
		game.add.sprite(0, 0, 'wallV', 0, this.walls);//left wall
		game.add.sprite(480, 0, 'wallV', 0, this.walls);//right wall
		
		
		game.add.sprite(0, 0, 'wallH', 0, this.walls);//top left wall
		game.add.sprite(300, 0, 'wallH', 0, this.walls);//top right wall
		game.add.sprite(0, 320, 'wallH', 0, this.walls);//bottom left wall
		game.add.sprite(300, 320, 'wallH', 0, this.walls);//bottom right wall
		
		game.add.sprite(-100, 160, 'wallH', 0, this.walls);//middle left wall
		game.add.sprite(400, 160, 'wallH', 0, this.walls);//middle right wall
		
		var middleTop = game.add.sprite(100, 80, 'wallH', 0, this.walls);
		middleTop.scale.setTo(1.5, 1);
		var middleBottom = game.add.sprite(100, 240, 'wallH', 0, this.walls);
		middleBottom.scale.setTo(1.5, 1);
		
		this.walls.setAll('body.immovable',true);//set all walls to be immovable
	},
	
	playerDie: function() {
		game.state.start('main');
	},
	
	takeCoin: function (player, coin) {
		//this.coin.kill();//kill the coin to cause it to disappear from the game
		this.score += 5;//increase the score by 5
		this.scoreLabel.text = 'score: ' + this.score;//update the score label
		
		/*var newX = game.rnd.integerInRange(0, game.width);
		var newY = game.rnd.integerInRange(0, game.height);
		this.coin.reset(newX, newY);*/
		this.updateCoinPosition();
	},
	
	updateCoinPosition: function() {
		var coinPosition = [
			{x: 140, y: 60}, {x: 360, y: 60},
			{x: 60, y: 140}, {x: 440, y: 140},
			{x: 130, y: 300}, {x: 370, y: 300}
		];
		
		//remove the current coin position from the array to prevent the coin from appearing on the same spot
		for (var i = 0; i < coinPosition.length; i++) {
			if (coinPosition[i].x == this.coin.x) {
				coinPosition.splice(i, 1);
			}
		}
		
		var newPosition = game.rnd.pick(coinPosition);//randomly select from the arraw
		
		this.coin.reset(newPosition.x, newPosition.y);//set the new position of the coin
	},
};

var game = new Phaser.Game(500, 340, Phaser.AUTO, "gameDiv");

game.state.add('main', mainState); //name mainState as 'main'
game.state.start('main'); //start 'main'

/*var leftWall= game.add.sprite(0, 0, 'wallV');//create left wall
game.physics.arcade.enable(leftWall);//add arcade physics to the wall
leftWall.body.immovable = true;//ensure that the wall doesn't move

var rightWall= game.add.sprite(480, 0, 'wallV');//create right wall
game.physics.arcade.enable(rightWall);//add arcade physics to the wall
rightWall.body.immovable = true;//ensure that the wall doesn't move*/

