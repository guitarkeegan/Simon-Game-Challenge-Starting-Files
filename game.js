const buttonColors = ["red", "blue", "green", "yellow"];
const buttonSounds = ["red.mp3", "blue.mp3", "green.mp3", "yellow.mp3"];
var gamePattern = [];
var userClickedPattern = [];

var randomNumber = Math.floor(Math.random() * 4);
var level = 0;
var randomChosenColor = buttonColors[randomNumber];

function nextSequence() {
    level++;
    randomNumber = Math.floor(Math.random() * 4);
    $("#" + buttonColors[randomNumber]).fadeOut(100).fadeIn(100);
    playSound(buttonColors[randomNumber]);
    gamePattern.push(buttonColors[randomNumber]);
    $("h1").text("Level " + level);
}

$(document).keypress(function () {
    if (level === 0) {
        nextSequence();
    }
})

$(".btn").on("click", function () {
    var userChosenColor = this.id;
    userClickedPattern.push(userChosenColor);
    playSound(userChosenColor)
    animatePress(userChosenColor)
    userCorrect()
})

function playSound(name) {
    var buttonSound = new Audio("sounds/" + name + ".mp3");
    buttonSound.play();
}

function animatePress(currentColor) {
    $("#" + currentColor).addClass("pressed");
    setTimeout(function () {
        $("#" + currentColor).removeClass("pressed");
    }, 100);
}

function userCorrect() {
    for (var i = 0; i < userClickedPattern.length; i++)
        if (gamePattern[i] === userClickedPattern[i]) {
            console.log('user correct')
            console.log(gamePattern)
            console.log(userClickedPattern)
            if (gamePattern.length === userClickedPattern.length) {
                setTimeout(nextSequence, 500);
                userClickedPattern = []
            }
            
        }
        else {
            playSound("wrong");
            $("h1").text("Whoops, not that one!")
            console.log(gamePattern)
            console.log(userClickedPattern)
            setTimeout(resetGame, 2000)
        }
}

function resetGame() {
    $("h1").text("Press A Key to Start");
    level = 0
    gamePattern = []
    userClickedPattern = []
}