/*jslint node: true, unused: true, esnext: true */



//----------------------------
// REQUIRE 
//----------------------------
const DisplayGlobals_SRV = require('../../services/A01_DisplayGlobals-srv'); 
const Helper_SRV = require('../../services/Helper-srv');
const HBTemplates = require('../../services/HBTemplates-srv');






// ------------------------------------
// Constructor
// ------------------------------------

function DisplayInfluencerData_Ctrl (personality_MO) {

    this.personality_MO = personality_MO;

    Helper_SRV.consoleLog("Personality Data : ", this.personality_MO,'info','ffab33');

    $('#result').html( HBTemplates.getTemplate('result_influencer_layout') );

    _loadPersonalityDescription.call(this);
    _loadPersonalityOverviewGraph.call(this);
    _loadConsumptionPreferences.call(this);
    _displayResultsNow.call(this);

    

}



function _displayResultsNow() {

  setTimeout(function(){

    bootbox.hideAll();
    $('#result').collapse("show");

    $([document.documentElement, document.body]).animate({
        scrollTop: $("#result").offset().top
    }, 1000);

  },2000);

}




function _loadPersonalityDescription() {

  var objRender = {

      personality_name : this.personality_MO.personality_name,
      personality_imgName : this.personality_MO.personality_name.toLowerCase(),
      personality_description : this.personality_MO.personality_description,
      name : this.personality_MO.twitter_account.name,
      twitter_url : 'https://twitter.com/' + this.personality_MO.twitter_account.screen_name,
      twitter_handle : '@'+this.personality_MO.twitter_account.screen_name,
      root:DisplayGlobals_SRV.getArguments().root,

  };

	$('.result_user_info').html( HBTemplates.getTemplate("result_user_info", objRender) );

  $('.btn-banner-schedule-app').click(function(){
      Calendly.showPopupWidget('https://calendly.com/buzzradar/introduction-meeting');
      return false;
  });


}


function _loadPersonalityOverviewGraph(){

	  //-----------------------------------------------------------------------
    //DEVELOPER NOTE!
    //We need to include Needs and Values.
    this.personality_MO = _addNeedsValues(this.personality_MO);
    //-----------------------------------------------------------------------

    var colorArray = ['#84b761','#fdd400','#cc4748','#67b7dc','#ffaf30','#d88fe8','#bfc442'];
    var bands = [];
    var allLabels = [];
    var bandValue = 100;
    var startY = 3;

    $.each(this.personality_MO.watson_profile.personality, function( index, value ) {

        var radius = bandValue;
        var innerRadius = bandValue - 8;

        bands.push({
          "color": "#eee",
          "startValue": 0,
          "endValue": 100,
          "radius": radius + "%",
          "innerRadius": innerRadius +"%",
          "title" : value.name,
          "dataChild" : value,
          "colorBandClick" : colorArray[index],
        }, {
          "color": colorArray[index],
          "startValue": 0,
          "endValue": (value.percentile * 100).toFixed(0),
          "radius": radius+"%",
          "innerRadius": innerRadius+"%",
          "balloonText": (value.percentile * 100).toFixed(0) + "%",
          "title" : value.name,
          "colorBandClick" : colorArray[index],
          "dataChild" : value,
        });

        bandValue -= 13;

        allLabels.push({
          "text": value.name,
          "x": "49%",
          "y": startY+"%",
          "size": 15,
          "bold": true,
          "color": colorArray[index],
          "align": "right"
        });

        startY += 6;

    });

    var gaugeChart = AmCharts.makeChart("chartdivPersonalityOverview", {
      "type": "gauge",
      "theme": "none",
      "axes": [{
        "axisAlpha": 0,
        "tickAlpha": 0,
        "labelsEnabled": false,
        "startValue": 0,
        "endValue": 100,
        "startAngle": 0,
        "endAngle": 270,
        "listeners": [{
          "event": "clickBand",
          "method": function(ev) {
            console.log("Clicked on " + ev.dataItem.title, ev.dataItem.colorBandClick);
            var dataChild = ev.dataItem.dataChild;
            var color = ev.dataItem.colorBandClick;
            _loadPersonalityBreakdown(dataChild,color);
          }
        }],
        "bands": bands,
      }],
      "allLabels": allLabels,
      "export": {
        "enabled": true
      }
    });


    //Load the breakdown for the first Element of the Array
    _loadPersonalityBreakdown(this.personality_MO.watson_profile.personality[0], colorArray[0]);

}



