// Transcodes all .wav audio files into AAC and OGG
// https://www.npmjs.com/package/sox
// http://sox.sourceforge.net/Docs/Features

var sox = require('sox-stream');
var fs  = require('fs');
var _ = require('lodash');

var inType = '.wav';
var outTypes = ['MP3', 'OGG'];
var inPath = './assets/sounds/src';
var outPath = './assets/sounds/out';

try {
    fs.readdir(inPath, function(err, files) {
        _.forEach(files, function(n) {
            if (n.indexOf(inType) > 0) {
                var fileName = n.slice(0, n.length-inType.length);
                _.forEach(outTypes, function(outType) {
                    var outFileName = outPath+fileName+'.'+outType.toLowerCase();
                	console.log(' ... Transcoding ' + outFileName);
                    fs.createReadStream(inPath+n)
                        .pipe( sox({type: outType}) )
                        .pipe( fs.createWriteStream(outFileName) );
                });
            }
        });
    });
} catch (err) {
    console.error(err);
}
