const questions = [
    ['question1','answer1-1', 'answer1-2', 'answer1-3',2],
    ['question2','answer2-1', 'answer2-2', 'answer2-3',1],
    ['question3','answer3-1', 'answer3-2', 'answer3-3',2],
    ['question4','answer4-1', 'answer4-2', 'answer4-3',3]
];

let userScore = 0,
    currentQuestion = 0,
    htmlTag = document.querySelector('html');

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

const langpacks = {
    'en': {
        'nameLabel': 'Name',
        'scoreLabel': 'Score',
        'nextLabel': 'Next'
    },
    'pl': {
        'nameLabel': 'Imię',
        'scoreLabel': 'Wynik',
        'nextLabel': 'Dalej'
    }
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
        alert('Please select answer');
    } else if(userAnswer != correctAnswer) {
        userAnswerLabel.style.color = '#ff0000';
        correctAnswerLabel.style.color = 'green';
        currentQuestion++;
        console.log('incorrect');
        setTimeout(function(){
            clearAnswerStyling();
            if(currentQuestion < questions.length) {
                getQuestion();
            } else if(currentQuestion == questions.length) {
                currentQuestion = 0;
                alert('You finished the quiz');
                getQuestion();
            }
        },1000);
    } else if(userAnswer == correctAnswer) {
        correctAnswerLabel.style.color = 'green';
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
                alert('You finished the quiz');
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

if(htmlTag.getAttribute('lang') == 'en') {

    let userName = document.querySelector('#user-name span').textContent;
    userName = userName.replace('_userName_',langpacks.en.nameLabel);
    document.querySelector('#user-name span').textContent = userName;

    let userScoreLabel = document.querySelector('#score-label').textContent;
    userScoreLabel = userScoreLabel.replace('_scoreLabel_',langpacks.en.scoreLabel);
    document.querySelector('#score-label').textContent = userScoreLabel;

    let userNextLabel = document.querySelector('#submit').textContent;
    userNextLabel = userNextLabel.replace('_nextLabel_',langpacks.en.nextLabel);
    document.querySelector('#submit').textContent = userNextLabel;

} else if(htmlTag.getAttribute('lang') == 'pl') {

    let userName = document.querySelector('#user-name span').textContent;
    userName = userName.replace('_userName_',langpacks.pl.nameLabel);
    document.querySelector('#user-name span').textContent = userName;

    let userScoreLabel = document.querySelector('#score-label').textContent;
    userScoreLabel = userScoreLabel.replace('_scoreLabel_',langpacks.pl.scoreLabel);
    document.querySelector('#score-label').textContent = userScoreLabel;

    let userNextLabel = document.querySelector('#submit').textContent;
    userNextLabel = userNextLabel.replace('_nextLabel_',langpacks.pl.nextLabel);
    document.querySelector('#submit').textContent = userNextLabel;

}

getQuestion();
