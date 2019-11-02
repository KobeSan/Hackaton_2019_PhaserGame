var config = {
    type: Phaser.AUTO,
    width: 1700,
    height: 1500,
    physics: {
        default: 'arcade',
        arcade: {
            gravity: { y: 200 },
            debug: false
        }
    },
    scene: [
        TitleScene, Level_1,
    ]
};
var game = new Phaser.Game(config);
