var gamePattern = [];
var buttonColors = ["red","blue","green","yellow"];
var userClickedPattern = [];
var level = 0;
var started = false;
var clicked = false;

// Event handler for the overlay close button click
$(document).ready(function() { 
    $("#close-overlay").click(function(){
        $("#instructions-overlay").fadeOut();
        clicked = true;
    })

    $("#start-button").click(function() {
        if (!started) {
            $("#level-title").text(`Level ${level}`);
            nextSequence();
            started = true;
            $("#start-button").hide();
        }
    });
    
    // Toggle the visiblility of the video

    $('#instruction-video-button').on('click', function() {
        $('#instruction-video').toggle(); 
    });

    $('#close-overlay').on('click', function() {
        $('#instruction-video').hide(); 
    });

});
// Event handler for keypress to start the game if it hasn't started yet
$(document).keypress(function() {
    if (!started && clicked) {
        $("#level-title").text(`Level ${level}`);
        nextSequence();
        started = true;
        $("#start-button").hide();
    }   
});
// Function to play the sound associated with a button
function playSound(buttonName){
    var audio = new Audio("sounds/" + buttonName + ".mp3");
    audio.play();

}
// Function to add and remove the "pressed" class to animate button press
function animatePress(currentColour){
    $("#"+currentColour).addClass("pressed");

    setTimeout(function(){
        $("#"+currentColour).removeClass("pressed");
   },100); //delay is in milliseconds 

}
// Function to reset the game variables and start over
function startOver(){
    level = 0;
    gamePattern = [];
    started = false;
    $("#start-button").show();
}
// Function to generate the next sequence of colors and update the level
function nextSequence() {
    userClickedPattern = [];
    level++;

    $("#level-title").text(`Level ${level}`);
    
    var randomNumber = Math.floor(Math.random()*4);
    var randomChosenColour = buttonColors[randomNumber];

    gamePattern.push(randomChosenColour);

    $("#"+ randomChosenColour).fadeOut(250).fadeIn(250);

   playSound(randomChosenColour);
   
}
// Event handler for button clicks
$(".btn").on("click",function () {
    if (started){
        var userChosenColour = $(this).attr("id")// refers to the button element that was clicked.
        userClickedPattern.push(userChosenColour);


        playSound(userChosenColour);
        animatePress(userChosenColour);
        checkAnswer(userClickedPattern.length-1)
    }
    
})
// Function to check the user's answer against the game pattern
function checkAnswer(currentLevel){

    if(gamePattern[currentLevel] === userClickedPattern[currentLevel]){
        console.log("success");

        if(userClickedPattern.length === gamePattern.length){

            setTimeout(function() {
                nextSequence();

            }, 1000);
        }
    }else {
        playSound("wrong");

        $("#level-title").css("font-size","3.5rem")
        $("#level-title").text("Game Over, Press a Key or Tap 'Start' to Restart");
        $("body").addClass("game-over");
        setTimeout(function(){
            $("body").removeClass("game-over");
        }, 200); //delay is in milliseconds 
        
        startOver();
    }
}

