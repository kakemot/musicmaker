class Instrument {
    constructor(name) {
        this.name = name
    }
}

class InstrumentPanel {
    constructor() {
        this.instruments = []
    }

    AddInstrument() {
        let instrument = new Instrument("Synth")
        this.instruments.push(instrument)
    }

    DisplayInstruments() {
        let yPos = 0;
        for (const instrument of this.instruments) {
            fill("yellow")
            stroke("black")
            rect(0, yPos, 64, yPos)
            fill("black")
            text(instrument.name, 4, yPos+12)
            yPos += 16
        }
        YOFFSET = yPos
    }
}