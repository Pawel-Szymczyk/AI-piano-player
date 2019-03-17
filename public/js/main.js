
let analyze;
let spectrum;
let fft;
let mic
let population;
let targetNotes = []
// let targetNotes = ['E5', 'Eb5', 'E5' ,'Eb5', 'E5' ,'B4', 'D5', "C5", "A4"] //fur elise
let keyboardUI
let lifespan = 30;
let counter;
let learning = false
let listCounter = 0;
function preload() {
  // soundFormats('mp3', 'ogg');
  // sound = loadSound('assets/star-wars.mp3');
}

function setup() {
  fft = new p5.FFT(0.9, 1024);  // the largest value
  mic = new p5.AudioIn();
  mic.start();
  fft.setInput(mic);
  counter = 0;
  initKeyboard()

  let train = createButton('Train')
  train.mousePressed(() => {startLearning()})
  select('#content').child(train)
}

function startLearning() {
  population = new Population(keyboardUI)
  population.createPopulation()
  learning = true
}

function draw() {
  if (learning) {
    document.getElementById('counter').textContent = counter
    if (counter === lifespan) {
      removeElements()
      listCounter = 0;
      counter = 0;
      population.evaluate()
      population.selection()
    }
    counter++
  }
}

function createNoteList(player) {
  let container = select('#notes')
  let limit = 10;
  if (player.fitnessFactor > 0 && listCounter < limit) {
    let content = createP(player.dna.join(',') + ' fitnessFactor: ' + player.fitnessFactor)
    let button = createButton('play dna');
    button.mousePressed(() => {
      player.playNotes()
    })
    content.child(button)
    container.child(content)
    listCounter++
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


function initKeyboard() {
  piano = SampleLibrary.load({
    instruments: 'piano'
  })
  Tone.Buffer.on('load', function() {
    document.querySelector(".container").style.display = 'block';
    piano.toMaster()
    piano.release = 1

    // create Nexus UI //
    Nexus.colors.accent = "#f00"
    keyboardUI = new Nexus.Piano('#Keyboard', {
      'size': [1000, 125],
      'mode': 'button', // 'button', 'toggle', or 'impulse'
      'lowNote': 34,
      'highNote': 76
    })



    keyboardUI.on('change', function(note) {
      if (note.state === true) {
        piano.triggerAttack(Tone.Frequency(note.note, "midi").toNote());
        if (!learning) {
          targetNotes.push(Tonal.Note.fromMidi(note.note))
          window.played.textContent = targetNotes.join(',')
        }
      } else if (note.state === false) {
        piano.triggerRelease(Tone.Frequency(note.note, "midi").toNote());
      }
    })

  })
}
