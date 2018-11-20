//dfie93

let inputValue = 'dfie93';

let fs = require('fs');
let files = fs.readdirSync(__dirname+'/broker-manifests/deployments'); 
console.log(files);

// for every file
files.forEach(e => {
  regexReplace(`${__dirname}/broker-manifests/deployments/${e}`, /(- image: [\S]*:)(\S*)/, inputValue);
});


function regexReplace(path, regex, replacement){
  let fileContent = fs.readFileSync(path, 'utf8');

  fileContent = fileContent.replace(regex, `$1${replacement}`);
  fs.writeFileSync(path, fileContent);
}

