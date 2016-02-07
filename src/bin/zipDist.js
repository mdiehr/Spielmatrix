var fs = require('fs');
var archiver = require('archiver');

var output = fs.createWriteStream('release/Spielmatrix.zip');

var archive = archiver('zip');
archive.on('error', function(err) {
	console.error(err.message);
});

archive.pipe(output);

archive
	.directory('dist', 'Spielmatrix')
	.finalize();