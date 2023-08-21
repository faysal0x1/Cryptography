let inputString = 'ATHE QUICK BROWN'



let wordsArray = inputString.split(' ')

let wordData = {}

wordsArray.forEach(word => {
  let upperWord = word.toUpperCase()
  let characters = upperWord.split('')

  let charCodeArray = characters.map(character => character.charCodeAt(0))

  charCodeArray.forEach((charCode, index) => {
    charCodeArray[index] = charCode - 64
  })

  wordData[word] = charCodeArray
})

console.log(wordData)

function reconstructSentence(data) {
    let sentence = "";
  
    for (let word in data) {
      
      let charCodeArray = data[word];
      charCodeArray.forEach((charCode, index) => {
        charCodeArray[index] = charCode + 64;
      });
  
      let characters = charCodeArray.map(charCode => String.fromCharCode(charCode));
      let wordString = characters.join('');
  
      if (sentence.length > 0) {
        sentence += " ";
      }
      sentence += wordString;
    }

    return sentence;
  }
  

  

let originalSentence = reconstructSentence(wordData)
console.log(originalSentence)
