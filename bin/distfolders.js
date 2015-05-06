var mkdirp = require('mkdirp');
    
mkdirp('./dist/spielmatrix/', function (err) {
    if (err) console.error(err);
    else console.log('done!');
});
