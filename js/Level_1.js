


class Level_1 extends Phaser.Scene {

  constructor() {
    super({ key: 'level_1' });
    this.win;
    this.map;
    this.tileset;
    this.layer;
    this.coeur1;
    this.coeur2;
    this.coeur3;
    this.tombe = [];
    this.zombie = [];
    this.jacko = [];
    this.potion = [];
    this.currentMonster = [];
    this.dateTest = new Date().getTime();
    this.monsters_velocity = -50;
    this.dead = false;
  };

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
  stopGame = (player, tombe) => {
    if (player.life > 1) {
      tombe.life = 0
    }
  }

  hitPotion = (player, potion) => {
    potion.destroy();
    if (player.life === 300) {
      potion.life = 0
    }
    player.life += potion.life
    console.log(player.life)
  }

  damage = (player, monsters) => {
    monsters.destroy();
    player.life -= monsters.life
  }

  monsterMove = () => {
    this.zombie.map(monster => monster.body && monster.setVelocityX(this.monsters_velocity))
    this.jacko.map(monster => monster.body && monster.setVelocityX(this.monsters_velocity))
  }
  create() {
    let background = this.add.image(window.innerWidth / 2, window.innerHeight / 2, 'background').setScrollFactor(0).setDisplaySize(window.innerWidth, window.innerHeight);

    // IMAGE COEUR 
    let coeur1 = this.add.image(1250, 70, 'life').setScrollFactor(0);
    let coeur2 = this.add.image(1150, 70, 'middleLife').setScrollFactor(0);
    let coeur3 = this.add.image(1150, 70, 'noLife').setScrollFactor(0);

    let player = this.physics.add.sprite(400, 300, 'vampire');
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
    let playerPosition = player.body.setGravityY(200);

    let map = this.make.tilemap({ key: 'map' });
    this.tileset = map.addTilesetImage('spritesheet', 'tiles');
    this.layer = map.createDynamicLayer('top', this.tileset, 0, 0);

    this.layer.setCollisionByProperty({ collides: true });
    this.layer.setCollisionByExclusion([-1]);
    this.physics.world.bounds.width = this.layer.width;
    this.physics.world.bounds.height = this.layer.height;
    this.physics.add.collider(this.layer, this.player);



    // Pop des zombies aleatoirement 
    for (let i = 0; i < 8; i++) {
      this.zombie[i] = this.physics.add.sprite((Math.random() * 5000 + 800), 500, 'zombie').setScale(0.2);
      this.zombie[i].life = 50
      this.physics.add.collider(player, this.zombie[i], this.damage);
      this.physics.add.collider(this.layer, this.zombie[i]);
      this.zombie[i].flipX = true;
    }

    // Pop des JACKOs aleatoirement 
    for (let i = 0; i < 8; i++) {
      this.jacko[i] = this.physics.add.sprite((Math.random() * 5000 + 800), 500, 'jacko').setScale(0.15);
      this.jacko[i].life = 50
      this.physics.add.collider(player, this.jacko[i], this.damage);
      this.physics.add.collider(this.layer, this.jacko[i]);
      this.jacko[i].flipX = true;
    }

    // Pop des fioles aleatoirement 
    for (let i = 0; i < 5; i++) {
      this.potion[i] = this.physics.add.sprite(Math.random() * 5000, 500, 'gainLife').setScale(0.7);
      this.potion[i].life = 50
      this.physics.add.collider(player, this.potion[i], this.hitPotion);
      this.physics.add.collider(this.layer, this.potion[i]);
    }

    // YOU WIN
    this.tombe = this.physics.add.sprite(6300, 9, 'tombe').setScale(1.2)
    this.physics.add.collider(player, this.tombe, this.stopGame);
    this.physics.add.collider(this.layer, this.tombe);
    this.tombe.life = 50;

    // API TO GET NAMES FOR OUR ENNEMY
    axios('https://hackathon-wild-hackoween.herokuapp.com/monsters/')
      .then((response) => {
        console.log(response)
      })


  }





