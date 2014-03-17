(function () {
	function renderLiquid () {
		var doc = jsyaml.load( context.getValue() );
		var template = Liquid.parse( markup.getValue() );
		var rendered = template.render(doc);

		document.getElementById("rendered").innerHTML = rendered;
	}

	function sizeSetup () {
		var setupColumn = document.getElementById("setup-column");
		var allowedHeight = (window.innerHeight - document.getElementsByTagName("header")[0].offsetHeight - document.getElementsByTagName("h2")[0].offsetHeight*2 - 150)/2;
		var codeMirrors = document.getElementsByClassName("CodeMirror");

		for (var i = 0; i < codeMirrors.length; i++) {
		    codeMirrors[i].style.height = allowedHeight + "px";
		}
	}

	CodeMirror.defaults.viewportMargin = Infinity;

	var context = CodeMirror.fromTextArea(document.getElementById("context"), {
		mode:  "text/x-yaml"
	});
	var markup = CodeMirror.fromTextArea(document.getElementById("markup"), {
		mode:  "liquid"
	});

	context.on("change", renderLiquid);
	markup.on("change", renderLiquid);

	renderLiquid();

	window.onresize = sizeSetup;

	sizeSetup();
})();