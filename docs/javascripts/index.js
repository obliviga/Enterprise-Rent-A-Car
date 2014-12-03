// ## Defining Templates and Views

// ### HomeTemplate
//  This is just an array of strings.  However, you can use whatever
//  templating library that you want here.

var HomeTemplate = [
// Put in a div with class content.  Ratchet will style this appropriately.
'<div class="content">',
' <header class="junior-intro">',
'   <h1 class="junior-name"><img src="img/logo.jpg" alt="Enterprise Rent-A-Car"></h1>',
'   <p>Rental Cars at Low, Affordable Rates</p>',
' </header>',
// // In the view, we will use the flickable zepto plugin here, to animate this carousel.
// ' <div class="carousel-container">',
// '   <ul class="carousel-list">',
// '     <li class="carousel-item native-look-and-feel">',
// '     </li>',
// '     <li class="carousel-item carousel-content">',
// '       <summary>Carousels using flickable.js</summary>',
// '       <i class="icon-picture"></i>',
// '     </li>',
// '     <li class="carousel-item backbone-content">',
// '       <summary>Integrated with Backbone.js</summary>',
// '       <div class="feature-icon"></div>',
// '     </li>',
// '   </ul>',
// // Add in these dots as a quick navigation for the carousel
// ' <div class="carousel-navigation-container">',
// '   <ul class="carousel-navigation"><li class="active" data-index="0"></li><li data-index="1"></li><li data-index="2"></li></ul>',
// ' </div>',
// ' </div>',
//Input field
'<div class="container-fluid">',
  '<div class="row-fluid ui-widget">',
    ' <label for="city_state">Location:</label><input class="span12" id="city_state" placeholder="ZIP or City, State or Airport">',
  '</div>',
  '<div class="row-fluid">',
    '<div class="span8">',
      ' <label>Pick-up Date:</label><input type="date">',
    '</div>',
    '<div class="span4">',
      ' <label>Pick-up Time:</label><input type="time">',
    '</div>',
  '</div>',
  '<div class="row-fluid">',
    '<div class="span8">',
      ' <label>Return Date:</label><input type="date">',
    '</div>',
    '<div class="span4">',
      ' <label>Return Time:</label><input type="time">',
    '</div>',
  '</div>',
  '<div class="row-fluid">',
  '<label><input type="checkbox">',
      '&nbsp;Returning to a different location</label>',
      
  '</div>',
  // Use a ratchet button here
  ' <div class="button-positive button-block show-more-button">Find a rental car!</div>',
  '<br>',
    '<footer>&copy; 2014 Enterprise Rent-A-Car.</footer>',
  '</div>',

'</div>'
// Join the array with a new-line for a quick and easy html template.
].join('\n');

// ### HomeView
// A Jr.View works just like a Backbone.View, except whenever you attach a click event,
// if will check to see if you are on a touch device and if you are, attach a
// touchend event instead.

var HomeView = Jr.View.extend({
  // Simply render our HomeTemplate in the View's HTML
  render: function(){
    this.$el.html(HomeTemplate);
    this.afterRender();
    // Always return 'this' so Jr.Router can append your view to the body
    return this;
  },

  afterRender: function() {
    this.setUpCarousel();
  },

  setUpCarousel: function() {
    var after = function() {
      // Use the flickable plugin to setup our carousel with 3 segments
      this.$('.carousel-list').flickable({segments:3});
    };
    // We have to put this in a setTimeout so that it sets it up after the view is added to the DOM
    setTimeout(after,1);
  },

  events: {
    'click .show-more-button': 'onClickFindRentalButton',
    'onScroll .carousel-list': 'onScrollCarousel',
    'click .carousel-navigation li': 'onClickCarouselNavigationItem'
  },

  onClickFindRentalButton: function() {
    // Jr.Navigator works like Backbone.history.navigate, but it allows you to add an animation in the mix.
    Jr.Navigator.navigate('results',{
      trigger: true,
      animation: {
        // Do a stacking animation and slide to the left.
        type: Jr.Navigator.animations.SLIDE_STACK,
        direction: Jr.Navigator.directions.LEFT
      }
    });
    return false;
  },

  onScrollCarousel: function() {
    // Set the active dot when the user scrolls the carousel
    var index = this.$('.carousel-list').flickable('segment');
    this.$('.carousel-navigation li').removeClass('active');
    this.$('.carousel-navigation li[data-index="'+index+'"]').addClass('active');
  },

  onClickCarouselNavigationItem: function(e) {
    // Scroll the carousel when the user clicks on a dot.
    var index = $(e.currentTarget).attr('data-index');
    this.$('.carousel-list').flickable('segment',index);
  }

});

