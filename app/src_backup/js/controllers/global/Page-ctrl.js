/*jslint node: true, unused: true, esnext: true */



//----------------------------
// REQUIRE 
//----------------------------
const DisplayGlobals_SRV = require('../../services/A01_DisplayGlobals-srv'); 
const Helper_SRV = require('../../services/Helper-srv');
const HBTemplates = require('../../services/HBTemplates-srv');

const ITEM_textandpar = require('../items/item_textandpar-ctrl');
const ITEM_email = require('../items/item_email-ctrl');
const ITEM_singleinput = require('../items/item_singleInput-ctrl');
const ITEM_socialconnection = require('../items/item_socialconnection-ctrl');
const ITEM_preloader = require('../items/item_preloader-ctrl');





// ------------------------------------
// Constructor
// ------------------------------------

function Page_Ctrl (page_MO) {

    this.CTA_DOM = $('.bz-page-ctas');
    this.page_MO = page_MO;
    this.PAGE_INTRO = $('.bz-page-intro-text');
    this.PAGE_CONTENT = $('.bz-page-content');
    this.PAGE_CTA = $('.bz-page-ctas');
    this.ITEM = null;
    this.NAV =  DisplayGlobals_SRV.getStepsNav();


    Helper_SRV.consoleLog("LOADING PAGE "+this.NAV.getCurrentPosition()[0] + " " + this.NAV.getCurrentPosition()[1]+" : ", this.page_MO,'info','f400fd');


    _loadIntroText.call(this);
    _loadItem.call(this);
    _loadCTAButtons.call(this);    
    _addKeyListener.call(this);

}







function _addKeyListener() {

    let pageType = this.page_MO.pageConfigObj.item.type;
    $('body').off('keydown').on('keydown', onKeyDown.bind(this));

    var self = this;
    function onKeyDown(e) {
        if (e.which == 13) {
            if (pageType != "keywords" && pageType != "datasummary" && pageType != "confirmation") {
                self.ITEM.submit();
            }
        }
    }

}







function _loadItem() {

    Helper_SRV.consoleLog("new Item => new ITEM_"+this.page_MO.pageConfigObj.item.type+'()', this.page_MO);


    this.ITEM = eval('new ITEM_'+this.page_MO.pageConfigObj.item.type+'()');
    this.ITEM.init(this.page_MO);  

}


function _loadIntroText() {

    this.PAGE_INTRO.html(this.page_MO.pageConfigObj.introtext);

}


function _loadCTAButtons() {

    this.PAGE_CTA.empty();

    let buttonLabel;

    // _addCTAMessage.call(this);

    for (let buttonType in this.page_MO.pageConfigObj.cta) {

        buttonLabel = this.page_MO.pageConfigObj.cta[buttonType];

        switch(buttonType) {
            case "submit":
                _setSubmitButton.call(this, buttonLabel);
            break;
            case "back":
                _setBackButton.call(this, buttonLabel);
            break;
            case "cancel":
                _setCancelButton.call(this, buttonLabel);
            break;
            case "skip":
                _setSkipButton.call(this, buttonLabel);
            break;
            case "confirmation":
                _setConfirmationFooter.call(this, buttonLabel);
            break;
        }

    }


}


function _getButtonClass() {

    var platform = DisplayGlobals_SRV.getArguments().platform;
    var myClass;
    if (platform == 'buzzradar') {
        myClass = 'btn-primary br ';
    }else{
        myClass = 'btn-secondary';
    }

    return myClass;

}
    


function _setSubmitButton(label) {

    let btn = $('<button type="button" class="btn btn-sm float-right '+_getButtonClass()+'">'+label+'</a>');

    this.PAGE_CTA.append(btn);
    let self = this;
    btn.click(function() {

        if (!$(this).attr('disabled')) {
            // var lada_spinner = Ladda.create(this);
            // DisplayGlobals_SRV.setLaddaSpinner(lada_spinner);
            self.ITEM.submit();
        }else{
            Helper_SRV.consoleLog("SUBMIT Button ", "is Disabled!","warning");
        }
        
    });

}



function _setBackButton(label) {

    // let btn = $('<a href="javascript:;" class="btn btn-lg default ladda-button bz-back" data-style="slide-right" data-size="s">'+label+'</a>');
    let btn = $('<button type="button" class="btn btn-sm '+_getButtonClass()+'">'+label+'</a>');

    this.PAGE_CTA.append(btn);

    let self = this;
    btn.click(function() {
        self.ITEM.previousPage();
    }.bind(this));

}





function _setCancelButton(label) {

    // let btn = $('<a href="javascript:;" class="btn btn-lg grey-cascade bz-skip">'+label+'</a>');
    let btn = $('<button type="button" class="btn btn-sm btn-secondary">'+label+'</a>');

    this.PAGE_CTA.append(btn);

    let self = this;
    btn.click(function() {
        self.ITEM.skip();
    }.bind(this));


}


function _setSkipButton(label) {

    // let btn = '<a href="javascript:;" class="bz-skip btn btn-xs">'+label+'</a>';
    let btn = '<span class="bz-skip">'+label+'</span>';
    this.page_MO.pageConfigObj.introtext = this.page_MO.pageConfigObj.introtext.replace("{{skipbutton}}", btn);
    this.PAGE_INTRO.html(this.page_MO.pageConfigObj.introtext);

    let self = this;
    $('.bz-skip').click(function() {
        self.ITEM.skip();
    }.bind(this));


}



function _setConfirmationFooter(label) {

    this.PAGE_CTA.html(label);

}



function _addCTAMessage() {

    this.PAGE_CTA.html('');
    this.PAGE_CTA.html('<span class="bz-cta-message"></span>');

}























Page_Ctrl.prototype.reload = function () {

    _loadIntroText.call(this);
    _loadItem.call(this);
    _loadCTAButtons.call(this);  
    _addKeyListener.call(this);

};




























module.exports = Page_Ctrl;