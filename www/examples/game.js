// Game.js template for Spielmatrix
(function(){
    var SM = new Spielmatrix({
        place : document.getElementById('game'),
        width : 10,
        height : 10,
        defaultColor : 0x000000,
        mousedown : function(x, y) {
            // SM.log(['mousedown', x, y].join(', '));
            SM.glyph(x, y, 0xb5);
            SM.glyphColor(x, y, 0x00FFFF);
            SM.play('Blip1');
        }
    });

    // Get a reference to the tile selector
    var S = SM.selector();
    // Draw a glyph & glyph in every bead 
    S().glyph(0xFC).glyphColor(0x232355);

})();
