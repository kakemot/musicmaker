class Sequence {
    constructor(x, y, height, length, selected = false)
        {
            this.x = x;
            this.y = y;
            this.height = height;
            this.length = length;
            this.selected = selected;
            this.notes = [];
            this.bars = 4;
        }
        draw() {
            fill("#4ef599");
            if(this.selected) {
                fill("red");
            }
            rect(this.x, this.y, this.length, this.height);
        }
    }