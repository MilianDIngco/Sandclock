const express = require('express');
const path = require('path');
const app = express();

// sets static files with the path and joins the current directory name with public. then serves them
app.use(express.static(path.join(__dirname, 'public')));

app.get('/', async (request, response) => {
    response.sendFile(path.join(__dirname, 'public', 'home.html'));
});

app.listen(process.env.PORT || 3000, () => console.log("Running"));

function hourglass(y, s, m, w, left) {
    if (left) 
        return (1 / (s * Math.sqrt(2 * Math.PI))) * (Math.pow(Math.E, (-(1/w) * Math.pow((y - m) / s, 2))));
    else
        return -(1 / (s * Math.sqrt(2 * Math.PI))) * (Math.pow(Math.E, (-(1/w) * Math.pow((y - m) / s, 2)))) + 1;
}

function dhourglass(y, s, m, w, left) {
    if (left)
        return ((2 * y - 2 * m) / (s * s * s * w * Math.sqrt(2 * Math.PI))) * Math.exp(-(1/w) * Math.pow((y - m) / s, 2));
    else
        return -((2 * y - 2 * m) / (s * s * s * w * Math.sqrt(2 * Math.PI))) * Math.exp(-(1/w) * Math.pow((y - m) / s, 2));
}

function fillHourglass(y1, y2, canvas, canvasHeight, canvasWidth) {
    if (y1 < 0 || y2 > canvasHeight) {
        console.log("ERROR: Fill height out of bounds");
        return
    }

    if (y2 < y1) {
        let temp = y2; 
        y2 = y1;
        y1 = temp;
    }
    
    for (let i = y1; i < y2; i++) {
        // get left side 
        let left = -1;
        for (let n = Math.floor(canvasWidth / 2); n >= 0; n--) {
            if (canvas[i][n] == 1) {
                left = n + 1;
                break;
            }
        }

        if (left == -1) {
            console.log("ERROR: Hourglass intersecting?");
            return;
        }

        // get right side
        let right = -1;
        for (let n = Math.ceil(canvasWidth / 2); n < canvasWidth; n++) {
            if (canvas[i][n] == 1) {
                right = n - 1;
            }
        }

        for (let n = left; n <= right; n++) {
            canvas[i][n] = 2;
        }
    }
}

function drawHourglass(canvas, canvasHeight, canvasWidth) {
    let s = 1; // bottleneck size
    let m = 1; // mean
    let w = 0.15; // curviness

    prevx = 0;
    prevx2 = canvasWidth - 1;
    for (let i = 0; i < canvasHeight; i++) {
        y = i / (canvasHeight / 2);
        x = Math.round(hourglass(y, s, m, w, true) * (canvasWidth));
        x2 = Math.round(hourglass(y, s, m, w, false) * (canvasWidth)) - 1;
        y = Math.round(y * (height / 2));
        
        canvas[y][x] = 1;
        canvas[y][x2] = 1;

        if (prevx == x) {
            canvas[y][x] = 1;
        } else {
            let increment = (prevx < x) ? 1 : -1;
            for (let n = prevx + increment; n != x; n += increment) {
                canvas[y][n] = 1;
            }
        }

        if (prevx2 == x2) {
            canvas[y][x] = 1;
        } else {
            let increment = (prevx2 > x2) ? -1 : 1;
            for (let n = prevx2 + increment; n != x2; n += increment) {
                canvas[y][n] = 1;
            }
        }

        prevx = x;
        prevx2 = x2;
    }
}

function printHourglass(canvas, canvasHeight, canvasWidth) {
    for(let i = 0; i < canvasHeight; i++) {
        for(let n = 0; n < canvasWidth; n++) {
            if (canvas[i][n] == 0) {
                process.stdout.write('.');
            } else if (canvas[i][n] == 1) {
                process.stdout.write('O');
            } else {
                process.stdout.write(';');
            }
        }
        process.stdout.write("\n");
    }
}


let width = 30;
let height = 30;
let canvas = new Array(height).fill().map(() => new Array(width).fill(0));

drawHourglass(canvas, height, width);
fillHourglass(0, 5, canvas, height, width);
printHourglass(canvas, height, width);
