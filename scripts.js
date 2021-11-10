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
  // Call keyAnimation function to change key background color on click.
  keyAnimation(pressedKey);
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
