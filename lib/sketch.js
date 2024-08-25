let grid;
let notes = [];
let synth;
let piano;
let playhead;

function setup() {
  createCanvas(windowWidth, windowHeight);
  background(255);
  synth = new Tone.PolySynth().toDestination();
  grid = new Grid(windowWidth, windowHeight, 32);
  piano = new Piano(32);
  playhead = new Playhead();
}

function draw() {
  background("black");
  grid.draw();
  piano.draw();

  let snappedX = Math.floor(mouseX / 32) * 32;
  let snappedY = Math.floor(mouseY / 16) * 16;

  // Draw the square at the snapped coordinates
  fill("blue");
  square(snappedX, snappedY, 32);

  // Draw all notes from the notes array
  for (let i = 0; i < notes.length; i++) {
    notes[i].draw();
  }

  playhead.draw();
}

let currentNote = null; // Variable to track the current note being placed

function mousePressed() {
    let snappedX = Math.floor(mouseX / 32) * 32;
    let snappedY = Math.floor(mouseY / 16) * 16;

    // Create a new Note at the snapped position with an initial length of 32 pixels
    currentNote = new Note(snappedX, snappedY, 32, 32, 32, piano.tangents);

    // Add the new note to the notes array
    notes.push(currentNote);
}

function mouseDragged() {
    if (currentNote) {
        let draggedX = Math.floor(mouseX / 32) * 32;
        let noteLength = Math.max(draggedX - currentNote.x, 32); // Calculate length, fallback to 32 if too short

        currentNote.length = noteLength; // Update the length of the note based on the drag
    }
}

function mouseReleased() {
    if (currentNote) {
        let finalX = Math.floor(mouseX / 32) * 32;
        let noteLength = Math.max(finalX - currentNote.x, 32); // Ensure minimum length of 32 pixels

        currentNote.length = noteLength; // Set the final length of the note
        currentNote = null; // Reset the current note
    }
}


function keyPressed() {
  if (keyCode === UP_ARROW) {
    Tone.start();
    playhead.startplay();
  }
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
}
