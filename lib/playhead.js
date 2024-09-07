const INIT_PLAYHEAD_PIANOROLL_POSITION = 64;
const INIT_PLAYHEAD_SEQUENCE_POSITION = 256;
class Playhead {
  constructor() {
    this.play = false;
    this.position = INIT_PLAYHEAD_PIANOROLL_POSITION; // Initial position of the playhead
    this.sequencePosition = 256;
    this.relativeElapsedTime = 0;
    this.startTime = null; // To track the time when playback starts
    this.startTimePianoRoll = null;
    this.currentSequenceIndex = 0;
  }

  stopPlay() {
    this.position = 64;
    this.sequencePosition = 256;
    this.play = false;
  }

  resetPlayHead() {
    this.startTimePianoRoll = Tone.now();
  }

  startplay() {
    this.position = 64;
    this.play = true;
    this.startTime = Tone.now(); // Record the start time
    this.startTimePianoRoll = Tone.now();
    const now = Tone.now();
    let relativePosX = 0;
    SelectFirstSequence(sequences);

    for (let s of sequences) {
      s.notes.forEach((note) => {
        const noteName = note.currentNote.note;
        const playTime = now + (note.x + relativePosX - 64) / 128;
        synth.triggerAttack(noteName, playTime);
        const releaseTime = playTime + note.length / 128;
        synth.triggerRelease(noteName, releaseTime);
      });
      relativePosX += s.bars * 256;
    }
  }

  updateSequence(sequences, sequencePosition) {
    if (!this.play) {
      return;
    }
  
    let pos = sequencePosition / 4;
  
    // Assuming all sequences have the same length and are placed sequentially
    let sequenceLength = sequences[0].length;
    let sequenceStartX = sequences[0].x; // Starting x position of the first sequence
  
    // Calculate the sequence index using Math.floor
    let sequenceIndex = Math.floor((pos - sequenceStartX) / sequenceLength);
  
    // Ensure the index is within bounds
    if (sequenceIndex >= sequences.length) {
      this.stopPlay();
      return;
    }
  
    // Check if the sequence has changed
    if (sequenceIndex !== this.currentSequenceIndex) {
      // Unselect the previous sequence
      sequences[this.currentSequenceIndex].selected = false;
      // Select the new sequence
      sequences[sequenceIndex].selected = true;
      // Update the current sequence index
      this.currentSequenceIndex = sequenceIndex;
      // Call resetPlayHead only once when the sequence changes
      this.resetPlayHead();
    }
  }
  

  draw() {
    this.updateSequence(sequences, this.sequencePosition);
    if (this.play) {
      const elapsedTime = Tone.now(); // Calculate elapsed time
      this.position = 64 + (elapsedTime - this.startTimePianoRoll) * 128; // Update position based on elapsed time
      this.sequencePosition = 256 + (elapsedTime - this.startTime) * 32;
    }
    strokeWeight(3);
    stroke("blue");
    line(this.sequencePosition / 4, 0, this.sequencePosition / 4, YOFFSET);
    line(this.position, YOFFSET, this.position, 1000);
  }
}
