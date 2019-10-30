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
  player = this.physics.add.sprite(400,300, 'zombie');
  player.setScale(0.2);
  player.setBounce(0.2);
  player.setCollideWorldBounds(true);
  player.body.setGravityY(200);

  map = this.make.tilemap({key: 'map'});
  tileset = map.addTilesetImage('spritesheet', 'tiles');
  layer = map.createStaticLayer('top', tileset, 0, 0);

  layer.setCollisionByProperty({collides: true});
  this.physics.add.collider(player, layer);
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
}
