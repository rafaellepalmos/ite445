var mainState = {
	
	preload: function(){
		game.load.image("player", "assets/player.png");//add player
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
	},
	
	update: function(){
		this.movePlayer(); //put it here because update function is called when there are events
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
};

var game = new Phaser.Game(500, 340, Phaser.AUTO, "gameDiv");

game.state.add('main', mainState); //name mainState as 'main'
game.state.start('main'); //start 'main'