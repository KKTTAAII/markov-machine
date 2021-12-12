/** Command-line tool to generate Markov text. */

const fs = require("fs");
const process = require("process");
const markovMachines = require("./markov");
const axios = require("axios");
let MarkovMachine = markovMachines.MarkovMachine;
let markov;
let text;

function write(data) {
  const lineBreakData = data.replace(/\./g, "\n");
  fs.writeFile("text.txt", lineBreakData, "utf8", function (err) {
    if (err) {
      console.log("Error writing", err);
      process.exit(1);
    }
    console.log(lineBreakData);
  });
}

function cat(path) {
  fs.readFile(path, "utf8", function (err, data) {
    if (err) {
      console.log("Error reading", err);
      process.exit(1);
    }
    markov = new MarkovMachine(data);
    text = markov.makeText();
    write(text);
  });
}

async function webCat(URL) {
  try {
    const res = await axios.get(URL);
    const data = res.data;
    markov = new MarkovMachine(data);
    text = markov.makeText();
    write(text);
  } catch (e) {
    console.log(e);
  }
}

if (process.argv[2] === "file") {
  cat(process.argv[3]);
} else {
  webCat(process.argv[3]);
}