// ### ResultsTemplate
var ResultsTemplate = [

'<header class="bar-title">',
' <div class="header-animated">',
// If you want the contents of the header to be animated as well, put those elements inside a div
// with a 'header-animated' class.
'   <div class="button-prev">Back</div>',
'   <h1 class="title">Rentals Near Austin, TX</h1>',
// '   <div class="button-next">Next</div>',
'</header>',
'<div class="content ratchet-content">',
'  <a class="button-filter">Filter</a>', 
// '  <input type="search" placeholder="Search" id="results-input">',
'<br>',
'<br>',

'<div id="result-headings">',
'<p id="location-heading">Locations</p>',
'<p id="availibility-heading">Availibility</p>',
'</div>',
' <div class="ratchet-examples">',
'  <ul class="list inset">',
'   <li class="selected-item">',
'     <a class="result-link">',
'       AUSTIN NORTH',
'<br>',
'       8310 RESEARCH BLVD',
'<br>',
'       AUSTIN, TX 78758',
'<br>',
'       ( 1 mile )',
'       <span class="chevron"></span>',
'       <span class="count">12</span>',
'     </a>',
'   </li>',
'   <li>',
'     <a class="result-link">',
'       AUSTIN DOWNTOWN',
'<br>',
'       1201 WEST 5TH',
'<br>',
'       AUSTIN, TX 78703',
'<br>',
'       ( 2 miles )',
'       <span class="chevron"></span>',
'       <span class="count">30</span>',
'     </a>',
'   </li>',
'   <li>',
'     <a class="result-link">',
'       AUSTIN SOUTH',
'<br>',
'       4352 S INTERSTATE 35',
'<br>',
'       AUSTIN, TX 78745',
'<br>',
'       ( 2 miles )',
'       <span class="chevron"></span>',
'       <span class="count">4</span>',
'     </a>',
'   </li>',
'   <li>',
'     <a href="#">',
'       BARTON SPRINGS',
'<br>',
'       319 S LAMAR',
'<br>',
'       AUSTIN, TX 78704',
'<br>',
'       ( 3 miles )',
'       <span class="count unavailable">0</span>',
'     </a>',
'   </li>',
'   <li>',
'     <a class="result-link">',
'       AUSTIN BRAKER LANE',
'<br>',
'       707 E. BRAKER LN STE 103',
'<br>',
'       AUSTIN, TX 78753',
'<br>',
'       ( 4 miles )',
'       <span class="chevron"></span>',
'       <span class="count">4</span>',
'     </a>',
'   </li>',
'  </ul>',
'  <div class="example-cnts"><span class="count-positive">1</span><span class="count">2</span><span class="count">3</span><span class="count">4</span></div>',
' </div>',
'</div>'

].join('\n');

// ### ResultsView

var ResultsView = Jr.View.extend({
  render: function(){
    this.$el.html(ResultsTemplate);
    return this;
  },

  events: {
    'click .button-prev': 'onClickButtonPrev',
    'click .result-link': 'onClickResult',
    'click .button-filter': 'onClickButtonFilter'
  },

  onClickButtonPrev: function() {
    // Trigger the animation for the back button on the toolbar

    Jr.Navigator.navigate('home',{
      trigger: true,
      animation: {
        // This time slide to the right because we are going back
        type: Jr.Navigator.animations.SLIDE_STACK,
        direction: Jr.Navigator.directions.RIGHT
      }
    });
  },
  onClickButtonFilter: function() {
    Jr.Navigator.navigate('filter',{
      trigger: true,
      animation: {
        type: Jr.Navigator.animations.SLIDE_STACK,
        direction: Jr.Navigator.directions.RIGHT
      }
    });
  },
  onClickResult: function() {
    Jr.Navigator.navigate('vehicle_results',{
      trigger: true,
      animation: {
        type: Jr.Navigator.animations.SLIDE_STACK,
        direction: Jr.Navigator.directions.LEFT
      }
    });
  }
});

