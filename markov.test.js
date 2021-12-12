const markovMachines = require("./markov");
let MarkovMachine = markovMachines.MarkovMachine;
let mockMarkov ;

describe("test MarkovMachine", function(){
    beforeEach(function(){
         mockMarkov = new MarkovMachine("the cat in the hat");
    })
    
    test("contain at leats one 'the'", function(){
        expect(mockMarkov .makeText()).toContain("the");
    })
    test("the return value is string", function(){
        expect(mockMarkov .makeText()).toEqual(expect.any(String));
    })
    test("number of words equal/less than provided number", function(){
        const sentence = mockMarkov .makeText(numWords=1);
        const wordLength = sentence.split(" ").length;
        expect(wordLength).toBeLessThanOrEqual(1);
    })
    test("possible next word(s)", function(){
        const wordsObj = mockMarkov .makeChains();
        expect(wordsObj[Object.keys(wordsObj)[0]]).toEqual(["cat", "hat"])
    })
})