  update() {

    let cursors = this.input.keyboard.createCursorKeys();

    if (this.zombie[0].y < 717 && this.jacko[0].y < 717) {
      this.monsterMove();
    }

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
      this.player.setVelocityX(0);
    };

    if ((cursors.space.isDown || cursors.up.isDown) && player.body.onFloor()) {
      player.body.setVelocityY(-500); // jump up
    }

    if (player.y > 820) {
      dead = true
      if (dead = true) {
        player.life = 0
      };
      this.add.text(window.innerWidth / 3, window.innerHeight / 3, 'GAME OVER',
        {
          fontFamily: 'Verdana',
          fontSize: 100 + 'px',
          color: 'red',
        }).setScrollFactor(0);
      this.physics.pause();
      player.setTint(0xff0000);
      player.anims.play('walk', false);
    }


    if (player.life === 300) {
      coeur1.destroy();
      coeur1 = this.add.image(170, 70, 'life').setScrollFactor(0);
      coeur2.destroy();
      coeur2 = this.add.image(110, 70, 'life').setScrollFactor(0);
      coeur3.destroy();
      coeur3 = this.add.image(50, 70, 'life').setScrollFactor(0);
    } else if (player.life === 250) {
      coeur1.destroy();
      coeur1 = this.add.image(170, 70, 'middleLife').setScrollFactor(0);
      coeur2.destroy();
      coeur2 = this.add.image(110, 70, 'life').setScrollFactor(0);
      coeur3.destroy();
      coeur3 = this.add.image(50, 70, 'life').setScrollFactor(0);
    } else if (player.life === 200) {
      coeur1.destroy();
      coeur1 = this.add.image(170, 70, 'noLife').setScrollFactor(0);
      coeur2.destroy();
      coeur2 = this.add.image(110, 70, 'life').setScrollFactor(0);
      coeur3.destroy();
      coeur3 = this.add.image(50, 70, 'life').setScrollFactor(0);
    } else if (player.life === 150) {
      coeur1.destroy();
      coeur1 = this.add.image(170, 70, 'noLife').setScrollFactor(0);
      coeur2.destroy();
      coeur2 = this.add.image(110, 70, 'middleLife').setScrollFactor(0);
      coeur3.destroy();
      coeur3 = this.add.image(50, 70, 'life').setScrollFactor(0);
    } else if (player.life === 100) {
      coeur1.destroy();
      coeur1 = this.add.image(170, 70, 'noLife').setScrollFactor(0);
      coeur2.destroy();
      coeur2 = this.add.image(110, 70, 'noLife').setScrollFactor(0);
      coeur3.destroy();
      coeur3 = this.add.image(50, 70, 'life').setScrollFactor(0);
    } else if (player.life === 50) {
      coeur1.destroy();
      coeur1 = this.add.image(170, 70, 'noLife').setScrollFactor(0);
      coeur2.destroy();
      coeur2 = this.add.image(110, 70, 'noLife').setScrollFactor(0);
      coeur3.destroy();
      coeur3 = this.add.image(50, 70, 'middleLife').setScrollFactor(0);
    } else if (player.life === 0) {
      coeur1.destroy();
      coeur1 = this.add.image(170, 70, 'noLife').setScrollFactor(0);
      coeur2.destroy();
      coeur2 = this.add.image(110, 70, 'noLife').setScrollFactor(0);
      coeur3.destroy();
      coeur3 = this.add.image(50, 70, 'noLife').setScrollFactor(0);
      this.physics.pause();
      player.setTint(0xff0000);
      player.anims.play('walk', false);
      this.add.text(window.innerWidth / 3, window.innerHeight / 3, 'GAME OVER',
        {
          fontFamily: 'Verdana',
          fontSize: 100 + 'px',
          color: 'red',
        }).setScrollFactor(0);
    }

    if (this.tombe.life === 0) {
      this.add.text(window.innerWidth / 3, window.innerHeight / 3, 'YOU WIN',
        {
          fontFamily: 'Verdana',
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

}