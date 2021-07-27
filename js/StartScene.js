class StartScene extends Phaser.Scene {
    constructor() {
        super({ key: 'StartScene' });
    }

    preload() {
        this.load.image('startSceneBackground', '/assets/background/bgresized.png');
        this.load.image('playButton', '/assets/buttons/Play.png');
    }

    create() {
        const bg = this.add.sprite(0, 0, 'startSceneBackground');
        bg.setOrigin(0, 0);

        // const playButton = this.add.sprite(this.cameras.main.centerX, this.cameras.main.centerY + 100, 'playButton');
        // playButton.setScale(0.6);

        const playButton = new Button({
            scene: this,
            x: this.cameras.main.centerX,
            y: this.cameras.main.centerY + 100,
            scale: 0.6,
            key: "playButton"
        });

        // playButton.setInteractive({ cursor: 'pointer' });

        playButton.on('pointerdown', () => {
            this.scene.stop('StartScene');
            this.scene.start('GameScene');
        })
    }
}