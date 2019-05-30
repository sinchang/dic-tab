const list = document.getElementById('list')
const addBtn = document.getElementById('addBtn')
const wordTextarea = document.getElementById('wordTextarea')
let globalWords = []

main()

addBtn.addEventListener('click', function() {
  globalWords = wordTextarea.value.split('\n')
  chrome.storage.sync.set({ englishTabWords: globalWords }, function() {
    renderList()
    wordTextarea.value = ''
  });
})

function main() {
  chrome.storage.sync.get(['englishTabWords'], function(result) {
    globalWords = result.englishTabWords || []
    renderList()
  })
}

function renderList() {
  let listHtml = ''
  globalWords.forEach(word => {
    listHtml += `<li class="list-group-item">${word.trim()}</li>`
  })

  list.innerHTML = listHtml
}