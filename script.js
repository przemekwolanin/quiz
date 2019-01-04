const questions_en = [
    ['question1','answer1-1', 'answer1-2', 'answer1-3',2],
    ['question2','answer2-1', 'answer2-2', 'answer2-3',1],
    ['question3','answer3-1', 'answer3-2', 'answer3-3',2],
    ['question4','answer4-1', 'answer4-2', 'answer4-3',3]
];

const questions_pl = [
    ['pytanie1','odpowiedź1-1', 'odpowiedź1-2', 'odpowiedź1-3',2],
    ['pytanie2','odpowiedź2-1', 'odpowiedź2-2', 'odpowiedź2-3',1],
    ['pytanie3','odpowiedź3-1', 'odpowiedź3-2', 'odpowiedź3-3',2],
    ['pytanie4','odpowiedź4-1', 'odpowiedź4-2', 'odpowiedź4-3',3]
];

let userScore = 0,
    currentQuestion = 0,
    questions = [],
    questionLang,
    userNameValue,
    htmlLang,
    htmlTag = document.querySelector('html');


const langpacks = {
    'en': {
        'nameLabel': 'Name',
        'scoreLabel': 'Score',
        'nextLabel': 'Next',
        'enterNameLabel': 'Enter Your name:',
        'selectAnswerLebel': 'Please select answer',
        'finishedQuizLabel': 'You finished the quiz'
    },
    'pl': {
        'nameLabel': 'Imię',
        'scoreLabel': 'Wynik',
        'nextLabel': 'Dalej',
        'enterNameLabel': 'Wpisz swoje imię',
        'selectAnswerLebel': 'Wybierz odpowiedź',
        'finishedQuizLabel': 'Quiz zakończony'
    }
}

const getLangQuestions = () => {
    if(htmlTag.getAttribute('lang') == 'en') {
        questions = questions_en.slice();
        htmlLang = langpacks.en;
    } else if(htmlTag.getAttribute('lang') == 'pl') {
        questions = questions_pl.slice();
        htmlLang = langpacks.pl;
    } else {
        questions = questions_en.slice();
        htmlLang = langpacks.en;
    }
}
getLangQuestions();

document.querySelector('#user-name-label').textContent = htmlLang.nameLabel;
document.querySelector('#score-label').textContent = htmlLang.scoreLabel;
document.querySelector('#submit').textContent = htmlLang.nextLabel + ' >>';

const getUserName = () => {
    userNameValue = prompt(htmlLang.enterNameLabel);
    document.querySelector('#user-name-value').textContent = userNameValue;
}

const getQuestion = () => {
    let question = document.querySelector('#question'),
        questionTxt = document.querySelector('#question h2'),
        ans1 = document.querySelector('#answer1'),
        ans1Txt = document.querySelector('#answer1 label'),
        ans2 = document.querySelector('#answer2'),
        ans2Txt = document.querySelector('#answer2 label'),
        ans3 = document.querySelector('#answer3'),
        ans3Txt = document.querySelector('#answer3 label');

    questionTxt.textContent = questions[currentQuestion][0];
    ans1Txt.textContent = questions[currentQuestion][1];
    ans2Txt.textContent = questions[currentQuestion][2];
    ans3Txt.textContent = questions[currentQuestion][3];
}

const updateUserScore = (score) => {
    document.querySelector('#score span.score-number').textContent = score;
}

const clearAnswerStyling = () => {
    let labelsList = document.querySelectorAll('.user-answer + label');
    let checkboxList = document.querySelectorAll('.user-answer');
    labelsList = [...labelsList];
    checkboxList = [...checkboxList];
    for(let i = 0; i < labelsList.length; i++) {
        labelsList[i].removeAttribute('style');
    }
    for(let i = 0; i < checkboxList.length; i++){
        if(!checkboxList[i].disabled){
            checkboxList[i].checked = false;
        }
    }
}

const onSubmit = () => {
    let correctAnswer = questions[currentQuestion][4],
        userAnswer = 0,
        userAnswerLabel = document.querySelector('.user-answer:checked + label'),
        correctAnswerLabel = document.querySelector(`#answer${correctAnswer} label`);

    if(document.querySelector('.user-answer:checked') != null) {
        userAnswer = document.querySelector('.user-answer:checked').value;
        console.log(userAnswer);
    }

    if(document.querySelector('.user-answer:checked') == null) {
        alert(htmlLang.selectAnswerLebel);
    } else if(userAnswer != correctAnswer) {
        userAnswerLabel.style.color = '#ff0000';
        userAnswerLabel.style.fontWeight = 'bold';
        correctAnswerLabel.style.color = 'green';
        correctAnswerLabel.style.fontWeight = 'bold';
        currentQuestion++;
        console.log('incorrect');
        setTimeout(function(){
            clearAnswerStyling();
            if(currentQuestion < questions.length) {
                getQuestion();
            } else if(currentQuestion == questions.length) {
                currentQuestion = 0;
                alert(htmlLang.finishedQuizLabel);
                getQuestion();
            }
        },1000);
    } else if(userAnswer == correctAnswer) {
        correctAnswerLabel.style.color = 'green';
        correctAnswerLabel.style.fontWeight = 'bold';
        currentQuestion++;
        userScore++;
        updateUserScore(userScore);
        console.log('correct');
        setTimeout(function(){
            clearAnswerStyling();
            if(currentQuestion < questions.length) {
                getQuestion();
            } else if(currentQuestion == questions.length) {
                currentQuestion = 0;
                alert(htmlLang.finishedQuizLabel);
                getQuestion();
                userScore = 0;
                updateUserScore(userScore);
            }

        },1000);
    }
}

document.querySelector('.submit').addEventListener('click',function(){
    onSubmit();
});
//getUserName();
getQuestion();
