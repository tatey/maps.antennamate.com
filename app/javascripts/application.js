//= require angular
//= require underscore
//= require_self
//= require_tree ./controllers
//= require_tree ./directives
//= require_tree ./filters
//= require_tree ./services


(function(){
  // Before we start, let's make sure we're using a modern browser.
  var FALLBACK_MESSAGE = '<p>Your browser is too old to support this website. Please '+
    '<a href="http://browsehappy.com/">upgrade your browser</a> or install the app.</p>';

  // Angular requires JSON, this seems to catch most browsers. We could add more
  // tests here as required.
  if(!window.JSON){
  	window.onload = function(){
  		document.getElementById('messages').innerHTML = FALLBACK_MESSAGE;
  	}
    return;
  }

  angular.module('am', []);

  // Since we have Google Loader, load Google Maps with it instead of hard-coding
  // in the document.
  google.load("maps", "3", {
    other_params:'sensor=false',
    callback: function(){
      // Initialize our app once it's done.
      angular.bootstrap(document.querySelector('body'), ['am']);
    }
  });
})()