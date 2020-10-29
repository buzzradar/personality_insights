/*jslint node: true, unused: true, esnext: true */


const _ = require("lodash");


//--------------------------------------
// CONSTRUCTOR
//--------------------------------------


let _DisplayGlobals;

function DisplayGlobals () {

  _DisplayGlobals = this;


}
















//--------------------------------------
// version
//--------------------------------------


let _version = "0.0.2";


DisplayGlobals.prototype.getVersion = function() {

  return _version;

};














//----------------------------
// Rollbar
//----------------------------

let _rollbar;

DisplayGlobals.prototype.setRollbar = function(rollbarElem) {

  _rollbar = rollbarElem;

};


DisplayGlobals.prototype.getRollbar = function() {

    return _rollbar;

};












//----------------------------
// ExternalParams
//----------------------------

let _externalParms;

DisplayGlobals.prototype.setArguments = function(paramsObj) {

  _externalParms = paramsObj;

};


DisplayGlobals.prototype.getArguments = function() {

    return _externalParms;

};


DisplayGlobals.prototype.isDev = function() {

  return _externalParms.dev;

};



















//----------------------------
// Sort out DOM References
//----------------------------

let _scriptTag; 	// resolves to <script> tag
let _mainContentDIV;// resolves to <div> id="bz-mainContent"

DisplayGlobals.prototype.setScriptTag = function (scriptTag) {

  _scriptTag = $(scriptTag);
  _mainContentDIV = $('.page-content');
  
};

DisplayGlobals.prototype.getScriptTag = function () {

  return _scriptTag;

};

DisplayGlobals.prototype.getParentTag = function () {

  return _appParentTag;

};






















//----------------------------
// Master Config
//----------------------------

let _masterConfig;   

DisplayGlobals.prototype.setMasterJSON = function (masterConfig) {

  _masterConfig = masterConfig;
  
};


DisplayGlobals.prototype.getMasterJSON = function () {

  return _masterConfig;
  
};










//----------------------------
// Pages Array
//----------------------------

let _pagesArray;   

DisplayGlobals.prototype.setPagesArray = function (pagesArray) {

  _pagesArray = pagesArray;
  
};


DisplayGlobals.prototype.getPagesArray = function () {

  return _pagesArray;
  
};



DisplayGlobals.prototype.getPageFromPagesArray = function(pageId) {

    var tempAarray;

    for (var i = 0; i < _pagesArray.length; i++) {
        if (_pagesArray[i].stepIdName == pageId) {
            tempAarray = _pagesArray[i];
        }
    }

    if (!tempAarray) {
      console.log(pageId+" PAGE ARRAY NOT FOUND in PagesArray!!!!!");
    }

    return tempAarray;
    
};














//----------------------------
// Steps Nav Reference
//----------------------------

let _navCtrl; 	

DisplayGlobals.prototype.setStepsNav = function (navCtrl) {

	_navCtrl = navCtrl;
  
};


DisplayGlobals.prototype.getStepsNav = function () {

	return _navCtrl;
  
};









//----------------------------
// Pages Controller Reference
//----------------------------

let _pagesCtrl;   

DisplayGlobals.prototype.setPageController = function (pagesCtrl) {

  _pagesCtrl = pagesCtrl
  
};


DisplayGlobals.prototype.getPageController = function () {

  return _pagesCtrl;
  
};

















//----------------------------
// Submit LADDA element (to display a spinner in Submit button)
//----------------------------

let _ladda;

DisplayGlobals.prototype.setLaddaSpinner = function(obj) {

  _ladda = obj;

};

DisplayGlobals.prototype.getLaddaSpinner = function() {

  return _ladda;

};








//----------------------------
// Personality Data
//----------------------------

let _personalityData;   

DisplayGlobals.prototype.setPersonalityData = function (personalityData) {

  _personalityData = personalityData;
  
};


DisplayGlobals.prototype.getPersonalityData = function () {

  return _personalityData;
  
};







//----------------------------
// Display error messages
//----------------------------

// DisplayGlobals.prototype.displayError = function(trg,msg) {

// 	trg.html('<div class="alert alert-error bz-spacelines"><button data-dismiss="alert" class="close" type="button">×</button>'+msg+'</div>');
//   $('html, body').animate({
//       scrollTop: trg.offset().top - 100
//   }, 500);
// };

// DisplayGlobals.prototype.displayWarning = function(trg,msg) {

//   trg.html('<div class="alert alert-error bz-spacelines">'+msg+'</div>');
//   $('html, body').animate({
//       scrollTop: trg.offset().top - 100
//   }, 500);

// };

// DisplayGlobals.prototype.closeError = function(trg) {

// 	trg.html('');

// };


// DisplayGlobals.prototype.moveTop = function() {

//   $('html, body').animate({
//       scrollTop: $("body").offset().top
//   }, 500);

// };















//----------------------------
// Display Currency
//----------------------------

DisplayGlobals.prototype.displayPriceCurrency = function(price, currency) {

    let display = ''
    currency = currency.toUpperCase();

    switch(currency) {
        case 'USD':
            display = '$'+price;
        break;
        case 'GBP':
            display = '£'+price;
        break;
        case 'EUR':
            display = price+'€';
        break;
    }

    return display;

};











//----------------------------
// Data Filters (countries and languages drop down)
//----------------------------

let _dataFilters;
DisplayGlobals.prototype.setDataFilters = function(filters) {

  _dataFilters = filters;

};

DisplayGlobals.prototype.getDataFilters = function() {

  return _dataFilters;

};
















//----------------------------
// mentions
//----------------------------

let _numMentions;
DisplayGlobals.prototype.setNumMentions = function(numMentions) {

  _numMentions = numMentions;

};

DisplayGlobals.prototype.getNumMentions = function() {

  return _numMentions;

};

DisplayGlobals.prototype.getMentionsColor = function() {

  let minMentions = _masterConfig.min_mentions;
  let maxMentions = _masterConfig.max_mentions;
  let html = '';

  if (_numMentions >= minMentions && _numMentions <= maxMentions) {
    html = '<strong class="font-green-jungle">'+_numMentions+'</strong>';
  }else{
    html = '<strong class="font-red">'+_numMentions+'</strong>';
  }
  return html;

};















//----------------------------
// Package Info
//----------------------------

let _packageInfo;   

DisplayGlobals.prototype.setPackageInfo = function (packageInfo) {

  _packageInfo = packageInfo;
  
};


DisplayGlobals.prototype.getPackageInfo = function () {

  return _packageInfo;
  
};





















//----------------------------
// Final Object to send back to Marius from S1
//----------------------------

let _finalObj = {

    user_details : {
        first_name : "Peter",
        last_name : "Jones",
        your_company : "The Big Company",
        your_email : "peter@buzzradar.com",
        accept_terms : false,
        keep_informed : false,
    },

    social_accounts : {
        facebook  : "nikefacebook",
        instagram : "nikeinstagram",
    },

    twitter_handle : {
        your_twitter_handle : "pat_charlton"
    }

};



DisplayGlobals.prototype.setFinalObj = function(step, prop, value) {

  _finalObj[step][prop] = value;

};

DisplayGlobals.prototype.getFinalObj = function() {

  return _finalObj;

};
















































module.exports = new DisplayGlobals ();