// ## FilterTemplate

var FilterTemplate = [
'<header class="bar-title">',
' <div class="header-animated">',
' <div class="button-prev">Back</div>',
' <h1 class="title">Filters</h1>',
'</header>',
'<div class="container-fluid content filter-content">',
' <div class="row-fluid">',
'<ul class="list inset">',
'   <li>',
'     <a href="#">',
'       Show Airport Only',
'  <div class="toggle inactive example-toggle"><div class="toggle-handle"></div></div>',
'     </a>',
'   </li>',
'</ul>',
' </div> ',
' <div class="row-fluid">',
' <p>Vehicle Class:</p>',
  '<select>',
    '<option value="all">All Vehicle Types</option>',
    '<option value="economy">Economy</option>',
    '<option value="compact">Compact</option>',
    '<option value="standard">Standard</option>',
    '<option value="full_size">Full Size</option>',
    '<option value="premium">Premium</option>',
    '<option value="cargo_van">Cargo Van</option>',
  '</select>',
' </div> ',
' <div class="row-fluid">',
' <p>Renter\'s Age:</p>',
  '<select>',
    '<option value="25_plus">25 and Up</option>',
    '<option value="21-24">21-24</option>',
    '<option value="18-29">18-29</option>',
  '</select>',
' </div> ',
'</div> '
].join('\n');

// ## FilterView

var FilterView = Jr.View.extend({
  render: function() {
    this.$el.html(FilterTemplate);
    return this;
  },
// ## Pushstate
  events: {
    'click .button-prev': 'onClickButtonPrev',
    'click .example-toggle': 'onClickExampleToggle'
  },

  onClickButtonPrev: function() {
    Jr.Navigator.navigate('results',{
      trigger: true,
      animation: {
        type: Jr.Navigator.animations.SLIDE_STACK,
        direction: Jr.Navigator.directions.LEFT
      }
    });
  },
  onClickExampleToggle: function() {
    // Simple example of how the on/off toggle switch works.
    this.$('.example-toggle').toggleClass('active');
  }

});

// ### VehicleResultsTemplate
var VehicleResultsTemplate = [

'<header class="bar-title">',
' <div class="header-animated">',
// If you want the contents of the header to be animated as well, put those elements inside a div
// with a 'header-animated' class.
'   <div class="button-prev">Back</div>',
'   <h1 class="title">Vehicle Availibility</h1>',
// '   <div class="button-next">Next</div>',
'</header>',
'<div class="content ratchet-content">',
'  <a class="button-filter">Filter</a>', 
// '  <input type="search" placeholder="Search" id="results-input">',
'<br>',
'<br>',
'<div id="result-headings">',
'<p id="location-heading">Vehicles</p>',
'<p id="availibility-heading">Starting Price</p>',
'</div>',
' <div class="ratchet-examples">',
'  <ul class="list inset">',
'   <li>',
'<div class="row-fluid">',
'     <a href="#">',
'       <img src="./docs/images/smallCar.gif">',
'<div class="both_price_snippets">',
'       <span class="price_snippet right">$120 Total</span>',
'       <span class="price_snippet right">$12 / day</span>',
'</div>',
'     </a>',
'     <p class="vehicle_subtitle"><b>Economy:</b> Chevy Spark or similar</p>',
'</div>',
'<a class="button-positive details">Details</a>',
'   </li>',
'   <li>',
'<div class="row-fluid">',
'     <a href="#">',
'       <img src="./docs/images/fullsizeCar.png">',
'<div class="both_price_snippets">',
'       <span class="price_snippet right">$320 Total</span>',
'       <span class="price_snippet right">$32 / day</span>',
'</div>',
'     </a>',
'     <p class="vehicle_subtitle"><b>Full Size:</b> Ford Fusion or similar</p>',
'</div>',
'<a class="button-positive details">Details</a>',
'   </li>',
'   <li>',
'<div class="row-fluid">',
'     <a href="#">',
'       <img src="./docs/images/minivan.gif">',
'<div class="both_price_snippets">',
'       <span class="price_snippet right">$604 Total</span>',
'       <span class="price_snippet right">$64 / day</span>',
'</div>',
'     </a>',
'     <p class="vehicle_subtitle"><b>Minivan:</b> Nissan Quest or similar</p>',
'</div>',
'<a class="button-positive details">Details</a>',
'   </li>',
'   <li>',
'<div class="row-fluid">',
'     <a href="#">',
'       <img src="./docs/images/convertible.png">',
'<div class="both_price_snippets">',
'       <span class="price_snippet right">$604 Total</span>',
'       <span class="price_snippet right">$64 / day</span>',
'</div>',
'     </a>',
'     <p class="vehicle_subtitle"><b>Convertible:</b> Ford Mustang or similar</p>',
'</div>',
'<a class="button-positive details button-next">Details</a>',
'   </li>',
'  </ul>',
' </div>',
'</div>'

].join('\n');

