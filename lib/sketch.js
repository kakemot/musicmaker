let grid;
let notes = [];
let sequences = [];
let synth;
let instruments;
let piano;
let playhead;
let cellSize = 16
let mouseHasBeenReleased = false;
let YOFFSET = 32;

function setup() {
  var pianoRollCanvas = createCanvas(windowWidth, windowHeight);
  pianoRollCanvas.parent('pianoroll-canvas');

  const reverb = new Tone.Reverb(3).toDestination();
  synth = new Tone.PolySynth().toDestination().connect(reverb);

  grid = new Grid(windowWidth, windowHeight, cellSize);
  piano = new Piano(cellSize);
  playhead = new Playhead();
  instruments = new InstrumentPanel();
  instruments.AddInstrument();
  instruments.AddInstrument();
  sequences.push(new Sequence(64, 0, cellSize, 64));
  sequences.push(new Sequence(128, 0, cellSize, 64));
}

function draw() {
  background("black");
  grid.draw();
  piano.draw();

  let snap = MouseSnap();

  // Draw the square at the snapped coordinates
  fill("blue");
  square(snap.x, snap.y, cellSize);

  // Draw all notes from the notes array
  for (let i = 0; i < notes.length; i++) {
    notes[i].draw();
  }

  for (let i = 0; i < sequences.length; i++) {
    sequences[i].draw();
  }
  instruments.DisplayInstruments();
  playhead.draw();
}

function MouseSnap() {
  let snappedX = Math.floor(mouseX / (cellSize/2)) * (cellSize/2);
  let snappedY;

  snappedY = Math.floor(mouseY / (cellSize/2)) * (cellSize/2);
  if (mouseY < YOFFSET) {
    snappedY = Math.floor(mouseY / (cellSize)) * (cellSize);
  }

  return {
    x: snappedX,
    y: snappedY
  }
}

function PlaySingleNote(noteName) {
  const now = Tone.now();
  synth.triggerAttack(noteName, now);
  synth.triggerRelease(noteName, now+0.5);
}

let currentNote = null; // Variable to track the current note being placed

function mousePressed() {
  if (mouseX < 0 || mouseY < YOFFSET) {
    return
  }

  let mouseRect = {
      x: mouseX,
      y: mouseY,
      length: 1,
      height: 1
  };

  // Check if there's an existing note that intersects with the mouse rectangle
  for (let note of notes) {
      if (rectIntersect(mouseRect, note)) {
          currentNote = note;  // Select the existing note for dragging
          return;  // Exit the function without creating a new note
      }
  }

  // If no existing note is found, create a new one at snapped position
  let snap = MouseSnap();
  currentNote = new Note(snap.x, snap.y, cellSize, cellSize, cellSize, piano.tangents);
  notes.push(currentNote);
  PlaySingleNote(currentNote.currentNote.note)
}

function rectIntersect(r1, r2) {
  return !(r2.x > r1.x + r1.length || 
           r2.x + r2.length < r1.x || 
           r2.y > r1.y + r1.height ||
           r2.y + r2.height < r1.y);
}

function mouseDragged() {
  let snap = MouseSnap();
  if (currentNote) {
      if (keyIsDown(CONTROL)) {
          // Adjust note length if control key is held down
          let noteLength = Math.max(snap.x - currentNote.x, cellSize); // Ensure minimum length of 32 pixels
          currentNote.length = noteLength; // Update the length of the note
      } else {
          currentNote.x = snap.x;
          currentNote.y = snap.y;
          currentNote.moved()
          if (mouseHasBeenReleased == true) {
            PlaySingleNote(currentNote.currentNote.note)
          }
      }
  }
  mouseHasBeenReleased = false;
}

function mouseReleased() {
  mouseHasBeenReleased = true;
  if (currentNote) {
      if (!keyIsDown(CONTROL)) {
          // Finalize position if the control key is not held
          let snap = MouseSnap();
          currentNote.x = snap.x;
          currentNote.y = snap.y;
      } else {
          // Finalize length if control key is held
          let snap = MouseSnap();
          let noteLength = Math.max(snap.x - currentNote.x, cellSize); // Ensure minimum length of 32 pixels
          currentNote.length = noteLength; // Set the final length of the note
      }

      currentNote = null; // Reset the current note
  }
}

function StartPlaying() {
  playhead.startplay();
}

function StopPlaying() {
  playhead.stopPlay();
}

function keyPressed() {
  if (keyCode === UP_ARROW) {
    Tone.start();
    playhead.startplay();
  }

  if (key === ' ') {
    playhead.stopPlay();
  }
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
}
