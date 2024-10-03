const colorPicker = document.getElementById("colorPicker");
const canvasColor = document.getElementById("canvasColor");
const FontSize = document.getElementById("FontSize");
const canvas = document.getElementById("Mycanvas");
const clearButton = document.getElementById("clearButton");
const downloadButton = document.getElementById("succesButton");
const retreiveButton = document.getElementById("retreiveButton");
const ctx = canvas.getContext('2d');

let isDrawing = false;
let lastX = 0;
let lastY = 0;

// Update canvas size on window resize
function resizeCanvas() {
    const aspectRatio = 800 / 300;
    canvas.width = canvas.offsetWidth;
    canvas.height = canvas.offsetWidth / aspectRatio;
    ctx.fillStyle = '#FFFFFF';
    ctx.fillRect(0, 0, canvas.width, canvas.height);
}

window.addEventListener('resize', resizeCanvas);
resizeCanvas(); // Initial call to set canvas size

// Color and font size picker functionality
colorPicker.addEventListener('change', (e) => {
    ctx.strokeStyle = e.target.value;
    ctx.fillStyle = e.target.value;
});

canvasColor.addEventListener('change', (e) => {
    ctx.fillStyle = e.target.value;
    ctx.fillRect(0, 0, canvas.width, canvas.height);
});

FontSize.addEventListener('change', (e) => {
    ctx.lineWidth = e.target.value;
});

// Mouse and touch drawing
function startDrawing(x, y) {
    isDrawing = true;
    lastX = x;
    lastY = y;
}

function draw(x, y) {
    if (!isDrawing) return;
    ctx.beginPath();
    ctx.moveTo(lastX, lastY);
    ctx.lineTo(x, y);
    ctx.stroke();
    lastX = x;
    lastY = y;
}

function stopDrawing() {
    isDrawing = false;
}

// Mouse events
canvas.addEventListener('mousedown', (e) => startDrawing(e.offsetX, e.offsetY));
canvas.addEventListener('mousemove', (e) => draw(e.offsetX, e.offsetY));
canvas.addEventListener('mouseup', stopDrawing);
canvas.addEventListener('mouseout', stopDrawing);

// Touch events for touch screens
canvas.addEventListener('touchstart', (e) => {
    const touch = e.touches[0];
    const rect = canvas.getBoundingClientRect();
    startDrawing(touch.clientX - rect.left, touch.clientY - rect.top);
});

canvas.addEventListener('touchmove', (e) => {
    const touch = e.touches[0];
    const rect = canvas.getBoundingClientRect();
    draw(touch.clientX - rect.left, touch.clientY - rect.top);
    e.preventDefault(); // Prevent scrolling
});

canvas.addEventListener('touchend', stopDrawing);

// Clear button functionality
clearButton.addEventListener('click', () => {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    
    ctx.fillRect(0, 0, canvas.width, canvas.height);
});

// Download functionality
downloadButton.addEventListener('click', () => {
    localStorage.setItem('canvasContents', canvas.toDataURL());
    let link = document.createElement('a');
    link.download = 'My-canvas.png';
    link.href = canvas.toDataURL();
    link.click();
});

// Retrieve saved drawing
retreiveButton.addEventListener('click', () => {
    let savedcanvas = localStorage.getItem('canvasContents');
    if (savedcanvas) {
        let img = new Image();
        img.src = savedcanvas;
        img.onload = function () {
            ctx.drawImage(img, 0, 0);
        }
    } else {
        alert('No saved data found');
    }
});