// ### VehicleResultsView

var VehicleResultsView = Jr.View.extend({
  render: function(){
    this.$el.html(VehicleResultsTemplate);
    return this;
  },

  events: {
    'click .button-prev': 'onClickButtonPrev',
    'click .button-next': 'onClickButtonNext',
    'click .button-filter': 'onClickButtonFilter'
  },

  onClickButtonPrev: function() {
    // Trigger the animation for the back button on the toolbar

    Jr.Navigator.navigate('results',{
      trigger: true,
      animation: {
        // This time slide to the right because we are going back
        type: Jr.Navigator.animations.SLIDE_STACK,
        direction: Jr.Navigator.directions.RIGHT
      }
    });
  },

  onClickButtonNext: function() {
    // Trigger the animation for the back button on the toolbar

    Jr.Navigator.navigate('rental_form',{
      trigger: true,
      animation: {
        // This time slide to the right because we are going back
        type: Jr.Navigator.animations.SLIDE_STACK,
        direction: Jr.Navigator.directions.LEFT
      }
    });
  },

  onClickButtonFilter: function() {
    Jr.Navigator.navigate('vehicle_filter',{
      trigger: true,
      animation: {
        type: Jr.Navigator.animations.SLIDE_STACK,
        direction: Jr.Navigator.directions.RIGHT
      }
    });
  }
});

// ## VehicleFilterTemplate

var VehicleFilterTemplate = [
'<header class="bar-title">',
' <div class="header-animated">',
' <div class="button-prev">Back</div>',
' <h1 class="title">Filters</h1>',
'</header>',
'<div class="container-fluid content filter-content">',
' <div class="row-fluid">',
' <p>Vehicle Class:</p>',
  '<select>',
    '<option value="all">All Vehicle Types</option>',
    '<option value="economy">Economy</option>',
    '<option value="compact">Compact</option>',
    '<option value="standard">Standard</option>',
    '<option value="full_size">Full Size</option>',
    '<option value="premium">Premium</option>',
    '<option value="cargo_van">Cargo Van</option>',
  '</select>',
' </div> ',
' <div class="row-fluid">',
' <p>Renter\'s Age:</p>',
  '<select>',
    '<option value="25_plus">25 and Up</option>',
    '<option value="21-24">21-24</option>',
    '<option value="18-29">18-29</option>',
  '</select>',
' </div> ',
'</div> '
].join('\n');

// ## VehicleFilterView

var VehicleFilterView = Jr.View.extend({
  render: function() {
    this.$el.html(VehicleFilterTemplate);
    return this;
  },
// ## Pushstate
  events: {
    'click .button-prev': 'onClickButtonPrev',
    'click .example-toggle': 'onClickExampleToggle'
  },

  onClickButtonPrev: function() {
    Jr.Navigator.navigate('vehicle_results',{
      trigger: true,
      animation: {
        type: Jr.Navigator.animations.SLIDE_STACK,
        direction: Jr.Navigator.directions.LEFT
      }
    });
  },
  onClickExampleToggle: function() {
    this.$('.example-toggle').toggleClass('active');
  }

});

