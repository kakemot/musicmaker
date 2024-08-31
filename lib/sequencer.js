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
            rect(0, yPos, 64, yPos + 32)

            fill("black")
            text(instrument.name, 4, yPos+20)
            yPos += 32
        }
    }
}