var _addNeedsValues = function(data) {

	var needs = {
		category : 'needs',
		children : data.watson_profile.needs,
		name : 'Needs',
		percentile : 0.5,
		significant : true,
		trait_id: 'Needs'
	};

	var values = {
		category : 'values',
		children : data.watson_profile.values,
		name : 'Values',
		percentile : 0.5,
		significant : true,
		trait_id: 'Values'
	};

	data.watson_profile.personality.push(needs);
	data.watson_profile.personality.push(values);

	return data;

};





function _loadPersonalityBreakdown(dataChild,color) {

    //Update the title
    $('.breakdown').find('h3').html(dataChild.name+' Breakdown <small>(rollover for details)</small>');


    var dataProvider = [];
    $.each(dataChild.children, function( index, value ) {
        dataProvider.push({
          "faculties": value.name,
          "visits": (value.percentile * 100).toFixed(0),
          "color": color,
        });
    });


    

    var chart = AmCharts.makeChart("personalityBreakdown", {
      "type": "serial",
      "theme": "none",
      "marginRight": 70,
      "dataProvider": dataProvider,
      "startDuration": 1,
      "graphs": [{
        "balloonText": "<b>[[category]]: [[value]]</b>",
        "fillColorsField": "color",
        "fillAlphas": 0.9,
        "lineAlpha": 0,
        "type": "column",
        "valueField": "visits"
      }],
      "chartCursor": {
        "categoryBalloonEnabled": false,
        "cursorAlpha": 0,
        "zoomable": false
      },
      "categoryField": "faculties",
      "categoryAxis": {
        "gridPosition": "start",
        "labelRotation": 45
      },
      "export": {
        "enabled": true
      }

    });

};










function _loadConsumptionPreferences () {

  var dataConsumptionPreferencesArray = this.personality_MO.watson_profile.consumption_preferences;
  var consumptionsHolder = $('.consumption_groups_holder');
  var filteredConsumptionsArray = [];
  var numMax = 3;
  var isGroupEmpty = true;

  //Let's organise the new Array
  dataConsumptionPreferencesArray.forEach(function(element,index) {
    var tempConsumpArray = [];



    // console.log('Group.....',element.name);


    //Let's list consumptions items
    element.consumption_preferences.forEach(function(consumptionItem) {


      //Hack to remove "When" from "Purchasing Preferences"
      if (element.name == 'Purchasing Preferences'){
        consumptionItem.name = consumptionItem.name.split("when")[0];
      }

      // console.log('Preference...........',consumptionItem);

      if ( (consumptionItem.score == 1 || consumptionItem.score == 0) && numMax != 0) {

        //consumptionItem.name = consumptionItem.name.replace("Likely","<strong>Likely</strong>");
        if( consumptionItem.score == 0 ) {
          consumptionItem.name = consumptionItem.name.replace("Likely","Unlikely");
        }

        consumptionItem['groupName'] = element.name;
        tempConsumpArray.push(consumptionItem);
        numMax --;
      }
    });

    numMax = 3;

    if ( tempConsumpArray.length != 0 ) {
      filteredConsumptionsArray.push(tempConsumpArray);
    }

  });


  //Let's display Consumptions into the DOM Element
  filteredConsumptionsArray.forEach(function(consumpGroup,index) {
    var groupPreference = $(`<div class="col-md-12">      
                    <div class="mt-3">
                        <div class="mb-3" style="font-weight: bold;font-size:18px;"><span class="circle-number`+_getCircleColor()+`">&nbsp;</span> `+consumpGroup[0].groupName+`</div>
                        <ul style="list-style: none;"></ul>
                    </div>    
                </div>`);

    //Let's list consumptions items
    consumpGroup.forEach(function(consumptionItem) {      
      if (consumptionItem.score == 1) {
        groupPreference.find('ul').append('<li><span style="margin-right:10px;color:#26C281;"><i class="fas fa-thumbs-up"></i></span>'+consumptionItem.name+'</li>');
      }else{
        groupPreference.find('ul').append('<li><span style="margin-right:10px;color:#EF4836;"><i class="fas fa-thumbs-down"></i></span>'+consumptionItem.name+'</li>');
      }
    });

    //We append all the lists 
    if (index%2 == 0) {
      //Put the consumption preference in the first columne
      consumptionsHolder.find('.col-md-6').eq(0).append(groupPreference);
    }else{
      //Put the consumption preference in the second columne
      consumptionsHolder.find('.col-md-6').eq(1).append(groupPreference);
    }


  });

}



function _getCircleColor() {

    var platform = DisplayGlobals_SRV.getArguments().platform;
    var myClass;
    if (platform == 'buzzradar') {
        myClass = ' br';
    }else{
        myClass = ' credible';
    }

    return myClass;

}














module.exports = DisplayInfluencerData_Ctrl;