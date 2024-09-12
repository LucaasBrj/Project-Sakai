import dialogs from './dialogs.js';
import { game } from './game.js';

let questProgress = 0;
let typeItInstance = null;
let brosCompleted = [false, false, false, false];
let bros = [];
let fieldDialog = "waiting";

function updateFightDialog1(index) {
    if (fieldDialog == "ended") {
        return
    }
    if (index < dialogs.fightBot2.length) {
        document.getElementById('fightDialogueBox1').style.display = 'flex';
        document.getElementById('fightDialogueText1').innerText = dialogs.fightBot2[index];
    }
    if (index < dialogs.fightBot2.length || index < dialogs.fightBot3.length) {
        setTimeout(() => updateFightDialog1(index + 1), 4000);
    }
    if (index == dialogs.fightBot2.length) {
        setTimeout(() => {
            document.getElementById('fightDialogueBox1').style.display = 'none';
        }, 2000);
    }
}

function updateFightDialog2(index) {
    if (fieldDialog == "ended") {
        return
    }
    if (index < dialogs.fightBot2.length) {
        document.getElementById('fightDialogueBox2').style.display = 'flex';
        document.getElementById('fightDialogueText2').innerText = dialogs.fightBot3[index];
    }
    if (index < dialogs.fightBot2.length || index < dialogs.fightBot3.length) {
        setTimeout(() => updateFightDialog2(index + 1), 4000);
    }
    if (index == dialogs.fightBot2.length) {
        setTimeout(() => {
            document.getElementById('fightDialogueBox2').style.display = 'none';
        }, 2000);
    }
}

function writeDialogText(text, elementSelector, speed=10) {
    if (typeItInstance) {
        typeItInstance.destroy();
    }
    document.getElementById('mainDialogueText').innerText = "";
    document.getElementById('secondaryDialogueText').innerText = "";
    const element = document.querySelector("#"+elementSelector);
    if (element) {
        typeItInstance = new TypeIt(element, {
            strings: text,
            speed: speed,
            waitUntilVisible: true,
            cursor: false,
        }).go();
    } else {
        console.error('Element not found:', elementSelector);
    }
}

function writeQuestText(text) {
    document.getElementById('questText').innerText = "";
    const element = document.querySelector("#questText");
    if (element) {
        new TypeIt(element, {
            strings: text,
            speed: 50,
            waitUntilVisible: true,
            cursor: false,
        }).go();
        questProgress++;
        console.log(questProgress);
    } else {
        console.error('Element not found:', elementSelector);
    }
}

function  startGame() {
    if (document.documentElement.requestFullscreen) {
        document.documentElement.requestFullscreen();
    } else if (document.documentElement.mozRequestFullScreen) { /* Firefox */
        document.documentElement.mozRequestFullScreen();
    } else if (document.documentElement.webkitRequestFullscreen) { /* Chrome, Safari and Opera */
        document.documentElement.webkitRequestFullscreen();
    } else if (document.documentElement.msRequestFullscreen) { /* IE/Edge */
        document.documentElement.msRequestFullscreen();
    }
    // display none on the button
    document.getElementById('fullScreenButton').classList.add('hidden');
    document.getElementById('fullScreenImage').classList.add('hidden');
    setTimeout(() => {
        writeDialogText(dialogs.intro[0], 'mainDialogueText', 30);
        let scene = game.scene.getScene('default');
        scene.sound.play("kazekageOst", { volume: 0.1, loop: true });
    }, 2000);
}
window.startGame = startGame;

function disablePlaceItems() {
    let scene = game.scene.getScene('default');
    scene.hautGaucheMaison.disableBody(true, true);
    scene.hautGaucheMaison2.disableBody(true, true);
    scene.hautGaucheMaison3.disableBody(true, true);
    scene.doublePot.disableBody(true, true);
    scene.doublePot2.disableBody(true, true);
    scene.hautDroiteMaison.disableBody(true, true);
    scene.hautDroiteMaison2.disableBody(true, true);
    scene.hautDroiteMaison3.disableBody(true, true);
    scene.batiments.setVisible(false);
    scene.statue.setVisible(false);
    scene.statueHitbox.disableBody(true, true);
}

function displayFinishedBrothers() {
    let brosCount = 0;
    let scene = game.scene.getScene('default');
    brosCompleted.forEach((completed, index) => {
        if (completed) {
            bros[index] = scene.physics.add.sprite(985, 950 - (brosCount*55), 'walkDown'+(index));
            bros[index].setDepth(20-index);
            bros[index].setScale(3.55);
            brosCount++;
        }
    })
}

function setFieldDialog(value) {
    fieldDialog = value;
}

export { updateFightDialog1, updateFightDialog2, writeDialogText, writeQuestText, startGame, disablePlaceItems, displayFinishedBrothers, questProgress, brosCompleted, bros, fieldDialog, setFieldDialog };