// ## RentalFormTemplate

var RentalFormTemplate = [

'<header class="bar-title">',
' <div class="header-animated">',
' <div class="button-prev">Back</div>',
' <h1 class="title">Your Order</h1>',
'</header>',
'<div class="container-fluid content filter-content">',

' <p>Renter\'s Details:</p>',
' <div class="row-fluid">',
'   <div class="span6">',
'     <label>First Name: </label><input type="text">  ',
'   </div> ',
'   <div class="span6">',
'     <label>Last Name: </label><input type="text">  ',
'   </div> ',
' </div> ',
' <div class="row-fluid">',
'   <div class="span6">',
'     <label>Phone: </label><input type="tel" name="usrtel">  ',
'   </div> ',
'   <div class="span6">',
'     <label>E-mail: </label><input type="email">  ',
'   </div> ',
' </div> ',
' <div class="row-fluid">',
' <label>Credit Card Type:</label>',
  '<select>',
    '<option value="visa">Visa</option>',
    '<option value="mastercard">Mastercard</option>',
    '<option value="discover">Discover</option>',
    '<option value="jcb">JCB</option>',
    '<option value="american_express">American Express</option>',
  '</select>',
'<br>',
' <p>Renter\'s Address:</p>',
' </div> ',
' <div class="row-fluid">',
'   <div class="span12">',
'     <label>Street Address Line 1: </label><input type="text">  ',
'   </div> ',
' </div> ',
' <div class="row-fluid">',
'   <div class="span12">',
'     <label>Street Address Line 2: </label><input type="text">  ',
'   </div> ',
' </div> ',
' <div class="row-fluid">',
'   <div class="span6">',
'     <label>City: </label><input type="text">  ',
'   </div> ',
'   <div class="span2">',
'     <label>State: </label><input type="text">  ',
'   </div> ',
'   <div class="span4">',
'     <label>ZIP: </label><input type="text">  ',
'   </div> ',
' </div> ',
  '<a class="button-positive">Next</a>',
'</div> '

].join('\n');

// ' <p>Renter\'s Driver\'s License:</p>',
// ' </div> ',
// ' <div class="row-fluid">',
// '   <div class="span10">',
// '     <label>License Number: </label><input type="text">  ',
// '   </div> ',
// '   <div class="span2">',
// '     <label>Issued by: </label><input type="text" placeholder="State">  ',
// '   </div> ',
// ' </div> ',
// ' <div class="row-fluid">',
// '   <div class="span12">',
// '     <label>Expiration Date: </label><input type="date">  ',
// '   </div> ',
// ' </div> ',
// ' <div class="row-fluid">',
// '   <div class="span12">',
// '     <label>Date of Birth: </label><input type="date">  ',
// '   </div> ',
// ' </div> ',
// ' <div class="row-fluid">',
// '   <img src="./docs/images/mustang.png">',
// ' </div> ',
// ## RentalFormView

var RentalFormView = Jr.View.extend({
  render: function(){
    this.$el.html(RentalFormTemplate);
    return this;
  },

  events: {
    'click .button-prev': 'onClickButtonPrev',
    'click .button-next': 'onClickButtonNext',
    'click .example-toggle': 'onClickExampleToggle'
  },

  onClickButtonPrev: function() {
    // Trigger the animation for the back button on the toolbar

    Jr.Navigator.navigate('vehicle_results',{
      trigger: true,
      animation: {
        // This time slide to the right because we are going back
        type: Jr.Navigator.animations.SLIDE_STACK,
        direction: Jr.Navigator.directions.RIGHT
      }
    });
  },

  onClickButtonNext: function() {
    Jr.Navigator.navigate('results',{
      trigger: true,
      animation: {
        type: Jr.Navigator.animations.SLIDE_STACK,
        direction: Jr.Navigator.directions.LEFT
      }
    });
  },

  onClickExampleToggle: function() {
    // Simple example of how the on/off toggle switch works.
    this.$('.example-toggle').toggleClass('active');
  }
});

