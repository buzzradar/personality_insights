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

function Item_BrandsList_Ctrl () {

	this.jsonFileOnProcess = false;
	this.PAGE_CONENT_DOM = $('.bz-page-content');
	this.ITEM_DOM = HBTemplates.getTemplate('item_brandslist');
	this.brandsArray = [
		{
			name : 'Go Pro',
			img : 'gopro',
			id : 'gopro',
		},
		{
			name : 'Redbull',
			img : 'redbull',
			id : 'redbull',
		},
		{
			name : 'F1',
			img : 'f1',
			id : 'f1',
		},
		{
			name : 'Rolls Royce',
			img : 'rolls-royce',
			id : 'rolls-royce',
		},
		{
			name : 'Louis Vuitton',
			img : 'louisvuitton',
			id : 'louisvuitton',
		},
		{
			name : 'Lego',
			img : 'lego',
			id : 'lego',
		},
		{
			name : 'All Birds',
			img : 'allbirds',
			id : 'allbirds',
		},
		{
			name : 'Bumble',
			img : 'bumble',
			id : 'bumble',
		},
		{
			name : 'Bose',
			img : 'bose',
			id : 'bose',
		},
		{
			name : 'Five Guys',
			img : 'fiveguys',
			id : 'fiveguys',
		},
		{
			name : 'Peloton',
			img : 'peloton',
			id : 'peloton',
		},
		{
			name : 'Burts Bees',
			img : 'burtsbees',
			id : 'burtsbees',
		},
		
	];

}
_nodeUtil.inherits(Item_BrandsList_Ctrl,ITEM_extend); // extend A00_item_extend-ctrl.js



Item_BrandsList_Ctrl.prototype.init = function (page_MO) {

    this.PAGE_MO = page_MO;
	this.PAGE_CONENT_DOM.empty();
	_loadItemPage.call(this);
	
};




function _loadItemPage() {

	this.PAGE_CONENT_DOM.append(this.ITEM_DOM);
	_addListBrands.call(this);
	
}


function _addListBrands() {

	var _this = this;
	this.brandsArray.forEach(function(element,index) {
	  //console.log(element);
	  var brandLogoButton = '<a href="#" data-id="'+element.id+'" data-index="'+index+'"><img class="img-fluid rounded mb-3" width="100%" src="'+DisplayGlobals_SRV.getArguments().root+'images/logos/brands/'+element.img+'.jpg" alt="'+element.name+'" /></a>';

	  if (index % 2 == 0) {
		  _this.PAGE_CONENT_DOM.find('.col-md-6:nth-child(1)').append(brandLogoButton);
	  }else{
		  _this.PAGE_CONENT_DOM.find('.col-md-6:nth-child(2)').append(brandLogoButton);
	  }

	});

    this.PAGE_CONENT_DOM.find('a').click(function (event) {

    	event.preventDefault();

    	if (!_this.jsonFileOnProcess) {

    		console.log($(this).data('id'));
	    	_this.jsonFileOnProcess = true;
    		
	    	event.preventDefault();
	    	var brandId = $(this).data('id');
	    	var jsonBrand = DisplayGlobals_SRV.getArguments().root+"js/json/"+brandId+".json";
	    	
			$.getJSON( jsonBrand, function( data ) {
				_this.jsonFileOnProcess = false;
			  	console.log("Json Brand Data",brandId, data);
			  	_this.PAGE_MO.pageDataMariusObj['brandJsonObj'] = data.dataObj;
	    		_this.PAGE_MO.pageDataMariusObj['brand'] = brandId;
				_this.submit();
			});

    	}

    	

    });

}






// ------------------------------------
// Public methods
// ------------------------------------




Item_BrandsList_Ctrl.prototype.submit = function () {

	this.nextPage();
	    
};
















module.exports = Item_BrandsList_Ctrl;