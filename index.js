const gridNode = document.querySelector(".grid-container");

const slider = document.querySelector(".slider");
const sliderValue = document.querySelector(".settings-container-size__value");
const colorPicker = document.querySelector(".color-picker");

const clearBtn = document.querySelector(".settings-container-clear-btn");
const rainbowModeBtn = document.querySelector(".rainbow");
const eraserModeBtn = document.querySelector(".settings-container-eraser-btn");

const defaultGridSize = 16;
let printColor = colorPicker.value;
let isMouseDown = false;

renderGrid(defaultGridSize);

sliderValue.innerHTML = `Size of a grid: ${slider.value}x${slider.value}`;
slider.oninput = () => {
  sliderValue.innerHTML = `Size of a grid: ${slider.value}x${slider.value}`;
  renderGrid(slider.value);
};

colorPicker.addEventListener("blur", () => changeColorMode(colorPicker.value));
rainbowModeBtn.addEventListener("click", () => changeColorMode("rainbow"));
eraserModeBtn.addEventListener("click", () => changeColorMode("eraser"));

clearBtn.addEventListener("click", () => {
  const allSquares = document.querySelectorAll(".square");

  allSquares.forEach((square) => (square.style.backgroundColor = ""));
});

document.body.onmousedown = () => (isMouseDown = true);
document.body.onmouseup = () => (isMouseDown = false);

function randomizeColor() {
  const randomR = Math.floor(Math.random() * 256);
  const randomG = Math.floor(Math.random() * 256);
  const randomB = Math.floor(Math.random() * 256);
  return `rgb(${randomR}, ${randomG}, ${randomB})`;
}

function paintGrid(e) {
  if (e.type === "mouseover" && !isMouseDown) return;

  if (printColor === "rainbow") {
    e.target.style.backgroundColor = randomizeColor();
  } else if (printColor === "eraser") {
    e.target.style.backgroundColor = "";
  } else {
    e.target.style.backgroundColor = colorPicker.value;
  }
}

function changeColorMode(color) {
  if (color === "rainbow") {
    printColor = "rainbow";

    rainbowModeBtn.classList.add("active");
    eraserModeBtn.classList.remove("active");
  } else if (color === "eraser") {
    printColor = "eraser";

    eraserModeBtn.classList.add("active");
    rainbowModeBtn.classList.remove("active");
  } else {
    printColor = colorPicker.value;

    rainbowModeBtn.classList.remove("active");
    eraserModeBtn.classList.remove("active");
  }
}

function renderGrid(gridSize) {
  gridNode.innerHTML = "";

  for (let i = 0; i < gridSize * gridSize; i++) {
    const newSquare = document.createElement("div");
    newSquare.classList.add("square");
    newSquare.style.flex = `${100 / gridSize}%`;

    newSquare.addEventListener("mouseover", paintGrid);
    newSquare.addEventListener("mousedown", paintGrid);

    gridNode.appendChild(newSquare);
  }
}
