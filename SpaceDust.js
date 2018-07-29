class SpaceDust {
    constructor(spawnPos, spawnVel) {
        if (spawnPos)
            this.pos = spawnPos;
        else
            this.pos = createVector(random(width), random(height));

        if (spawnVel)
            this.velocity = spawnVel;
        else
			this.velocity = createVector(random(-DUST_VELOCITY, DUST_VELOCITY)
								   	   , random(-DUST_VELOCITY, DUST_VELOCITY));
    }

    
	update() {
		// Collision
		let xDist = Math.abs(this.pos.x - this.pos.x);
		let yDist = Math.abs(this.pos.y - this.pos.y);
		if (xDist + yDist < dustSize) {
			this.velocity.x = (this.velocity.x + this.velocity.x) / 2;
			this.velocity.y = (this.velocity.y + this.velocity.y) / 2;
		}

		// Gravity
		let dist = Math.sqrt(this.pos.x * this.pos.x + this.pos.y * this.pos.y);
		let force = gravity / dist * dist;
		let dir = 2 * Math.PI - Math.atan((this.pos.y - starPos.y) / (this.pos.x - starPos.x));

		if (this.pos.x >= starPos.x) {
			this.velocity.x -= Math.cos(dir) * force;
			this.velocity.y += Math.sin(dir) * force;
		} else {
			this.velocity.x += Math.cos(dir) * force;
			this.velocity.y -= Math.sin(dir) * force;
		}

		// Move and draw
		this.pos.x += this.velocity.x;
		this.pos.y += this.velocity.y;
		ellipse(this.pos.x + camPos.x, this.pos.y + camPos.y, dustSize, dustSize);
	}
}
