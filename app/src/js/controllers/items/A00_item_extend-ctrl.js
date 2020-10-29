/*jslint node: true, unused: true, esnext: true */



let _nodeUtil = require('util');
let _eventEmitter3 = require('eventemitter3');



//----------------------------
// REQUIRE 
//----------------------------

const DisplayGlobals_SRV = require('../../services/A01_DisplayGlobals-srv'); 






// ------------------------------------
// Constructor
// ------------------------------------

function Item_extend_Ctrl () {

	

}

_nodeUtil.inherits(Item_extend_Ctrl,_eventEmitter3); 
















// ------------------------------------
// Public methods
// ------------------------------------


Item_extend_Ctrl.prototype.nextPage = function () {

    DisplayGlobals_SRV.getStepsNav().nextPage();    
        
};


Item_extend_Ctrl.prototype.previousPage = function () {

    DisplayGlobals_SRV.getStepsNav().previousPage();    
	    
};


Item_extend_Ctrl.prototype.skip = function () {

    DisplayGlobals_SRV.getStepsNav().nextPage();

};














module.exports = Item_extend_Ctrl;