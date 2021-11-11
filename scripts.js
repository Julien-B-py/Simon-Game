// Create an audio object for each key sound and store them in variables
var keyG = new Audio("audio/1.mp3");
var keyR = new Audio("audio/2.mp3");
var keyY = new Audio("audio/3.mp3");
var keyB = new Audio("audio/4.mp3");

// List of keys the game will use to add a new random key to the game seqeuence
var keys = ["key-g", "key-r", "key-y", "key-b"];
// Variable used to perform gameSequence playback
var keysCount = 0;
// Var used to store the sequence of keys the player will have to reproduce.
var gameSequence = [];
// Boolean var to start the game
var gameStarted = false;
// Status var to determine the current state of the game
var gameStatus = "pick";

// Bind a click event handler to all 4 keys
$(".key").click(function() {
  // If game is not started, switch the boolean to true and call game function
  if (gameStarted === false) {
    gameStarted = true;
    game();
  }
  // If game is started
  else {
    // Get the class list of the key that triggered the event.
    // Then pick the second class only and store it in a variable to determine which key got pressed.
    var pressedKey = this.classList[1];
    // Call playSound function and pass in the string.
    playSound(pressedKey);
    // Call keyAnimation function to change key background color on click.
    keyAnimation(pressedKey);

  }

})

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




function game() {

  if (gameStatus === "pick") {

    // New round : add a new key to the sequence
    randomKey = keys[Math.floor(Math.random() * keys.length)];
    gameSequence.push(randomKey);

    gameStatus = "bot_sequence";

  }



  if (gameStatus === "bot_sequence") {

    // Play every single key of the bot sequence
    setTimeout(function() {

      // Call playSound function and pass in the string.
      playSound(gameSequence[keysCount]);
      // Call keyAnimation function to change key background color on click.
      keyAnimation(gameSequence[keysCount]);

      keysCount++;

      if (keysCount < gameSequence.length) {
        game();
      } else {
        keysCount = 0;
        gameStatus = "pick";
      }

    }, 1000);

  }
}
