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

function Item_TextAndPar_Ctrl () {

	this.PAGE_CONENT_DOM = $('.bz-page-content');
	this.ITEM_DOM = HBTemplates.getTemplate('item_textandpar');

}
_nodeUtil.inherits(Item_TextAndPar_Ctrl,ITEM_extend); // extend A00_item_extend-ctrl.js



Item_TextAndPar_Ctrl.prototype.init = function (page_MO) {

    this.PAGE_MO = page_MO;
	this.PAGE_CONENT_DOM.empty();
	_loadItemPage.call(this);
	
};













function _loadItemPage() {

	this.PAGE_CONENT_DOM.append(this.ITEM_DOM);

}











// ------------------------------------
// Public methods
// ------------------------------------




Item_TextAndPar_Ctrl.prototype.submit = function () {

	this.nextPage();
	    
};
















module.exports = Item_TextAndPar_Ctrl;