let fs = require('fs');
let files = fs.readdirSync(__dirname+'/broker-manifests/deployments'); 

files.forEach(e => {
    console.log(e);
  });