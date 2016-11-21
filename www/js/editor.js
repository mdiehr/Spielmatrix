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

	var editorId = 'code';
    var cm;

	function editorSetup() {
		var editorNode = document.getElementById(editorId);
		codemirrorSetup(editorNode);
        attachEditorControls();
	}

    function codemirrorSetup(editorNode) {
        cm = CodeMirror.fromTextArea(editorNode, {
            theme: "monokai",
            mode: "javascript",
            lineNumbers: true,
            matchBrackets: true,
            styleActiveLine: true,
            lineWrapping: true,
            foldGutter: true,
            gutters: ["CodeMirror-lint-markers", "CodeMirror-linenumbers", "CodeMirror-foldgutter"],
            lint: { predef: ["Spielmatrix"] },
            extraKeys: {"Ctrl-Y": function(cm) { editorReload(); },
            "Ctrl-Q": function(cm) { cm.foldCode(cm.getCursor()); }}
        });
    }

    function engineShutdown() {
        Spielmatrix.shutdownAll();
    }

    function engineStartup() {
        var docText = cm.getValue();

        // Try to reload the Spielmatrix engine from the code that was written in the editor
        try {
            var output = transpile(docText);
            eval(output);
        } catch (e) {
            console.error(e);
        }
    }

    function editorReload() {
    	engineShutdown();
        engineStartup();
    }

    function transpile(inputCode) {
        return Babel.transform(inputCode, { presets: ['es2015'] }).code;
    }

    function attachEditorControls() {
        var runButton = document.getElementById('runClickLink');
        runButton.onclick = editorReload;
    }

    // Start engine

    window.setTimeout(function() {
        engineStartup();
    }, 5);
})();
