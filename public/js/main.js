
let analyze;
let spectrum;
let fft;
let mic
let player;
let keyCount;
let playback = false

function preload() {
  // soundFormats('mp3', 'ogg');
  // sound = loadSound('assets/star-wars.mp3');
}

function setup() {
  let cnv = createCanvas(500,500);
  //cnv.mouseClicked(togglePlay);

  fft = new p5.FFT(0.9, 1024);  // the largest value
  mic = new p5.AudioIn();
  mic.start();
  fft.setInput(mic);
  player = new Player()
  keyCount = {}
}

function draw() {
  let micLevel = mic.getLevel() * 100 //multiply by 100 to work with normal numbers instead of decimal
  spectrum = fft.analyze(); // A sound spectrum displays the different frequencies present in a sound.
  var waveform = fft.waveform();
  var sample = sampleRate();

  //filter out some background noise

  if (!playback) {
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
}

function getLoudestFrequency(spectrum) {
  var nyquist = sampleRate() / 2; // 22050
  var numberOfBins = spectrum.length;
  var maxAmp = 0;
  var largestBin;

  for (var i = 0; i < numberOfBins; i++) {
      var thisAmp = spectrum[i]; // amplitude of current bin
      if (thisAmp > maxAmp) {
          maxAmp = thisAmp;
          largestBin = i;
      }
  }

  var loudestFreq = largestBin * (nyquist / numberOfBins);
  return loudestFreq;
}




function mousePressed() {
  getAudioContext().resume()
}


function keyPressed() {
  if (keyCode == 32) {
    player.playNotes()
    playback = true
  }
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


