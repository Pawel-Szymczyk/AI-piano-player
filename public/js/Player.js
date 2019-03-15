
class Player {

  constructor(piano) {
      this.notes = []
      this.piano = piano
      this.fitnessFactor = 0; //the lower the better
      this.generateNotes()
  }

  generateNotes() {
    this.notes = []
    for (let i = 0; i < targetNotes.length; i++) {
      this.notes.push(Tonal.Note.fromMidi(this.getRandomMidiNote()))
    }

    this.evaluate()
  }

  evaluate() {
    let totalRange = 0;
    for (let i = 0; i < this.notes.length; i++) {
      let range = Tonal.midi(targetNotes[i]) - Tonal.midi(this.notes[i])

      // console.log(Math.abs(range))
      totalRange += Math.abs(range);
    }

    this.fitnessFactor = totalRange / 10 //the lower the closer it was to the target
  }

  playNotes() {
    let counter = 0;
    this.notes.forEach((note) => {
      this.piano.toMaster()
      this.piano.triggerAttackRelease(note, 1, counter)
      counter+=0.3
    })
  }

  getRandomMidiNote() {
    return random(69,88)

    //random(21,108)
  }

}
