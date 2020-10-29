/*jslint node: true, unused: true, esnext: true */



let _nodeUtil = require('util');
const ITEM_extend = require('../items/A00_item_extend-ctrl');


//----------------------------
// REQUIRE 
//----------------------------

const DisplayGlobals_SRV = require('../../services/A01_DisplayGlobals-srv'); 
const HBTemplates = require('../../services/HBTemplates-srv');
const Helper_SRV = require('../../services/Helper-srv');







// ------------------------------------
// Constructor
// ------------------------------------

function Item_Preloader_Ctrl () {

	this.PAGE_CONENT_DOM = $('.bz-page-content');
	this.ITEM_DOM = HBTemplates.getTemplate('item_preloader');




    this.ITEM_DOM = HBTemplates.getTemplate('item_preloader',{
        'platform' : DisplayGlobals_SRV.getArguments().platform,
    });

}
_nodeUtil.inherits(Item_Preloader_Ctrl,ITEM_extend); // extend A00_item_extend-ctrl.js



Item_Preloader_Ctrl.prototype.init = function (page_MO) {

    this.PAGE_MO = page_MO;
	this.PAGE_CONENT_DOM.empty();
	_loadItemPage.call(this);
	
};













function _loadItemPage() {

	this.PAGE_CONENT_DOM.append(this.ITEM_DOM);
    FLASK.init();
    
    $('.form-actions').addClass('no-border');

	setTimeout(function(){
        _makeAPICall.call(this);
    }.bind(this),4000);

}





function _makeAPICall() {

    var _this = this;
    var objToSend = {
        twitter_username : DisplayGlobals_SRV.getPagesArray()[1].pagesArray[0].pageDataMariusObj.your_twitter_handle,
    };

    console.log("This is the object you have to send--->", objToSend);

    $.ajax({
        type: 'POST',
        url: 'http://134.213.133.31:3000/watson-pi-demo',
        async: true, 
        contentType: "application/x-www-form-urlencoded",
        data : objToSend,
        success: function(json) {

          console.log(json);

          //There is an error
          if (json.error) {
            Helper_SRV.consoleLog("Error from API Call -->", json.error, 'error');
            _this.previousPage();
            $('.bz-page-messages').html('The account you are analysing is either set to private or does not contain enough posts for us to create an accurate set of results. Please try another account.');
          }else{
            //All good carry on
            DisplayGlobals_SRV.setPersonalityData(json);
            _updateMailingList.call(this);
            _showCongratulations.call(this);

            $('.try-now-btn').html('Book a Meeting');
            $('.try-now-btn').unbind('click').click(function(){
                Calendly.showPopupWidget('https://calendly.com/buzzradar/meeting-with-patrick-1');
                return false;
            });

            _this.nextPage();
          }
          
        },
        error: function(XMLHttpRequest, textStatus, errorThrown) {
          console.log ("%c -> ", "background:#ff0000;", "GET APICalls.ajaxCall() ---> Error", XMLHttpRequest.responseJSON);
        }
    });


};




function _updateMailingList() {

    var keepInformed = DisplayGlobals_SRV.getPagesArray()[0].pagesArray[4].pageDataMariusObj.keep_informed

    if (keepInformed) {

        var mailChimpObj = {
            "mc_signupsource" : 'hosted',
            "EMAIL" : DisplayGlobals_SRV.getPagesArray()[0].pagesArray[4].pageDataMariusObj.your_email,
            "FNAME" : DisplayGlobals_SRV.getPagesArray()[0].pagesArray[1].pageDataMariusObj.first_name,
            "LNAME" : DisplayGlobals_SRV.getPagesArray()[0].pagesArray[2].pageDataMariusObj.last_name,
        };

        Helper_SRV.updateMailingList(mailChimpObj,_mailingListSuccess);

    }

}


function _mailingListSuccess() {

    Helper_SRV.consoleLog("Success updating the mailing List -->", "entry saved in MailChimp. Check the List!" , 'info', '00a027');

}



function _showCongratulations() {

    $('.modal-title').html('Congratulations');
    $('.bz-page-intro-text').html('<p>Good News!</p><p>We found enough data from what you’ve posted to create an analysis of your personality. You should shortly see the results below!</p>');
    $('.bz-page-content').empty();

}





// ------------------------------------
// Public methods
// ------------------------------------




Item_Preloader_Ctrl.prototype.submit = function () {

	//this.nextPage();
	    
};
















module.exports = Item_Preloader_Ctrl;