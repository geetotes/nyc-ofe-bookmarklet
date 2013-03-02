/*jslint white: true, undef: true */
(function(){

  //the minimum version of jQuery we want
  var jqueryV = "1.9.1",
  //load up other scripts, these will block jquery from loading
  //hehe, this is toally unreadable
      underscoreSrc = "http://cdnjs.cloudflare.com/ajax/libs/underscore.js/1.4.4/underscore-min.js",
      backboneSrc = "http://cdnjs.cloudflare.com/ajax/libs/backbone.js/0.9.10/backbone-min.js",
      underscoreScript = document.createElement("script"),
      backboneScript = document.createElement("script");
  underscoreScript.src = underscoreSrc;
  backboneScript.src = backboneSrc; 
  document.getElementsByTagName("head")[0].appendChild(underscoreScript);
  document.getElementsByTagName("head")[0].appendChild(backboneScript);
  //check prior inclusion and version
  if (window.jQuery === undefined || window.jQuery.fn.jquery < v) {
    var done = false,
        script = document.createElement("script");
    script.src = "http://ajax.googleapis.com/ajax/libs/jquery/" + jqueryV + "/jquery.min.js";
    script.onload = script.onreadystatechange = function(){
      if (!done && (!this.readyState || this.readyState == "loaded" || this.readyState == "complete")) {
        done = true;
        initMyBookmarklet();
      }
    };
    document.getElementsByTagName("head")[0].appendChild(script);
  } else {
    initMyBookmarklet();
  }

function initMyBookmarklet() {
  alert('hello');
}

})();
