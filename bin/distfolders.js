var mkdirp = require('mkdirp');
    
mkdirp('./dist/spielmatrix/', function (err) {
    if (err) console.error(err);
});

mkdirp('./dist/sounds/', function (err) {
    if (err) console.error(err);
});

mkdirp('./release/', function (err) {
    if (err) console.error(err);
});
