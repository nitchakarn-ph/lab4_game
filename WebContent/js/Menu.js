/**
 * Menu state.
 */
function Menu() {
	Phaser.State.call(this);
}

/** @type Phaser.State */
var proto = Object.create(Phaser.State);
Menu.prototype = proto;

Menu.prototype.preload = function() {
	this.load.pack("start", "assets/assets-pack.json");
};

Menu.prototype.create = function() {
	//taptostart
	var start = this.add.sprite(this.world.centerX,this.world.centerY,"tap-to-start");
	start.anchor.set(0.5, 0.5);
	//ship
	/*
	var sprite1 = this.add.sprite(this.world.centerX, this.world.centerY,
	"ship");
	sprite1.anchor.set(0.5, -5);
	*/
	//textby
	var text = this.add.text(10, this.world.height-10,"By Nitchakarn Ponharn",
				{fill:'white'});
	text.scale.set(0,4);

	
	this.ship = this.add.sprite(this.world.centerX,this.world.height-20,"ship");
	this.ship.animations.add("all").play(12,true);
	this.ship.anchor.set(0.5,1);
	this.ship.scale.set(3);
	this.ship.smoothed = false;
	
	this.input.onDown.active = true;
	this.input.onDown.add(this.startGame, this);
};
Menu.prototype.startGame = function(){
	this.input.onDown.active = false;
	var tw = this.add.tween(this.ship);
	tw.to({y:0},2000,"Elastic.easeIn",true);
	tw.onComplete.addOnce(this.startLevel(),this);
};

Menu.prototype.startLevel = function() {
	this.game.state.start("Level");
};
