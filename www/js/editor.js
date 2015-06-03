/*****************************************************
    Spielmatrix Editor Script

    1. Load script to show in CodeMirror editor
    2. Show Codemirror
    3. Set up Reloader + reloading events
        Block reloading if there is a code error
        Make sure SM events are cleaned up
*****************************************************/


(function() {
    if(window.attachEvent) {
        window.attachEvent('onload', editorSetup);
    } else {
        if(window.onload) {
            var curronload = window.onload;
            var newonload = function() {
                curronload();
                editorSetup();
            };
            window.onload = newonload;
        } else {
            window.onload = editorSetup;
        }
    }

var defaultCodeValue =
"// Game.js template for Spielmatrix\n\
(function(){\n\
    var SM = new Spielmatrix({\n\
        place : document.getElementById('game'),\n\
        width : 10,\n\
        height : 10,\n\
        defaultColor : 0x000000,\n\
        mousedown : function(x, y) {\n\
            SM.glyph(x, y, 0xb5);\n\
            SM.glyphColor(x, y, 0x00FFFF);\n\
            SM.play('Blip1');\n\
        }\n\
    });\n\
\n\
    // Get a reference to the tile selector\n\
    var S = SM.selector();\n\
    // Draw a glyph & glyph in every bead \n\
    S().glyph(0xFC).glyphColor(0x232355);\n\
})();";

	var editorId = 'game-editor';

	function editorSetup() {
		var editorNode = document.getElementById(editorId);
		codemirrorSetup(editorNode, defaultCodeValue);
	}

	var cm;

    function codemirrorSetup(editorNode, codeValue) {
        cm = CodeMirror(editorNode, {
            value: codeValue,
            theme: "monokai",
            mode: "javascript",
            lineNumbers: true,
            matchBrackets: true,
            styleActiveLine: true,
            lineWrapping: true,
            foldGutter: true,
            gutters: ["CodeMirror-lint-markers", "CodeMirror-linenumbers", "CodeMirror-foldgutter"],
            lint: { predef: ["PS"] },
            extraKeys: {"Ctrl-Y": function(cm) { editorReload(); },
            "Ctrl-Q": function(cm) { cm.foldCode(cm.getCursor()); }}
        });
    }

    function editorReload() {
    	Spielmatrix.shutdownAll();
    	var docText = cm.getValue();

    	try {
    		eval(docText);
    	} catch (e) {
    		console.error(e);
    	}
    }
})();
