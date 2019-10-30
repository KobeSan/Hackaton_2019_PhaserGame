const config = {
  type: Phaser.AUTO,
  width: 1900,
  height: 920,
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
      update: update
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
}

function create() {
  background = this.add.image(900, 500, 'background').setScrollFactor(0);

  player = this.physics.add.sprite(400,300, 'zombie');
  player.setScale(0.2);
  player.setBounce(0.2);
  player.setCollideWorldBounds(true);
  player.body.setGravityY(200);

  map = this.make.tilemap({key: 'map'});
  tileset = map.addTilesetImage('spritesheet', 'tiles');
  layer = map.createStaticLayer('top', tileset, 0, 0);

  layer.setCollisionByExclusion([-1]);
  this.physics.world.bounds.width = layer.width;
  this.physics.world.bounds.height = layer.height;
  this.physics.add.collider(layer, player);
}

function update() {

  let cursors = this.input.keyboard.createCursorKeys();

  if (cursors.left.isDown){
    player.setVelocityX(-160);
  }
  else if (cursors.right.isDown){
    player.setVelocityX(160);
  }
  else{
    player.setVelocityX(0);
  }
  
  if (cursors.up.isDown && player.body.touching.down){
    player.setVelocityY(-330);
  }

  // set bounds so the camera won't go outside the game world
  this.cameras.main.setBounds(0, 0, map.widthInPixels, map.heightInPixels);
  // make the camera follow the player
  this.cameras.main.startFollow(player);
}
