/*jslint node: true, unused: true, esnext: true */



let _nodeUtil = require('util');
const ITEM_extend = require('../items/A00_item_extend-ctrl');


//----------------------------
// REQUIRE 
//----------------------------

const DisplayGlobals_SRV = require('../../services/A01_DisplayGlobals-srv'); 
const HBTemplates = require('../../services/HBTemplates-srv');







// ------------------------------------
// Constructor
// ------------------------------------

function Item_2Choices_Ctrl () {

	this.PAGE_CONENT_DOM = $('.bz-page-content');
	this.ITEM_DOM = HBTemplates.getTemplate('item_2choices',{root:DisplayGlobals_SRV.getArguments().root ,platform: DisplayGlobals_SRV.getArguments().platform });

}
_nodeUtil.inherits(Item_2Choices_Ctrl,ITEM_extend); // extend A00_item_extend-ctrl.js



Item_2Choices_Ctrl.prototype.init = function (page_MO) {

    this.PAGE_MO = page_MO;
	this.PAGE_CONENT_DOM.empty();
	_loadItemPage.call(this);
	
};













function _loadItemPage() {

	this.PAGE_CONENT_DOM.append(this.ITEM_DOM);
	_addButtonsBehaviour.call(this);

}



function _addButtonsBehaviour() {

	console.log(this.ITEM_DOM);

	var _this = this;
    this.PAGE_CONENT_DOM.find('a').click(function () {
    	_this.PAGE_MO.pageDataMariusObj["source"] = $(this).data('type');

    	console.log(_this.PAGE_MO.pageDataMariusObj["source"]);
    	_changeUserJourney(_this.PAGE_MO.pageDataMariusObj["source"]);
		_this.submit();
    });

}




function _changeUserJourney(type) {

	_changeCopy.call(this,type);
	_updateStep3.call(this,type);

};


function _changeCopy(type){

    var content;
    if (type == "influencer") {
        content = '<p>You have chosen <strong>Influencer/Individual</strong> Analysis</p><p class="mb-3 mt-3"><img class="img-fluid rounded" src="'+DisplayGlobals_SRV.getArguments().root+'images/{{platform}}_influencer_diagram.png" alt="Answer two key questions every marketer has today"></p><p>For this demo we are going to profile an individual of your choice from Twitter using our Audience AI technology.</p>';
        content = content.replace('{{platform}}', DisplayGlobals_SRV.getArguments().platform);
    	DisplayGlobals_SRV.getPagesArray()[0].pagesArray[1].pageConfigObj.introtext = content;
	}else{
        content = '<p>You have chosen <strong>Brand</strong> Analysis</p><p class="mb-3 mt-3"><img class="img-fluid rounded" src="'+DisplayGlobals_SRV.getArguments().root+'images/{{platform}}_brand_diagram.png" alt="Answer two key questions every marketer has today"></p><p>For this demo we are going to show how our Audience AI technology analyses thousands of individuals who mention or follow a brand.</p>';
        content = content.replace('{{platform}}', DisplayGlobals_SRV.getArguments().platform);
        DisplayGlobals_SRV.getPagesArray()[0].pagesArray[1].pageConfigObj.introtext = content;
	}

};


function _updateStep3(type) {

	var pagesArray = DisplayGlobals_SRV.getPagesArray();

	if (type == "influencer") {
		_updateInfluencerPageSetup.call(this);
	}else{
    	_updateBrandPageSetup.call(this);
	}

};


function _updateInfluencerPageSetup() {

	var pagesArray = DisplayGlobals_SRV.getPagesArray();

	var influencerConfigObj = {
        "title" : "Enter your Twitter Handle",
        "introtext"  : "<p>Audience AI loves the kind of unstructured data that you've written from Tweets or Instagram posts so it can analyse your personality. Please enter your Twitter Handle so we can have a look. It doesn't matter how long ago you last posted, as long as there is enough data for us to analyse. If you haven’t got a Twitter Handle, try analysing a Twitter account of someone you know.</p>",
        "item" : {
            type            : "singleinput",
            input_label     : "Twitter Handle",
            input_name      : "your_twitter_handle",
        },
        "cta"   : {
            "back" : '<i class="fa fa-arrow-left"></i> Back',
            "submit" : "Start Analysis",
        }
    };

    pagesArray[1].pagesArray[0].pageConfigObj = influencerConfigObj;
    pagesArray[1].pagesArray[0].stepConfigObj.page1 = influencerConfigObj;

};



function _updateBrandPageSetup() {

	var pagesArray = DisplayGlobals_SRV.getPagesArray();

	var brandsConfigObj = {
        "title" : "Choose one brand to analyse",
        "introtext"  : "<p>Pick a brand whose audience you would like to learn more about:</p>",
        "item" : {
            type            : "brandslist",
        },
        "cta"   : {
            "back" : '<i class="fa fa-arrow-left"></i> Back',
        }
    };

    pagesArray[1].pagesArray[0].pageConfigObj = brandsConfigObj;
    pagesArray[1].pagesArray[0].stepConfigObj.page1 = brandsConfigObj;

};




// ------------------------------------
// Public methods
// ------------------------------------




Item_2Choices_Ctrl.prototype.submit = function () {

	this.nextPage();
	    
};
















module.exports = Item_2Choices_Ctrl;