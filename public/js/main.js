
let analyze;
let spectrum;
let fft;
let mic

let osc, envelope;

var midiNoteNumber = [21,22,23,24,25,26,27,28,29,30,31,32,33,34,35,36,37,38,39,40,41,42,43,44,45,46,47,48,49,50,51,52,53,54,55,56,57,58,59,60,61,62,63,64,65,66,67,68,69,70,71,72,73,74,75,76,77,78,79,80,81,82,83,84,85,86,87,88,89,90,91,92,93,94,95,96,97,98,99,100,101,102,103,104,105,106,107,108];
var pianoNotes = ['A0', 'A#0', 'B0', 'C1', 'C#1', 'D1', 'D#1', 'E1', 'F1', 'F#1', 'G1', 'G#1', 'A1', 'A#1', 'B1', 'C2', 'C#2', 'D2', 'D#2', 'E2', 'F2', 'F#2', 'G2', 'G#2', 'A2', 'A#2', 'B2', 'C3', 'C#3', 'D3', 'D#3', 'E3', 'F3', 'F#3', 'G3', 'G#3', 'A3', 'A#3', 'B3', 'C4', 'C#4', 'D4', 'D#4', 'E4', 'F4', 'F#4', 'G4', 'G#4', 'A4', 'A#4', 'B4', 'C5', 'C#5', 'D5', 'D#5', 'E5', 'F5', 'F#5', 'G5', 'G#5', 'A5', 'A#5', 'B5', 'C6', 'C#6', 'D6', 'D#6', 'E6', 'F6', 'F#6', 'G6', 'G#6', 'A6', 'A#6', 'B6', 'C7', 'C#7', 'D7', 'D#7', 'E7', 'F7', 'F#7', 'G7', 'G#7', 'A7', 'A#7', 'B7', 'C8'];

let notes;

function preload() {
  soundFormats('mp3', 'ogg');
  sound = loadSound('assets/ChopinMinuteWaltz.mp3');
  //sound = loadSound('assets/piano_middle_C.mp3');
}


function setup() {
  var cnv = createCanvas(800,800);
  cnv.mouseClicked(togglePlay);
  textSize(40);

  // ************************************************************************************************
  // osc = new p5.SinOsc();

  // // Instantiate the envelope
  // envelope = new p5.Env();

  // // set attackTime, decayTime, sustainRatio, releaseTime
  // envelope.setADSR(0.001, 0.5, 0.1, 0.5);

  // // set attackLevel, releaseLevel
  // envelope.setRange(1, 0);

  // osc.start();
  // ************************************************************************************************

  fft = new p5.FFT(0.9, 1024);  // the largest value

  // console.log(midiNoteNumber)
  // console.log(mapPianoKeys())
  // console.log(pianoNotes)




  // console.log(mapPianoNotes())

  notes = mapPianoNotes();
  
 // console.log(notes);
  // MIC
  // mic = new p5.AudioIn();
  // mic.start();
  // fft.setInput(mic);
}

function draw() {
  background(20);

  //let micLevel = mic.getLevel() * 100 //multiply by 100 to work with normal numbers instead of decimal
  spectrum = fft.analyze(); // A sound spectrum displays the different frequencies present in a sound.
  var waveform = fft.waveform();
  var sample = sampleRate();

  let frequency = getLoudestFrequency(spectrum);
  let midi = freqToMidi(frequency)

   if (sound.isPlaying()) {
    //console.log('midi ' + midi);  // midi value
    //console.log('piano ', midi-20); // piano key]

    console.log(midi, notes[midi]); // print out midi and note
  }

  //filter out some background noise
  // if (micLevel > 1.2) {
  //   let frequency = getLoudestFrequency(spectrum);
  //   let midi = freqToMidi(frequency)

  //   if (frequency) {
  //     //console.log('midi ' + midi);  // midi value
  //     console.log('piano ', midi-20); // piano key
  //   }
  // }

  for (let i = 0; i < spectrum.length / 20; i++) {
    fill(spectrum[i], spectrum[i] / 10, 0);
    let x = map(i, 0, spectrum.length / 20, 0, width);
    let h = map(spectrum[i], 0, 255, 0, height);
    rect(x, height, spectrum.length / 20, -h);

    fill(255);
    text( notes[midi], width/2, 50);
  }

}

function mapPianoKeys() {
  var keys = midiNoteNumber.map(function(key) {
    return key - 20;
  });

  return keys;
}

function mapPianoNotes() {

  // get array of arrays 
  let notes = midiNoteNumber.map((x, i) => [x, pianoNotes[i]]);

  // convert received array into objects...
  return notes.reduce(function(result, array) {
    result[array[0]] = array[1];
    return result;
  }, {});

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

// fade sound if mouse is over canvas
function togglePlay() {
  if (sound.isPlaying()) {
    sound.pause();
  } else {
    sound.play();
  }
}


function mousePressed() { getAudioContext().resume() }
