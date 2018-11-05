const js2xmlparser = require('js2xmlparser');

let bankIds: Array<number> = [];
let minScores: Array<number> = [];

function setup(bankCount: number, maxRating: number) {
    bankIds = [];
    minScores = [];
    let increment = Math.floor(maxRating / bankCount);
    for (let i = 0; i < bankCount; i++) {
        bankIds.push(i);
        minScores.push(increment * i);
    }
}

export function getXML(bankCount: number, maxRating: number) {
    setup(bankCount, maxRating);
    const randomList = generateRandomList();
    let sorted = randomList.sort((a, b) => {
        return a.bankID - b.bankID;
    });
    return js2xmlparser.parse("bankList", {
        bank: sorted
    });
}

function generateRandomList(): Array<Bank> {
    let ids = Array.from(bankIds);
    let scores = Array.from(minScores);
    shuffleArray(ids);
    shuffleArray(scores);
    let list: Array<Bank> = [];
    for (let i = 0; i < ids.length; i++) {
        list.push({
            bankID: ids[i],
            minimumScore: scores[i]
        });
    }
    return list;
}

/**
 * Randomize array element order in-place.
 * Using Durstenfeld shuffle algorithm.
 */
function shuffleArray(array: Array<any>) {
    for (var i = array.length - 1; i > 0; i--) {
        var j = Math.floor(Math.random() * (i + 1));
        var temp = array[i];
        array[i] = array[j];
        array[j] = temp;
    }
}
