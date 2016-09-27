var bootState = {
	preload: function () {
		game.load.image('progressBar', 'assets/progressBar.png');//load the image
	},
	
	create: function () {
		//set some game settings
		game.stage.backgroundColor = '#3498db';
		game.physics.startSystem(Phaser.Physics.ARCADE);
		game.renderer.renderSession.roundPixels = true;
		
		//if the device is not a desktop aka mobile
		if(!game.device.desktop){
			game.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL;//set the type of scaling to 'show all'
			game.scale.setMinMax(game.width/2, game.height/2, game.width*2, game.height*2);//set the min and max width and height of the game
			game.scale.pageAlignHorizontally = true;
			game.scale.pageAlignVertically = true;//center the game on screen
			document.body.style.backgroundColor = '#3498db';
		}
		
		//start the load state
		game.state.start('load');
	}
};