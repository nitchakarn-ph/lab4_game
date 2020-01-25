/**
 * Level state.
 */
function Level() {
	Phaser.State.call(this);
}

/** @type Phaser.State */
var proto = Object.create(Phaser.State);
Level.prototype = proto;

Level.prototype.create = function() {
	this.game.score = 0;
	this.gameover = false;
	this.physics.startSystem(Phaser.Physics.ARCADE);
	
	this.player = this.add.sprite(this.world.cemerX,600,"ship");
	this.player.anchor.set(0.5,0.5);
	this.player.animations.add("fly");
	this.player.play("fly",12,true);
	this.player.smoothed = false;
	this.player.scale.set(2);
	
	this.physics.enable(this.player,Phaser.Physics.ARCADE);
	this.player.body.collideWorldBounds = true;
	this.player.body.allowGravity = false;
	this.player.body.maxVelocity.setTo(200,2000);
	
	this.createAlien();
	this.createWeapon();
	
	this.scoreText = this.add.text(32,0,' '+this.game.score,{fill: 'white'});
	this.scoreText.z = 10;
	//this.addMonkey();
	//this.moveMonkey();
	
	this.input.keyboard.addKeyCapture([
	                                   Phaser.Keyboard.LEFT,
	                                   Phaser.Keyboard.RIGHT,
	                                   Phaser.Keyboard.SPACEBAR,
	                                   Phaser.Keyboard.X]);
	this.player,inputEnabled = true;
	this.player.events.onInputDown.add(this.fireWeapon,this);
};


Level.prototype.update = function() {
	if(this.gameover) return;
	
	if(this.input.keyboard.isDown(Phaser.Keyboard.LEFT)){
		this.player.body.acceleration.x = -600;
	}else if (this.input.keyboard.isDown(Phaser.Keyboard.RIGHT)){
		this.player.body.acceleration.x = 600;
	}else{
		this.player.body.velocity.setTo(0,0);
		this.player.body.acceleration.setTo(0,0);
	}
	
};

Level.prototype.createWeapon = function() {
	this.weapon = this.add.weapon(10,"weapon",1);
	this.weapon.bulletKillType = Phaser.Weapon.KILL_WORLD_BOUNDS;
	this.weapon.trackSprite(this.player,-20,-30);
	this.weapon.bulletSpeed = 500;
	this.weapon.fireAngle = 270;
	this.weapon.rate = 600;
	
	this.weapon2 = this.add.weapon(10,"weapon2",2);
	this.weapon2.bulletKillType = Phaser.Weapon.KILL_WORLD_BOUNDS;
	this.weapon2.trackSprite(this.player,-20,-30);
	this.weapon2.bulletSpeed = 500;
	this.weapon2.fireAngle = 270;
	this.weapon2.rate = 600;
};

Level.prototype.fireWeapon = function() {
	// stop all monkey's movements
	//this.tweens.removeAll();
	this.weapon.fire();
	this.weapon2.fire();
/*
	// rotate monkey
	var twn = this.add.tween(this.monkey);
	twn.to({
		angle : this.monkey.angle + 360
	}, 1000, "Linear", true);

	// scale monkey
	twn = this.add.tween(this.monkey.scale);
	twn.to({
		x : 0.1,
		y : 0.1
	}, 1000, "Linear", true);

	// when tween completes, quit the game
	twn.onComplete.addOnce(this.quitGame, this);*/
};
Level.prototype.createAlien = function(){
	this.aliens = this.add.group(this.game.world,'aliens',false,true,Phaser.Physics.ARCADE);
	this.aliens.z = 100;
	for(i=0;i<30;i++){
		a = this.aliens.create(Math.random()*300,-Math.random()*300,"aliens");
		a.animations.add("fly").play(12,true);
		a.anchor.set(0.5);
		a.body.velocity.y = 50;
		tw = this.add.tween(a);
		var nx = 20+Math.random()*300;
		var nt = Math.random()*500;
		tw.to({x:nx},1000+nt,"Sine",true,0,Number.MAX_VALUE,true);
		
		if(Math.random()>0.5) a.body.angularVelocity = 60;
		else a.body.angularVelocity = -60;

	}
	
};
Level.prototype.update = function(){
	if(this.gameover) return;
	if(this.input.keyboard.isDown(Phaser.Keyboard.LEFT)){
		 this.player.body.acceleration.x = -600;
		 }else if(this.input.keyboard.isDown(Phaser.Keyboard.RIGHT)){
		 this.player.body.acceleration.x = 600;
		 }else{
		 this.player.body.velocity.setTo(0, 0);
		 this.player.body.acceleration.setTo(0, 0);
		 }
		 if(this.input.keyboard.isDown(Phaser.Keyboard.SPACEBAR)){
		 this.fireWeapon();}
		 this.aliens.forEachAlive(function(a){
			 if(a.y > this.world.height) a.y = -Math.random() * 300;
		 },this);
};

Level.prototype.quitGame = function() {
	this.game.state.start("Menu");
};
