const express = require('express');
const path = require('path');
const app = express();

// sets static files with the path and joins the current directory name with public. then serves them
app.use(express.static(path.join(__dirname, 'public')));

app.get('/', async (request, response) => {
    response.sendFile(path.join(__dirname, 'public', 'home.html'));
});

app.listen(process.env.PORT || 3000, () => console.log("Running"));

s = 1; // bottleneck size
m = 1; // mean
invw = 1 / 0.15; // curviness

var width = 50;
var height = 50;
var canvas = new Array(height).fill().map(() => new Array(width).fill(0));

function hourglass(y, s, m, invw, left) {
    if (left) 
        return (1 / (s * Math.sqrt(2 * Math.PI))) * (Math.pow(Math.E, (-invw * Math.pow((y - m) / s, 2))));
    else
        return -(1 / (s * Math.sqrt(2 * Math.PI))) * (Math.pow(Math.E, (-invw * Math.pow((y - m) / s, 2)))) + 1;
}

for (let i = 0; i < height; i++) {
    y = i / (height / 2);
    x = hourglass(y, s, m, invw, true);
    x2 = hourglass(y, s, m, invw, false);

    // console.log("(", Math.round(x * width), ", ", Math.round(y * (height / 2)), ")");
    canvas[Math.round(y * (height / 2))][Math.round(x * (width))] = 1;
    canvas[Math.round(y * (height / 2))][Math.round(x2 * (width)) - 1] = 1;
}

for(let i = 0; i < height; i++) {
    for(let n = 0; n < width; n++) {
        if (canvas[i][n] == 0) {
            process.stdout.write(' ');
        } else {
            process.stdout.write('O');
        }
    }
    process.stdout.write("\n");
}