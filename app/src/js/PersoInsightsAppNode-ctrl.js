/*jslint node: true, unused: true, esnext: true */



//----------------------------
// REQUIRE  
//----------------------------

const DisplayGlobals_SRV = require('./services/A01_DisplayGlobals-srv'); 
const Rollbar = require('./services/rollbar.umd.min');
const PersoInsightsAssistantRoot_CTRL = require('./controllers/global/A00_PersoInsightsAssistantRoot-ctrl');
const Helper_SRV = require('./services/Helper-srv');













//----------------------------
//  Constructor
//----------------------------

function PersoInsightsApp_NODE () {

    console.log ("%c -> -------------------------------------- ", "background:#eee;", '');
    console.log ("%c -> -------------------------------------- ", "background:#eee;", '');
    console.log ("%c -> VERSION : ", "background:#eee;", DisplayGlobals_SRV.getVersion() );
    console.log ("%c -> -------------------------------------- ", "background:#eee;", '');
    console.log ("%c -> -------------------------------------- ", "background:#eee;", '');


    Helper_SRV.disableSubmitWithReturnKey();
    _setDOMReferences.call(this);
    _getArguments.call(this);
    
}



function _setDOMReferences() {

    let i, src, scriptTag, scriptsArray = document.scripts;
    
    for (i = 0; i < scriptsArray.length; i++) { // we loop through all script tag references until we come across <script src="BuzzAssistant.js"> - Immo 26/01/15
        
        src = scriptsArray[i].src;
        if (src.indexOf("PersoInsights") > -1) { // !IMPORTANT <script src="BuzzAssistant.js"> needs to be called "BuzzAssistant" 

            scriptTag = scriptsArray[i];
        
        }
    
    }

    DisplayGlobals_SRV.setScriptTag (scriptTag); 

}





function _getArguments() {

    var hash = window.location.hash;
    var platform = 'buzzradar';
    //$('ul'+hash+':first').show();

    //console.clear();
    console.log("hash"+hash);

    console.log("DEV.....", Helper_SRV.isDev() );
    //console.log("Platform.....", DisplayGlobals_SRV.getScriptTag().data('platform') );

    if ( DisplayGlobals_SRV.getScriptTag().data('platform') ) {
        platform = DisplayGlobals_SRV.getScriptTag().data('platform');
    }

    console.log("Platform.....", platform );


    var args = {
        'root' : DisplayGlobals_SRV.getScriptTag().data('root'),
        'dev' : Helper_SRV.isDev(),
        'platform' : platform,
    };

    DisplayGlobals_SRV.setArguments(args);

    Helper_SRV.consoleLog("Arguments passed through from index.html: ", args, 'info','a0b87a');
    
    new PersoInsightsAssistantRoot_CTRL();
   
}





module.exports = PersoInsightsApp_NODE;



