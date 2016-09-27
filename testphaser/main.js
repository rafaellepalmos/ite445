var mainState = {
	
	preload: function(){
		
		game.load.spritesheet('player', 'assets/male_melee2.png', 99, 51);
	},
	
	create: function(){
		this.player = game.add.sprite(game.width/2, game.height/2, 'player');
		this.player.animations.add('walk', [1, 2, 3, 4, 5, 6, 7, 8, 9], 24, true);
		this.player.animations.play('walk');//left animation
	},
	
	update: function(){
	}
};

var game = new Phaser.Game(500, 340, Phaser.AUTO, "gameDiv");

game.state.add('main', mainState); //name mainState as 'main'
game.state.start('main'); //start 'main'


