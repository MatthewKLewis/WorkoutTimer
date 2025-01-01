//#region [rgba(0, 0, 255, 0.1)] NW.JS SETUP
nw.Window.get().x = 3500;
nw.Window.get().y = 40;
const fs = require("fs");
//#endregion

//#region [rgba(255, 0, 0, 0.1)] CONSTANTS
const bell = new Audio("/assets/sound2.mp3");
const workouts = [
  { squats: 10, pushups: 10, situps: 10 },
  { squats: 10, pushups: 10, situps: 10 },
  { squats: 10, pushups: 10, situps: 10 },
  { squats: 10, pushups: 10, situps: 10 },
  { squats: 10, pushups: 10, situps: 10 },
  { squats: 10, pushups: 10, situps: 10 },
  { squats: 10, pushups: 10, situps: 10 },
  { squats: 10, pushups: 10, situps: 10 },
  { squats: 10, pushups: 10, situps: 10 },
  { squats: 10, pushups: 10, situps: 10 },
  { squats: 10, pushups: 10, situps: 10 },
  { squats: 10, pushups: 10, situps: 10 },
];
//#endregion

// #region [rgba(0, 255, 0, 0.1)] DOCUMENT
var clockEl = document.getElementById("clock");
var muteButtonEl = document.getElementById("mute-button");
var completeButtonEl = document.getElementById("complete-button");
document.addEventListener("keydown", (e) => {
  console.log("player acts");
  switch (e.key) {
    case "Escape":
      nw.App.quit();
      break;
    default:
      //
      break;
  }
});

completeButtonEl.disabled = true;
// #endregion

function getWorkout(hour) {
  return workouts[hour - 1]
    ? workouts[hour]
    : { squats: 1, pushups: 1, situps: 1 };
}

function tick() {
  var d = new Date();
  var s = d.getSeconds();
  var m = d.getMinutes();
  var h = d.getHours();

  clockEl.textContent =
    ("0" + h).substr(-2) +
    ":" +
    ("0" + m).substr(-2) +
    ":" +
    ("0" + s).substr(-2);

  //On the half hour...
  if (s == 0 && m % 30 == 0) {
    //&& m % 30 == 0
    completeButtonEl.disabled = false;
    bell.play();
    console.log(getWorkout(h));
  }

  //Miss your chance at :40
  if (s == 0 && m % 40 == 0) {
    completeButtonEl.disabled = true;
  }
}

function mute() {
  bell.pause();
  bell.currentTime = 0;
}

function logWorkout() {
  var d = new Date();
  var s = d.getSeconds();
  var m = d.getMinutes();
  var h = d.getHours();
  var workoutTime =
    ("0" + h).substr(-2) +
    ":" +
    ("0" + m).substr(-2) +
    ":" +
    ("0" + s).substr(-2) +
    "\n";

  fs.appendFile("log.txt", workoutTime, (err) => {
    if (err) {
      console.error("Error writing file:", err);
    } else {
      console.log("File written successfully!");
      completeButtonEl.disabled = true;
    }
  });
}

//And... bye bye.
setInterval(tick, 1000);
