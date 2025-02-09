const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');

ctx.fillStyle = "green";
ctx.fillRect(10, 10, 150, 100);

const screenWidth = window.screen.width;
const screenHeight = window.screen.height;
const aspectRatio = screenWidth / screenHeight;

console.log("screen width: ", screenWidth);
console.log("screen height: ", screenHeight);
console.log("aspect ratio: ", aspectRatio);``