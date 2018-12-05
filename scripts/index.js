const fs = require('fs')

const data = fs.readFileSync('scripts/words.txt').toString()

fs.writeFileSync('scripts/words.json', JSON.stringify({ data: data.split('\n') }))