
class Player {

  constructor(piano, dna) {
      if (dna) {
        this.dna = dna
      } else {
        this.dna = this.generateNotes()
      }
      this.piano = piano
      this.fitnessFactor = 0;
  }


  crossover(partner) {
    let newDna = []
    let midPoint = floor(random(this.dna.length))

    for (let i = 0; i < this.dna.length; i++) {
      if (i > midPoint) {
        newDna[i] = this.dna[i]
      } else {
        newDna[i] = partner.dna[i]
      }
    }
    return newDna
  }

  generateNotes() {
    let dna = []
    for (let i = 0; i < targetNotes.length; i++) {
      dna.push(Tonal.Note.fromMidi(this.getRandomMidiNote()))
    }
    return dna
  }

  playNotes() {

    for (let i = 0; i < this.dna.length; i++) {
      setTimeout(() => {
        this.piano.toggleKey(Tonal.midi(this.dna[i]), true)
        setTimeout(() => {
          this.piano.toggleKey(Tonal.midi(this.dna[i]), false)
        }, i*350)
      }, i*1000 );
    }
  }

  calculateFitness() {
    //let totalRange = 0;
    // for (let i = 0; i < this.dna.length; i++) {
    //   let range = Math.abs(Tonal.midi(targetNotes[i]) - Tonal.midi(this.dna[i]))
    //   if (range) {
    //     totalRange += range
    //   }
    // }

    let score = 0;
    for (let i = 0; i < this.dna.length; i++) {
        if (Tonal.midi(targetNotes[i]) === Tonal.midi(this.dna[i])) {
            score += 1
        }
    }

    this.fitnessFactor = parseFloat((score / targetNotes.length).toFixed(2))
    createNoteList(this)
  }

  getRandomMidiNote() {
    // return random(Tonal.midi("A4"),Tonal.midi("E5"))

    return random(Tonal.midi("A0"),Tonal.midi("C8"))
  }

}
