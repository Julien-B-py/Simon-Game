// Create an audio object for each key sound and store them in variables
var keyG = new Audio("audio/1.mp3");
var keyR = new Audio("audio/2.mp3");
var keyY = new Audio("audio/3.mp3");
var keyB = new Audio("audio/4.mp3");

// List of keys the game will use to add a new random key to the game seqeuence
var keys = ["key-g", "key-r", "key-y", "key-b"];
// Variable used to perform gameSequence playback
var keysCount = 0;
// Array used to store the sequence of keys the player will have to reproduce.
var gameSequence = [];
// Boolean var to start the game
var gameStarted = false;
// Status var to determine the current state of the game
var gameStatus = "PICK_KEY";
// Array used to store the sequence of keys the player is performing.
var playerSequence = [];
// Variable used to compare game and player sequences key by key
var currentPlayerKey = 0;
// Player score
var score = $(".score").text();

// Bind a click event handler to all 4 keys
$(".key").click(function() {
  // If game is not started, switch the boolean to true and call game function
  if (gameStarted === false) {
    gameStarted = true;
    // Hide score div
    $(".scores").slideUp();

    resetScore();
    game();

  }
  // If game is started
  else {
    // Get the class list of the key that triggered the event.
    // Then pick the second class only and store it in a variable to determine which key got pressed.
    var pressedKey = this.classList[1];
    // Call playSound function and pass in the string to play the sound corresponding to the key clicked by the user.
    playSound(pressedKey);
    // Call keyAnimation function to change key background color on click.
    keyAnimation(pressedKey);

    // If it is user's turn
    if (gameStatus = "PLAYER_SEQUENCE") {
      // Add pressed key to the playerSequence array
      playerSequence.push(pressedKey);
      // Compare key clicked by user with computer key to check if they match
      // If they dont match the user made a mistake
      if (playerSequence[currentPlayerKey] !== gameSequence[currentPlayerKey]) {
        $("h2").text("You made a mistake...");
        // Check if user score is higher than previous saved highest score
        if (score > $(".hi-score").text()) {
          // If so update highest score text
          $(".hi-score").text(score);
        }

        // Show score div
        $(".scores").slideDown();

        resetGame();
        // Exit current function
        return;

      }

      // If both keys are matching increment index value to check the next key the user will click on
      currentPlayerKey++;

      // If we reached the end of the game sequence it means the user succeeded
      if (currentPlayerKey === gameSequence.length) {
        $("h2").text("Well done!");
        gameStatus = "PICK_KEY";
        // Reset currentPlayerKey and user sequence array for the next turn
        currentPlayerKey = 0;
        playerSequence = [];

        incrementScore();

        // Call game function after 500ms to let computer add a new key to the sequence
        setTimeout(function() {
          game();
        }, 500);

      }
    }

  }

});


// Hide score menu when "Play again" is clicked
$(".replay-button").click(function() {

  $(".scores").slideUp();

});


// Starts playing the audio corresponding to the received key
function playSound(key) {
  switch (key) {
    case "key-g":
      keyG.play();
      break;

    case "key-r":
      keyR.play();
      break;

    case "key-y":
      keyY.play();
      break;

    case "key-b":
      keyB.play();
      break;
  }
}


// Changes the specified key background color by adding a class to the key element temporarily
function keyAnimation(key) {
  // Get the pressed key element
  var activeKey = $("." + key);
  // Add a class to it then remove it after 200ms
  activeKey.addClass("pressed-" + key);
  setTimeout(function() {
    activeKey.removeClass("pressed-" + key);
  }, 200);

}


// Deal with computer parts of the game
function game() {
  // Pick a new key to add to the game sequence
  if (gameStatus === "PICK_KEY") {

    pickNewKey();

  }

  // Play the game sequence the user will have to reproduce
  else if (gameStatus === "BOT_SEQUENCE") {

    playSequenceToReproduce();

  }

}


// Pick a new key to add to the game sequence
function pickNewKey() {
  $("h2").text("Listen carefully...");

  // New round : add a new key to the sequence
  randomKey = keys[Math.floor(Math.random() * keys.length)];
  gameSequence.push(randomKey);

  gameStatus = "BOT_SEQUENCE";

  game();

}


// Play every single key of the bot sequence
function playSequenceToReproduce() {

  // Plays a key from the bot sequence then plays the next key after 1s until we reach the end of the sequence
  setTimeout(function() {

    // Call playSound function and pass in the string.
    playSound(gameSequence[keysCount]);
    // Call keyAnimation function to change key background color on click.
    keyAnimation(gameSequence[keysCount]);

    // Increment current key index
    keysCount++;

    // If there are keys left to play in the sequence
    if (keysCount < gameSequence.length) {
      // Call the function again
      playSequenceToReproduce();
    }
    // If we reached the end of the sequence
    else {
      // Reset key index and allow player to play
      keysCount = 0;
      gameStatus = "PLAYER_SEQUENCE";
      // Display a message to the user to let him know
      setTimeout(function() {
        $("h2").text("Your turn!");
      }, 500);

    }

  }, 1000);
}

// Add 1 to user score and update displayed value
function incrementScore() {
  score++;
  $(".score").text(score);
}


// Set user score value to 0 and update displayed value
function resetScore() {
  score = 0;
  $(".score").text(score);
}


// Reset game state to start a new one
function resetGame() {

  // After 500ms reset all behavior variables to their init values and display starting h2 message.
  setTimeout(function() {

    keysCount = 0;
    currentPlayerKey = 0;
    gameSequence = [];
    playerSequence = [];
    gameStarted = false;
    gameStatus = "PICK_KEY";
    $("h2").text("Click on any key to start");

  }, 500);

}
