
let analyze;
let spectrum;
let fft;
let mic

function preload() {
  soundFormats('mp3', 'ogg');
  sound = loadSound('assets/star-wars.mp3');
}

function setup() {
  var cnv = createCanvas(500,500);
  //cnv.mouseClicked(togglePlay);

  fft = new p5.FFT(0.9, 1024);  // the largest value
  mic = new p5.AudioIn();
  mic.start();
  fft.setInput(mic);
}

function draw() {
  let micLevel = mic.getLevel() * 100 //multiply by 100 to work with normal numbers instead of decimal
  spectrum = fft.analyze(); // A sound spectrum displays the different frequencies present in a sound.
  var waveform = fft.waveform();
  var sample = sampleRate();

  //filter out some background noise
  if (micLevel > 1.2) {
    let frequency = getLoudestFrequency(spectrum);
    let midi = freqToMidi(frequency)

    if (frequency) {
      //console.log('midi ' + midi);  // midi value
      console.log('piano ', midi-20); // piano key
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


function mousePressed() { getAudioContext().resume() }
