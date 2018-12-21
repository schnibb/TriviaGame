$(document).ready(function() {
    //declare questions and answers, 10 in total.
    var questions = [{
            question: "In the 1996 comedy Jingle All the Way, what is the name of the action figure that the father is trying to find?",
            answers: [{ answer: "GI Joe", correct: false }, { answer: "Barbie", correct: false }, { answer: "Turbo Man", correct: true }, { answer: "Tickle Me Elmo", correct: false }]
        },
        {
            question: "In the Santa Clause, what restaurant did Scott Calvin take his son to after burning the Turkey?",
            answers: [{ answer: "Denny's", correct: true }, { answer: "P.F. Changs", correct: false }, { answer: "McDonalds", correct: false }, { answer: "Pizza Hut", correct: false }]
        },
        {
            question: "In National Lampoon's Christmas Vacation, what was Clark Griswold going to buy with his Christmas Bouns?",
            answers: [{ answer: "A new House", correct: false }, { answer: "A pool", correct: true }, { answer: "A new Car", correct: false }, { answer: "A new Motorhome", correct: false }]
        },
        {
            question: "In the movie Elf, what is the first rule of the Code of the Elves?",
            answers: [{ answer: "Play like a champion", correct: false }, { answer: "There's no crying in the North Pole", correct: false }, { answer: "Treat every day like Christmas", correct: true }, { answer: "You do not talk about fight club", correct: false }]
        },
        {
            question: "In the Santa Clause 3, who is the villain?",
            answers: [{ answer: "Father Time", correct: false }, { answer: "The Tooth Fairy", correct: false }, { answer: "Mother Earth", correct: false }, { answer: "Jack Frost", correct: true }]
        },
        {
            question: "In A Christmas Story, what gift did Ralphie want?",
            answers: [{ answer: "A football", correct: false }, { answer: "Bunny pajamas", correct: false }, { answer: "A pocket knife", correct: false }, { answer: "a Red Ryder BeeBee gun", correct: true }]
        },
        {
            question: "In Four Christmases, where do the characters tell their families that they going?",
            answers: [{ answer: "Hawaii", correct: false }, { answer: "Africa", correct: false }, { answer: "Burma", correct: true }, { answer: "Puerto Rico", correct: false }]
        },
        {
            question: "What is the name of the town in How the Grinch Stole Christmas?",
            answers: [{ answer: "Savannah", correct: false }, { answer: "Whoville", correct: true }, { answer: "Whotown", correct: false }, { answer: "Whoknows", correct: false }]
        },
        {
            question: "What is the name of the main character in It's a Wonderful Life?",
            answers: [{ answer: "George Bailey", correct: true }, { answer: "Clark Griswold", correct: false }, { answer: "Buddy the Elf", correct: false }, { answer: "Santa Claus", correct: false }]
        },
        {
            question: "In the movie The Polar Express, for whom does the bell ring?",
            answers: [{ answer: "Kids", correct: false }, { answer: "True Believers", correct: true }, { answer: "Those on the good list", correct: false }, { answer: "Everyone", correct: false }]
        }
    ];

    //declare global variables.
    var numberCorrect = 0;
    var numberIncorrect = 0;
    var numberUnanswered = 0;
    var score = 0;
    var questionNumber = 0;
    var timer = 10;
    var gameTimer;
    var resultTimer;
    var timerOnScreen = $("#timerText");
    var scoreOnScreen = $("#gameScoreText");
    var isGameStarted = false;

    //generate the questions and answers and display them to the DOM.
    function addQuestionToDom() {
        $("#correctAnswerText").empty();
        //set the timer
        clearInterval(gameTimer);
        clearInterval(resultTimer);
        timer = 10;
        //put the timer on the screen.
        timerOnScreen.text(timer);
        //assign the current question from the array above.
        var questionOnScreen = questions[questionNumber];
        //increment the question count by 1.
        questionNumber++;
        $("#question").text(questionOnScreen.question);
        //loop through the answers and display them to the DOM.
        for (var i = 0; i < 4; i++) {
            $("#answer" + i).text(questionOnScreen.answers[i].answer);
            $("#answer" + i).data(questionOnScreen.answers[i]);
        }
        //reset the gametimer interval. and call the startclock function to keep track of the time.
        gameTimer = setInterval(startClock, 1000);
    }

    //game timer function to track and display the time remaining for the questions.
    function startClock() {
        timer--;
        timerOnScreen.text(timer);
        //handels out of time scenarios.
        if (timer === 0) {
            //if we have reached out last question, then we will display the results.
            if (questionNumber === 10) {
                $("#correctAnswerText").html("<h3>You ran out of Time.</h3>");
                resultTimer = setInterval(showGameResults, 1000);
                //showResults();
            } else {
                $("#correctAnswerText").html("<h3>You ran out of Time.</h3>");
                //else we will increase the unanaswered questions by one and then generate the next question.
                numberUnanswered++;
                resultTimer = setInterval(addQuestionToDom, 1000);
                //addQuestionToDom();
            }
        }
    }

    //funcion to show the game results.  
    function showGameResults() {
        $("#gameStart").show();
        $("#correctAnswerText").empty();
        //reset the question number for a possible next game.
        questionNumber = 0;
        //stop the game clock.
        clearInterval(gameTimer);
        //display the game results.
        $("#question").text("Results");
        $("#answer0").text("Questions Correct: " + numberCorrect);
        $("#answer1").text("Questions Incorrect: " + numberIncorrect);
        $("#answer2").text("Questions Unanswered: " + numberUnanswered);
        $("#answer3").hide();
        //play again, if clicked call the reset game function.
        $("#gameStart").text("Play Again?");
        $("#gameStart").on("click", function() {
            resetGame();
        })
    }

    //reset game function will reset all stats and call the create question to DOM function.
    function resetGame() {
        $("#answer3").show();
        numberCorrect = 0;
        numberIncorrect = 0;
        numberUnanswered = 0;
        score = 0;
        questionNumber = 0;
        addQuestionToDom();
    }

    //start the game.
    $("#gameStart").on("click", function() {
        $("#gameStart").hide();
        addQuestionToDom();
    })

    //click function to grab the value from the answers, check the answer for correctness.
    $(".answer").on("click", function() {
        //grabs and stores the value.

        var isCorrect = $(this).data().correct;
        console.log(isCorrect);
        //if correct then increase numbercorrect.
        if (isCorrect) {
            numberCorrect++;
            //displays the current score on the screen for the user.
            $("#gameScoreText").text(numberCorrect * 10);
            $("#correctAnswerText").html("<h3>You Got it</h3>");
        } else {
            //if wrong, increase the number incorrect.
            numberIncorrect++;
            $("#correctAnswerText").html("<h3>Incorrect</he>");
        }
        //if we answered our last question, we will go to the results.
        if (questionNumber === 10) {
            //showGameResults();
            clearInterval(gameTimer);
            resultTimer = setInterval(showGameResults, 1000);
            //if not, we will go to the next question.
        } else {
            //addQuestionToDom();
            clearInterval(gameTimer);
            resultTimer = setInterval(addQuestionToDom, 1000);
        }
    })

})