var mkdirp = require('mkdirp');

function errorLog(err) {
    if (err) {
        console.error(err);
    }
}

mkdirp('./dist/spielmatrix/', errorLog);
mkdirp('./dist/sounds/', errorLog);
mkdirp('./release/', errorLog);
