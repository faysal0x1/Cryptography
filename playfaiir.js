// function handleChange() {
//   // get the keyword and message input elements from the document
//   var keywordInput = document.getElementById("keyword");
//   var messageInput = document.getElementById("message");

//   // get the keyword and message values from the input elements
//   var keyword = keywordInput.value;
//   var message = messageInput.value;

//   // check if the keyword is valid
//   if (keyword.length > 0 && /^[A-Za-z\s]+$/.test(keyword)) {
//     // generate the key matrix from the keyword
//     var keyMatrix = generateKeyMatrix(keyword);

//     // display the key matrix in the table
//     displayKeyMatrix(keyMatrix);

//     // check if the message is valid
//     if (message.length > 0 && /^[A-Za-z\s]+$/.test(message)) {
//       // encrypt the message using the key matrix
//       var encrypted = encryptMessage(keyMatrix, message);

//       // display the encrypted message in the output element
//       document.getElementById("output").textContent = "Encrypted message: " + encrypted;
//     } else {
//       // clear the output element
//       document.getElementById("output").textContent = "";
//     }
//   } else {
//     // clear the table and output elements
//     document.getElementById("keyMatrix").innerHTML = "";
//     document.getElementById("output").textContent = "";
//   }
// }

function handleChange() {
  // get the keyword and message input elements from the document
  var keywordInput = document.getElementById("keyword");
  var messageInput = document.getElementById("message");

  // get the keyword and message values from the input elements
  var keyword = keywordInput.value;
  var message = messageInput.value;

  // check if the keyword is valid
  if (keyword.length > 0 && /^[A-Za-z\s]+$/.test(keyword)) {
    // generate the key matrix from the keyword
    var keyMatrix = generateKeyMatrix(keyword);

    // display the key matrix in the table
    displayKeyMatrix(keyMatrix);

    // check if the message is valid
    if (message.length > 0 && /^[A-Za-z\s]+$/.test(message)) {
      // encrypt the message using the key matrix
      var encrypted = encryptMessage(keyMatrix, message);
      // display the encrypted message in the output element
      document.getElementById("output").textContent = "Encrypted message: " + encrypted;

      // decrypt the message using the key matrix
      var decrypted = decryptMessage(keyMatrix, encrypted);
      // display the decrypted message in the decryption output element
      document.getElementById("decryptionOutput").textContent = "Decrypted message: " + decrypted;
    } else {
      // clear the output and decryption output elements
      document.getElementById("output").textContent = "";
      document.getElementById("decryptionOutput").textContent = "";
    }
  } else {
    // clear the table, output, and decryption output elements
    document.getElementById("keyMatrix").innerHTML = "";
    document.getElementById("output").textContent = "";
    document.getElementById("decryptionOutput").textContent = "";
  }
}



function decryptMessage(keyMatrix, encrypted) {
  // Decrypt the message using the Playfair cipher
  var decrypted = "";
  var pairs = getDigraphs(encrypted);

  for (var i = 0; i < pairs.length; i++) {
    var digraph = pairs[i];
    var firstLetter = digraph[0];
    var secondLetter = digraph[1];
    var firstPosition = findPosition(keyMatrix, firstLetter);
    var secondPosition = findPosition(keyMatrix, secondLetter);

    if (firstPosition.row === secondPosition.row) {
      // Same row, shift to the left
      decrypted += keyMatrix[firstPosition.row][(firstPosition.col - 1 + 5) % 5];
      decrypted += keyMatrix[secondPosition.row][(secondPosition.col - 1 + 5) % 5];
    } else if (firstPosition.col === secondPosition.col) {
      // Same column, shift upward
      decrypted += keyMatrix[(firstPosition.row - 1 + 5) % 5][firstPosition.col];
      decrypted += keyMatrix[(secondPosition.row - 1 + 5) % 5][secondPosition.col];
    } else {
      // Form a rectangle, swap columns
      decrypted += keyMatrix[firstPosition.row][secondPosition.col];
      decrypted += keyMatrix[secondPosition.row][firstPosition.col];
    }
  }

  return decrypted;
}

