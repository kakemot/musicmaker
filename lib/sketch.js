function setup() {
  createCanvas(400, 400);
  background(255);
  synth = new Tone.Synth().toDestination();
}

function draw() {
  circle(mouseX, mouseY, 80);
}

function keyPressed() {
  if (keyCode === UP_ARROW) {
    Tone.start();

    const now = Tone.now();
    synth.triggerAttack("C4", now);
    synth.triggerRelease(now + 1);
  }
}
