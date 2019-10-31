var titlescene = new TitleScene()

//* Game scene */
var config = {
    type: Phaser.AUTO,
    width: window.innerWidth,
    height: window.innerHeight,
    physics: {
        default: 'arcade',
        arcade: {
            gravity: { y: 200 },
            debug: false
        }
    },
    scene: [
        TitleScene, Level_1
    ]
};
var game = new Phaser.Game(config);
