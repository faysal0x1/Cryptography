
// Function to handle the file input change event
function handleFileInputChange() {
  var fileInput = document.getElementById("fileInput");
  var file = fileInput.files[0]; // Get the selected file

  if (file) {
      var reader = new FileReader();

      reader.onload = function(event) {
          var fileContent = event.target.result;
          var paragraphElement = document.getElementById("fileContent");
          paragraphElement.textContent = fileContent;
      };

      reader.readAsText(file); // Read the file as text
  }
}

// Attach the event listener to the file input change event
var fileInput = document.getElementById("fileInput");
fileInput.addEventListener("change", handleFileInputChange);












let encrypt = document.getElementById('encryptData')

encrypt.addEventListener('click', function (e) {
  e.preventDefault()

  let cryptoword = document.getElementById('cryptoword').value

  let key = document.getElementById('encKey').value
  key = parseInt(key)

  let arr = cryptoword.split('')
  let isValid = arr.every(item => {
    let charCode = item.charCodeAt(0)
    return (
      (charCode >= 65 && charCode <= 90) || (charCode >= 97 && charCode <= 122)
    )
  })

  if (!isValid) {
    alert('Input contains characters outside the range A-Z.')
    return // Exit the function
  }

  let result = ''

  let s = key

  for (let i = 0; i < arr.length; i++) {
    let char = arr[i]
    if (char.toUpperCase(arr[i])) {
      let ch = String.fromCharCode(((char.charCodeAt(0) + key - 65) % 26) + 65)
      result += ch
    } else {
      let ch = String.fromCharCode(((char.charCodeAt(0) + key - 97) % 26) + 97)
      result += ch
    }
  }

  let outPutForm = document.getElementById('outPutForm')

  outPutForm.classList.remove('d-none')

  let outPut = document.getElementById('outputData')

  outPut.innerHTML = result
})

let decryptData = document.getElementById('decryptData')

decryptData.addEventListener('click', function (e) {
  e.preventDefault()

  let cryptoword = document.getElementById('cryptoword').value
  let key = document.getElementById('encKey').value
  key = parseInt(key)

  let arr = cryptoword.split('')
  let isValid = arr.every(item => {
    
    let charCode = item.charCodeAt(0)
    return (
      (charCode >= 65 && charCode <= 90) || (charCode >= 97 && charCode <= 122)
    )
  })

  if (!isValid) {
    alert('Input contains characters outside the range A-Z.')
    return
  }

  let result = ''

  let s = key

  for (let i = 0; i < arr.length; i++) {
    let char = arr[i]

    if (char.toUpperCase(arr[i])) {

      let val = Math.ceil(Math.abs(char.charCodeAt(0) - key - 65) / 26)
      console.log(val)

      let ch = String.fromCharCode((char.charCodeAt(0) - key - 65) + 26*val + 65)
      result += ch

    } else {
      let ch = String.fromCharCode((char.charCodeAt(0) - key - 65 )+ 26*val + 65)
      result += ch
    }
  }

  let outPutForm = document.getElementById('outPutForm')

  outPutForm.classList.remove('d-none')

  let outPut = document.getElementById('outputData')

  outPut.innerHTML = result
})
