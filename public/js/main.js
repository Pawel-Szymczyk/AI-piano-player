
let analyze;
let spectrum;
let ftt;

function preload() {
  soundFormats('mp3', 'ogg');
  sound = loadSound('assets/star-wars.mp3');
}

function setup() {
  var cnv = createCanvas(500,500);
  cnv.mouseClicked(togglePlay);

  fft = new p5.FFT(0.9, 16384);  // the largest value 
}

function draw() {
  spectrum = fft.analyze(); // A sound spectrum displays the different frequencies present in a sound.

  var waveform = fft.waveform();
  var sample = sampleRate();

  let frequency = getLoudestFrequency(spectrum);
  let midi = freqToMidi(frequency)

  if (sound.isPlaying()) {
    console.log('midi ' + midi);  // midi value
    console.log('piano ', midi-20); // piano key
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

// fade sound if mouse is over canvas
function togglePlay() {
  if (sound.isPlaying()) {
    sound.pause();
  } else {
    sound.play();
  }
}