
let analyze;
let spectrum;
let fft;
let mic
let population;
let targetNotes = ['E5', 'Eb5', 'E5' ,'Eb5', 'E5' ,'B4', 'D5', "C5", "A4"] //fur elise
let piano
let lifespan = 10;
let counter;

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
  counter = 0;
  population = new Population(piano)
  population.createPopulation()
}


function draw() {
  document.getElementById('counter').textContent = counter
  if (counter === lifespan) {
    removeElements()
    counter = 0;
    population.evaluate()
    population.selection()
  }
  counter++
}


function createNoteList(player) {
  let container = select('#notes')
  if (player.fitnessFactor > 0) {
    let content = createP(player.dna.join(',') + ' fitnessFactor: ' + player.fitnessFactor)
    let button = createButton('play dna');
    button.mousePressed(() => {
      player.playNotes()
    })
    content.child(button)
    container.child(content)
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
  }
}


function getNoteByFrequency() {
  let micLevel = mic.getLevel() * 100 //multiply by 100 to work with normal numbers instead of decimal
  spectrum = fft.analyze(); // A sound spectrum displays the different frequencies present in a sound.
  //filter out some background noise

  if (micLevel > 1) {
    let frequency = getLoudestFrequency(spectrum);
    let midi = freqToMidi(frequency)
    if (frequency) {
      let note = Tonal.Note.fromMidi(midi)

    }
  }

}
