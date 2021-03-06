var loadState = {
	preload: function () {
		//add a 'loading...' label on the screen
		var loadingLabel = game.add.text(game.width/2, 150, 'loading...', {font: '30px Arial', fill: '#ffffff'});
		loadingLabel.anchor.setTo(0.5, 0.5);
		
		//display the progress bar
		var progessBar = game.add.sprite(game.width/2, 200, 'progessBar');
		progessBar.anchor.setTo(0.5, 0.5);
		game.load.setPreloadSprite(progessBar);
		
		//load all our assets
		game.load.image('player', 'assets/player.png');
		game.load.image('enemy', 'assets/enemy.png');
		game.load.image('coin', 'assets/coin.png');
		game.load.image('wallV', 'assets/wallVertical.png');
		game.load.image('wallH', 'assets/wallHorizontal.png');
		
		//load a new asset that we will use in the menu state
		game.load.image('background', 'assets/background.png');
	},
	
	create: function () {
		//go to the menu state
		game.state.start('menu');
	}
};