'use strict'

const AK = ''
const SK = ''

function fetchRandomWord() {
  return fetch('/scripts/words.json')
    .then(function (response) {
      return response.json()
    })
    .then(function (data) {
      data = data.data
      const knewWords = localStorage.getItem('knewWords') || ''
      let randomWord = data[Math.floor(Math.random() * data.length)]

      while (knewWords.indexOf(randomWord) > -1) {
        randomWord = data[Math.floor(Math.random() * data.length)]
      }

      return randomWord
    })
}

function translateWord(word) {
  const salt = 2
  const md5Str = md5(`${AK}${word}${salt}${SK}`)
  const url = `https://cors-anywhere.herokuapp.com/http://openapi.youdao.com/api?q=${word}&from=EN&to=zh_CHS&appKey=${AK}&salt=${salt}&sign=${md5Str}`

  return fetch(url)
    .then(function (response) {
      return response.json()
    })
    .then(function (data) {
      return data
    })
}

function skip(word) {
  let knewWords = localStorage.getItem('knewWords') || ''

  if (knewWords) knewWords = knewWords.split(',')
  if (!knewWords.includes(word)) {
    localStorage.setItem('knewWords', [...knewWords, word])
  }

  main()
}

function main() {
  fetchRandomWord().then(word => {
    translateWord(word).then(res => {
      document.getElementById('word').innerText = word

      const explains = res.basic.explains
      const htmlStr = explains.map(item => {
        return `<li>${item}</li>`
      })

      const linkEle = document.getElementById('webLink')
      linkEle.style.display = 'inline-block'
      linkEle.setAttribute('href', `http://www.youdao.com/w/eng/${word}`)

      document.getElementById('explain').innerHTML = htmlStr.join('')
      document.getElementById('skip').addEventListener('click', function () {
        skip(word)
      }, false)
    })
  })
}

main()
