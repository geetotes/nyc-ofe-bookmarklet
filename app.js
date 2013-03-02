/*jslint white: true, undef: true */
(function(){

  //the minimum version of jQuery we want
  var jqueryV = "1.9.1",
  //load up other scripts, these will block jquery from loading
  //hehe, this is toally unreadable
      underscoreSrc = "http://cdnjs.cloudflare.com/ajax/libs/underscore.js/1.4.4/underscore-min.js",
      backboneSrc = "http://cdnjs.cloudflare.com/ajax/libs/backbone.js/0.9.10/backbone-min.js",
      jqueryUISrc = "http://ajax.googleapis.com/ajax/libs/jqueryui/1.10.1/jquery-ui.min.js",
      jqueryUIScript = document.createElement("script"),
      underscoreScript = document.createElement("script"),
      backboneScript = document.createElement("script");
  jqueryUIScript.src = jqueryUISrc;
  underscoreScript.src = underscoreSrc;
  backboneScript.src = backboneSrc; 
  document.getElementsByTagName("head")[0].appendChild(underscoreScript);
  document.getElementsByTagName("head")[0].appendChild(backboneScript);
  //check prior inclusion and version
  if (window.jQuery === undefined || window.jQuery.fn.jquery < jqueryV) {
    var done = false,
        script = document.createElement("script");
    script.src = "http://ajax.googleapis.com/ajax/libs/jquery/" + jqueryV + "/jquery.min.js";
    script.onload = script.onreadystatechange = function(){
      if (!done && (!this.readyState || this.readyState == "loaded" || this.readyState == "complete")) {
        done = true;
        loadUI();
      }
    };
    document.getElementsByTagName("head")[0].appendChild(script);
  } else {
    loadUI();
  }

  function loadUI() {
    if (window.jQuery.ui === undefined) {
      var done = false;
      jqueryUIScript.onload = jqueryUIScript.onreadystatechange = function(){
        if(!done && (this.readyState || this.readyState == "loaded" || this.readystate == "complete")){
          done = true;
          initMyBookmarklet();
        }
      };
    document.getElementsByTagName("head")[0].appendChild(jqueryUIScript);
    } else {
      initMyBookmarklet();
    }


  }

  function appendUIStyle(){
    var s = document.createElement('link');
    s.setAttribute('href','http://code.jquery.com/ui/1.10.1/themes/base/jquery-ui.css');
    s.setAttribute('rel','stylesheet');
    s.setAttribute('type','text/css');
    document.getElementsByTagName('head')[0].appendChild(s);
  }

function initMyBookmarklet() {
  appendUIStyle();
  //let's do some dom manipulation
  $('body').append('<div id="dialog" title="OFC Canned Responses"><p id="content">Hi there</p></div>');
  var dialog = $('#dialog'),
      body = $('body'),
      content = $('p');

  dialog.dialog();



}

})();
