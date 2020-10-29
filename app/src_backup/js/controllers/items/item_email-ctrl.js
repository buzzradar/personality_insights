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

function Item_Email_Ctrl () {

	this.PAGE_CONENT_DOM = $('.bz-page-content');
	this.ITEM_DOM = HBTemplates.getTemplate('item_email');

}
_nodeUtil.inherits(Item_Email_Ctrl,ITEM_extend); // extend A00_item_extend-ctrl.js



Item_Email_Ctrl.prototype.init = function (page_MO) {

    this.PAGE_MO = page_MO;

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
        if ( _.isEmpty(this.PAGE_MO.pageDataMariusObj) ) {
            this.ITEM_DOM.find('input[name="email"]').val(DisplayGlobals_SRV.getFinalObj()[this.PAGE_MO.stepConfigObj.step_idName].your_email);
            this.ITEM_DOM.find('input[name="accept_terms"]').attr("checked", DisplayGlobals_SRV.getFinalObj()[this.PAGE_MO.stepConfigObj.step_idName].accept_terms);
            this.ITEM_DOM.find('input[name="keep_informed"]').attr("checked", DisplayGlobals_SRV.getFinalObj()[this.PAGE_MO.stepConfigObj.step_idName].keep_informed);
        }else{
            this.ITEM_DOM.find('input[name="email"]').val(this.PAGE_MO.pageDataMariusObj.your_email);
            this.ITEM_DOM.find('input[name="accept_terms"]').attr("checked", this.PAGE_MO.pageDataMariusObj.accept_terms);
            this.ITEM_DOM.find('input[name="keep_informed"]').attr("checked", this.PAGE_MO.pageDataMariusObj.keep_informed);
        }
    }else{
        this.ITEM_DOM.find('input[name="email"]').val(this.PAGE_MO.pageDataMariusObj.your_email);
        this.ITEM_DOM.find('input[name="accept_terms"]').attr("checked", this.PAGE_MO.pageDataMariusObj.accept_terms);
        this.ITEM_DOM.find('input[name="keep_informed"]').attr("checked", this.PAGE_MO.pageDataMariusObj.keep_informed);
    }


}


function _addSelectAllTextEvent() {

    this.ITEM_DOM.find('input[name="email"]').click(function () {
       $(this).select();
    });

}



function _validationRules() {

	//Developer note!
	//this.ITEM_DOM it is a fomr already

	this.ITEM_DOM.validate({
        errorElement: 'span', //default input error message container
        errorClass: 'help-block help-block-error', // default input error message class
        focusInvalid: false, // do not focus the last invalid input
        ignore: "",  // validate all fields including form hidden input
        messages: {

        },
        rules: {
            email: {
                required: true,
                email: true
            },
        },

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


Item_Email_Ctrl.prototype.submit = function () {

    if ( this.ITEM_DOM.valid() ) {




        this.PAGE_MO.pageDataMariusObj.your_email = this.ITEM_DOM.find('input[name=email]').val();
        this.PAGE_MO.pageDataMariusObj.accept_terms = this.ITEM_DOM.find('input[name=accept_terms]').is(":checked");
        this.PAGE_MO.pageDataMariusObj.keep_informed = this.ITEM_DOM.find('input[name=keep_informed]').is(":checked");

        if (!this.PAGE_MO.pageDataMariusObj.accept_terms){
            console.log("hereee")
            this.ITEM_DOM.find('input[name=accept_terms]').parent().css({'color':'red'});
        }else{
            this.ITEM_DOM.find('input[name=accept_terms]').parent().removeAttr( 'style' );
            this.nextPage();            
        }

        console.log(this.PAGE_MO.pageDataMariusObj.accept_terms,this.PAGE_MO.pageDataMariusObj.keep_informed);


    }
	    
};

















module.exports = Item_Email_Ctrl;