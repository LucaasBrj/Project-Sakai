import dialogs from './dialogs.js';
import { brosKazekageAnimation, updateFightDialog1, updateFightDialog2, writeDialogText, writeQuestText, questProgress, disablePlaceItems, displayFinishedBrothers, brosCompleted, bros, fieldDialog, setFieldDialog, cancelFightDialogueTimeouts } from './functions.js';

const height = 1080
const width = 1920

var config = {
    type: Phaser.AUTO,
    width: width,
    height: height,
    physics: {
        default: 'arcade',
    },
    pixelArt: true,
    scene: {
        preload: preload,
        create: create,
        update: update
    }
};

const game = new Phaser.Game(config);

let lieu = "palais"
let rue = null;
let introDialogPage = 1;
let dialogPage = 0;
let dialogBot1Page = 0;
let dialogBot2et3Page = 0;
let dialogBot4Page = 0;
let isFightDialogStarted = false;
let frere3 = null;
let frere4 = null;
let frere2 = null;
let frere5 = null;
let inDialogue = true;
let redirectionBox = false;
let espaceRelache = true;
let frere5Hitbox = null;

function preload ()
{
    this.load.image('bg1', 'assets/images/backgrounds/bg1.png');
    this.load.image('bg2', 'assets/images/backgrounds/bg2.png');
    this.load.image('bg3', 'assets/images/backgrounds/bg3.png');
    this.load.image('bg4', 'assets/images/backgrounds/bg4.png');
    this.load.image('bg5', 'assets/images/backgrounds/bg5.png');
    this.load.image('batiments', 'assets/images/backgrounds/batiments.png');
    this.load.image('statue', 'assets/images/backgrounds/statue.png');
    this.load.image('piedstatue', 'assets/images/backgrounds/piedstatue.png');
    this.load.image('barrieres', 'assets/images/backgrounds/barrieres.png');
    this.load.audio('startSound', 'assets/sounds/effects/start.mp3');
    this.load.audio('dialogueSound', 'assets/sounds/effects/dialogue.mp3');
    this.load.audio('kazekageOst', 'assets/sounds/ost/kazekage.mp3');
    this.load.audio('themeOst', 'assets/sounds/ost/theme.mp3');

    this.load.spritesheet('walkSide1', 'assets/images/characters/walkSide/1.png', {
        frameWidth: 29,
        frameHeight: 32
    });
    this.load.spritesheet('walkUp1', 'assets/images/characters/walkUp/1.png', {
        frameWidth: 34,
        frameHeight: 32
    });
    this.load.spritesheet('walkDown1', 'assets/images/characters/walkDown/1.png', {
        frameWidth: 34,
        frameHeight: 32
    });

    this.load.spritesheet('walkSide2', 'assets/images/characters/walkSide/2.png', {
        frameWidth: 29,
        frameHeight: 32
    });
    this.load.spritesheet('walkUp2', 'assets/images/characters/walkUp/2.png', {
        frameWidth: 34,
        frameHeight: 32
    });
    this.load.spritesheet('walkDown2', 'assets/images/characters/walkDown/2.png', {
        frameWidth: 34,
        frameHeight: 32
    });

    this.load.spritesheet('walkSide3', 'assets/images/characters/walkSide/3.png', {
        frameWidth: 29,
        frameHeight: 32
    });
    this.load.spritesheet('walkUp3', 'assets/images/characters/walkUp/3.png', {
        frameWidth: 34,
        frameHeight: 32
    });
    this.load.spritesheet('walkDown3', 'assets/images/characters/walkDown/3.png', {
        frameWidth: 34,
        frameHeight: 32
    });

    this.load.spritesheet('walkSide4', 'assets/images/characters/walkSide/4.png', {
        frameWidth: 29,
        frameHeight: 32
    });
    this.load.spritesheet('walkUp4', 'assets/images/characters/walkUp/4.png', {
        frameWidth: 34,
        frameHeight: 32
    });
    this.load.spritesheet('walkDown4', 'assets/images/characters/walkDown/4.png', {
        frameWidth: 34,
        frameHeight: 32
    });

    this.load.spritesheet('walkSide5', 'assets/images/characters/walkSide/5.png', {
        frameWidth: 29,
        frameHeight: 32
    });
    this.load.spritesheet('walkUp5', 'assets/images/characters/walkUp/5.png', {
        frameWidth: 34,
        frameHeight: 32
    });
    this.load.spritesheet('walkDown5', 'assets/images/characters/walkDown/5.png', {
        frameWidth: 34,
        frameHeight: 32
    });
}

