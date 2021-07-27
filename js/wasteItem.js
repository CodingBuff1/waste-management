class WasteItem extends Phaser.GameObjects.Sprite {
    constructor(config) {
        super(config.scene, config.x, config.y, config.key);
        const item = config.scene.add.existing(this)
        item.setScale(0.5)
        item.setInteractive({ cursor: 'pointer' });
        config.scene.input.setDraggable(item);
        this.score = config.score;
        this.whichBin = config.whichBin;
        this.washingRequired = config.washingRequired;
        this.staffRequired = config.staffRequired;
    }
}