(function(){
	if(!window.google){
		window.google = {};
	}

	// We don't need to do anything, it's already here!
	if(google.loader){
		return;
	}

	google.load = function(moduleName, moduleVersion, optionalSettings){
		// Just enough time to simulate some async.
		var timeoutLength = 100;
		window.setTimeout(function(){
			// This function can take a function or a string.
			if(typeof optionalSettings.callback == 'function'){
				// Call the function as passed.
				optionalSettings.callback();
			}else if(typeof optionalSettings.callback == 'string'){
				// Call the global function as named in the string.
				window[optionalSettings.callback]();
			}
		},timeoutLength);
	}
})();