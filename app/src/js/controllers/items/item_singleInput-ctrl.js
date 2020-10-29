/*jslint node: true, unused: true, esnext: true */


const _ = require("lodash");
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

function Item_SingleInput_Ctrl () {

    this.PAGE_CONENT_DOM = $('.bz-page-content');

}
_nodeUtil.inherits(Item_SingleInput_Ctrl,ITEM_extend); // extend A00_item_extend-ctrl.js



Item_SingleInput_Ctrl.prototype.init = function (page_MO) {

    this.PAGE_MO = page_MO;

    this.ITEM_DOM = HBTemplates.getTemplate('item_singleinput',{
        'input_label' : this.PAGE_MO.pageConfigObj.item.input_label,
        'input_name' : this.PAGE_MO.pageConfigObj.item.input_name,
    });

    _loadItemPage.call(this);
    _validationRules.call(this);
    _prepopulate.call(this);
        
};













function _loadItemPage() {

	this.PAGE_CONENT_DOM.html(this.ITEM_DOM);
    _addSelectAllTextEvent.call(this);

}


function _prepopulate() {

    if (DisplayGlobals_SRV.getArguments().dev) {

        if ( !_.has(this.PAGE_MO.pageDataMariusObj, this.PAGE_MO.pageConfigObj.item.input_name) ) {
            this.ITEM_DOM.find('input[name='+this.PAGE_MO.pageConfigObj.item.input_name+']').val(DisplayGlobals_SRV.getFinalObj()[this.PAGE_MO.stepConfigObj.step_idName][this.PAGE_MO.pageConfigObj.item.input_name]);
        }else{
            this.ITEM_DOM.find('input[name='+this.PAGE_MO.pageConfigObj.item.input_name+']').val(this.PAGE_MO.pageDataMariusObj[this.PAGE_MO.pageConfigObj.item.input_name]);
        }
        
    }else{
        if ( !_.isEmpty(this.PAGE_MO.pageDataMariusObj) ) {
            this.ITEM_DOM.find('input[name='+this.PAGE_MO.pageConfigObj.item.input_name+']').val(this.PAGE_MO.pageDataMariusObj[this.PAGE_MO.pageConfigObj.item.input_name]);    
        }
    }

}


function _addSelectAllTextEvent() {

    this.ITEM_DOM.find('input[name="'+this.PAGE_MO.pageConfigObj.item.input_name+'"]').click(function () {
       $(this).select();
    });

}


function _validationRules() {

	//Developer note!

    let rulesObj = {};
    rulesObj[this.PAGE_MO.pageConfigObj.item.input_name] = {required: true};


	this.ITEM_DOM.validate({
        errorElement: 'span', //default input error message container
        errorClass: 'help-block help-block-error', // default input error message class
        focusInvalid: false, // do not focus the last invalid input
        ignore: "",  // validate all fields including form hidden input
        messages: {

        },
        rules: rulesObj,

        invalidHandler: function (event, validator) { //display error alert on form submit              
            // success1.hide();
            // error1.show();
            // App.scrollTo(error1, -200);
        },

        errorPlacement: function (error, element) { // render error placement for each input type

             if (element.is(':checkbox')) {
                error.insertAfter(element.closest(".md-checkbox-list, .md-checkbox-inline, .checkbox-list, .checkbox-inline"));
            } else if (element.is(':radio')) {
                error.insertAfter(element.closest(".md-radio-list, .md-radio-inline, .radio-list,.radio-inline"));
            } else {
                error.insertAfter(element); // for other inputs, just perform default behavior
            }

        },

        highlight: function (element) { // hightlight error inputs
            $(element)
                .closest('.form-group').addClass('has-error'); // set error class to the control group
        },

        unhighlight: function (element) { // revert the change done by hightlight
            $(element)
                .closest('.form-group').removeClass('has-error'); // set error class to the control group
        },

        success: function (label) {
            label
                .closest('.form-group').removeClass('has-error'); // set success class to the control group
        },

        submitHandler: function (form) {

        }
    });


}













// ------------------------------------
// Public methods
// ------------------------------------


Item_SingleInput_Ctrl.prototype.submit = function () {

    if ( this.ITEM_DOM.valid() ) {

        this.PAGE_MO.pageDataMariusObj[this.PAGE_MO.pageConfigObj.item.input_name] = this.ITEM_DOM.find('input[name='+this.PAGE_MO.pageConfigObj.item.input_name+']').val();
    
        this.nextPage();    
    }
	    
};

















module.exports = Item_SingleInput_Ctrl;