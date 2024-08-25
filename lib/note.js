class Note {
    constructor(x, y, cellsize, length, tangentHeight, tangents) {
        this.x = x;
        this.y = y;
        this.cellsize = cellsize;
        this.length = length
        this.tangentHeight = tangentHeight;
        this.tangents = tangents;
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
        fill(this.currentNote.isBlack ? "yellow" : "yellow");
        rect(this.x, this.y, this.length, this.cellsize);
        stroke("black");
        text(this.currentNote.note + "4", this.x + 10, this.y + 20);
    }
}