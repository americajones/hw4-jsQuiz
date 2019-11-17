//store object variables
var questions = [
    {
        title: "Javascript can parse data using strings, numbers, and _____.",
        choices: ["alerts", "booleans", "functions", "events"],
        answer: "booleans"
    },
    {
        title: "You call a function with the function name and a set of:",
        choices: ["quotes", "curly brackets", "parentheses", "square brackets"],
        answer: "parentheses"
    },
    {
        title: "Where in your HTML file do you put the javascript?",
        choices: ["in <head>", "in <body>", "Either one", "Neither one"],
        answer: "in <body>"
    },
    {
        title: "Which is not a type of javascript popup box?",
        choices: ["alert", "popup", "confirm", "prompt"],
        answer: "popup"
    },
    {
        title: "How do you create a function?",
        choices: ["function = myfunction()", "function:myfunction()", "function myfunction()", "function(myfunction)"],
        answer: "function myfunction()"
    },
    {
        title: "",
        choices: "",
        answer: ""
    }
];

var timer = document.querySelector("#timer");
var questionBox = document.querySelector("#questionbox");
var answerBox = document.querySelector("#answerbox");
var highscores = document.querySelector("#highscores");
var startButt = document.querySelector("#start");
var audio = document.querySelector("#audio");
var title = document.querySelector("h2");
var isGameOver = false;
//var correctAnswer = questions[0 || 1 || 2 || 3 || 4].answer;
var i = 0;

//timer starts at 0 
var time = 0;


function countdown() {
    var countdownInterval = setInterval(() => {
        timer.textContent = "Time remaining: " + time;
        time--;
        if (time === 0 || isGameOver === true) {
            clearInterval(countdownInterval);
            timer.textContent = "";
        }

    }, 1000);
};

function addDiv(elementId, html) {
    var newDiv = document.createElement("div");
    newDiv.setAttribute('id', elementId);
    newDiv.className = "answer";
    newDiv.textContent = html;
    document.querySelector("#answerbox").appendChild(newDiv);
};

function removeDiv(elementId) {
    var element = document.getElementById(elementId);
    element.parentNode.removeChild(element);
};

function nextQuestion(arrNum) {
    questionBox.textContent = questions[arrNum].title;
    removeDiv("#answer1");
    removeDiv("#answer2");
    removeDiv("#answer3");
    removeDiv("#answer4");
    addDiv("#answer1", questions[arrNum].choices[0]);
    addDiv("#answer2", questions[arrNum].choices[1]);
    addDiv("#answer3", questions[arrNum].choices[2]);
    addDiv("#answer4", questions[arrNum].choices[3]);
    if (i > 4) {
        console.log("game over");
        isGameOver = true;
        gameOver();
    }
};

function gameOver() {
    questionBox.textContent = "Game Over!";
    removeDiv("#answer1");
    removeDiv("#answer2");
    removeDiv("#answer3");
    removeDiv("#answer4");
    var gameoverp = document.createElement("div");
    gameoverp.setAttribute('id', "#gameoverpoints");
    gameoverp.setAttribute('style', 'white-space: pre;');
    gameoverp.className = "gameoverpoints";
    gameoverp.textContent = "Total points: " + time + "\r\nPlay again?";
    document.querySelector("#answerbox").appendChild(gameoverp);
    setTimeout(() => {
        var userInitials = prompt("Enter your initials!");
        localStorage.setItem("Initials:", userInitials);
        localStorage.setItem("Score:", time)
        gameoverp.addEventListener("click", function (event) {
            location.reload();
        })
    }, 500);
}



startButt.addEventListener("click", function () {
    event.preventDefault();
    time = 75;
    countdown();
    quizStart();
});

highscores.addEventListener("click", function (event) {

    this.onclick = null;
    var initials = localStorage.getItem("Initials:");
    var score = localStorage.getItem("Score:");
    if (initials === null || score === null) {
        return;
    } else {
        highscores.append(initials, " : ", score);
    }
})

//start button initializes quiz and timer countdown
function quizStart() {
    startButt.setAttribute("style", "display:none");
    title.setAttribute("style", "display:none");
    //make elements
    questionBox.textContent = questions[0].title;
    addDiv("#answer1", questions[0].choices[0]);
    addDiv("#answer2", questions[0].choices[1]);
    addDiv("#answer3", questions[0].choices[2]);
    addDiv("#answer4", questions[0].choices[3]);


    answerBox.addEventListener("click", function (event) {
        event.preventDefault();
        event.stopPropagation();
        console.log("TARGET:", event.target);
        var userOption = event.target.innerText;
        console.log(userOption);
        var correctAnswer = questions[i].answer;
        if (userOption === correctAnswer) {
            console.log("correct!")
            time = time + 5;
            i++;
            nextQuestion(i);
        } else {
            console.log("incorrect");
            i++;
            time = time - 15;
            document.getElementById("audio").play();
            nextQuestion(i);
        };

        console.log(i);
        console.log(isGameOver);




        //     for(let i = 0; i < questions.length; i++)  {
        //     if (event.target.matches(".answer")) {
        //         var userAnswer = event.target.textContent;
        //         var correctAnswer = questions[i].answer;
        //         console.log("user chose: " + userAnswer);
        //         console.log("Correct answer is: " + correctAnswer);

        //         if (userAnswer === correctAnswer) {
        //             console.log("correct!")
        //             time = time + 5;   
        //             nextQuestion(i);

        //         } else {
        //             console.log("incorrect");
        //             time = time - 15;
        //             document.getElementById("audio").play();
        //             nextQuestion(i);
        //         }
        // } }



        //if right answer then + 5 and move on
        //if wrong answer then - 15 and play audio and move on

        // time = time - 15;
        // document.getElementById("audio").play();

        //total points are how many right answers + time left
        //asks for initials and stores score and initials in localstorage
    })
};