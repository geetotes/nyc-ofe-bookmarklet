/*jslint white: true, undef: true */
// You create your bookmarklet by instantiating
// a new Bookmarklet function, then pass in the options like so.
// This example checks to see if the var is already defined, and makes
// sure not to overwrite it. This could happen if the user clicks on
// the bookmarklet more than once.

var MyBookmarklet = MyBookmarklet || new Bookmarklet({
  // debug: true, // use debug to bust the cache on your resources
  css: ['http://code.jquery.com/ui/1.10.1/themes/base/jquery-ui.css'],
  js: ['http://cdnjs.cloudflare.com/ajax/libs/underscore.js/1.4.4/underscore-min.js', 'http:////cdnjs.cloudflare.com/ajax/libs/backbone.js/0.9.10/backbone-min.js', 'http:////ajax.googleapis.com/ajax/libs/jquery/1.9.1/jquery.min.js','https://ajax.googleapis.com/ajax/libs/jqueryui/1.10.1/jquery-ui.min.js'],
  // jqpath: '/my/jquery.js', // defaults to google cdn-hosted jquery
  ready: function(base) { // use base to expose a public method
    base.init = function () {
      $('body').append('<div id="dialog" style="display:none;" title="OFC Canned Directions"><p id="content">Hi there</p></div>');
      var dialog = $('#dialog'),
    body = $('body'),
    content = $('p');
    //body and content vars not used

    dialog.append('Location <select id="location"></select><br/>');

    //add datepicker
    dialog.append('Date <input type="text" id="datepicker"/><br/>');

    dialog.append('Subway Status: <span id="subway-status"></span><br/>');

    dialog.append('Message: <textarea id="message"></textarea><br/>');

    dialog.append('<a id="cal" href="foo">Download iCal</a><br/>');

    dialog.dialog();


  //start backbone
  //

  var LocationView = Backbone.View.extend({
    el: 'option',
    render: function() {
      var i = 0;

      for( i; i < 10; i+=1){
        var option = '<option value="'+i+'"></option>';
        $('#location').append($(option).text('foo'));
      }
        
    }


  });

  var AppView = Backbone.View.extend({
    el: $('#dialog'),
    events: {
      //some events
      'blur #datepicker': 'setDate',
      'blur #location': 'scrapeSubway',
      'blur #message': 'genCal'
    },
    initalize: function() {
      var locView = new LocationView;
      locView.render();
      //init date
      $('#datepicker').datepicker();
    },

    setDate: function(){
      this.appointmentDate = $('#datepicker').val();
      this.genMessage();
    },
    scrapeSubway: function(){
      //eventually get the trains from the collection selected
      $('#subway-status').text('Subways are not working today');
      this.subwayStatus = "broken";
      this.genMessage();
    },
    genMessage: function(){
      if(this.appointmentDate !== undefined && this.subwayStatus !== undefined){
        $('#message').text('To get to your appointment at FooBar on FizzBuzz, take the subways');
      }
    },
    genCal: function(){
      $('#cal').show();
      $('#cal').attr('href', '#');
    }

  });


  var app = new AppView;
  //weird, I need to kick it off
  app.initalize();



    }    
    base.init();
  }
});


/**
 * jQuery Bookmarklet - version 2.0
 * Author(s): Brett Barros, Paul Irish, Jon Jaques
 * 
 * Original Source: http://latentmotion.com/how-to-create-a-jquery-bookmarklet/
 * Modified Source: https://gist.github.com/2897748
 */
 
function Bookmarklet(options){
  // Avoid confusion when setting
  // public methods.
  var self = this;

  // Merges objects. B overwrites A.
  function extend(a, b){
    var c = {};
    for (var key in a) { c[key] = a[key]; }
    for (var key in b) { c[key] = b[key]; }
    return c;
  }

  function loadCSS(sheets) {
    // Synchronous loop for css files
    $.each(sheets, function(i, sheet){
      $('<link>').attr({
        href: (sheet + cachebuster), 
        rel: 'stylesheet'
      }).appendTo('head');
    });
  }

  function loadJS(scripts){
    // Check if we've processed all 
    // of the JS files (or if there are none).
    if (scripts.length === 0) {
      o.ready(self);
      return;
    }

    // Load the first js file in the array.
    $.getScript(scripts[0] + cachebuster, function(){
        // asyncronous recursion, courtesy Paul Irish.
        loadJS(scripts.slice(1));
    });
  }

  function init(callback) {
    if(!window.jQuery) {
      // Create jQuery script element.
      var script = document.createElement('script');
      script.type = 'text/javascript';
      script.src = o.jqpath;
      document.body.appendChild(script);

      // exit on jQuery load.
      script.onload = function(){ callback(); };
      script.onreadystatechange = function() {
        if (this.readyState == 'complete') callback();
      }
    } else {
      callback();
    }
  }

  var defaults = {
    debug: false
    , css: []
    , js: []
    , jqpath: "https://ajax.googleapis.com/ajax/libs/jquery/1.9.1/jquery.min.js"
  }

  // If we don't pass options, use the defaults.
  , o = extend(defaults, options)

  , cachebuster = o.debug ?
    ('?v=' + (new Date()).getTime()) : '';


  // Kick it off.
  init(function(){
    loadCSS(o.css);
    loadJS(o.js);
  });
  
};
