//rename mainState to playState
var playState = {
	
	//preload function is now on load.js
	
	create: function(){
		//game settings now in boot.js
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
		
		//change this.score to game.global.score
		game.global.score = 0;//initialize score variable
		
		this.enemies = game.add.group();//create enemy group with arcade physics
		this.enemies.enableBody = true;
		this.enemies.createMultiple(10, 'enemy');//create 10 enemies - they are dead by default
		game.time.events.loop(2200, this.addEnemy, this);// call 'addEnemy' every 2.2 seconds
		
		this.enemies2 = game.add.group();//create enemy group with arcade physics
		this.enemies2.enableBody = true;
		this.enemies2.createMultiple(10, 'enemy');//create 10 enemies - they are dead by default
		game.time.events.loop(2200, this.addEnemy2, this);// call 'addEnemy' every 2.2 seconds
	},
	
	update: function(){
		game.physics.arcade.collide(this.player, this.walls);
		this.movePlayer(); //put it here because update function is called when there are events
		if (!this.player.inWorld) {
			this.playerDie();
		}
		game.physics.arcade.overlap(this.player, this.coin, this.takeCoin, null, this);
		game.physics.arcade.collide(this.enemies, this.walls);
		game.physics.arcade.overlap(this.player, this.enemies, this.playerDie, null, this);
		game.physics.arcade.collide(this.enemies2, this.walls);
		game.physics.arcade.overlap(this.player, this.enemies2, this.playerDie, null, this);
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
		game.state.start('menu');//change main to menu
	},
	
	takeCoin: function (player, coin) {
		//this.coin.kill();//kill the coin to cause it to disappear from the game
		//change this.score to game.global.score
		game.global.score += 5;//increase the score by 5
		this.scoreLabel.text = 'score: ' + game.global.score;//update the score label
		
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
	
	addEnemy: function() {
		var enemy = this.enemies.getFirstDead();//get the first dead enemy of the group
		var enemy2 = this.enemies2.getFirstDead();
		if (!enemy && !enemy2) {
			return;//if there isn't any dead enemy do nothing
		}
		enemy.anchor.setTo(0.5, 1);
		enemy.reset(game.width/2, 0);
		enemy.body.gravity.y = 500;
		enemy.body.velocity.x = 100 * game.rnd.pick([-1, 1]);
		enemy.body.bounce.x = 1;
		enemy.checkWorldBounds.x = 1;
		enemy.outOfBoundsKill = true;
	},
	
	addEnemy2: function() {
		var enemy2 = this.enemies2.getFirstDead();//get the first dead enemy of the group
		if (!enemy2) {
			return;//if there isn't any dead enemy do nothing
		}
		
		enemy2.anchor.setTo(0.5, 0);
		enemy2.reset(game.width/2, game.height);
		enemy2.body.gravity.y = -500;
		enemy2.body.velocity.x = 100 * game.rnd.pick([-1, 1]);
		enemy2.body.bounce.x = 1;
		enemy2.checkWorldBounds.x = 1;
		enemy2.outOfBoundsKill = true;
	},
};

//delete all phaser intialization because it will be on game.js

/*var leftWall= game.add.sprite(0, 0, 'wallV');//create left wall
game.physics.arcade.enable(leftWall);//add arcade physics to the wall
leftWall.body.immovable = true;//ensure that the wall doesn't move

var rightWall= game.add.sprite(480, 0, 'wallV');//create right wall
game.physics.arcade.enable(rightWall);//add arcade physics to the wall
rightWall.body.immovable = true;//ensure that the wall doesn't move*/

