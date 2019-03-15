
let analyze;
let spectrum;
let fft;
let mic
let players;
let targetNotes = ["E6","Eb5","E6","Eb5","E6","B4","D5","C5", "A4"] //fur elise
let piano
let lifespan = 200;

function preload() {
  // soundFormats('mp3', 'ogg');
  // sound = loadSound('assets/star-wars.mp3');
}

function setup() {
  let cnv = createCanvas(500,500);
  fft = new p5.FFT(0.9, 1024);  // the largest value
  mic = new p5.AudioIn();
  mic.start();
  fft.setInput(mic);


  piano =  SampleLibrary.load({
    instruments: "piano"
  })

  players = []
  generatePlayers()
}


function draw() {
  let micLevel = mic.getLevel() * 100 //multiply by 100 to work with normal numbers instead of decimal
  spectrum = fft.analyze(); // A sound spectrum displays the different frequencies present in a sound.
  //filter out some background noise

  if (micLevel > 1) {
    let frequency = getLoudestFrequency(spectrum);
    let midi = freqToMidi(frequency)
    if (frequency) {
      // let note = Tonal.Note.fromMidi(midi)
      // console.log(note)
      // player.notes.push(note)
    }
  }

}

function getLoudestFrequency(spectrum) {
  const nyquist = sampleRate() / 2; // 22050
  const numberOfBins = spectrum.length;
  let maxAmp = 0;
  let largestBin;

  for (let i = 0; i < numberOfBins; i++) {
      let thisAmp = spectrum[i]; // amplitude of current bin
      if (thisAmp > maxAmp) {
          maxAmp = thisAmp;
          largestBin = i;
      }
  }

  let loudestFreq = largestBin * (nyquist / numberOfBins);
  return loudestFreq;
}


function keyPressed() {
  if (keyCode == 32) {
    getAudioContext().resume()
    generatePlayers()
  }
}

function generatePlayers() {
    players = []
    for (let i = 0; i < 200; i++) {
      players.push(new Player(piano))
    }


  players.forEach((p) => {
    console.log(p.fitnessFactor)
    if (p.fitnessFactor < 0.5) {
      console.log(p)
    }
  })
}


// if (keyCount.hasOwnProperty(note)) {
//   let count = keyCount[note]
//   keyCount[note] = ++count
// } else {
//   keyCount[note] = 1
// }
//
// let max = keyCount[note]
//
// Object.keys(keyCount).forEach((key) => {
//   if (max < keyCount[key]) {
//     max = key
//   }
// })
//
// player.notes.push(max)


