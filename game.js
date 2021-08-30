var gamePattern = [];
var userClickedPattern = [];
var buttonColors = ["red", "blue", "green", "yellow"];

var level = 0;
var isStarted = false;

if (isStarted == false) {
    $("body").on("keydown", function() {
        nextSequence();
    });
}

//Randomely generated sequence

function nextSequence() {
    var randomNum = Math.floor(Math.random() * 4);
    var randomChosenColor = buttonColors[randomNum];
    gamePattern.push(randomChosenColor);

    $("#" + randomChosenColor).fadeIn(200).fadeOut(200).fadeIn(200);

    playSound(randomChosenColor);
    animateClick(randomChosenColor);
    level++;
    $("#level-title").text("Level " + level);
    isStarted = true;


}

//Player will click the remembered sequence

$(".btn").on("click", function clicked(event) {
    var userChosenColor = event.target.id;
    userClickedPattern.push(userChosenColor);
    //console.log(userClickedPattern);
    playSound(userChosenColor);
    animateClick(userChosenColor);
    checkPattern(userClickedPattern.length - 1);
    isStarted = true;

});

//Play sound on each click

function playSound(name) {

    var audio = new Audio("sounds/" + name + ".mp3");
    audio.play();
    isStarted = true;

}

//Button click effect

function animateClick(currentColor) {
    $(".btn").on("click", function(event) {
        currentColor = event.target.id;
        $("#" + currentColor).addClass("pressed");
        setTimeout(function() {
            $("#" + currentColor).removeClass("pressed");
        }, 100);
    });

}

//Comparing the pattern clicked by user with the randomely generated game pattern

function checkPattern(currentLevel) {
    //debugger;
    if (gamePattern[currentLevel] === userClickedPattern[currentLevel]) {
        console.log("Correct!");
        if (gamePattern.length === userClickedPattern.length) {
            setTimeout(function() {
                nextSequence();
                userClickedPattern = [];
            }, 1000);
        }
    } else {
        //console.log("Wrong!");
        //alert("Wrong!");
        $("body").addClass("game-over");
        setTimeout(function() {
            $("body").removeClass("game-over");
        }, 200);
        playSound("wrong");
        $("#level-title").text("Game over! Press any button to restart!");
        restart();

    }
    console.log(gamePattern);
    console.log(userClickedPattern);
}

//Restart the game

function restart() {
    level = 0;
    gamePattern = [];
    userClickedPattern = [];
    isStarted = false;
}