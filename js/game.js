const config = {
    type: Phaser.AUTO,
    mode: Phaser.Scale.FIT,
    autoCenter: Phaser.Scale.CENTER_BOTH,
    width: 800,
    height: 600,
    backgroundColor: "b9eaff",
    physics: {
        default: 'arcade',
        debug: true,
        arcade: {
            gravity: { y: 200 },
            enableBody: true,
        }
    },
    scene: [StartScene, GameScene, EndScene]
};

const game = new Phaser.Game(config);

