// Create an audio object for each key sound and store them in variables
var keyG = new Audio("audio/1.mp3");
var keyR = new Audio("audio/2.mp3");
var keyY = new Audio("audio/3.mp3");
var keyB = new Audio("audio/4.mp3");

// Bind a click event handler to all 4 keys
$(".key").click(function() {
  // Get the class list of the key that triggered the event.
  // Then pick the second class only and store it in a variable to determine which key got pressed.
  var pressedKey = this.classList[1];
  // Call playSound function and pass in the string.
  playSound(pressedKey);
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
