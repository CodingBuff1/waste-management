let dialogBox = {
    X: 150,
    Y: 150,
    W: 500,
    H: 200,
    BG: 0x00B2A9,
    TEXT_STYLE: {
        fontSize: 20, fill: '#ffff', align: 'center', wordWrap: { width: 495 }, lineSpacing: 8
    }
}

class DialogBoxButton extends Phaser.GameObjects.Rectangle {
    constructor(scene, dialogBox, x, y) {
        super(scene, x, y, 110, 40, 0xb39c0e, 0);
        this.setOrigin(0, 0);
        this.strokeColor = 0xFF302F;
        this.strokeWeight = 4;
        this.strokeAlpha = 2;
        this.isStroked = true;
        this.setOrigin(0, 0)
        this.depth = 1;
        this.setInteractive({ cursor: 'pointer' });
        scene.add.existing(this);
        this.optionText = scene.add.text(x, y, "Continue", { fontSize: 20, fill: '#FF302F', align: 'center' });
        const optionTextBounds = this.optionText.getBounds()
        this.optionText.setX(optionTextBounds.x + 55 - (optionTextBounds.width / 2));
        this.optionText.setY(optionTextBounds.y + 20 - (optionTextBounds.height / 2));
        this.optionText.depth = 1

        this.on('pointerup', function () {
            dialogBox.hide();
        });
    }

    hide() {
        this.visible = false;
        this.optionText.visible = false;
    }

    show() {
        this.visible = true;
        this.optionText.visible = true;
    }
}

class DialogBox extends Phaser.GameObjects.Rectangle {
    constructor(scene, text) {
        super(scene, dialogBox.X, dialogBox.Y, dialogBox.W, dialogBox.H, dialogBox.BG);
        this.scene = scene;
        this.depth = 1;
        this.setOrigin(0, 0);
        scene.add.existing(this);
        this.narrative = new DialogBoxText(scene, dialogBox.X + 10, dialogBox.Y + 10, text, dialogBox.TEXT_STYLE);
        this.button = new DialogBoxButton(scene, this, 400 - 50, 300);

        this.visible = false;
        this.narrative.visible = false;
        this.button.hide();
    }

    hide() {
        this.visible = false;
        this.narrative.visible = false;
        this.button.hide();

        this.scene.timedEvent.paused = false;
        this.scene.item.visible = true;
        this.scene.buttons[0].visible = true;
        this.scene.buttons[1].visible = true;
    }

    show() {
        this.visible = true;
        this.narrative.visible = true;
        this.button.show();

        this.scene.timedEvent.paused = true
        this.scene.item.visible = false;
        this.scene.buttons[0].visible = false;
        this.scene.buttons[1].visible = false;


    }
}

class DialogBoxText extends Phaser.GameObjects.Text {
    constructor(scene, x, y, text, style) {
        super(scene, x, y, text, style);
        this.depth = 1;
        scene.add.existing(this);
    }
}