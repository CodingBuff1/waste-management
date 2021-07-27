class Bin extends Phaser.GameObjects.Sprite {
    constructor(config) {
        super(config.scene, config.x, config.y, config.key);
        this.setScale(0.5)
        this.setInteractive()
        this.input.dropZone = true;
        this.bin = config.key;

        config.scene.add.existing(this);

        if (config.info) {
            this.infoButton = new Button({
                scene: config.scene,
                x: config.x,
                y: config.y + 30,
                scale: 0.2,
                key: config.info.button
            })
            this.infoButton.on('pointerup', function () {
                if (config.info.dialogBox) {
                    config.info.dialogBox.show();
                } else {
                    config.info.dialogBox = new DialogBox(config.scene, config.info.text);
                    config.info.dialogBox.show();
                }

            });
        }
    }
}