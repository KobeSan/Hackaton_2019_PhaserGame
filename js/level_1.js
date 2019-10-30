const config = {
  type: Phaser.AUTO,
  width: window.innerWidth * window.devicePixelRatio,
  height: window.innerHeight * window.devicePixelRatio,
  physics: {
    default: 'arcade',
    arcade: {
      gravity: { y: 300 },
      debug: false
    }
  },
  scene: {
    preload: preload,
    create: create,
    update: update,
  }
};

let map;
let tileset;
let layer;
let game = new Phaser.Game(config);

function preload() {
  this.load.image('background', '../Assets/Map/Graveyard/png/BG.png');
  this.load.image('zombie', '../Assets/Characters/Zombies/png/male/Idle (1).png');
  this.load.image('tiles', '../Assets/Map/Graveyard/spritesheet.png');
  this.load.tilemapTiledJSON('map', '../Assets/Map/Graveyard/map.json');
  this.load.image('life', '../Assets/Life/fullLife.png');
  this.load.image('middleLife', '../Assets/Life/MidLife.png');
  this.load.image('noLife', '../Assets/Life/NoLife.png');
  this.load.image('gainLife', '../Assets/Life/FioleSang.png');

  // this.load.animation('vampire', './Assets/Characters/Vampire/vampireWalk.json');
  this.load.atlas('vampire', './Assets/Characters/Vampire/vampireWalk.png', './Assets/Characters/Vampire/vampireWalk.json');

}

function create() {
 
  player = this.physics.add.sprite(400, 300, 'vampire');

  background = this.add.image(900, 500, 'background').setScrollFactor(0);

  this.add.image(650, 375, 'background');

  potion = this.physics.add.sprite(500, 435, 'gainLife');
  potion.life = 50
  player.life = 200 

  player.setScale(0.2);
  //player.setBounce(0.2);
  player.setCollideWorldBounds(true);
  player.body.setGravityY(200);

  map = this.make.tilemap({key: 'map'});
  tileset = map.addTilesetImage('spritesheet', 'tiles');
  layer = map.createDynamicLayer('top', tileset, 0, 0);

  layer.setCollisionByProperty({collides: true});
  this.physics.add.collider(player, potion, hitPotion);
  this.physics.add.collider(potion, layer);
  layer.setCollisionByExclusion([-1]);
  this.physics.world.bounds.width = layer.width;
  this.physics.world.bounds.height = layer.height;
  this.physics.add.collider(layer, player);
}

function hitPotion(player, potion) {
  potion.destroy();
  player.life += potion.life
}

function update() {

  let cursors = this.input.keyboard.createCursorKeys();

  if (cursors.left.isDown) {
    player.setVelocityX(-160);
  }
  else if (cursors.right.isDown) {
    player.setVelocityX(160);
  }
  else {
    player.setVelocityX(0);
  };

  if ((cursors.space.isDown || cursors.up.isDown) && player.body.onFloor())
  {
      player.body.setVelocityY(-500); // jump up
  }

  if (player.life ===  300) {
    this.add.image(1250, 70, 'life');
    this.add.image(1200, 70, 'life');
    this.add.image(1150, 70, 'life');
  } else if (player.life === 250){
    this.add.image(1250, 70, 'life');
    this.add.image(1200, 70, 'life');
    this.add.image(1150, 70, 'middleLife');
  }else if (player.life === 200){
    this.add.image(1250, 70, 'life');
    this.add.image(1200, 70, 'life');
    this.add.image(1150, 70, 'noLife');
  }else if (player.life === 150){
    this.add.image(1250, 70, 'life');
    this.add.image(1200, 70, 'middleLife');
    this.add.image(1150, 70, 'noLife');
  }else if (player.life === 100){
    this.add.image(1250, 70, 'life');
    this.add.image(1200, 70, 'noLife');
    this.add.image(1150, 70, 'noLife');
  }else if (player.life === 50){
    this.add.image(1250, 70, 'middleLife');
    this.add.image(1200, 70, 'noLife');
    this.add.image(1150, 70, 'noLife');
  }
  // set bounds so the camera won't go outside the game world
  this.cameras.main.setBounds(0, 0, map.widthInPixels, map.heightInPixels);
  // make the camera follow the player
  this.cameras.main.startFollow(player);
  
}