function generateKeyMatrix(keyword) {
  // Create a key matrix based on the Playfair cipher rules
  var keyMatrix = [];
  var key = sanitizeKeyword(keyword);
  var alphabet = "ABCDEFGHIKLMNOPQRSTUVWXYZ";

  // Fill in the key matrix with the keyword
  for (var i = 0; i < key.length; i++) {
    keyMatrix.push(key[i]);
    alphabet = alphabet.replace(key[i], ""); // Remove the letter from the alphabet
  }

  // Fill in the remaining letters from the alphabet
  for (var j = 0; j < alphabet.length; j++) {
    keyMatrix.push(alphabet[j]);
  }

  // Convert the flat array into a 5x5 matrix
  var matrix = [];
  for (var k = 0; k < 5; k++) {
    matrix.push(keyMatrix.slice(k * 5, (k + 1) * 5));
  }

  return matrix;
}

function sanitizeKeyword(keyword) {
  // Remove duplicate letters from the keyword and replace 'J' with 'I'
  var sanitizedKeyword = "";
  var seenLetters = {};

  for (var i = 0; i < keyword.length; i++) {
    var letter = keyword[i].toUpperCase();
    if (!seenLetters[letter] && letter !== 'J') {
      sanitizedKeyword += letter;
      seenLetters[letter] = true;
    }
  }

  // Replace 'J' with 'I'
  sanitizedKeyword = sanitizedKeyword.replace(/J/g, 'I');

  return sanitizedKeyword;
}

function displayKeyMatrix(keyMatrix) {
  // Display the key matrix in the table
  var table = document.getElementById("keyMatrix");
  table.innerHTML = "";

  for (var i = 0; i < keyMatrix.length; i++) {
    var row = table.insertRow(i);
    for (var j = 0; j < keyMatrix[i].length; j++) {
      var cell = row.insertCell(j);
      cell.textContent = keyMatrix[i][j];
    }
  }
}

function encryptMessage(keyMatrix, message) {
  // Encrypt the message using the Playfair cipher
  var encrypted = "";
  var pairs = getDigraphs(message);

  for (var i = 0; i < pairs.length; i++) {
    var digraph = pairs[i];
    var firstLetter = digraph[0];
    var secondLetter = digraph[1];
    var firstPosition = findPosition(keyMatrix, firstLetter);
    var secondPosition = findPosition(keyMatrix, secondLetter);

    if (firstPosition.row === secondPosition.row) {
      // Same row, shift to the right
      encrypted += keyMatrix[firstPosition.row][(firstPosition.col + 1) % 5];
      encrypted += keyMatrix[secondPosition.row][(secondPosition.col + 1) % 5];
    } else if (firstPosition.col === secondPosition.col) {
      // Same column, shift downward
      encrypted += keyMatrix[(firstPosition.row + 1) % 5][firstPosition.col];
      encrypted += keyMatrix[(secondPosition.row + 1) % 5][secondPosition.col];
    } else {
      // Form a rectangle, swap columns
      encrypted += keyMatrix[firstPosition.row][secondPosition.col];
      encrypted += keyMatrix[secondPosition.row][firstPosition.col];
    }
  }

  return encrypted;
}

function getDigraphs(message) {
  // Break the message into digraphs (pairs of two letters)
  var digraphs = [];
  var sanitizedMessage = message.toUpperCase().replace(/J/g, 'I'); // Replace 'J' with 'I'

  for (var i = 0; i < sanitizedMessage.length; i += 2) {
    var firstLetter = sanitizedMessage[i];
    var secondLetter = (i + 1 < sanitizedMessage.length) ? sanitizedMessage[i + 1] : 'X'; // Use 'X' for odd-length messages
    digraphs.push([firstLetter, secondLetter]);
  }

  return digraphs;
}

function findPosition(keyMatrix, letter) {
  // Find the position of a letter in the key matrix
  for (var row = 0; row < 5; row++) {
    for (var col = 0; col < 5; col++) {
      if (keyMatrix[row][col] === letter) {
        return { row: row, col: col };
      }
    }
  }

  return null;
}
