'use strict'

const explainEle = document.getElementById('explain')
const linkEle = document.getElementById('webLink')
const wordEle = document.getElementById('word')

function translateWord(word) {
  const url = `http://api.sinchang.me/youdao/translate?word=${word}`

  return fetch(url)
    .then(function (response) {
      return response.json()
    })
    .then(function (data) {
      return data
    })
}

function skip(word) {
  chrome.storage.sync.get(['englishTabWords'], function(result) {
    const words = result.englishTabWords || []
    words.forEach((item, index) => {
      if (item === word) words.splice(index, 1)
    })
    
    chrome.storage.sync.set({ englishTabWords: words }, function() {
      main()
    })
  })
}

function main() {
  chrome.storage.sync.get(['englishTabWords'], function(result) {
    if (!result.englishTabWords || !result.englishTabWords.length) return explainEle.innerHTML = ''
    const words = result.englishTabWords
    const word = words[Math.floor(Math.random() * words.length)]

    translateWord(word).then(res => {
      wordEle.innerText = word
  
      const explains = res.basic.explains
      const htmlStr = explains.map(item => {
        return `<li>${item}</li>`
      })
  
      linkEle.style.display = 'inline-block'
      linkEle.setAttribute('href', `http://www.youdao.com/w/eng/${word}`)
  
      explainEle.innerHTML = htmlStr.join('')
  })
  
    document.getElementById('skip').addEventListener('click', function () {
      skip(word)
    }, false)
  })
}

main()
