const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');
let lastTime = performance.now();

canvas.width = window.innerWidth * .8;
canvas.height = window.innerHeight * .8;

class Vector {
    constructor( { x = 0, y = 0 } = {}) {
        this.x = x;
        this.y = y;

        this.length = Math.sqrt(x * x + y * y);
    }

    toString() {
        return "(" + this.x + ", " + this.y + ")";
    }

    copy( other_Vector ) {
        this.x = other_Vector.x;
        this.y = other_Vector.y;
    }

    /** param: other_Vector
     * Takes a vector and adds it to itself
     */
    add( other_Vector ) {
        this.x += other_Vector.x;
        this.y += other_Vector.y;
    }

    /** param: other_Vector
     * Takes a vector and returns the sum of the two vectors
     */
    addCopy( other_Vector ) {
        return new Vector( {x: this.x + other_Vector.x, y: this.y + other_Vector.y} );
    }

    scale(scale_f) {
        this.x *= scale_f;
        this.y *= scale_f;
    }

    scaleCopy(scale_f) {
        return new Vector( {x: this.x * scale_f, y: this.y * scale_f});
    }

    normalize() {
        this.x /= this.length;
        this.y /= this.length;
    }

    normalizeCopy() {
        return new Vector( {x: this.x / this.length, y: this.y / this.length} );
    }

    negative() {
        this.x *= -1;
        this.y *= -1;
    }

    negativeCopy() {
        return new Vector( {x: -this.x, y: -this.y} );
    }
}

class Particle {
    constructor( { id_i = -1, mass_f = 1.0, radius_f = 1.0, position_Vector = new Vector({x: 0, y: 0}), force_Vector = new Vector({x: 0, y: 0}), velocity_Vector = new Vector({x: 0, y: 0}), color_s = "#FFFFFF" } = {} ) {
        if(id_i == -1)
            throw new Error("Missing parameter: id_i");

        this.id_i = id_i;
        this.mass_f = mass_f;
        this.radius_f = radius_f;
        this.position_Vector = position_Vector;
        this.force_Vector = force_Vector;
        this.velocity_Vector = velocity_Vector;
        this.color_s = color_s;
    }

    addForce( force_Vector ) {
        this.force_Vector.add( {other_Vector: force_Vector} );
    }

    update( delta_t_f ) {
        // Updates position given a force, calculating the acceleration and velocity
        let acceleration_Vector = this.force_Vector.scaleCopy(1 / this.mass_f);
        this.velocity_Vector.add( acceleration_Vector.scaleCopy(delta_t_f) );
        this.position_Vector.add( this.velocity_Vector.scaleCopy(delta_t_f) );
    }

}


function init() {
    lastTime = performance.now();
    window.requestAnimationFrame(loop);
}

function loop(currentTime) {
    // Gets change in time then converts it into seconds
    let deltaTime = (currentTime - lastTime) / 1000; 
    lastTime = currentTime;
    update(deltaTime);
    draw();

    requestAnimationFrame(loop);
}

function update(deltaTime) {
    sand.update(deltaTime);
}

function draw() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    ctx.beginPath();
    ctx.arc(sand.position_Vector.x, sand.position_Vector.y, sand.radius_f, 0, 2 * Math.PI);
    ctx.fillStyle = 'red';
    ctx.fill();
    ctx.closePath();
}

// Setting the scene
gravity = new Vector({x: 0, y: 20.81});
sand = new Particle({
    id_i: 0,
    mass_f: 1,
    radius_f: 10,
    position_Vector: new Vector({x: 10, y: 10}),
    force_Vector: gravity,
    color_s: "#4830b3"
});

init();