function create ()
{
    this.input.on('pointerdown', function (pointer) {
        console.log('Coordonnées du clic: x=' + pointer.x + ' y=' + pointer.y);
    });
    this.cameras.main.setBackgroundColor('#21181b');
    this.startSound = this.sound.add('startSound');
    this.dialogueSound = this.sound.add('dialogueSound');

    var fullScreenButton = document.getElementById('fullScreenButton');
    fullScreenButton.addEventListener('click', () => {
        this.sound.play('startSound', { delay: 0, volume: 3});
    });

    this.player = this.physics.add.sprite(width/2-10, height-250, 'walkUp1');
    this.player.setScale(3.55)
    this.anims.create({
        key: 'walkSide1',
        frames: this.anims.generateFrameNumbers('walkSide1', { start: 0, end: 3 }),
        frameRate: 10,
        repeat: -1
    });
    this.anims.create({
        key: 'walkUp1',
        frames: this.anims.generateFrameNumbers('walkUp1', { start: 0, end: 5 }),
        frameRate: 8,
        repeat: -1
    });
    this.anims.create({
        key: 'walkDown1',
        frames: this.anims.generateFrameNumbers('walkDown1', { start: 0, end: 5 }),
        frameRate: 8,
        repeat: -1
    });

    this.anims.create({
        key: 'walkSide2',
        frames: this.anims.generateFrameNumbers('walkSide2', { start: 0, end: 3 }),
        frameRate: 10,
        repeat: -1
    });
    this.anims.create({
        key: 'walkUp2',
        frames: this.anims.generateFrameNumbers('walkUp2', { start: 0, end: 5 }),
        frameRate: 8,
        repeat: -1
    });
    this.anims.create({
        key: 'walkDown2',
        frames: this.anims.generateFrameNumbers('walkDown2', { start: 0, end: 5 }),
        frameRate: 8,
        repeat: -1
    });

    this.frere4 = this.physics.add.sprite(770, 270, 'walkDown3');
    this.frere4.setDepth(-1);
    this.frere4.setScale(3.55);
    this.anims.create({
        key: 'walkSide3',
        frames: this.anims.generateFrameNumbers('walkSide3', { start: 0, end: 3 }),
        frameRate: 10,
        repeat: -1
    });
    this.anims.create({
        key: 'walkUp3',
        frames: this.anims.generateFrameNumbers('walkUp3', { start: 0, end: 5 }),
        frameRate: 8,
        repeat: -1
    });
    this.anims.create({
        key: 'walkDown3',
        frames: this.anims.generateFrameNumbers('walkDown3', { start: 0, end: 5 }),
        frameRate: 8,
        repeat: -1
    });
    this.frere4.disableBody(true, true);

    this.frere5 = this.physics.add.sprite(770, 270, 'walkDown4');
    this.frere5.setDepth(-1);
    this.frere5.setScale(3.55);
    this.anims.create({
        key: 'walkSide4',
        frames: this.anims.generateFrameNumbers('walkSide4', { start: 0, end: 3 }),
        frameRate: 10,
        repeat: -1
    });
    this.anims.create({
        key: 'walkUp4',
        frames: this.anims.generateFrameNumbers('walkUp4', { start: 0, end: 5 }),
        frameRate: 8,
        repeat: -1
    });
    this.anims.create({
        key: 'walkDown4',
        frames: this.anims.generateFrameNumbers('walkDown4', { start: 0, end: 5 }),
        frameRate: 8,
        repeat: -1
    });
    this.anims.create({
        key: 'walkSide5',
        frames: this.anims.generateFrameNumbers('walkSide5', { start: 0, end: 3 }),
        frameRate: 10,
        repeat: -1
    });
    this.anims.create({
        key: 'walkUp5',
        frames: this.anims.generateFrameNumbers('walkUp5', { start: 0, end: 5 }),
        frameRate: 8,
        repeat: -1
    });
    this.anims.create({
        key: 'walkDown5',
        frames: this.anims.generateFrameNumbers('walkDown5', { start: 0, end: 5 }),
        frameRate: 8,
        repeat: -1
    });
    this.frere5.disableBody(true, true);

    this.bg1 = this.add.image(width/2, height/2, 'bg1').setDepth(-6);
    this.bg1.displayHeight = height;
    this.bg1.setOrigin(0.5, 0.5);
    this.bg1.displayWidth = height;
    this.bg2 = this.add.image(width/2, height/2, 'bg2').setDepth(-7).setVisible(false);
    this.bg2.displayHeight = height;
    this.bg2.setOrigin(0.5, 0.5);
    this.bg2.displayWidth = width;
    this.bg3 = this.add.image(width/2, height/2, 'bg3').setDepth(-7).setVisible(false);
    this.bg3.displayHeight = height;
    this.bg3.setOrigin(0.5, 0.5);
    this.bg3.displayWidth = height;
    this.bg4 = this.add.image(width/2, height/2, 'bg4').setDepth(-7).setVisible(false);
    this.bg4.displayHeight = height;
    this.bg4.setOrigin(0.5, 0.5);
    this.bg4.displayWidth = width;
    this.bg5 = this.add.image(width/2, height/2, 'bg5').setDepth(-7).setVisible(false);
    this.bg5.displayHeight = height;
    this.bg5.setOrigin(0.5, 0.5);
    this.bg5.displayWidth = width;

    writeQuestText(dialogs.quests[0], 'questText');

    this.player.setVelocity(0);

    // ********************************************************* CREATE BUREAU DU KAZEKAGE *********************************************************

    this.bureauPart1 = this.physics.add.sprite(945, 330);
    this.bureauPart2 = this.physics.add.sprite(800, 280);
    this.bureauPart3 = this.physics.add.sprite(1090, 280);
    this.physics.world.enable(this.bureauPart1);
    this.physics.world.enable(this.bureauPart2);
    this.physics.world.enable(this.bureauPart3);
    this.physics.add.collider(this.player, this.bureauPart1)
    this.physics.add.collider(this.player, this.bureauPart2)
    this.physics.add.collider(this.player, this.bureauPart3)
    this.bureauPart1.body.setImmovable(true);
    this.bureauPart2.body.setImmovable(true);
    this.bureauPart3.body.setImmovable(true);
    this.bureauPart1.setDisplaySize(200, 60);
    this.bureauPart2.setDisplaySize(30, 100);
    this.bureauPart3.setDisplaySize(30, 100);

    this.topWall = this.physics.add.sprite(560, 150);
    this.physics.world.enable(this.topWall);
    this.topWall.body.setImmovable(true);
    this.topWall.setDisplaySize(2000, 10);
    this.physics.add.collider(this.player, this.topWall);

    this.chess = this.physics.add.sprite(650, 620);
    this.physics.world.enable(this.chess);
    this.chess.body.setImmovable(true);
    this.chess.setDisplaySize(10, 10);
    this.physics.add.collider(this.player, this.chess);

    this.kazekageLeftLibrary = this.physics.add.sprite(490, 600);
    this.physics.world.enable(this.kazekageLeftLibrary);
    this.kazekageLeftLibrary.body.setImmovable(true);
    this.kazekageLeftLibrary.setDisplaySize(70, 750);
    this.physics.add.collider(this.player, this.kazekageLeftLibrary);

    this.kazekageRightLibrary = this.physics.add.sprite(1400, 600);
    this.physics.world.enable(this.kazekageRightLibrary);
    this.kazekageRightLibrary.body.setImmovable(true);
    this.kazekageRightLibrary.setDisplaySize(70, 750);
    this.physics.add.collider(this.player, this.kazekageRightLibrary);

    this.kazekageBottomWall = this.physics.add.sprite(710, 1025);
    this.physics.world.enable(this.kazekageBottomWall);
    this.kazekageBottomWall.body.setImmovable(true);
    this.kazekageBottomWall.setDisplaySize(200, 10);
    this.physics.add.collider(this.player, this.kazekageBottomWall);

    this.kazekageBottomWall2 = this.physics.add.sprite(1190, 1025);
    this.physics.world.enable(this.kazekageBottomWall2);
    this.kazekageBottomWall2.body.setImmovable(true);
    this.kazekageBottomWall2.setDisplaySize(200, 10);
    this.physics.add.collider(this.player, this.kazekageBottomWall2);

    // ********************************************************* CREATE LIBRAIRIE DE SUNA *********************************************************

    this.bibliotheque1 = this.physics.add.sprite(200, 210, 'hit');
    this.bibliotheque1.setDisplaySize(30, 250);
    this.bibliotheque1.setImmovable(true);
    this.physics.add.collider(this.player, this.bibliotheque1);

    this.bibliotheque2 = this.physics.add.sprite(200, 600, 'hit');
    this.bibliotheque2.setDisplaySize(30, 250);
    this.bibliotheque2.setImmovable(true);
    this.physics.add.collider(this.player, this.bibliotheque2);

    this.bibliotheque3 = this.physics.add.sprite(400, 210, 'hit');
    this.bibliotheque3.setDisplaySize(30, 250);
    this.bibliotheque3.setImmovable(true);
    this.physics.add.collider(this.player, this.bibliotheque3);

    this.bibliotheque4 = this.physics.add.sprite(400, 600, 'hit');
    this.bibliotheque4.setDisplaySize(30, 250);
    this.bibliotheque4.setImmovable(true);
    this.physics.add.collider(this.player, this.bibliotheque4);

    this.bibliotheque5 = this.physics.add.sprite(600, 210, 'hit');
    this.bibliotheque5.setDisplaySize(30, 250);
    this.bibliotheque5.setImmovable(true);
    this.physics.add.collider(this.player, this.bibliotheque5);

    this.bibliotheque6 = this.physics.add.sprite(600, 600, 'hit');
    this.bibliotheque6.setDisplaySize(30, 250);
    this.bibliotheque6.setImmovable(true);
    this.physics.add.collider(this.player, this.bibliotheque6);

    this.bibliotheque7 = this.physics.add.sprite(800, 210, 'hit');
    this.bibliotheque7.setDisplaySize(30, 250);
    this.bibliotheque7.setImmovable(true);
    this.physics.add.collider(this.player, this.bibliotheque7);

    this.bibliotheque8 = this.physics.add.sprite(800, 600, 'hit');
    this.bibliotheque8.setDisplaySize(30, 250);
    this.bibliotheque8.setImmovable(true);
    this.physics.add.collider(this.player, this.bibliotheque8);

    this.topWallLibrairie = this.physics.add.sprite(0, 120, 'hit');
    this.topWallLibrairie.setDisplaySize(2000, 10);
    this.topWallLibrairie.setImmovable(true);
    this.physics.add.collider(this.player, this.topWallLibrairie);

    this.chairLibrary1 = this.physics.add.sprite(200, 400, 'hit');
    this.chairLibrary1.setDisplaySize(10, 10);
    this.chairLibrary1.setImmovable(true);
    this.physics.add.collider(this.player, this.chairLibrary1);

    this.chairsAndTable1 = this.physics.add.sprite(200, 330, 'hit');
    this.chairsAndTable1.setDisplaySize(300, 10);
    this.chairsAndTable1.setImmovable(true);
    this.physics.add.collider(this.player, this.chairsAndTable1);

    this.tableLibrary1 = this.physics.add.sprite(200, 700, 'hit');
    this.tableLibrary1.setDisplaySize(30, 30);
    this.tableLibrary1.setImmovable(true);
    this.physics.add.collider(this.player, this.tableLibrary1);

    this.chairsAndTable2 = this.physics.add.sprite(200, 770, 'hit');
    this.chairsAndTable2.setDisplaySize(300, 100);
    this.chairsAndTable2.setImmovable(true);
    this.physics.add.collider(this.player, this.chairsAndTable2);

    this.bottomWallLibrairie = this.physics.add.sprite(450, 800, 'hit');
    this.bottomWallLibrairie.setDisplaySize(2000, 10);
    this.bottomWallLibrairie.setImmovable(true);
    this.physics.add.collider(this.player, this.bottomWallLibrairie);

    this.leftWallLibrairie = this.physics.add.sprite(20, 0, 'hit');
    this.leftWallLibrairie.setDisplaySize(10, 1000);
    this.leftWallLibrairie.setImmovable(true);
    this.physics.add.collider(this.player, this.leftWallLibrairie);

    this.leftWallLibrairie2 = this.physics.add.sprite(20, 700, 'hit');
    this.leftWallLibrairie2.setDisplaySize(10, 300);
    this.leftWallLibrairie2.setImmovable(true);
    this.physics.add.collider(this.player, this.leftWallLibrairie2);

    this.frere2Hitbox = this.physics.add.sprite(770, 210, 'hit');
    this.frere2Hitbox.setDisplaySize(80, 80);
    this.frere2Hitbox.setImmovable(true);
    this.physics.add.collider(this.player, this.frere2Hitbox);

    this.leftWallLibrairieBack = this.physics.add.sprite(375, 0, 'hit');
    this.leftWallLibrairieBack.setDisplaySize(10, 5000);
    this.leftWallLibrairieBack.setImmovable(true);
    this.physics.add.collider(this.player, this.leftWallLibrairieBack);

    this.rightWallLibrairie = this.physics.add.sprite(1500, 0, 'hit');
    this.rightWallLibrairie.setDisplaySize(10, 5000);
    this.rightWallLibrairie.setImmovable(true);
    this.physics.add.collider(this.player, this.rightWallLibrairie)

    this.bibliotheque1.disableBody(true, true);
    this.bibliotheque2.disableBody(true, true);
    this.bibliotheque3.disableBody(true, true);
    this.bibliotheque4.disableBody(true, true);
    this.bibliotheque5.disableBody(true, true);
    this.bibliotheque6.disableBody(true, true);
    this.bibliotheque7.disableBody(true, true);
    this.bibliotheque8.disableBody(true, true);
    this.topWallLibrairie.disableBody(true, true);
    this.chairLibrary1.disableBody(true, true);
    this.chairsAndTable1.disableBody(true, true);
    this.tableLibrary1.disableBody(true, true);
    this.chairsAndTable2.disableBody(true, true);
    this.bottomWallLibrairie.disableBody(true, true);
    this.leftWallLibrairie.disableBody(true, true);
    this.leftWallLibrairie2.disableBody(true, true);
    this.frere2Hitbox.disableBody(true, true);
    this.leftWallLibrairieBack.disableBody(true, true);
    this.rightWallLibrairie.disableBody(true, true);


    // ********************************************************* CREATE PLACE DE SUNA *********************************************************

    this.statueHitbox = this.physics.add.sprite(940, 740, 'hit');
    this.statueHitbox.setDisplaySize(300, 100);
    this.statueHitbox.setImmovable(true);
    this.physics.add.collider(this.player, this.statueHitbox);

    this.hautGaucheMaison = this.physics.add.sprite(500, 200, 'hit');
    this.hautGaucheMaison.setDisplaySize(850, 300);
    this.hautGaucheMaison.setImmovable(true);
    this.hautGaucheMaison2 = this.physics.add.sprite(270, 450, 'hit');
    this.hautGaucheMaison2.setDisplaySize(500, 200);
    this.hautGaucheMaison2.setImmovable(true);
    this.hautGaucheMaison3 = this.physics.add.sprite(550, 300, 'hit');
    this.hautGaucheMaison3.setDisplaySize(400, 250);
    this.hautGaucheMaison3.setImmovable(true);
    this.physics.add.collider(this.player, this.hautGaucheMaison);
    this.physics.add.collider(this.player, this.hautGaucheMaison2);
    this.physics.add.collider(this.player, this.hautGaucheMaison3);

    this.doublePot = this.physics.add.sprite(275, 580, 'hit');
    this.doublePot.setDisplaySize(100, 50);
    this.doublePot.setImmovable(true);
    this.doublePot2 = this.physics.add.sprite(1675, 555, 'hit');
    this.doublePot2.setDisplaySize(100, 50);
    this.doublePot2.setImmovable(true);
    this.physics.add.collider(this.player, this.doublePot);
    this.physics.add.collider(this.player, this.doublePot2);

    this.hautDroiteMaison = this.physics.add.sprite(1550, 220, 'hit');
    this.hautDroiteMaison.setDisplaySize(750, 430);
    this.hautDroiteMaison.setImmovable(true);
    this.hautDroiteMaison2 = this.physics.add.sprite(1550, 385, 'hit');
    this.hautDroiteMaison2.setDisplaySize(500, 200);
    this.hautDroiteMaison2.setImmovable(true);
    this.hautDroiteMaison3 = this.physics.add.sprite(1830, 480, 'hit');
    this.hautDroiteMaison3.setDisplaySize(200, 100);
    this.hautDroiteMaison3.setImmovable(true);
    this.physics.add.collider(this.player, this.hautDroiteMaison);
    this.physics.add.collider(this.player, this.hautDroiteMaison2);
    this.physics.add.collider(this.player, this.hautDroiteMaison3);

    this.batiments = this.add.image(width/2, height/2, 'batiments').setDepth(10);
    this.batiments.displayHeight = height;
    this.batiments.setOrigin(0.5, 0.5);
    this.batiments.displayWidth = width;

    this.statue = this.add.image(width/2, height/2, 'statue').setDepth(10);
    this.statue.displayHeight = height;
    this.statue.setOrigin(0.5, 0.5);
    this.statue.displayWidth = width;

    this.piedstatue = this.add.image(width/2, height/2, 'piedstatue').setDepth(-2);
    this.piedstatue.displayHeight = height;
    this.piedstatue.setOrigin(0.5, 0.5);
    this.piedstatue.displayWidth = width;

    this.statueHitbox.disableBody(true, true);
    this.hautGaucheMaison.disableBody(true, true);
    this.hautGaucheMaison2.disableBody(true, true);
    this.hautGaucheMaison3.disableBody(true, true);
    this.doublePot.disableBody(true, true);
    this.doublePot2.disableBody(true, true);
    this.hautDroiteMaison.disableBody(true, true);
    this.hautDroiteMaison2.disableBody(true, true);
    this.hautDroiteMaison3.disableBody(true, true);
    this.batiments.setVisible(false);
    this.statue.setVisible(false);
    this.piedstatue.setVisible(false);


    // ********************************************************* CREATE TERRAIN DE SUNA *********************************************************

    this.barrieres = this.add.image(width/2, height/2, 'barrieres').setDepth(10);
    this.barrieres.displayHeight = height;
    this.barrieres.setOrigin(0.5, 0.5);
    this.barrieres.displayWidth = width;

    this.grillageTerrain1 = this.physics.add.sprite(385, 670);
    this.grillageTerrain1.setDisplaySize(920, 10);
    this.grillageTerrain1.setImmovable(true);
    this.physics.add.collider(this.player, this.grillageTerrain1);

    this.grillageTerrain2 = this.physics.add.sprite(1500, 670);
    this.grillageTerrain2.setDisplaySize(920, 10);
    this.grillageTerrain2.setImmovable(true);
    this.physics.add.collider(this.player, this.grillageTerrain2);

    this.barrieres.setVisible(false);
    this.grillageTerrain1.disableBody(true, true);
    this.grillageTerrain2.disableBody(true, true);


    // ********************************************************* CREATE RUE DE SUNA *********************************************************

    this.doublePotRue = this.physics.add.sprite(500, 470, 'hit');
    this.doublePotRue.setDisplaySize(100, 50);
    this.doublePotRue.setImmovable(true);
    this.physics.add.collider(this.player, this.doublePotRue);
    this.doublePotRue2 = this.physics.add.sprite(1475, 495, 'hit');
    this.doublePotRue2.setDisplaySize(100, 50);
    this.doublePotRue2.setImmovable(true);
    this.physics.add.collider(this.player, this.doublePotRue2);

    this.rue1 = this.physics.add.sprite(1520, 250, 'hit');
    this.rue1.setDisplaySize(950, 470);
    this.rue1.setImmovable(true);
    this.physics.add.collider(this.player, this.rue1);
    this.rue2 = this.physics.add.sprite(480, 220, 'hit');
    this.rue2.setDisplaySize(950, 470);
    this.rue2.setImmovable(true);
    this.physics.add.collider(this.player, this.rue2);
    this.rueBas = this.physics.add.sprite(width/2 , 995, 'hit');
    this.rueBas.setDisplaySize(2000, 205);
    this.rueBas.setImmovable(true);
    this.physics.add.collider(this.player, this.rueBas);
    this.rueBasBat = this.physics.add.sprite(720 , 835, 'hit');
    this.rueBasBat.setDisplaySize(600, 80);
    this.rueBasBat.setImmovable(true);
    this.physics.add.collider(this.player, this.rueBasBat);
    this.rueBasBat2 = this.physics.add.sprite(1810, 835, 'hit');
    this.rueBasBat2.setDisplaySize(150, 80);
    this.rueBasBat2.setImmovable(true);
    this.physics.add.collider(this.player, this.rueBasBat2);

    this.rue1.disableBody(true, true);
    this.rue2.disableBody(true, true);
    this.rueBasBat.disableBody(true, true);
    this.rueBasBat2.disableBody(true, true);
    this.doublePotRue.disableBody(true, true);
    this.doublePotRue2.disableBody(true, true);
    this.rueBas.disableBody(true, true);

    this.player.setCollideWorldBounds(true);
    this.cursors = this.input.keyboard.createCursorKeys();
}

