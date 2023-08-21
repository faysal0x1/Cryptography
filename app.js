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

  let result = ""

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