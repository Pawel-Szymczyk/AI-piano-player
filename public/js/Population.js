
class Population {
  constructor(piano) {
    this.piano = piano
    this.players = []
    this.popSize = 1000
    this.matingPool = []
    this.createPopulation()
  }

  createPopulation() {
    this.players = []
    for (let i = 0; i < this.popSize; i++) {
      let player = new Player(this.piano)
      this.players.push(player)
    }
  }

  selection() {

    let newPopulation = []
    for (let i = 0; i < this.players.length; i++) {
      let parentA = random(this.matingPool)
      let parentB = random(this.matingPool)
      let newDna = parentA.crossover(parentB)

      newPopulation[i] = new Player(this.piano, newDna)
    }

    this.players = newPopulation
  }



  evaluate() {
    let bestFit = 0;
    for (let p of this.players) {
      p.calculateFitness()
      if (p.fitnessFactor > bestFit) {
        bestFit = p.fitnessFactor
      }
    }

    this.matingPool = []
    for (let i = 0; i < this.popSize; i++) {
      let n = this.players[i].fitnessFactor * 100
      // console.log(n, this.players[i])
      for (let j = 0; j < n; j++) {
        this.matingPool.push(this.players[i])
      }
    }
  }
}
