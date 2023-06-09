const canvas = document.querySelector("#draw");
const ctx = canvas.getContext("2d"); //2d context from canvas Element, to draw lines, shapes
canvas.width = window.innerWidth; //to get the current window width
canvas.height = window.innerHeight; //to geht the current window height
ctx.strokeStyle = "red"; //sets the color
ctx.lineJoin = "round"; //style of corner when two lines meet => round
ctx.lineCap = "round"; //style of the end caps for lines => round
ctx.lineWidth = 100; //thickness of the line
//ctx.globalCompositeOperation = "multiply" => overlapping lines turn dark/black

let isDrawing = false; //set to false => no drawing if no permanent mouse click down
let lastX = 0; //beginning of the line x-position
let lastY = 0; //beginning of the line y-position
let hue = 0; //Färbung
let direction = true;

function draw(e) {
  if (!isDrawing) return; //stop the funct. from running when mouse not clicked down
  console.log(e);
  ctx.strokeStyle = `hsl(${hue}, 100%, 50%)` //hsl(hue, satiation (brightness), lightness)
  ctx.beginPath(); //to begin a new path/line
  ctx.moveTo(lastX, lastY); //starting point of the line atm always at 0/0
  ctx.lineTo(e.offsetX, e.offsetY); //draws a line from the starting point to the end point
  ctx.stroke(); //stroke the line on the canvas
  [lastX, lastY] = [e.offsetX, e.offsetY]; //lastX = e.offsetX, lastY = e.offsetY

  hue++; //increments the color
  if (hue >= 360) { //hue range goes from 0 to 360
    hue = 0;
  }

  if (ctx.lineWidth >= 100 || ctx.lineWidth <= 1) {
    direction = !direction; //flip the direction if it's greater than 100 and also the other way around
  }

  if (direction) {
    ctx.lineWidth++; //increment till 100
  } else {
    ctx.lineWidth--; //go down from 100 to 1
  }
}

canvas.addEventListener("mousedown", (e) => { //before we have "mousemove" the X, Y positions will be updated
  isDrawing = true;
  [lastX, lastY] = [e.offsetX, e.offsetY];
});

canvas.addEventListener("mousemove", draw); //visible all the data where mouse is moving on the canvas
canvas.addEventListener("mouseup", () => isDrawing = false);
canvas.addEventListener("mouseout", () => isDrawing = false);
