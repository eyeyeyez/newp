//const fs = require('fs');
//const data = fs.readFileSync('./file.txt', 'utf8');
//console.log(data); // waiting until readFileSync done

const fs = require('fs');
fs.readFile('./file.txt', 'utf8', (err, res) => {
console.log(res); // waiting until readFile done
});
console.log('Reading...'); // print first

