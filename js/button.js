class Button extends Phaser.GameObjects.Sprite {
    constructor(config) {
        super(config.scene, config.x, config.y, config.key);
        config.scene.add.existing(this);
        this.setInteractive({ cursor: 'pointer' });
        this.setScale(config.scale);
        this.on('pointerover', function () {
            this.setTint(0x92D050);
        });

        this.on('pointerout', function () {
            this.clearTint();
        });
    }
}