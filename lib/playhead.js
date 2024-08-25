class Playhead {
    constructor() {
        this.play = false;
        this.position = 130;  // Initial position of the playhead
        this.startTime = null; // To track the time when playback starts
    }

    startplay() {
        this.play = true;
        this.startTime = Tone.now();  // Record the start time
        const now = Tone.now();
        notes.forEach(note => {
            const noteName = note.currentNote.note + "4";
            const playTime = now + ((note.x-128) / 128);
            
            // Schedule the attack
            synth.triggerAttack(noteName, playTime);
            
            // Schedule the release
            const releaseTime = playTime + (note.length / 128);
            synth.triggerRelease(noteName, releaseTime);
        });
    }

    draw() {
        if (this.play) {
            const elapsedTime = Tone.now() - this.startTime; // Calculate elapsed time
            this.position = 130 + elapsedTime * 128; // Update position based on elapsed time
        }
        strokeWeight(3);
        stroke("blue");
        line(this.position, 0, this.position, 1000); // Draw the playhead line
    }
}
