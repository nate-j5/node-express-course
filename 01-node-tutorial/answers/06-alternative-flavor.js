function getRandom() {
  return Math.round(Math.random() * 10 + 1);
}

function getSentence() {
  const age = getRandom();
  return `My Child is ${age} years old`;
}

module.exports.getRandom = getRandom;
module.exports.getSentence = getSentence;
