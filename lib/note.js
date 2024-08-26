class Note {
    constructor(x, y, cellsize, length, tangentHeight, tangents) {
        this.x = x;
        this.y = y;
        this.cellsize = cellsize;
        this.length = length
        this.width = length
        this.tangentHeight = tangentHeight;
        this.height = tangentHeight;
        this.tangents = tangents;
        this.currentNote = this.getNoteFromY();
        this.noteTextOnly = this.currentNote.note.substring(0, str.length - 1);
    }

    moved() {
        this.currentNote = this.getNoteFromY();
    }

    getNoteFromY() {
        // Find the closest tangent using Y position
        let closestTangent = this.tangents.find(tangent => {
            return tangent.yPos == this.y
        });

        // Return the found tangent, or default to the first tangent if not found
        return closestTangent ? { note: closestTangent.note, isBlack: closestTangent.isBlack } : this.tangents[0];
    }

    draw() {
        fill("#4ef599");
        let offsetHeight = this.currentNote.isBlack ? this.cellsize*0.1 : 0;
        rect(this.x, this.y, this.length, this.cellsize - offsetHeight);
        stroke("black");
        strokeWeight(1)
        fill("black")
        textSize(10)
        text(this.currentNote.note, this.x+2, this.y+12);
    }
}