// ### RatchetTemplate
// This is just a template that shows different UI elements that you can use from the Ratchet project

var RatchetTemplate = [
'<header class="bar-title">',
' <div class="header-animated">',
// If you want the contents of the header to be animated as well, put those elements inside a div
// with a 'header-animated' class.
'   <div class="button-prev">Back</div>',
'   <h1 class="title">Rentals near Austin, TX</h1>',
'   <div class="button-next">Next</div>',
'</header>',
'<div class="content ratchet-content">',
' <p>Jr. was inspired by Ratchet and pulls in their gorgeous styles.</p>',
' <p>Here are some examples:</p>',
' <div class="ratchet-examples">',
'  <ul class="list inset">',
'   <li>',
'     <a href="#">',
'       List item 1',
'       <span class="chevron"></span>',
'       <span class="count">4</span>',
'     </a>',
'   </li>',
'  </ul>',
'  <div class="button-block button-main">Block button</div>',
'  <a class="button">Mini</a> <a class="button-main">buttons</a> <a class="button-positive">are</a> <a class="button-negative">awesome!</a>',
'  <div class="toggle active example-toggle"><div class="toggle-handle"></div></div>',
'  <div class="example-cnts"><span class="count">1</span><span class="count-main">2</span><span class="count-positive">3</span><span class="count-negative">4</span></div>',
'  <input type="search" placeholder="Search">',
' </div>',
' <p>For more examples checkout the <a href="http://maker.github.com/ratchet/">ratchet project.</a></p>',
'</div>'
].join('\n');

// ### RatchetView

var RatchetView = Jr.View.extend({
  render: function(){
    this.$el.html(RatchetTemplate);
    return this;
  },

  events: {
    'click .button-prev': 'onClickButtonPrev',
    'click .button-next': 'onClickButtonNext',
    'click .example-toggle': 'onClickExampleToggle'
  },

  onClickButtonPrev: function() {
    // Trigger the animation for the back button on the toolbar

    Jr.Navigator.navigate('home',{
      trigger: true,
      animation: {
        // This time slide to the right because we are going back
        type: Jr.Navigator.animations.SLIDE_STACK,
        direction: Jr.Navigator.directions.RIGHT
      }
    });
  },

  onClickButtonNext: function() {
    Jr.Navigator.navigate('results',{
      trigger: true,
      animation: {
        type: Jr.Navigator.animations.SLIDE_STACK,
        direction: Jr.Navigator.directions.LEFT
      }
    });
  },

  onClickExampleToggle: function() {
    // Simple example of how the on/off toggle switch works.
    this.$('.example-toggle').toggleClass('active');
  }
});

//## Routing to your Views
// Jr.Router is just like a Backbone.Router except we provide a renderView
// that will automatically add the view to the dom and do the animation if
// one is specified.  It will also automatically handle doing an opposite animation
// if the back button is pressed.

var AppRouter = Jr.Router.extend({
  routes: {
    'home': 'home',
    'results': 'results',
    'filter': 'filter',
    'vehicle_results': 'vehicle_results',
    'vehicle_filter': 'vehicle_filter',
    'rental_form': 'rental_form',
    'ratchet': 'ratchet'
  },

  home: function(){
    var homeView = new HomeView();
    this.renderView(homeView);
  },
  results: function(){
    var resultsView = new ResultsView();
    this.renderView(resultsView);
  },
  filter: function() {
    var filterView = new FilterView();
    this.renderView(filterView);
  },
  vehicle_results: function() {
    var vehicleResultsView = new VehicleResultsView();
    this.renderView(vehicleResultsView);
  },
  vehicle_filter: function() {
    var vehicleFilterView = new VehicleFilterView();
    this.renderView(vehicleFilterView);
  },
  rental_form: function() {
    var rentalFormView = new RentalFormView();
    this.renderView(rentalFormView);
  },
  ratchet: function() {
    var ratchetView = new RatchetView();
    this.renderView(ratchetView);
  }

});

var appRouter = new AppRouter();
Backbone.history.start();
Jr.Navigator.navigate('home',{
  trigger: true
});
