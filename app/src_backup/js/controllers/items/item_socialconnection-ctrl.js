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

function Item_Accounts_Ctrl () {

    this.PAGE_CONTENT_DOM = $('.bz-page-content');

}
_nodeUtil.inherits(Item_Accounts_Ctrl,ITEM_extend); // extend A00_item_extend-ctrl.js


Item_Accounts_Ctrl.prototype.init = function (page_MO) {

    this.PAGE_MO = page_MO;

    this.PAGE_MO.pageConfigObj.item['assetsURL'] = DisplayGlobals_SRV.getArguments().assetsurl;
    this.ITEM_DOM = HBTemplates.getTemplate('item_account', this.PAGE_MO.pageConfigObj.item);

    _loadItemPage.call(this);
  
};


function _loadItemPage() {

    this.PAGE_CONTENT_DOM.empty();
    this.PAGE_CONTENT_DOM.html(this.ITEM_DOM);

    this.ITEM_DOM.find('button').click(function(){

        switch(this.PAGE_MO.pageConfigObj.item.social){
            case "facebook":
                console.log('facebook');
                getAccessTokenFacebook.call(this);
            break;
            case "instagram":
                console.log('instagram');
                getAccessTokenInstagram.call(this);
            break;
        }

    }.bind(this));

}




var getAccessTokenFacebook = function() {

    FB.init({
      appId            : '1172002492871743',
      autoLogAppEvents : true,
      xfbml            : true,
      version          : 'v2.10'
    });

    FB.login(function(response) {
        console.log("Facebook API response", response);
        if (typeof response.status === "undefined"){
            console.log("In order to carry on you must connect to one of the following. Please try again!");
        }else{
            console.log(response.authResponse.accessToken);
            this.nextPage();
        }

    }, {scope: 'email,read_insights'});

};




var getAccessTokenInstagram = function() {

    var instaPopup = openPopup("http://insights.buzzradar.com/connect-instagram-to-brandz");
    window.onmessage = function (e) {
        console.log("Instagram API response",e.data);
        console.log("token",e.data.accessToken);
        instaPopup.close();
        window.onmessage = false;
        this.nextPage();
    }.bind(this);

};




var openPopup = function(url) {

    var x = screen.width/2 - 700/2;
    var y = screen.height/2 - 450/2;
    var popup = window.open(url, 'sharegplus','height=485,width=700,left='+x+',top='+y);
    return popup;

};




// ------------------------------------
// Public methods
// ------------------------------------


Item_Accounts_Ctrl.prototype.submit = function () {

    let username = this.ITEM_DOM.find('input[name=account]').val();

    // if (username === '') {
    //     //_showIcon.call(this,'cross');
    //     this.nextPage();
    // }else{
    //     _validateUsername.call(this);
    // }

    this.nextPage();

};












module.exports = Item_Accounts_Ctrl;