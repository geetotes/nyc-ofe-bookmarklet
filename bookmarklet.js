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
      $('body').append('<div id="dialog" style="display:none;" title="OFC Canned Directions"></div>');
      var dialog = $('#dialog'),
          i = 1,
          content = $('p');
    //body and content vars not used

    dialog.append('Location <select id="location"></select><br/>');

    //add datepicker
    dialog.append('Date <input type="text" id="datepicker" maxlength="10"/><br/>');
    dialog.append('Time: <select id="hours"></select>:<input type="text" id="minutes" maxlength="2" style="width:1.5em;"/><select id="ampm"><option val="pm">pm</option><option val="am">am</option></select><br/>');
    for(i = 1; i < 13; i += 1){
      $('#hours').append('<option val="'+i+'">'+i+'</option>');
    }

    //dialog.append('Subway Status: <span id="subway-status"></span><br/>'); taking of scraping for now

    dialog.append('Message: <br/><textarea id="nyc-ofe-message" style="width:500px; height:150px;"></textarea><br/>');

    dialog.append('<a id="cal" href="foo" style="display:none;">Download iCal</a><br/>');

    dialog.dialog({width: 700, height:350});



  //start backbone
  //


  var Location = Backbone.Model.extend({
    getDirections: function(){
      var directions = "Our address is: " + this.get('site_location_address') + ". Take the A/C/E to 81st Street, and get off at the front of the train. Walk two blocks south on 8th Ave and then head west on 79th Street. We are across the street from the Starbucks.";
      return directions;
    }
  });

  var locationJSON = JSON.parse(' [ { "language_s" : "English/Spanish", "days_open" : "Monday- Friday ", "zip_code" : "11226", "host_organization" : "CAMBA*", "hours" : "9:00AM-6PM", "provider" : "Neighborhood Trust Financial Partners", "site_location_address" : "885 Flatbush Ave 2nd Fl", "telephone" : "718-287-0010", "city" : "Brooklyn" }, { "language_s" : "English/Spanish", "days_open" : "Monday- Friday ", "zip_code" : "10033", "host_organization" : "Northern Manhattan Improvement Corporation", "hours" : "9:00AM - 6:00PM", "provider" : "Neighborhood Trust Financial Partners", "site_location_address" : "76 Wadsworth", "telephone" : "212.822.8315", "city" : "New York" }, { "language_s" : "English/Spanish", "days_open" : "Wednesday and Friday", "zip_code" : "10451", "host_organization" : "Neighborhood Housing Services of South Bronx*", "hours" : "9:00AM-5:00PM", "provider" : "Neighborhood Trust Financial Partners", "site_location_address" : "848 Concourse Village West", "telephone" : "718.732.8136", "city" : "Bronx" } , { "language_s" : "English/Spanish", "days_open" : "Tuesday and Friday", "zip_code" : "10019", "host_organization" : "Midtown Community Court", "hours" : "9:00AM- 5:00PM", "provider" : "Neighborhood Trust Financial Partners", "site_location_address" : "314 West 54th Street", "telephone" : "646.264.1365", "city" : "New York" }, { "language_s" : "English/Spanish", "days_open" : "Thursday", "zip_code" : "10009", "host_organization" : "Lower East Side People\'s Federal Credit Union*", "hours" : "11:00AM-7:00PM", "provider" : "Neighborhood Trust Financial Partners", "site_location_address" : "37 Avenue B", "telephone" : "212-529-8197 x. 30", "city" : "New York" }, { "language_s" : "English/Spanish", "days_open" : "Wednesday and Thursday", "zip_code" : "10027", "host_organization" : "New York City Housing Authority - Manhattanville", "hours" : "9:30AM-1:30PM", "provider" : "Neighborhood Trust Financial Partners", "site_location_address" : "530 West 133rd Street", "telephone" : "212-927-5771 ext 200", "city" : "New York" }, { "language_s" : "English/Spanish", "days_open" : "Monday", "zip_code" : "11216", "host_organization" : "NHS East Flatbush", "hours" : "9:30AM - 5:00PM", "provider" : "Neighborhood Trust Financial Partners", "site_location_address" : "2806 Church Avenue", "telephone" : "646.264.1365", "city" : "Brooklyn" } , { "language_s" : "English/Spanish", "days_open" : "Wednesday and Thursday", "zip_code" : "11377", "host_organization" : "NHS - Northern Queens", "hours" : "9:30AM - 5:00PM", "provider" : "Neighborhood Trust Financial Partners", "site_location_address" : "60-20 Woodside Avenue 2nd Fl (Above Astoria Federal Savings)", "telephone" : "646.264.1365", "city" : "Queens" }, { "language_s" : "English/Spanish", "days_open" : "Tuesday and Wednesday", "zip_code" : "10302", "host_organization" : "El Centro", "hours" : "9:00AM - 5:00PM", "provider" : "Neighborhood Trust Financial Partners", "site_location_address" : "1546 Castleton Avenue", "telephone" : "646-772-0096", "city" : "Staten Island" },{ "language_s" : "English/Spanish", "days_open" : "Monday, Wednesday, Friday", "zip_code" : "10018", "host_organization" : "NHS - Midtown", "hours" : "9:00AM - 5:00PM", "provider" : "Neighborhood Trust Financial Partners", "site_location_address" : "307 W. 36th Street 12th Fl", "telephone" : "212.519.2512", "city" : "Manhattan" }, { "language_s" : "English/Spanish", "days_open" : "Monday-Saturday", "zip_code" : "11216", "host_organization" : "Bedford Stuyvesant Restoration Corporation", "hours" : "Mon-Weds and Friday  10:00AM-6:00PM \\nThursday 10:00AM-8:00PM \\nSaturday 10:00AM-2:00PM", "provider" : "BSRC", "site_location_address" : "1406 Fulton Street", "telephone" : "718-636-6994", "city" : "Brooklyn" }, { "language_s" : "English/Spanish", "days_open" : "Thursday, Saturday", "zip_code" : "11201", "host_organization" : "Brooklyn Public Library - Cadman Plaza - Business Library", "hours" : "\\nThursday 4:00PM - 8:00PM\\nSaturday 10:00AM - 5:00PM", "provider" : "BSRC", "site_location_address" : "280 Cadman Plaza West  ", "telephone" : "718-636-6994", "city" : "Brooklyn" } , { "language_s" : "English", "days_open" : "Tuesday", "zip_code" : "11212", "host_organization" : "Brownsville Multi-Service Center", "hours" : "10:00-6:00PM", "provider" : "BSRC", "site_location_address" : "592 Rockaway Ave", "telephone" : "718-636-6994", "city" : "Brooklyn" },{ "language_s" : "English/Spanish", "days_open" : "Friday", "zip_code" : "11207", "host_organization" : "Cypress Hills Community Development Corporation", "hours" : "10:00AM-5:00PM", "provider" : "BSRC", "site_location_address" : "2832 Fulton Street", "telephone" : "718-636-6994", "city" : "Brooklyn" }, { "language_s" : "English", "days_open" : "Monday-Friday", "zip_code" : "11432", "host_organization" : "Home Base / Catholic Charities", "hours" : "9am-5pm", "provider" : "Financial Clinic", "site_location_address" : "87-80 Merrick Blvd, 2nd Floor", "city" : "Jamaica" } , { "language_s" : "English/Spanish", "days_open" : "Tuesday, Weds, Friday", "zip_code" : "11372", "host_organization" : "Queens Community House (QCH)", "hours" : "10am-6pm", "provider" : "Financial Clinic", "site_location_address" : "74-09 37th Ave., Room 400B", "city" : "Jackson Heights" } , { "language_s" : "English/Spanish", "days_open" : "Thursday", "zip_code" : "11373", "host_organization" : "Make the Road", "hours" : "11am-7pm", "provider" : "Financial Clinic", "site_location_address" : "92-10 Roosevelt ave", "city" : "Queens" } , { "language_s" : "English/Spanish", "days_open" : "Sunday-Friday", "zip_code" : "10451", "host_organization" : "Phipps Opportunity Center", "hours" : "M-F 9-5, Sun 10-2", "provider" : "Phipps", "site_location_address" : "3125 Third Ave.", "telephone" : "347-329-3929", "city" : "Bronx" } , { "language_s" : "English/Spanish", "days_open" : "Monday-Friday", "zip_code" : "10460", "host_organization" : "West Farms Technology & Career Center", "hours" : "9:00AM-5:00PM", "provider" : "Phipps", "site_location_address" : "1030 E 178th St.", "telephone" : "(718) 542-0109", "city" : "Bronx" } , { "language_s" : "English/Spanish", "days_open" : "Wednesday", "zip_code" : "10472", "host_organization" : "Catholic Charities Home Base", "hours" : "9:00AM-5:00PM", "provider" : "Phipps", "site_location_address" : "2155 Blackrock Ave.", "city" : "Bronx" } , { "language_s" : "English/Spanish", "days_open" : "Monday-Friday", "zip_code" : "11101", "host_organization" : "East River Development Alliance", "hours" : "9:00AM-5:00PM", "provider" : "ERDA", "site_location_address" : "38-81 13th St.", "telephone" : "718-784-0877", "city" : "Queens" } , { "language_s" : "English/Spanish", "days_open" : "Monday, Wednesday, Friday", "zip_code" : "11105", "host_organization" : "ERDA Astoria Houses", "hours" : "9:00AM-5:00PM", "provider" : "ERDA", "site_location_address" : "4-25 Astoria Blvd", "telephone" : "718-784-0877", "city" : "Queens" } ]');
      








  var LocationList = Backbone.Collection.extend({
    model: Location
  });

  var Locations = new LocationList(locationJSON);

  var LocationView = Backbone.View.extend({
    el: 'option',
    render: function() {
      console.log(this.model.get('site_location_address'));
      this.$el.html(this.model.get('site_location_address'));
      return this; 
    }
  });

  var AppView = Backbone.View.extend({
    el: $('#dialog'),
    events: {
      //some events
      'blur #datepicker': 'setDate',
      //'blur #location': 'scrapeSubway', taking off subway scraping for now
      'blur #nyc-ofe-message': 'genCal',
      'change #location': 'genMessage',
      'blur #location': 'genMessage',
      'blur #location': 'genMessage',
      'change #minutes': 'setMinutes'
  
    },
    initalize: function() {
      //init date
      $('#datepicker').datepicker();

      //We all remember this pattern
      //this.listenTo(Locations, 'add', this.addOne);
      //this.listenTo(Locations, 'reset', this.addAll);

      //Locations.fetch();

      this.addAll();

    },
  
    setMinutes: function() {
      this.timeSet = true;
      this.genCal();
    },
    /*
     * loc is shorthand for location
     * because the syntax highlighting freaks me out
     */
    addOne: function(loc){
      var view = new LocationView({model: loc});
      //this.$('#location').append(view.render());
      //hack for now to get json working
      this.$('#location').append('<option>' + loc.get('site_location_address') + '</option>');
    },

    addAll: function(){
      Locations.each(this.addOne, this);
    },
    setDate: function(){
      this.appointmentDate = $('#datepicker').val();
      this.dateSet = true;
      this.genCal();
    },
    scrapeSubway: function(){
      //eventually get the trains from the collection selected
      $('#subway-status').text('Subways are not working today');
      this.subwayStatus = "broken";
      this.genMessage();
    },
    genMessage: function(){
      var address = $('#location').val(),
          models= Locations.where({site_location_address : address});
      //if(this.appointmentDate !== undefined && this.subwayStatus !== undefined){
      $('#nyc-ofe-message').text(models[0].getDirections());
      this.apptLocation = models[0].get('site_location_address');
      this.locationSet = true;
      //}
    },
    genCal: function(){
      if(this.dateSet === true && this.timeSet === true && this.locationSet === true){
        $('#cal').show();
        $('#cal').attr('href', 'data:application/octet-stream;filename=event.ics,'+encodeURIComponent(this.genEvent()));
      }
    },
    genEvent: function(){
      this.appointmentDate = $('#datepicker').val();
      var ev,
          year = this.appointmentDate.slice(6,10),
          month = this.appointmentDate.slice(0,2),
          day = this.appointmentDate.slice(3,5),
          hour = parseInt($('#hours').val(), 10),
          minute = $('#minutes').val(),
          finishHour;
      if($('#ampm').val() === "pm"){
        hour = parseInt(hour, 10) + 12;
      }
      finishHour = hour + 1;

      if(hour < 10){
        hour = "0" + hour.toString();
      }
      if(finishHour < 10){
        finishHour = "0" + finishHour.toString();
      }
      ev = 'BEGIN:VCALENDAR\r\nVERSION:1.0\r\nBEGIN:VEVENT\r\nDTSTART:' + year + month + day + 'T' + hour.toString() + minute +'00\r\nDTEND:' + year + month + day + 'T' + finishHour.toString() + minute + '00\r\nSUMMARY:OFE Appointment\r\nLOCATION:'+this.apptLocation+'\r\nPRIORITY:3\r\nEND:VEVENT\r\nEND:VCALENDAR';
      return ev;
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
