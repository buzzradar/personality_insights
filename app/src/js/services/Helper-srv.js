/*jslint node: true, unused: true, esnext: true */



const DisplayGlobals_SRV = require('./A01_DisplayGlobals-srv'); 



//--------------------------------------
// CONSTRUCTOR
//--------------------------------------

let _Helper;

function Helper () {

  _Helper = this;
  this.errorColor = 'ff0000';
  this.warningColor = 'efd660';
  this.infoColor = '50d8ec';

}


//-----------------------------------------------
//-Developer NOte--------------------------------
//-----------------------------------------------
// This is an example of how to sue the Helper. consoleLog
//
// Helper_SRV.consoleLog("Label", "This is an ERROR", 'error');
// Helper_SRV.consoleLog("Label", "This is a WARNING", 'warning');
// Helper_SRV.consoleLog("Label", {obj:"myInfo"}, 'info');
// Helper_SRV.consoleLog("Label", {obj:"test"});
//



Helper.prototype.consoleLog = function (label, message, type, colour) {

	let isDev = DisplayGlobals_SRV.getArguments().dev;
	// let route = DisplayGlobals_SRV.getArguments().route;
    // let rollBar = DisplayGlobals_SRV.getRollbar();
    let color = (colour) ? colour : _getColor.call(this,type);

	if (isDev) {
		console.log("%c" + label + " --> ", "background:#"+color+";", message);
	}else{
		if(type == "error") {
			console.log("%c ERROR!!! " + label + " --> ", "background:#"+color+";", message);
			// rollBar.error("[ Route "+route+" ] -> " + message);
		}else if(type ==  "warning") {
			console.log("%c WARNING!!! " + label + " --> ", "background:#"+color+";", message);
			// rollBar.warning("[ Route "+route+" ] -> " + message);
		}else{
			console.log("%c " + label + " --> ", "background:#"+color+";", message);
		}
	}

};




function _getColor(type) {

	let color;

	switch(type) {
		case 'error':
			color = this.errorColor;
		break;
		case 'warning':
			color = this.warningColor;
		break;
		case 'info':
			color = this.infoColor;
		break;
		default:
			color = "ffffff";
		break;
	}

	return color;

}





Helper.prototype.isDev = function () {

	let url = window.location.href;
	let isDev = false;

	if ( url.includes('localhost') || url.includes('127.0.0.1') || url.includes('192.168.1.9') ){
		isDev = true;
	}

	return isDev;

};





Helper.prototype.disableSubmitWithReturnKey = function () {

    $(document).keypress(
        function(event){
         if (event.which == '13') {
            event.preventDefault();
          }
    });

}



Helper.prototype.validateEmail = function (email) {
    var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(email).toLowerCase());
}






Helper.prototype.updateMailingList = function (dataForm, callBackkSuccess) {
    
    var newsLetterList =  {
        'ht' : '110cc29c538300a21aa753004897a90886c7e9f6:MTUyNDY3NDg0Ni43MzE2',
        'listId' : '254d31366d',
    };

    // var dataForm = {
    //     "mc_signupsource" : 'hosted',
    //     "EMAIL" : DisplayGlobals_SRV.getPagesArray()[0].pagesArray[4].pageDataMariusObj.your_email,
    //     "FNAME" : DisplayGlobals_SRV.getPagesArray()[0].pagesArray[1].pageDataMariusObj.first_name,
    //     "LNAME" : DisplayGlobals_SRV.getPagesArray()[0].pagesArray[2].pageDataMariusObj.last_name,
    // };

    console.log("MailChimp listName newsletter");
    console.log(newsLetterList);
    console.log(dataForm);

    var url = 'https://buzzradar.us5.list-manage.com/subscribe/post?u=c9003a2b46ba63c35711fc287&amp;id='+newsLetterList.listId;
    url = url.replace('/post?', '/post-json?').concat('&c=?');

    $.ajax({
        url: url,
        data : dataForm,
        success: callBackkSuccess,
        dataType: 'jsonp',
        error: function (resp, text) {
            console.log('mailchimp ajax submit error: ' + text);
        }
    });

}






module.exports = new Helper ();
