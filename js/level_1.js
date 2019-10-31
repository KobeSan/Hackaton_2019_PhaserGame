import Phaser from 'phaser';

class Level_1 extends Phaser.Scene{
  constructor(){
    super({
      key: 'level1'
    });
  }

let win;
let map;
let tileset;
let layer;
let coeur1;
let coeur2;
let coeur3;
let tombe = [];
let zombie = [];
let jacko = [];
let potion = [];
let currentMonster =[];
let dead = false;
let game = new Phaser.Game(config);

preload() {
  this.load.image('background', '../Assets/Map/Graveyard/png/BG.png');
  this.load.image('zombie', '../Assets/Characters/Zombies/png/male/Idle (1).png');
  this.load.image('tiles', '../Assets/Map/Graveyard/spritesheet.png');
  this.load.tilemapTiledJSON('map', '../Assets/Map/Graveyard/map.json');
  this.load.image('life', '../Assets/Life/fullLife.png');
  this.load.image('middleLife', '../Assets/Life/MidLife.png');
  this.load.image('noLife', '../Assets/Life/NoLife.png');
  this.load.image('gainLife', '../Assets/Life/FioleSang.png');
  this.load.image('tombe', '../Assets/Map/Graveyard/png/Objects/TombStone.png')
  this.load.image('jacko', '../Assets/Characters/JackO/png/Idle.png');
  this.load.atlas('vampire', './Assets/Characters/Vampire/vampireWalk.png', './Assets/Characters/Vampire/vampireWalk.json');
}

create() {
  background = this.add.image(window.innerWidth/2, window.innerHeight/2, 'background').setScrollFactor(0).setDisplaySize(window.innerWidth,window.innerHeight);

  // IMAGE COEUR 
  coeur1 = this.add.image(1250, 70, 'life').setScrollFactor(0);
  coeur2 = this.add.image(1150, 70, 'middleLife').setScrollFactor(0);
  coeur3 = this.add.image(1150, 70, 'noLife').setScrollFactor(0);

  player = this.physics.add.sprite(400, 300, 'vampire');
  player.life = 300

  let frameNames = this.textures.get('vampire').getFrameNames();
  this.anims.create({
    key: 'walk',
    frames: [
      {
        key: 'vampire',
        frame: 'walk_000.png'
      },
      {
        key: 'vampire',
        frame: 'walk_001.png'
      },
      {
        key: 'vampire',
        frame: 'walk_002.png'
      },
      {
        key: 'vampire',
        frame: 'walk_003.png'
      },
    ],
    frameRate: 8,
    repeat: 0
  });


  player.setScale(0.4);
  player.setCollideWorldBounds(true);
  playerPosition = player.body.setGravityY(200);

  map = this.make.tilemap({ key: 'map' });
  tileset = map.addTilesetImage('spritesheet', 'tiles');
  layer = map.createDynamicLayer('top', tileset, 0, 0);

  layer.setCollisionByProperty({ collides: true });
  layer.setCollisionByExclusion([-1]);
  this.physics.world.bounds.width = layer.width;
  this.physics.world.bounds.height = layer.height;
  this.physics.add.collider(layer, player);

 

  // Pop des zombies aleatoirement 
  for(let i = 0; i < 8; i++){
    zombie[i] = this.physics.add.sprite(Math.random()*4000, 500, 'zombie').setScale(0.2);
    zombie[i].life = 50
    this.physics.add.collider(player,zombie[i], damage);
    this.physics.add.collider(layer, zombie[i]);
  }

    // Pop des JACKOs aleatoirement 
  for(let i = 0; i < 8; i++){
    jacko[i] = this.physics.add.sprite(Math.random()*4000, 500, 'jacko').setScale(0.15);
    jacko[i].life = 50
    this.physics.add.collider(player,jacko[i], damage);
    this.physics.add.collider(layer, jacko[i]);
  }
  
  // Pop des fioles aleatoirement 
  for(let i = 0; i < 5; i++){
    potion[i] = this.physics.add.sprite(Math.random()*4000, 500, 'gainLife').setScale(0.7);
    potion[i].life = 50
    this.physics.add.collider(player,potion[i], hitPotion);
    this.physics.add.collider(layer, potion[i]);
  }

  // YOU WIN
  tombe = this.physics.add.sprite(6300, 9, 'tombe').setScale(1.2)
  this.physics.add.collider(player,tombe, stopGame);
  this.physics.add.collider(layer, tombe);
  tombe.life = 50;
 
  // API TO GET NAMES FOR OUR ENNEMY
  axios('https://hackathon-wild-hackoween.herokuapp.com/monsters/')
  .then((response) => {
    console.log(response)
    })

  
}

function stopGame(player, tombe){
 if(player.life > 1){
   tombe.life = 0
 }
} 

function hitPotion(player, potion) {
  potion.destroy();
  if(player.life === 300){
    potion.life = 0
  }
  player.life += potion.life
  console.log(player.life)
}

function damage(player,monsters) {
  monsters.destroy();
  player.life -= monsters.life
}


update() {

  let cursors = this.input.keyboard.createCursorKeys();

  if (cursors.left.isDown) {
    player.setVelocityX(-160);
    player.anims.play('walk', true)
    player.flipX = true
  }
  else if (cursors.right.isDown) {
    player.setVelocityX(160);
    player.anims.play('walk', true)
    player.flipX = false
  } else {
    player.setVelocityX(0);
  };

  if ((cursors.space.isDown || cursors.up.isDown) && player.body.onFloor()) {
    player.body.setVelocityY(-500); // jump up
  }

  if (player.y > 820) {
    dead = true
    if(dead = true){
      player.life = 0
    };
    this.add.text(window.innerWidth/3, window.innerHeight/3, 'GAME OVER', 
    { fontFamily: 'Verdana',
      fontSize: 100 + 'px',
      color: 'red',
    }).setScrollFactor(0);
    this.physics.pause();
    player.setTint(0xff0000);
    player.anims.play('walk', false);
  }

  
  if (player.life ===  300) {
    coeur1.destroy();
    coeur1 = this.add.image(170, 70, 'life').setScrollFactor(0);
    coeur2.destroy();
    coeur2 = this.add.image(110, 70, 'life').setScrollFactor(0);
    coeur3.destroy();
    coeur3 = this.add.image(50, 70, 'life').setScrollFactor(0);
  } else if (player.life === 250){
    coeur1.destroy();
    coeur1 = this.add.image(170, 70, 'middleLife').setScrollFactor(0);
    coeur2.destroy();
    coeur2 = this.add.image(110, 70, 'life').setScrollFactor(0);
    coeur3.destroy();
    coeur3 = this.add.image(50, 70, 'life').setScrollFactor(0);
  }else if (player.life === 200){
    coeur1.destroy();
    coeur1 = this.add.image(170, 70, 'noLife').setScrollFactor(0);
    coeur2.destroy();
    coeur2 = this.add.image(110, 70, 'life').setScrollFactor(0);
    coeur3.destroy();
    coeur3 = this.add.image(50, 70, 'life').setScrollFactor(0);
  }else if (player.life === 150){
    coeur1.destroy();
    coeur1 = this.add.image(170, 70, 'noLife').setScrollFactor(0);
    coeur2.destroy();
    coeur2 = this.add.image(110, 70, 'middleLife').setScrollFactor(0);
    coeur3.destroy();
    coeur3 = this.add.image(50, 70, 'life').setScrollFactor(0);
  }else if (player.life === 100){
    coeur1.destroy();
    coeur1 = this.add.image(170, 70, 'noLife').setScrollFactor(0);
    coeur2.destroy();
    coeur2 = this.add.image(110, 70, 'noLife').setScrollFactor(0);
    coeur3.destroy();
    coeur3 = this.add.image(50, 70, 'life').setScrollFactor(0);
  }else if (player.life === 50){
    coeur1.destroy();
    coeur1 = this.add.image(170, 70, 'noLife').setScrollFactor(0);
    coeur2.destroy();
    coeur2 = this.add.image(110, 70, 'noLife').setScrollFactor(0);
    coeur3.destroy();
    coeur3 = this.add.image(50, 70, 'middleLife').setScrollFactor(0);
  }else if (player.life === 0) {
    coeur1.destroy();
    coeur1 = this.add.image(170, 70, 'noLife').setScrollFactor(0);
    coeur2.destroy();
    coeur2 = this.add.image(110, 70, 'noLife').setScrollFactor(0);
    coeur3.destroy();
    coeur3 = this.add.image(50, 70, 'noLife').setScrollFactor(0);
    this.physics.pause();
    player.setTint(0xff0000);
    player.anims.play('walk', false);
    this.add.text(window.innerWidth/3, window.innerHeight/3, 'GAME OVER', 
    { fontFamily: 'Verdana',
      fontSize: 100 + 'px',
      color: 'red',
    }).setScrollFactor(0);
  }

  if(tombe.life === 0){
    this.add.text(window.innerWidth/3, window.innerHeight/3, 'YOU WIN', 
    { fontFamily: 'Verdana',
      fontSize: 100 + 'px',
      color: 'green',
    }).setScrollFactor(0);
    this.physics.pause();
    player.anims.play('walk', false);
  }


  // set bounds so the camera won't go outside the game world
  this.cameras.main.setBounds(0, 0, map.widthInPixels, map.heightInPixels);
  // make the camera follow the player
  this.cameras.main.startFollow(player);
}

export default Level_1;
