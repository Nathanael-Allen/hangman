const keyChars = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z'];
const wordsArray = ['TWILIGHT', 'ECLIPSE', 'NEW MOON', 'EDWARD CULLEN', 'FORKS WASHINGTON', 'VAMPIRE', 'JACOB BLACK', 'ISABELLA SWAN', 'BREAKING DAWN', 'CARLISLE', 'ROSALIE', 'JASPER', 'ALICE', 'EMMETT', 'KRISTEN STEWART', 'ROBERT PATTINSON', 'TAYLOR LAUTNER', 'CHARLIE SWAN', 'STEPHENIE MEYER', 'BASEBALL', 'VOLTURI']

function createNewGameButton(){
    let button = $(`<button id="new-game-button">New Game</button>`)
    return button;
}

function clearPage(){
    $('.hidden-letter').remove();
    let mainContent = Array.from(document.getElementsByClassName('col2'));

    mainContent.forEach((element)=>{
        element.remove();
    });

}

function createStartPage(){
    drawHangman();
    let button = createNewGameButton();
    let main = $(`
    <div class="main-screen-text col2">
        <p>HANGMAN<p>
    </div>`);
    main.append(button)
    $('main').append(main);
    $('#new-game-button').on('click', ()=>{
        clearPage();
        generateGame();
    })
}

function drawHangman(){
    let height = 300;
    let width = 200;
    let hangman = $(`<div id="canvasDiv" class="col1"><canvas id="hangmanCanvas" height="${height}" width="${width}"></canvas></div>`);
    $('main').append(hangman);
    let canvas = document.getElementById("hangmanCanvas");
    let c = canvas.getContext('2d');

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

function showEndScreen(wl, hiddenWord){
    clearPage();
    let textDiv = $(`<div class="main-screen-text col2"></div>`)
    let text;
    let word = $(`<p class="end-screen-answer">The answer was: ${hiddenWord}</p>`);
    let button = createNewGameButton();

    if(wl === 'LOST'){
        text = $('<p>YOU</p><p>LOST</p>');
        textDiv.append(text, word, button);
    }else if(wl === 'WON'){
        text = $('<p>YOU</p><p>WON</p>');
        textDiv.append(text, word, button);
    }
    $('main').append(textDiv);
    $('#new-game-button').on('click', ()=>{
        $('canvas').remove();
        drawHangman();
        clearPage();
        generateGame();
    })
}

function buildDivs(){
    let hiddenDiv = $(`<div class="col2" id="hidden-word-div"></div`)
    let keyboardDiv = $(`<div class="col2" id="keyboard-div">`)

    $('main').append(hiddenDiv, keyboardDiv);
}
function generateGame(){
    buildDivs();
    let usedLetters = [];
    let correct;
    let keyPressed;
    let score = 0;
    let numCorrect = 0;
    drawHangman();
    let randomNum = Math.floor(Math.random() * wordsArray.length);
    let answer = wordsArray[randomNum];
    let hiddenWords = answer.split(' ');
    console.log("new word: " + hiddenWords)

    populateHiddenWords(hiddenWords);
    populateKeys(keyChars);
    let virtualKeys = Array.from($('.letter-button'));
    let hiddenLetters = Array.from($('.hidden-letter'));
    let handlerFunction = function(e){
        keyPressed = e.key.toUpperCase();
        correct = false;

        virtualKeys.forEach((item)=>{
            if(keyPressed === item.textContent){
                item.style.backgroundColor = 'black';
                item.style.color = 'rgba(255, 255, 255, .5)';
            };
        });
        if(usedLetters.indexOf(keyPressed) === -1){
            hiddenLetters.forEach((letter)=>{
                if(keyPressed === letter.textContent){
                    letter.firstElementChild.style.display = 'block';
                    correct = true;
                    numCorrect++;
                    usedLetters.push(keyPressed);
                    if(numCorrect === hiddenLetters.length){
                        showEndScreen('WON', answer);
                        document.removeEventListener('keydown', handlerFunction);
                    };
                }
            });
            if(keyChars.indexOf(keyPressed) >= 0 && correct === false){
                score++;
                addBodyParts(score);
                usedLetters.push(keyPressed);
                if(score === 6){
                    showEndScreen('LOST', answer);
                    document.removeEventListener('keydown', handlerFunction);
                }
            }};
        console.log(score, numCorrect, hiddenLetters.length)
    }
    document.removeEventListener('keydown', handlerFunction);
    document.addEventListener('keydown', handlerFunction);

}

$(document).ready(()=>{
    createStartPage();

})