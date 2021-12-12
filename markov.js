class MarkovMachine {
  constructor(text) {
    let words = text.split(/[ \r\n]+/);
    this.words = words.filter((c) => c !== "");
    this.makeChains();
  }

  makeChains() {
    this.wordsObj = {};
    for (let i = 0; i < this.words.length; i++) {
      let word = this.words[i];
      if (!this.wordsObj[word]) {
        this.wordsObj[word] = [];
      }
      if (this.words[i + 1]) {
        this.wordsObj[word].push(this.words[i + 1]);
      }
      if (!this.words[i + 1]) {
        this.wordsObj[word].push(null);
      }
    }
    return this.wordsObj;
  }

  makeText(numWords = 100) {
    let sentence = [];

    const random = (min, max) => Math.floor(Math.random() * (max - min + 1)) + min;
    const pickRandom = (list) => list[random(0, list.length - 1)];

    let currentWord = Object.keys(this.wordsObj)[0];
    sentence.push(currentWord);

    while (currentWord && pickRandom(this.wordsObj[currentWord]) !== null) {
      let next = pickRandom(this.wordsObj[currentWord]);
      sentence.push(next);
      currentWord = next;
    }

    let joinedSentence;
    let numOfWords = sentence.length;

    if (numOfWords <= numWords) {
      joinedSentence = sentence.join(" ");
      console.log(joinedSentence);
      return joinedSentence;
    } else if (numOfWords > numWords) {
      let extraWords = numOfWords - numWords;
      for (let i = 0; i < extraWords; i++) {
        sentence.pop();
      }
      joinedSentence = sentence.join(" ");
      console.log(joinedSentence);
      return joinedSentence;
    }
  }
}

module.exports = { MarkovMachine: MarkovMachine };