function update ()
{
    const seuilProximite = 300;
    const seuilProximitePorte = 200;

    this.player.setVelocity(0);

    if (this.input.keyboard.createCursorKeys().left.isDown && !inDialogue ) {
        this.player.setVelocityX(-700);
        this.player.anims.play('walkSide1', true);
        this.player.flipX = true;
        this.lastAnimation = 'left';
    } else if (this.input.keyboard.createCursorKeys().right.isDown && !inDialogue) {
        this.player.setVelocityX(700);
        this.player.anims.play('walkSide1', true);
        this.player.flipX = false;
        this.lastAnimation = 'right';
    } else if (this.input.keyboard.createCursorKeys().up.isDown && !inDialogue) {
        this.player.setVelocityY(-700);
        this.player.anims.play('walkUp1', true);
        this.lastAnimation = 'up';
    } else if (this.input.keyboard.createCursorKeys().down.isDown && !inDialogue) {
        this.player.setVelocityY(700);
        this.player.anims.play('walkDown1', true);
        this.lastAnimation = 'down';
    } else {
        this.player.anims.stop();
    }

    if (!this.cursors.right.isDown && this.lastAnimation == 'right') {
        this.player.setFrame(0);
    }
    if (!this.cursors.left.isDown && this.lastAnimation == 'left') {
        this.player.setFrame(0);
    }
    if (!this.cursors.up.isDown && this.lastAnimation == 'up') {
        this.player.setFrame(0);
    }
    if (!this.cursors.down.isDown && this.lastAnimation == 'down') {
        this.player.setFrame(0);
    }

    if (introDialogPage > 0 && introDialogPage <= dialogs.intro.length) {
        if (this.cursors.space.isDown && espaceRelache) {
            if (introDialogPage > 2) {
                document.getElementById('mainDialogueBox').style.display = 'none';
                document.getElementById('questBox').style.display = 'flex';
                inDialogue = false;
            } else {
                this.sound.play('dialogueSound', { delay: 0});
                document.getElementById('mainDialogueText').innerText = "";
                writeDialogText(dialogs.intro[introDialogPage], 'mainDialogueText');
                introDialogPage++;
                espaceRelache = false;
            }
        }
    }


    // ========================================================= UPDATE BUREAU DU KAZEKAGE =========================================================

    const distanceKazekageCoord = Phaser.Math.Distance.Between(this.player.x, this.player.y, 950, 440);
    const distancePorteKazekageCoord = Phaser.Math.Distance.Between(this.player.x, this.player.y, 950, 1050);

    if (lieu == "palais") {
        document.getElementById('secondaryPortrait').src = 'assets/images/portrait/kazekage.png';
        if (distanceKazekageCoord < seuilProximite && this.cursors.space.isDown && espaceRelache) {
            document.getElementById('mainDialogueText').innerText = "";
            document.getElementById('secondaryDialogueText').innerText = "";
            if (dialogPage == 5 || (dialogPage >=5 && dialogPage%2 !== 0)) {
                inDialogue = false;
                document.getElementById('secondaryDialogueBox').style.display = 'none';
                document.getElementById('mainDialogueBox').style.display = 'none';
                dialogPage++;
                espaceRelache = false;
                if (dialogPage == 6) {
                    writeQuestText(dialogs.quests[1]);
                }
            } else if (dialogPage >= 5 && dialogPage%2 == 0) {
                inDialogue = true;
                let dialogueText = dialogs.kazekage[5];
                writeDialogText(dialogueText, 'secondaryDialogueText');
                document.getElementById('secondaryDialogueBox').style.display = 'flex';
                espaceRelache = false;
                dialogPage++;
                this.sound.play('dialogueSound', { delay: 0});
            } else {
                inDialogue = true;
                let dialogueText = dialogs.kazekage[dialogPage];
                if (dialogPage%2 == 1) {
                    document.getElementById('secondaryDialogueBox').style.display = 'flex';
                    document.getElementById('mainDialogueBox').style.display = 'none';
                    writeDialogText(dialogueText, 'secondaryDialogueText');
                } else {
                    document.getElementById('mainDialogueBox').style.display = 'flex';
                    document.getElementById('secondaryDialogueBox').style.display = 'none';
                    writeDialogText(dialogueText, 'mainDialogueText');
                }
                espaceRelache = false;
                dialogPage++;
                this.sound.play('dialogueSound', { delay: 0});
            }
        }

        // Direction Place
        if (distancePorteKazekageCoord < seuilProximitePorte && this.cursors.space.isDown && espaceRelache) {
            if (questProgress == 1 && introDialogPage >= 3) {
                if (redirectionBox) {
                    document.getElementById('mainDialogueBox').style.display = 'none';
                    redirectionBox = false;
                    inDialogue = false;
                } else {
                    inDialogue = true;
                    document.getElementById('mainDialogueBox').style.display = 'flex';
                    writeDialogText(dialogs.questsRedirectionText[0], 'mainDialogueText');
                    redirectionBox = true;
                }
            }

            if (questProgress > 1) {
                this.bureauPart1.disableBody(true, true);
                this.bureauPart2.disableBody(true, true);
                this.bureauPart3.disableBody(true, true);
                this.topWall.disableBody(true, true);
                this.chess.disableBody(true, true);
                this.kazekageLeftLibrary.disableBody(true, true);
                this.kazekageRightLibrary.disableBody(true, true);
                this.kazekageBottomWall.disableBody(true, true);
                this.kazekageBottomWall2.disableBody(true, true);
                this.bg1.setVisible(false);
                this.bg2.setVisible(true);
                lieu = "place"
                setTimeout(() => {
                    this.sound.stopByKey('kazekageOst');
                }, 1000);
                this.player.anims.play('walkUp1', true);
                this.player.setFrame(0);
                this.sound.play('themeOst', { delay: 0, volume: 0.05, loop: true});
                displayFinishedBrothers();
            }

            if (questProgress > 2) {
                this.player.x = 890;
            }
            espaceRelache = false;
        }
    }


    // ========================================================= UPDATE PLACE DE SUNA =========================================================

    const distancePorteLibrairieCoord = Phaser.Math.Distance.Between(this.player.x, this.player.y, 1370, 500);
    const distancePorteRueCoord = Phaser.Math.Distance.Between(this.player.x, this.player.y, 0, 730);
    const distancePortePalaisCoord = Phaser.Math.Distance.Between(this.player.x, this.player.y, 980, 1070);
    const distancePorteTerrainCoord = Phaser.Math.Distance.Between(this.player.x, this.player.y, 1070, 0);
    const distancePorteRueDroiteCoord = Phaser.Math.Distance.Between(this.player.x, this.player.y, 1915, 670);

    if (lieu == "place") {
        // load batiment
        this.hautGaucheMaison.enableBody(true, 525, 200);
        this.hautGaucheMaison2.enableBody(true, 270, 420);
        this.hautGaucheMaison3.enableBody(true, 420, 290);
        this.doublePot.enableBody(true, 275, 540);
        this.doublePot2.enableBody(true, 1675, 510);
        this.hautDroiteMaison.enableBody(true, 1550, 220);
        this.hautDroiteMaison2.enableBody(true, 1850, 385);
        this.hautDroiteMaison3.enableBody(true, 1830, 480);
        this.batiments.setVisible(true);
        this.statue.setVisible(true);
        this.statueHitbox.enableBody(true, 940, 720, 'hit');

        // Direction Palais
        if (distancePortePalaisCoord < seuilProximitePorte && this.cursors.space.isDown && espaceRelache) {
            console.log(questProgress);
            this.bureauPart1.enableBody(true, 945, 330);
            this.bureauPart2.enableBody(true, 800, 280);
            this.bureauPart3.enableBody(true, 1090, 280);
            this.topWall.enableBody(true, 560, 150);
            this.chess.enableBody(true, 650, 620);
            this.kazekageLeftLibrary.enableBody(true, 490, 600);
            this.kazekageRightLibrary.enableBody(true, 1400, 600);
            this.kazekageBottomWall.enableBody(true, 710, 1025);
            this.kazekageBottomWall2.enableBody(true, 1190, 1025);
            disablePlaceItems();
            this.player.y = height;
            if (questProgress == 5) {
                this.player.x = 1015;
                brosKazekageAnimation();
            } else {
                this.player.x = width/2-10;
            }
            this.bg2.setVisible(false);
            this.bg1.setVisible(true);
            lieu = "palais"
            this.player.anims.play('walkUp1', true);
            this.player.setFrame(0);
            espaceRelache = false;
            brosCompleted.forEach((completed, index) => {
                if (completed) {
                    bros[index].disableBody(true, true);
                }
            })
        }

        // Direction Librairie
        if (distancePorteLibrairieCoord < seuilProximitePorte && this.cursors.space.isDown && espaceRelache) {
            disablePlaceItems();
            // move the player to the left side of the screen
            this.player.x = 450;
            this.player.y = 625;
            this.player.anims.play('walkSide1', true);
            this.player.setFrame(0);
            this.bg3.setVisible(true);
            this.bg2.setVisible(false);
            lieu = "librairie"
            espaceRelache = false;
            brosCompleted.forEach((completed, index) => {
                if (completed) {
                    bros[index].disableBody(true, true);
                }
            })
        }

        // Direction Rue
        if (distancePorteRueCoord < seuilProximitePorte && this.cursors.space.isDown && espaceRelache) {
            if (questProgress == 2) {
                if (redirectionBox) {
                    document.getElementById('mainDialogueBox').style.display = 'none';
                    redirectionBox = false;
                    inDialogue = false;
                } else {
                    inDialogue = true;
                    document.getElementById('mainDialogueBox').style.display = 'flex';
                    writeDialogText(dialogs.questsRedirectionText[1], 'mainDialogueText');
                    redirectionBox = true;
                }
            }
            if (questProgress == 3) {
                if (redirectionBox) {
                    document.getElementById('mainDialogueBox').style.display = 'none';
                    redirectionBox = false;
                    inDialogue = false;
                } else {
                    inDialogue = true;
                    document.getElementById('mainDialogueBox').style.display = 'flex';
                    writeDialogText(dialogs.questsRedirectionText[2], 'mainDialogueText');
                    redirectionBox = true;
                }
            }
            if (questProgress > 3) {
                disablePlaceItems();
                this.player.x = 1900;
                this.player.y = 730;
                this.player.anims.play('walkSide1', true);
                this.player.flipX = false;
                this.player.setFrame(0);
                this.bg5.setVisible(true);
                this.bg2.setVisible(false);
                lieu = "rue";
                rue = "gauche";
                brosCompleted.forEach((completed, index) => {
                    if (completed) {
                        bros[index].disableBody(true, true);
                    }
                })
            }
            espaceRelache = false;
        }

        // Direction Terrain
        if (distancePorteTerrainCoord < seuilProximitePorte && this.cursors.space.isDown && espaceRelache) {
            if (questProgress == 2) {
                if (redirectionBox) {
                    document.getElementById('mainDialogueBox').style.display = 'none';
                    redirectionBox = false;
                    inDialogue = false;
                } else {
                    inDialogue = true;
                    document.getElementById('mainDialogueBox').style.display = 'flex';
                    writeDialogText(dialogs.questsRedirectionText[1], 'mainDialogueText');
                    redirectionBox = true;
                }
            }
            if (questProgress > 2) {
                disablePlaceItems();
                this.player.y = 990;
                this.player.x = 1022;
                this.player.anims.play('walkUp1', true);
                this.player.setFrame(0);
                this.bg4.setVisible(true);
                this.bg2.setVisible(false);
                lieu = "terrain"
                brosCompleted.forEach((completed, index) => {
                    if (completed) {
                        bros[index].disableBody(true, true);
                    }
                })
            }
            espaceRelache = false;
        }

        // Direction Rue Droite
        if (distancePorteRueDroiteCoord < seuilProximitePorte && this.cursors.space.isDown && espaceRelache) {
            if (questProgress == 2) {
                if (redirectionBox) {
                    document.getElementById('mainDialogueBox').style.display = 'none';
                    redirectionBox = false;
                    inDialogue = false;
                } else {
                    inDialogue = true;
                    document.getElementById('mainDialogueBox').style.display = 'flex';
                    writeDialogText(dialogs.questsRedirectionText[1], 'mainDialogueText');
                    redirectionBox = true;
                }
            }
            if (questProgress == 3) {
                if (redirectionBox) {
                    document.getElementById('mainDialogueBox').style.display = 'none';
                    redirectionBox = false;
                    inDialogue = false;
                } else {
                    inDialogue = true;
                    document.getElementById('mainDialogueBox').style.display = 'flex';
                    writeDialogText(dialogs.questsRedirectionText[2], 'mainDialogueText');
                    redirectionBox = true;
                }
            } 
            if (questProgress > 3) {
                disablePlaceItems();
                this.player.x = 0;
                this.player.y = 730;
                this.player.anims.play('walkSide1', true);
                this.player.flipX = false;
                this.player.setFrame(0);
                this.bg5.setVisible(true);
                this.bg2.setVisible(false);
                lieu = "rue";
                rue = "droite";
                brosCompleted.forEach((completed, index) => {
                    if (completed) {
                        bros[index].disableBody(true, true);
                    }
                })
            }
            espaceRelache = false;
        }
    }

    if (!this.cursors.space.isDown) {
        espaceRelache = true;
    }


    // ========================================================= UPDATE LIBRAIRIE DE SUNA =========================================================

    const distancePortePlaceCoord = Phaser.Math.Distance.Between(this.player.x, this.player.y, 450, 625);
    const distanceBot1Coord = Phaser.Math.Distance.Between(this.player.x, this.player.y, 1365, 285);

    if (lieu == "librairie") {
        document.getElementById('secondaryPortrait').src = 'assets/images/portrait/03.png';
        if (!frere2 && !brosCompleted[2]) {
            frere2 = this.physics.add.sprite(1365, 285, 'walkSide2');
            frere2.setDepth(-1);
            this.frere2Hitbox.enableBody(true, 1365, 285);
            frere2.setScale(3.2);
        }
        this.player.setScale(3.2)

        this.bibliotheque1.enableBody(true, 875, 250);
        this.bibliotheque2.enableBody(true, 1060, 720);
        this.bibliotheque3.enableBody(true, 1060, 250);
        this.bibliotheque4.enableBody(true, 1250, 720);
        this.bibliotheque5.enableBody(true, 1250, 250);
        this.bibliotheque6.enableBody(true, 1440, 720);
        this.bibliotheque7.enableBody(true, 1440, 250);
        this.bibliotheque8.enableBody(true, 875, 720);
        this.topWallLibrairie.enableBody(true, 850, 160);
        this.chairLibrary1.enableBody(true, 655, 400);
        this.chairsAndTable1.enableBody(true, 650, 340);
        this.tableLibrary1.enableBody(true, 655, 760);
        this.chairsAndTable2.enableBody(true, 655, 820);
        this.bottomWallLibrairie.enableBody(true, 800, 1030);
        this.leftWallLibrairie.enableBody(true, 420, -50);
        this.leftWallLibrairie2.enableBody(true, 420, 865);
        this.leftWallLibrairieBack.enableBody(true, 375, 0);
        this.rightWallLibrairie.enableBody(true, 1520, 0);


        if (distanceBot1Coord < seuilProximite && this.cursors.space.isDown && espaceRelache) {
            document.getElementById('secondaryDialogueText').innerText = "";
            document.getElementById('mainDialogueText').innerText = "";
            if (dialogBot1Page >= 5) {
                document.getElementById('secondaryDialogueBox').style.display = 'none';
                document.getElementById('mainDialogueBox').style.display = 'none';
                this.frere2Hitbox.disableBody(true, true);
                dialogBot1Page++;
                espaceRelache = false;
                if (!brosCompleted[2]) {
                    writeQuestText(dialogs.quests[2]);
                    setTimeout(() => {
                        frere2.anims.play('walkDown2', true);
                        this.physics.moveTo(frere2, 1365, 520, 430);
                    }, 500);
                    setTimeout(() => {
                        frere2.body.stop();
                        frere2.anims.play('walkSide2', true);
                        frere2.flipX = true;
                        this.physics.moveTo(frere2, 300, 520, 430);
                        this.physics.world.removeCollider(this.frere2HitboxCollider);
                    }, 1000);
                    setTimeout(() => {
                        frere2.body.stop();
                        frere2.anims.play('walkSide2', true);
                        this.physics.moveTo(frere2, 425, 620, 430);
                    }, 2200);
                    setTimeout(() => {
                        frere2.body.stop();
                        frere2.anims.stop();
                        frere2.setFrame(0);
                        frere2.setVisible(false);
                        frere2.disableBody(true, true);
                    }, 3200);
                    brosCompleted[2] = true;
                }
            } else {
                inDialogue = true;
                let dialogueText = dialogs.bot1[dialogBot1Page];
                if (dialogBot1Page%2 == 0) {
                    document.getElementById('secondaryDialogueBox').style.display = 'flex';
                    document.getElementById('mainDialogueBox').style.display = 'none';
                    writeDialogText(dialogueText, 'secondaryDialogueText');
                    this.sound.play('dialogueSound', { delay: 0});
                } else {
                    document.getElementById('mainDialogueBox').style.display = 'flex';
                    document.getElementById('secondaryDialogueBox').style.display = 'none';
                    writeDialogText(dialogueText, 'mainDialogueText');
                    this.sound.play('dialogueSound', { delay: 0});
                }
                espaceRelache = false;
                dialogBot1Page++;
            }
        }


        // Direction Place
        if (distancePortePlaceCoord < seuilProximitePorte && this.cursors.space.isDown && espaceRelache) {
            this.bibliotheque1.disableBody(true, true);
            this.bibliotheque2.disableBody(true, true);
            this.bibliotheque3.disableBody(true, true);
            this.bibliotheque4.disableBody(true, true);
            this.bibliotheque5.disableBody(true, true);
            this.bibliotheque6.disableBody(true, true);
            this.bibliotheque7.disableBody(true, true);
            this.bibliotheque8.disableBody(true, true);
            this.topWallLibrairie.disableBody(true, true);
            this.chairLibrary1.disableBody(true, true);
            this.chairsAndTable1.disableBody(true, true);
            this.tableLibrary1.disableBody(true, true);
            this.chairsAndTable2.disableBody(true, true);
            this.bottomWallLibrairie.disableBody(true, true);
            this.leftWallLibrairie.disableBody(true, true);
            this.leftWallLibrairie2.disableBody(true, true);
            this.frere2Hitbox.disableBody(true, true);
            this.leftWallLibrairieBack.disableBody(true, true);
            this.rightWallLibrairie.disableBody(true, true);

            if (frere2) {
                frere2.disableBody(true, true);
                frere2 = null;
            }
            
            this.player.x = 1370;
            this.player.y = 500;
            this.player.anims.play('walkDown1', true);
            this.player.setFrame(0);
            this.bg3.setVisible(false);
            this.bg2.setVisible(true);
            lieu = "place"
            this.player.setScale(3.55);

            espaceRelache = false;
            displayFinishedBrothers();

        }
    }


    // ========================================================= UPDATE RUE DE SUNA =========================================================

    let distancePortePlaceRueCoord;
    if (rue == "gauche") {
        distancePortePlaceRueCoord = Phaser.Math.Distance.Between(this.player.x, this.player.y, 1900, 670);
    } else {
        distancePortePlaceRueCoord = Phaser.Math.Distance.Between(this.player.x, this.player.y, 0, 670);
    }
    const distanceBot4Coord = Phaser.Math.Distance.Between(this.player.x, this.player.y, 970, 480);

    if (lieu == "rue") {
        document.getElementById('secondaryPortrait').src = 'assets/images/portrait/01.png';
        this.rue1.enableBody(true, 1520, 230);
        this.rue2.enableBody(true, 480, 200);
        this.rueBas.enableBody(true, width/2, 975);
        this.rueBasBat.enableBody(true, 720, 835);
        this.rueBasBat2.enableBody(true, 1810, 835);
        this.doublePotRue.enableBody(true, 500, 470);
        this.doublePotRue2.enableBody(true, 1475, 495);
        if (!frere5 && !brosCompleted[5]) {
            frere5Hitbox = this.physics.add.sprite(970, 480, 'hit');
            frere5Hitbox.setDisplaySize(20, 20);
            frere5Hitbox.setImmovable(true);
            frere5Hitbox.setVisible(false);
            this.physics.add.collider(this.player, frere5Hitbox);

            frere5 = this.physics.add.sprite(970, 480, 'walkUp5');
            frere5.setScale(3.55);
            frere5.setDepth(-1);
        }

        if (distanceBot4Coord < seuilProximite && this.cursors.space.isDown && espaceRelache) {
            inDialogue = true;
            if (dialogBot4Page >= 9) {
                inDialogue = false
                if (frere5Hitbox) {
                    frere5Hitbox.disableBody(true, true);
                }
                document.getElementById('secondaryDialogueBox').style.display = 'none';
                document.getElementById('mainDialogueBox').style.display = 'none';
                if (!brosCompleted[5]) {
                    dialogBot4Page++;
                    espaceRelache = false;
                    setTimeout(() => {
                        writeQuestText(dialogs.quests[4]);
                        this.physics.moveTo(frere5, 970, 650, 430);
                        frere5.anims.play('walkDown5', true);
                    }, 500);
                    setTimeout(() => {
                        frere5.body.stop();
                        frere5.anims.play('walkSide5', true);
                        if (rue == "gauche") {
                            this.physics.moveTo(frere5, 2000, 650, 430);
                        } else {
                            frere5.flipX = true;
                            this.physics.moveTo(frere5, 0, 650, 430);
                        }
                    }, 800);
                    setTimeout(() => {
                        frere5.body.stop();
                        frere5.anims.stop();
                        frere5.setFrame(0);
                        frere5.setVisible(false);
                        frere5.disableBody(true, true);
                    }, 3500) ;
                    brosCompleted[5] = true;
                }
            } else {
                frere5.anims.play('walkDown5', true);
                frere5.anims.stop();
                frere5.setFrame(0);
                let dialogueText = dialogs.bot4[dialogBot4Page];
                if (dialogBot4Page%2 == 0) {
                    document.getElementById('secondaryDialogueBox').style.display = 'flex';
                    document.getElementById('mainDialogueBox').style.display = 'none';
                    writeDialogText(dialogueText, 'secondaryDialogueText');
                } else {
                    document.getElementById('mainDialogueBox').style.display = 'flex';
                    document.getElementById('secondaryDialogueBox').style.display = 'none';
                    writeDialogText(dialogueText, 'mainDialogueText');
                }
                espaceRelache = false;
                dialogBot4Page++;
            }
        }

        // Direction Place
        if (distancePortePlaceRueCoord < seuilProximitePorte && this.cursors.space.isDown && espaceRelache) {      
            this.player.anims.play('walkSide1', true);
            if (rue == "gauche") {
                this.player.x = 0;
                this.player.y = 730;
                this.player.flipX = false;
            } else {
                this.player.x = 1915;
                this.player.y = 670;
                this.player.flipX = true;
            }
            this.player.setFrame(0);
            this.bg5.setVisible(false);
            this.bg2.setVisible(true);
            this.rue1.disableBody(true, true);
            this.rue2.disableBody(true, true);
            this.rueBas.disableBody(true, true);
            this.rueBasBat.disableBody(true, true);
            this.rueBasBat2.disableBody(true, true);
            this.doublePotRue.disableBody(true, true);
            this.doublePotRue2.disableBody(true, true);
            frere5Hitbox.disableBody(true, true);
            if (frere5) {
                frere5.disableBody(true, true);
                frere5 = null;
            }
            lieu = "place"
            espaceRelache = false;

            displayFinishedBrothers();
        }
    }


    // ========================================================= UPDATE TERRAIN DE SUNA =========================================================

    const distancePortePlaceTerrainCoord = Phaser.Math.Distance.Between(this.player.x, this.player.y, 1020, 1060);

    if (lieu == "terrain") {
        if (!frere3 && !brosCompleted[3]) {
            frere3 = this.physics.add.sprite(90, 550, 'walkSide3');
            frere3.setScale(3.55);
            frere3.setDepth(-1);
        }

        if (!frere4 && !brosCompleted[4]) {
            frere4 = this.physics.add.sprite(1830, 550, 'walkSide4');
            frere4.setScale(3.55);
            frere4.flipX = true;
            frere4.setDepth(-1);

        }
        this.grillageTerrain1.enableBody(true, 480, 890);
        this.grillageTerrain1.setVisible(true);
        this.grillageTerrain2.enableBody(true, 1575, 890);
        this.grillageTerrain2.setVisible(true);
        this.barrieres.setVisible(true);

        if (!isFightDialogStarted) {
            setTimeout(() => updateFightDialog1(0), 500);
            setTimeout(() => updateFightDialog2(0), 2500);
            isFightDialogStarted = true;
        }

        if (this.player.y <= 625 && dialogBot2et3Page <= 5) {
            inDialogue = true;
            this.player.setVelocity(0, 0);
            if (fieldDialog == 'waiting') {
                document.getElementById('fightDialogueBoxMain').style.display = 'flex';
                setFieldDialog('started');
                setTimeout(() => {
                    document.getElementById('fightDialogueText1').innerText = '???';
                    document.getElementById('fightDialogueText2').innerText = '???';
                }, 500)
                setTimeout(() => {
                    frere3.anims.play('walkSide3', true);
                    frere4.anims.play('walkSide4', true);
                    this.physics.moveTo(frere3, this.player.x - 20, this.player.y - 100, 800);
                    this.physics.moveTo(frere4, this.player.x + 20, this.player.y - 100, 800);
                    cancelFightDialogueTimeouts();
                    document.getElementById('fightDialogueBox1').style.display = 'none';
                    document.getElementById('fightDialogueBoxMain').style.display = 'none';
                    document.getElementById('fightDialogueBox2').style.display = 'none';
                }, 1500);
                setTimeout(() => {
                    document.getElementById('fightDialogueBox1').style.display = 'none';
                    document.getElementById('fightDialogueBoxMain').style.display = 'none';
                    document.getElementById('fightDialogueBox2').style.display = 'none';
                    document.getElementById('secondaryPortrait').src = 'assets/images/portrait/05.png';
                    document.getElementById('secondaryDialogueBox').style.display = 'flex';
                    writeDialogText(dialogs.bot2And3[dialogBot2et3Page], 'secondaryDialogueText');
                    dialogBot2et3Page++;
                    setFieldDialog('ended');
                }, 2500);

            }

            if (Phaser.Math.Distance.Between(frere3.x, frere3.y, this.player.x - 20, this.player.y - 100) < 50) {
                frere3.anims.play('walkDown3', true);
                frere3.body.stop();
                frere3.setFrame(0);

            }
            if (Phaser.Math.Distance.Between(frere4.x, frere4.y, this.player.x + 20, this.player.y - 100) < 50) {
                frere4.anims.play('walkDown4', true);
                frere4.body.stop();
                frere4.setFrame(0);
            }

            if (fieldDialog == 'ended' && this.cursors.space.isDown && espaceRelache) {
                if (dialogBot2et3Page >= 5) {
                    document.getElementById('secondaryDialogueBox').style.display = 'none';
                    document.getElementById('mainDialogueBox').style.display = 'none';
                    dialogBot2et3Page++;
                    espaceRelache = false;
                    inDialogue = false;

                    setTimeout(() => {
                        writeQuestText(dialogs.quests[3]);
                        this.physics.moveTo(frere3,  875, 633, 800);
                    }, 500);
                    setTimeout(() => {
                        this.physics.moveTo(frere4, 875, 550, 800);
                    }, 800);
                    setTimeout(() => {
                        frere3.body.stop();
                        this.physics.moveTo(frere3, 1030, 750, 800);
                    }, 600);
                    setTimeout(() => {
                        frere4.body.stop();
                        this.physics.moveTo(frere4, 1030, 750, 800);
                    }, 1100);
                    setTimeout(() => {
                        frere3.body.stop();
                        this.physics.moveTo(frere3, 1030, 1080, 800);
                    }, 800);
                    setTimeout(() => {
                        frere4.body.stop();
                        this.physics.moveTo(frere4, 1030, 1080, 800);
                    }, 1300);
                    setTimeout(() => {
                        frere4.body.stop();
                        frere3.body.stop();
                    }, 2500);
                    brosCompleted[3] = true;
                    brosCompleted[4] = true;
                } else {
                    let dialogueText = dialogs.bot2And3[dialogBot2et3Page];
                    if (dialogBot2et3Page%3 == 0) {
                        document.getElementById('secondaryPortrait').src = 'assets/images/portrait/05.png';
                        document.getElementById('secondaryDialogueBox').style.display = 'flex';
                        document.getElementById('mainDialogueBox').style.display = 'none';
                        writeDialogText(dialogueText, 'secondaryDialogueText');
                    } else if (dialogBot2et3Page%3 == 1) {
                        document.getElementById('secondaryPortrait').src = 'assets/images/portrait/04.png';
                        writeDialogText(dialogueText, 'secondaryDialogueText');
                    } else if (dialogBot2et3Page%3 == 2) {
                        document.getElementById('mainDialogueBox').style.display = 'flex';
                        document.getElementById('secondaryDialogueBox').style.display = 'none';
                        writeDialogText(dialogueText, 'mainDialogueText');
                    }
                    espaceRelache = false;
                    dialogBot2et3Page++;
                }
            }
        }

        // Direction Place
        if (distancePortePlaceTerrainCoord < seuilProximitePorte && this.cursors.space.isDown && espaceRelache) {
            this.player.x = 1070;
            this.player.y = 5;
            this.player.anims.play('walkDown1', true);
            this.player.setFrame(0);
            this.grillageTerrain1.disableBody(true, true);
            this.grillageTerrain2.disableBody(true, true);
            this.bg4.setVisible(false);
            this.bg2.setVisible(true);
            this.barrieres.setVisible(false);
            if (frere3) {
                frere3.disableBody(true, true);
                frere3 = null;
            }
            if (frere4) {
                frere4.disableBody(true, true);
                frere4 = null;
            }
            lieu = "place"
            espaceRelache = false;
            displayFinishedBrothers();
        }
    }
}

export { game };