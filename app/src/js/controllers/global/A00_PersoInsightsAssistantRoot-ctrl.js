/*jslint node: true, unused: true, esnext: true */



//----------------------------
// REQUIRE  
//----------------------------

const DisplayGlobals_SRV = require('../../services/A01_DisplayGlobals-srv'); 
const JSON_Configs = require('../../services/JSONConfigs-srv');
const HBTemplates = require('../../services/HBTemplates-srv');
const StepsNavHandler_CTRL = require('./StepsHandler-ctrl');
const PagesHandler_CTRL = require('./PagesHandler-ctrl');
const Helper_SRV = require('../../services/Helper-srv');
const Copy_SRV = require('../../services/Copy-srv');





//----------------------------
//  Constructor
//----------------------------

function PersoInsightsAssistantRoot_Ctrl () {

    this.stepsPagesArray = [];
    this.navArray = [
        {
            "slug" : "platform",
            "label" : "Platform",
            "targetDomId" : false,
            "url" : "http://www.buzzradar.com"
        },
        {
            "slug" : "services",
            "label" : "Services",
            "targetDomId" : false,
            "url" : "http://www.credibleinfluence.com/"
        },
        {
            "slug" : "trynow",
            "label" : "Try Demo",
            "targetDomId" : "body",
        },
        {
            "slug" : "bookmeeting",
            "label" : "Book a Meeting",
            "targetDomId" : "body",
        }
    ];

    _init.call(this);
    
}







function _init() {

    _getJSONMasterConfig.call(this);

}






function _getJSONMasterConfig() {

    DisplayGlobals_SRV.setMasterJSON( JSON_Configs.getConfig() );

    _createStepsPagesArray.call(this);

}





function _getNumSteps() {

    var numSteps = 0; 
    var config = DisplayGlobals_SRV.getMasterJSON();

    for (var key in config.structure) {
        if(key.indexOf("step") > -1) numSteps ++;
    }

    return numSteps;

}





function _createStepsPagesArray() {

    let config = DisplayGlobals_SRV.getMasterJSON();
 
    var numSteps = _getNumSteps.call(this);
    var numPages; 


    for (var i = 0; i < numSteps; i++) {
        this.stepsPagesArray[i] = {
            "stepId" : i,
            "stepIdName" : config.structure['step'+i].step_idName,
            "stepTitle" : config.structure['step'+i].step_title,
            "pagesArray" : [],
        };
        numPages = 0;   //reset the num of pages per step to start again

        for (var key in config.structure['step'+i]) {
            if(key.indexOf("page") > -1) {
                this.stepsPagesArray[i].pagesArray[numPages] = {
                    "pageId" : numPages,
                    "stepConfigObj" : config.structure['step'+i],
                    "pageConfigObj" : config.structure['step'+i][key],
                    "pageDataMariusObj" : {},
                    "pageControllerObj" : null,
                    "completed" : false  
                };
                numPages++;
            }
        }

    }

    Helper_SRV.consoleLog("NAVIGATION ARRAY : ", this.stepsPagesArray, 'info');

    DisplayGlobals_SRV.setPagesArray(this.stepsPagesArray);
    

    //Developer Note
    //Now that we have the jsonConfig we can start

    _renderNav.call(this);
    _setTryNowButton.call(this);
    _setSubscribeButton.call(this);
    // Copy_SRV.flipCopy( Copy_SRV.getCopyFlip_MO($('.blinking_copy'),500,3) );



}


function _setTryNowButton() {

    console.log("vamos a ver si _setTryNowButton");

    $('.try-now-btn').click(function(){

        console.log("Open popup????");

            if ( $('#result').hasClass('show') ) {
                $('#result').collapse("hide")
                setTimeout(function(){
                    _openPopup.call(this);                
                }.bind(this),750);
            }else{
                console.log(this)
                _openPopup.call(this);
            }

    }.bind(this));

}


function _openPopup() {

    bootbox.dialog({
            className : DisplayGlobals_SRV.getArguments().platform + "_bootbox",
            title : 'Audience Analyser Demo Tool',
            message: HBTemplates.getTemplate('popup_layout'),
            size: 'medium',
            closeButton: true,
        }
    ).on('shown.bs.modal', function (e) {
        //do something when Bootbox is ready
        new StepsNavHandler_CTRL(this.stepsPagesArray); 
        new PagesHandler_CTRL(this.stepsPagesArray); 
    }.bind(this));

}




function _setSubscribeButton() {

    // $('.get-in-touch').find('.btn').click(function(){

    //     var $btn = $(this);
    //     _disableButton($btn);
    //     var email = $('#subscription-email').val();

    //     if ( Helper_SRV.validateEmail(email) ) {
    //         Helper_SRV.consoleLog("Subscription Email Address valid : ", email, 'info');
    //         $('.get-in-touch').find('.help-block').empty(); 

    //         var mailChimpObj = {
    //             "mc_signupsource" : 'hosted',
    //             "EMAIL" : email,
    //         };

    //         Helper_SRV.updateMailingList(mailChimpObj, _mailingListSuccess);

    //     }else{
    //         Helper_SRV.consoleLog("Subscription Email Address not valid", email, 'error');
    //         _enableButton($btn);
    //         $('.get-in-touch').find('.help-block').html('Please enter a valid email address.');
    //     }

    // });

    $('.btn-schedule-app').click(function(){
        Calendly.showPopupWidget('https://calendly.com/buzzradar/introduction-meeting');
        return false;
    });

}


function _disableButton($btn) {
    $btn.prop("disabled", true);
    $btn.html('Subscribe <i class="fa fa-cog fa-spin fa-fw margin-bottom"></i>');
}

function _enableButton($btn){
    $btn.prop("disabled", false);
    $btn.html('Subscribe');   
}


function _mailingListSuccess() {

    _enableButton($('.get-in-touch').find('.btn'));
    $('.get-in-touch').find('.help-block').html('You have succesfuly entered the mailing list.');
    $('#subscription-email').val('')

}



/**
 * Render the Nav in the page
 */
function _renderNav(){
    
    var _this = this;
    var ul = $('<ul class="navbar-nav"></ul>');
    $('#navBarMain').append(ul);
    $.each(this.navArray, function( index, value ) {
      //console.log( index + ": " + value.label );

      var nav_link_class = 'nav-link';
      if (DisplayGlobals_SRV.getArguments().platform == 'buzzradar') {
        nav_link_class += ' br';
      }

      ul.append('<li class="nav-item perso-insights-navitem"><a class="'+nav_link_class+'" href="#" data-slug="'+value.slug+'" data-targetdomid="'+value.targetDomId+'" data-url="'+value.url+'">'+value.label+'</a></li>');
    });


    $('.perso-insights-navitem > a').click(function(e){
        $('#navBarMain').collapse('hide');
        e.preventDefault();
        var slug = $(this).data('slug');
        var targetdomid = $(this).data('targetdomid');
        var url = $(this).data('url');
        if (targetdomid){

            if (slug === 'bookmeeting'){

                Calendly.showPopupWidget('https://calendly.com/buzzradar/introduction-meeting');
                return false;

            }else{
            
                if ( $('#result').hasClass('show') ) {
                    $('#result').collapse("hide")
                    setTimeout(function(){
                        _openPopup.call(_this);                
                    },750);
                }else{
                    console.log(this)
                    _openPopup.call(_this);
                }

            }

        }else{
            console.log("loading external URL ->", url);
            window.open(url);
        }

        // trackGAEvent('event','Navigation','clicked', slug);

    });

};

















module.exports = PersoInsightsAssistantRoot_Ctrl;



