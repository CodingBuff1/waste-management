
const binTypes = {
    RED: "redbin",
    GREEN: "greenbin",
    BLUE: "bluebin",
    GREY: "greybin",
    BLACK: "blackBin"
}

class GameScene extends Phaser.Scene {
    constructor() {
        super({ key: 'GameScene' });
        this.counter = 0;
        this.score = 0;
        this.items = [];
    }

    preload() {
        this.load.image('mainSceneBackground', '/assets/background/mainbgresized.png');
        this.load.image(binTypes.RED, '/assets/bins/redbin.png');
        this.load.image(binTypes.BLUE, '/assets/bins/bluebin.png');
        this.load.image(binTypes.GREEN, '/assets/bins/greenbin.png');
        this.load.image(binTypes.GREY, '/assets/bins/greybin.png');
        this.load.image(binTypes.BLACK, '/assets/bins/blackBin.png');
        this.load.image('info', '/assets/buttons/Information.png');



        this.load.image('contactStaff', '/assets/buttons/contact-staff-to-dispose.png');
        this.load.image('washBeforeBin', '/assets/buttons/Wash-before-bin.png');

        for (let i = 1; i <= 3; i++) {
            const name = 'item' + i;
            this.load.image(name, '/assets/items/' + name + '.png');
            this.items.push(name);
        }
    }

    create() {
        let that = this;
        this.counter = 30;
        this.score = 0;
        this.dialogBox = null;

        // background
        let bg = this.add.image(0, 0, 'mainSceneBackground');
        bg.setOrigin(0, 0);



        this.timerText = this.add.text(this.cameras.main.centerX - 20, 10, 'Counter: 0', { font: "28px Arial", fill: "#000", align: "center" });

        // display score 
        this.scoreText = this.add.text(10, 10, 'Score: 0', { font: "28px Arial", fill: "#000", align: "center" });

        // buttons
        this.buttons = [
            new Button({
                scene: this,
                x: this.cameras.main.centerX + 300,
                y: this.cameras.main.centerY / 3,
                scale: 0.7,
                key: "contactStaff"
            }),
            new Button({
                scene: this,
                x: this.cameras.main.centerX + 300,
                y: this.cameras.main.centerY / 1.5,
                scale: 0.7,
                key: "washBeforeBin"
            })
        ];

        // creating bins
        this.bins = [
            new Bin({
                scene: this,
                x: this.cameras.main.centerX / 3,
                y: this.cameras.main.centerY + 180,
                key: binTypes.GREY,
                info: { button: 'info', text: "box 1", dialogBox: this.dialogBox }
            }),
            new Bin({
                scene: this,
                x: this.cameras.main.centerX / 3 + 130,
                y: this.cameras.main.centerY + 180,
                key: binTypes.BLUE
            }),
            new Bin({
                scene: this,
                x: this.cameras.main.centerX / 3 + 260,
                y: this.cameras.main.centerY + 180,
                key: binTypes.GREEN,
                info: { button: 'info', text: "box 2", dialogBox: this.dialogBox }
            }),
            new Bin({
                scene: this,
                x: this.cameras.main.centerX / 3 + 390,
                y: this.cameras.main.centerY + 180,
                key: binTypes.RED,
                info: { button: 'info', text: "box 3", dialogBox: this.dialogBox }
            }),
            new Bin({
                scene: this,
                x: this.cameras.main.centerX / 3 + 550,
                y: this.cameras.main.centerY + 180,
                key: binTypes.BLACK
            })

        ];

        // creating initial waste item
        this.item = new WasteItem({
            scene: this,
            x: this.cameras.main.centerX,
            y: this.cameras.main.centerY - 50,
            key: this.items[this.items.length - 1],
            score: 10,
            whichBin: binTypes.RED,
            washingRequired: true,
            staffRequired: false
        });

        this.buttons[0].on('pointerup', function () {
            if (that.item.staffRequired) {
                that.destroyCurrentItem(that.item);
                that.updateScore(that.item.score);
                that.spawnNewItem(binTypes.GREEN);
            }

        });

        this.buttons[1].on('pointerup', function () {
            if (that.item.washingRequired) {
                that.updateScore(5);
                that.item.washingRequired = false;
            }
        });

        // dragging and dropping
        this.input.on('drag', function (pointer, gameObject, dragX, dragY) {
            gameObject.x = dragX;
            gameObject.y = dragY;
        });

        this.input.on('dragend', function (pointer, gameObject) {
            gameObject.x = 400;
            gameObject.y = 250;

        });

        this.input.on('drop', function (pointer, gameObject, dropZone) {
            that.destroyCurrentItem(gameObject);
            if (gameObject.whichBin == dropZone.bin) {
                that.updateScore(gameObject.score);
            }
            that.spawnNewItem(binTypes.RED);
            dropZone.alpha = 1;
            // that.scene.pause();
            that.scene.resume();
        });

        this.input.on('dragenter', function (pointer, gameObject, dropZone) {
            dropZone.alpha = 0.5;
        });

        this.input.on('dragleave', function (pointer, gameObject, dropZone) {
            dropZone.alpha = 1;
        });

        this.timedEvent = this.time.addEvent({
            delay: 1000,
            callback: function () {
                this.timerText.setText('Counter: ' + this.counter);
                this.counter--;
            },
            callbackScope: this,
            loop: true
        });

        // console.log(this.timedEvent.paused = true)
        // console.log(this.timedEvent.paused = false)
    }

    update() {
        if (this.counter <= -1) {
            console.log('game over')
            this.counter = 10;
        }
    }

    destroyCurrentItem(gameObject) {
        this.items.pop();
        gameObject.destroy();
        if (this.items.length === 0) {
            this.scene.stop('GameScene');
            this.scene.start('StartScene');
        }
    }

    spawnNewItem(whichBin) {
        this.item = new WasteItem({
            scene: this,
            x: this.cameras.main.centerX,
            y: this.cameras.main.centerY - 50,
            key: this.items[this.items.length - 1],
            score: 10,
            whichBin: whichBin,
            washingRequired: true,
            staffRequired: false
        });
    }

    updateScore(score) {
        this.score += score;
        this.scoreText.setText(`Score: ${this.score}`)
    }
}