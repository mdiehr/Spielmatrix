// Transcodes all .wav audio files into AAC and OGG
// https://www.npmjs.com/package/sox
// http://sox.sourceforge.net/Docs/Features

var sox = require('sox-stream')
var fs  = require('fs')
var _ = require('lodash');

var inType = '.wav';
var outTypes = ['MP3', 'OGG'];
var inPath = './assets/sounds/';
var outPath = './dist/sounds/';

// fs.createReadStream('./assets/sounds/Appear.wav')
//     .pipe( sox({type: 'AAC'}) )
//     .pipe( fs.createWriteStream('./assets/sounds/Appear.AAC') );

// var src = fs.createReadStream('./assets/sounds/Appear.wav')
// var transcode = sox({
//     type: 'MP3'
// })
// var dst = fs.createWriteStream('./assets/sounds/Appear.MP3')
// src.pipe(transcode).pipe(dst);
 
// transcode.on('error', function (err) {
//     console.log('oh no! ' + err.message)
// });

fs.readdir(inPath, function(err, files) {
    _.forEach(files, function(n) {
        if (n.indexOf(inType) > 0) {
            var fileName = n.slice(0, n.length-inType.length);
            console.log(fileName);
            _.forEach(outTypes, function(outType) {
                var outFileName = outPath+fileName+'.'+outType;
                fs.createReadStream(inPath+n)
                    .pipe( sox({type: outType}) )
                    .pipe( fs.createWriteStream(outFileName) );
            });
        }
    });
});

