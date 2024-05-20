const keyChars = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z'];
const wordsArray = ['TWILIGHT', 'HANGMAN', 'BRIDGERTON', 'ECLIPSE', 'NEW MOON', 'HOMOSEXUAL']


function clearPage(){
    let mainContent = Array.from(document.getElementsByTagName('main')[0].childNodes);

    mainContent.forEach((element)=>{
        element.remove();
    });
}

function drawHangman(){
    let canvas = document.getElementById("hangmanCanvas");
    let c = canvas.getContext('2d');
    // let height = 300;
    // let width = 200;

    c.lineWidth = 5;
    c.strokeStyle = 'rgb(255 255 255)';
    c.beginPath();
    c.moveTo(0, 280);
    c.lineTo(200, 280);
    c.moveTo(190, 280);
    c.lineTo(190, 30);
    c.lineTo(70, 30);
    c.lineTo(70, 80)
    c.stroke();
}

function addBodyParts(score){
    let canvas = document.getElementById("hangmanCanvas");
    let c = canvas.getContext('2d');
    
    switch (score){
        case 1:
            c.beginPath();
            c.arc(70, 112, 30, 0, Math.PI * 2)
            c.stroke();
            break;
        case 2:
            c.beginPath();
            c.moveTo(70, 142);
            c.lineTo(70, 210);
            c.stroke();
            break;
        case 3:
            c.beginPath();
            c.moveTo(70, 208);
            c.lineTo(50, 240);
            c.stroke();
            break;
        case 4:
            c.beginPath();
            c.moveTo(70, 208);
            c.lineTo(90, 240);
            c.stroke();
            break;
        case 5:
            c.beginPath();
            c.moveTo(70, 150);
            c.lineTo(90, 180);
            c.stroke();
            break;
        case 6:
            c.beginPath();
            c.moveTo(70, 150);
            c.lineTo(50, 180);
            c.stroke();
            break;
        default:
            break
    }
}

function populateKeys(keyArray){
    let keyboardChars = $('#keyboard-div');
    for(i = 0; i < keyArray.length; i++){
        let newKey = document.createElement('p');
        newKey.innerText = keyArray[i];
        newKey.className = 'letter-button';
        keyboardChars.append(newKey);
    };

};

function populateHiddenWords(words){
    let row = 1;

    for(i = 0; i < words.length; i++){
        for(letter = 0; letter < words[i].length; letter++){
            let newLetter = document.createElement('div');
            newLetter.className = 'hidden-letter';
            newLetter.style.gridRow = row.toString();
            let innerLetter = document.createElement('p');
            innerLetter.innerText = words[i][letter];
            innerLetter.style.display = 'none';

            newLetter.appendChild(innerLetter)
            $('#hidden-word-div').append(newLetter);
        };
        row++;
    };
};

function checkLetterInArray(array, letter, score, scoreBox){

};

function showEndScreen(wl){
    let textDiv = $(`<div class="end-screen-text"></div>`)
    let text;

    if(wl === 'LOST'){
        text = $('<p>YOU</p><p>LOST</p>');
        textDiv.append(text);
    }else if(wl === 'WON'){
        text = $('<p>YOU</p><p>WON</p>');
        textDiv.append(text);
    }
    $('main').append(textDiv);
}

function buildDivs(){
    let height = 300;
    let width = 200;
    let hangman = $(`<div id="canvasDiv" class="col1"><canvas id="hangmanCanvas" height="${height}" width="${width}"></canvas></div>`)
    let hiddenDiv = $(`<div class="col2" id="hidden-word-div"></div`)
    let keyboardDiv = $(`<div class="col2" id="keyboard-div">`)

    $('main').append(hangman, hiddenDiv, keyboardDiv);
}
function generateGame(){
    buildDivs();
    let score = 0;
    drawHangman();
    // addBodyParts(score);
    let randomNum = Math.floor(Math.random() * wordsArray.length);
    let hiddenWords = wordsArray[randomNum].split(' ');

    populateHiddenWords(hiddenWords);
    populateKeys(keyChars);
    let virtualKeys = Array.from($('.letter-button'));
    let hiddenLetters = Array.from($('.hidden-letter'));
    document.addEventListener('keydown', (e)=>{
        let keyPressed = e.key.toUpperCase();
        let correct = false;

        virtualKeys.forEach((item)=>{
            if(keyPressed === item.textContent){
                item.style.backgroundColor = 'black';
                item.style.color = 'rgba(255, 255, 255, .5)'
            };
        });
        hiddenLetters.forEach((letter)=>{
            if(keyPressed === letter.textContent){
                letter.firstElementChild.style.display = 'block';
                correct = true;
            }
        });
        if(hiddenLetters.indexOf(letter) === -1 && keyChars.indexOf(keyPressed) >= 0 && correct == false){
            score++;
            addBodyParts(score);
            // scoreBox.innerText = `${score}/6`;
            if(score === 7){
                clearPage();
                showEndScreen('LOST');
            }
        };
        console.log(score)
    });

}

$(document).ready(()=>{
    generateGame();

})