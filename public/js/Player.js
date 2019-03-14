
class Player {

  constructor() {
      this.notes = ["E6","Eb5","E6","Eb5","E6","B4","D5","C5", "A4"]
      this.synth = new Tone.Synth().toMaster();
      this.piano =  SampleLibrary.load({
        instruments: "piano"
      });
  }

  setNotesToPlay(notes) {
    this.notes = notes
  }


  playNote(note,time) {
    this.synth.triggerAttackRelease(note, time);
  }

  playNotes() {
    let counter = 0;
    this.notes.forEach((note) => {
      console.log(note)
      this.piano.toMaster()
      this.piano.triggerAttackRelease(note, 0.5, counter)
      counter+=0.2
    })


    // piano.toMaster()
    // piano.triggerAttack("c3");

  }

}
