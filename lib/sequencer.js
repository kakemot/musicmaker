class Sequence {
    constructor(x, y, cellsize, length)
        {
            this.x = x;
            this.y = y;
            this.cellsize = cellsize;
            this.length = length;
            this.selected = false;
        }
        draw() {
            fill("#4ef599");
            rect(this.x, this.y, this.length, this.cellsize);
        }
    }