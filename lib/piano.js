class Tangent {
    constructor(yPos, tangentHeight, note, isBlack) {
        this.yPos = yPos;
        this.tangentHeight = tangentHeight;
        this.note = note;
        this.isBlack = isBlack;  // Boolean to indicate if it's a black key
    }
}
  
class Piano {
    constructor(tangentHeight) {
        this.tangentHeight = tangentHeight;
        this.startOctave = 6;
        this.notes = [
            { note: "C", isBlack: false, pos: 0 },
            { note: "B", isBlack: false, pos: 1 },
            { note: "A#", isBlack: true, pos: 1.5 },
            { note: "A", isBlack: false, pos: 2 },
            { note: "G#", isBlack: true, pos: 2.5 },
            { note: "G", isBlack: false, pos: 3 },
            { note: "F#", isBlack: true, pos: 3.5 },
            { note: "F", isBlack: false, pos: 4 },
            { note: "E", isBlack: false, pos: 5 },
            { note: "D#", isBlack: true, pos: 5.5 },
            { note: "D", isBlack: false, pos: 6 },
            { note: "C#", isBlack: true, pos: 6.5 }
        ];  // Combined white and black keys in order
        this.tangents = []; // Array to store tangent objects
        this.setupTangents(); // Populate the tangents array
    }
  
    setupTangents() {
        for (let i = 0; i < 100; i++) {
            let noteIndex = i % this.notes.length;
            let octave = this.startOctave - (Math.ceil(i/12)) +1;
            let note = this.notes[noteIndex].note + octave;
            let isBlack = this.notes[noteIndex].isBlack;
            let pos = this.notes[noteIndex].pos;
            let tangentHeight = isBlack ? this.tangentHeight * 0.6 : this.tangentHeight;  // Adjust height for black keys
            
            // Calculate the Y position by adding an offset for each full cycle through the notes array
            let yPos = (pos + Math.floor(i / this.notes.length) * 7) * this.tangentHeight;

            // Create a tangent object at the calculated Y position
            this.tangents.push(new Tangent(yPos + YOFFSET, tangentHeight, note, isBlack));
        }
    }
  
    draw() {
        let whiteKeyWidth = this.tangentHeight * 4; // Width of white keys
        let blackKeyWidth = whiteKeyWidth * 0.6; // Black keys are narrower
  
        stroke("black");
  
        // Iterate over the tangents array and draw each tangent
        for (let tangent of this.tangents) {
            if (!tangent.isBlack) {
                fill("white");
                rect(0, tangent.yPos, whiteKeyWidth, tangent.tangentHeight);
            }
        }

        for (let tangent of this.tangents) {
            if (tangent.isBlack) {
                fill("black");
                rect(0, tangent.yPos, blackKeyWidth, tangent.tangentHeight);
            }
        }
    }
}
