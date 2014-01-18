//= require angular
//= require underscore
//= require_self
//= require_tree ./controllers
//= require_tree ./directives
//= require_tree ./filters
//= require_tree ./services


(function(){
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