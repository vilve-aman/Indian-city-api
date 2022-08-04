const fs = require('fs')

let s = fs.readFileSync('./world.csv', 'utf-8')
let chunk = ''
let a = []
for(let i=0 ; i<s.length ; i++){
    if(s[i]!='\n')  chunk+=s[i]
    else{
        a.push(chunk.substring(0,chunk.length-1))
        chunk=''
    }
}

let ws = JSON.stringify(a)
fs.writeFileSync('./final.txt',ws)
console.log('done..................................')