const canvas = document.getElementById("scene") as HTMLCanvasElement; 
const ctx = canvas.getContext("2d")!; 
 
const toggleButton = document.getElementById("toggle") as HTMLButtonElement; 
const resetButton = document.getElementById("reset") as HTMLButtonElement; 
 
const circleSelect = document.getElementById("circleSelect") as HTMLSelectElement; 
const changeColorButton = document.getElementById("changeColor") as HTMLButtonElement; 
 
const speedInput = document.getElementById("speed") as HTMLInputElement; 
const applySpeedButton = document.getElementById("applySpeed") as HTMLButtonElement; 
 
const circles = [ 
  { x: 100, y: 100, dx: 2, dy: 2, r: 20, color: "red" }, 
  { x: 300, y: 150, dx: -2, dy: 2, r: 20, color: "blue" }, 
  { x: 500, y: 250, dx: 2, dy: -2, r: 20, color: "green" } 
]; 
 
let paused = false; 
 
function draw() { 
  ctx.clearRect(0, 0, canvas.width, canvas.height); 
 
  circles.forEach((circle: any) => { 
    if (!paused) { 
      circle.x += circle.dx; 
      circle.y += circle.dy; 
 
      if (circle.x + circle.r > canvas.width || circle.x - circle.r < 0) { 
        circle.dx *= -1; 
      } 
 
      if (circle.y + circle.r > canvas.height || circle.y - circle.r < 0) { 
        circle.dy *= -1; 
      } 
    } 
 
    ctx.beginPath(); 
    ctx.arc(circle.x, circle.y, circle.r, 0, Math.PI * 2); 
    ctx.fillStyle = circle.color; 
    ctx.fill(); 
  }); 
 
  requestAnimationFrame(draw); 
} 
 
toggleButton.addEventListener("click", () => { 
  paused = !paused; 
  toggleButton.textContent = paused ? "Play" : "Pause"; 
}); 
 
resetButton.addEventListener("click", () => { 
  circles[0].x = 100; 
  circles[0].y = 100; 
 
  circles[1].x = 300; 
  circles[1].y = 150; 
 
  circles[2].x = 500; 
  circles[2].y = 250; 
}); 
 
changeColorButton.addEventListener("click", () => { 
  const selectedCircle = Number(circleSelect.value); 
 
  if (selectedCircle === 0) { 
    circles[0].color = circles[0].color === "red" ? "yellow" : "red"; 
  } 
 
  if (selectedCircle === 1) { 
    circles[1].color = circles[1].color === "blue" ? "yellow" : "blue"; 
  } 
 
  if (selectedCircle === 2) { 
    circles[2].color = circles[2].color === "green" ? "yellow" : "green"; 
  } 
}); 
 
applySpeedButton.addEventListener("click", () => { 
  const speed = Number(speedInput.value); 
 
  circles.forEach((circle: any) => { 
    circle.dx = circle.dx < 0 ? -speed : speed; 
    circle.dy = circle.dy < 0 ? -speed : speed; 
  }); 
}); 
 
draw();