const config = {
  type: Phaser.AUTO,
  width: 800,
  height: 600,
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

let platforms;
let game = new Phaser.Game(config);


function preload() {
  this.load.image('background', '../Assets/Map/Graveyard/png/BG.png');
  this.load.image('groundBegin', '../Assets/Map/Graveyard/png/Tiles/Tile (1).png');
  this.load.image('groundMid', '../Assets/Map/Graveyard/png/Tiles/Tile (2).png');
  this.load.image('groundEnd', '../Assets/Map/Graveyard/png/Tiles/Tile (3).png');
  this.load.image('zombie', '../Assets/Characters/Zombies/png/male/Idle (1).png');
}

function create() {
  this.add.image(400, 300, 'background');
  player = this.physics.add.sprite(400,300, 'zombie');
  player.setScale(0.2);
  player.setBounce(0.2);
  player.setCollideWorldBounds(true);
  player.body.setGravityY(200);

  platforms = this.physics.add.staticGroup();
  platforms.create(65, 535, 'groundBegin').refreshBody();
  platforms.create(190, 535, 'groundMid')
  platforms.create(315, 535, 'groundMid')
  platforms.create(440, 535, 'groundMid')
  platforms.create(565, 535, 'groundMid')
  platforms.create(620, 535, 'groundMid')
  platforms.create(735, 535, 'groundEnd')

  this.physics.add.collider(player, platforms);
}

function update() {

  let cursors = this.input.keyboard.createCursorKeys();

  if (cursors.left.isDown)
  {
    player.setVelocityX(-160);
  }
  else if (cursors.right.isDown)
  {
    player.setVelocityX(160);
  }
  else
  {
    player.setVelocityX(0);
  };
  
  if (cursors.up.isDown && player.body.touching.down)
  {
    player.setVelocityY(-330);
  };
}
