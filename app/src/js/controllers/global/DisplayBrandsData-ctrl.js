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

function DisplayBrandsData_Ctrl (brand, brandsPersonality_MO) {

    this.brandsPersonality_MO = brandsPersonality_MO;

    Helper_SRV.consoleLog("Brand Personality Data : ", this.brandsPersonality_MO,'info','ffab33');

    $('#result').html( HBTemplates.getTemplate('result_brand_layout',{root:DisplayGlobals_SRV.getArguments().root, platform: _getPlatform(), brand_name:brand}) );

    _loadTotalAudience.call(this);
    _displayResultsNow.call(this);


    //Select the first slice automatically
    setTimeout(function() {
      this.pieChart.clickSlice(0);
    }.bind(this),5000);

    $('.btn-banner-schedule-app').click(function(){
        Calendly.showPopupWidget('https://calendly.com/buzzradar/introduction-meeting');
        return false;
    });

    $([document.documentElement, document.body]).animate({
        scrollTop: $("#result").offset().top
    }, 1000);

}


function _removeAmChartsLogo() {

  $('.amcharts-chart-div').find('a').css('display','none');

}


function _getPlatform() {

  var platform = DisplayGlobals_SRV.getArguments().platform;
  if (platform == "buzzradar") {
    platform = "br";
  }
  return platform;

}



function _loadTotalAudience() {

  $('.type_description_row').hide();
  $('.personality_overview_row').hide();

  _updateTitles.call(this, 'Total Audience');
  _loadAudienceTypes.call(this, this.brandsPersonality_MO.totalAudience);
  _loadGenderBrakedown.call(this,this.brandsPersonality_MO.totalAudience.genderBrakeDown);
  _createList($('.list-professions'),"Professions",this.brandsPersonality_MO.totalAudience.professions, '#578EBE');
  _createList($('.list-interests'),"Interests",this.brandsPersonality_MO.totalAudience.interests, '#b0cf5c');
  _loadConsumptionPreferences.call(this,this.brandsPersonality_MO.totalAudience.consumptionPreferences);

}


function _updateTitles(newTitle) {

  $('.gender_brakedown_row').find('.result-title').find('small').html('( '+newTitle+' )');
  $('.professions_interests_row').find('.result-title').find('small').html('( '+newTitle+' )');
  $('.consumption_groups_row').find('.result-title').find('small').html('( '+newTitle+' )');
  $('.personality_overview_row').find('.col-md-6').eq(0).find('.result-title').html('Persona Breakdown <small>( '+newTitle+' )</small>');

}



function _displayResultsNow() {


  setTimeout(function(){

    bootbox.hideAll();
    $('#result').collapse("show");

    $([document.documentElement, document.body]).animate({
        scrollTop: $("#result").offset().top
    }, 1000);

    setTimeout(function() {
      _removeAmChartsLogo();
    },250);

  },2000);

}



function _loadAudienceTypes(totalAudienceData) {

  var _this = this;
  this.pieChart = AmCharts.makeChart("audience_pie", {
    "type": "pie",
    "theme": "none",
    "dataProvider": totalAudienceData.pieChartData,
    "valueField": "value",
    "radius" : '40%',
    "titleField": "personality",
    "legend":{
      "enabled":false,
      "align" : "center",
      "labelText" : "[[title]]",
      "valueText" : "[[percents]]%",
    },
    "startDuration":0,
    "balloon":{
      "fixedPosition":true,
    },
    "labelsEnabled" : false,
    "balloonText": "[[title]]: [[percents]]%",
    "pullOutOnlyOne": true,
    "export": {
      "enabled": true
    },

    "listeners": [{
        "event": "init",
        "method": function(event) {
          var chart = event.chart;

          var total = 0;
          //get total to workout the percentage
          for(var i = 0; i < chart.dataProvider.length; i++) {
            total += chart.dataProvider[i].value;
          }
          
          // cycle through the data
          $('#collapseAudienceTypes').find('.card-body').html('<div class="row"><div class="col-md-6"></div><div class="col-md-6"></div></div>');
          for(var i = 0; i < chart.dataProvider.length; i++) {

            var percentage = (chart.dataProvider[i].value/total * 100).toFixed(2);
            var dp = chart.dataProvider[i];
            var item = '<a class="dropdown-item" data-sliceid="'+i+'" href="#"><div class="dropdown-legend-perc" style="background:'+chart.colors[i]+';"></div> '+dp.personality+' ('+percentage+'%)</a>';
            
            // add item to legend
            if (i%2 == 0) {
              $('#collapseAudienceTypes').find('.col-md-6').eq(0).append(item);
            }else{
              $('#collapseAudienceTypes').find('.col-md-6').eq(1).append(item);
            }

          }


        }
      }]

  });


  $('.dropdown-item').click(function(e){
    e.preventDefault();
    $('#collapseAudienceTypes').collapse('hide');
    var idSlice = $(this).data('sliceid');
    _this.pieChart.clickSlice(idSlice);
    _this.pieChart.rollOverSlice(idSlice);
  });


  noPersonalitySelected();

  this.pieChart.addListener("clickSlice", function(event){

      if (event.dataItem.pulled){
        //If selected
        console.log("personalityName--->", event.dataItem);
        console.log("personalityName--->", event.dataItem.dataContext.personality);
        console.log(totalAudienceData.pieChartData)
        _loadSpecificPersonality.call(_this,event.dataItem.dataContext.personality);
      }else{
        //If NOT Selected
        console.log("not selected: show TOTAL audience");
        _loadTotalAudience.call(_this);
      }

      _removeAmChartsLogo();

  });

  


}




function personalitySelected() {

  $('#description_portlet').show();
  $('#overview_breakdown_row').show();

}


function noPersonalitySelected() {

  $('#description_portlet').hide();
  $('#overview_breakdown_row').hide();

}


function _loadGenderBrakedown(data) {

  AmCharts.makeChart("gender_brakedown",
        {
          "type": "serial",
          "categoryField": "category",
          "rotate": true,
          "startDuration": 1,
          "categoryAxis": {
            "gridPosition": "start",
                "axisAlpha": 0,
                "labelsEnabled": false
          },
          "trendLines": [],
          "graphs": [
            {
              "balloonText": "[[title]]",
              "fillAlphas": 1,
              "id": "AmGraph-1",
              "title": "Male",
              "type": "column",
              "valueField": "column-1",
              "lineColor" : '#00a099',
              "fillColors" : '#00a099',
            },
            {
              "balloonText": "[[title]]",
              "fillAlphas": 1,
              "id": "AmGraph-2",
              "title": "Female",
              "type": "column",
              "valueField": "column-2",
              "lineColor" : '#644ab7',
              "fillColors" : '#644ab7',
            },
            {
              "balloonText": "[[title]]",
              "fillAlphas": 1,
              "id": "AmGraph-3",
              "title": "Others",
              "type": "column",
              "valueField": "column-3",
              "lineColor" : '#2e2f82',
              "fillColors" : '#2e2f82',
            }
          ],
          "guides": [],
          "valueAxes": [
            {
              "id": "ValueAxis-1",
              "stackType": "100%",
              "title": ""
            }
          ],
          "allLabels": [],
          "balloon": {
            "fixedPosition": false
          },
          "legend": {
            "enabled": true,
            "useGraphSettings": true
          },
          "dataProvider": [
            {
              "column-1": data.male,
              "column-2": data.female,
              "column-3": data.unknown,
            },
          ]
        }
      );

}





function _createList($domListHolder, title, dataList, colorPercentages) {

  var noDataMessage = 'Not enough relevant  data within this timeframe to provide meaningful analysis.';
  $domListHolder.html('<span class="title-list" style="background:'+colorPercentages+';"><strong>'+title+'</strong></span>');

  if (dataList.length == 0 ) {
    //Display a Message that there is no data
    $domListHolder.append('<div class="mt-2">'+noDataMessage+'</div>');

  }else{
    var $ul = $('<ul class="mt-2"></ul>');
    $domListHolder.append($ul);

    var max = 5;

    $.each(dataList, function( index, value ) {
      if (max == 0) return false;
      var itemTurnIntoArray = value.name.split('\/');
      var lastItem = itemTurnIntoArray[itemTurnIntoArray.length-1];  //Pat wants us to display only the last item as we get several interests in the same item.
      $ul.append('<li><span style="color:'+colorPercentages+'"> <i class="fa fa-arrow-circle-right"></i></span> '+jsUcfirst(lastItem)+'</li>');
      max --;
    });
  }

}



function jsUcfirst(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
}




function _loadConsumptionPreferences (consumptionsData) {

  var dataConsumptionPreferencesArray = consumptionsData;
  var consumptionsHolder = $('.consumption_groups_row');
  var numMax = 5;

  consumptionsHolder.find('.col-md-6').empty();

  //Let's display Consumptions into the DOM Element
  dataConsumptionPreferencesArray.forEach(function(consumpGroup,index) {
    
    // console.log('Group.....',consumpGroup,index);

    var groupPreference = $(`<div class="col-md-12">      
                    <div class="mt-3">
                        <div class="mb-3" style="font-weight: bold;font-size:18px;"><span class="circle-number`+_getCircleColor()+`">`+(index+1)+`</span> `+consumpGroup.groupName+`</div>
                        <ul style="list-style: none;"></ul>
                    </div>    
                </div>`);

    //Let's list consumptions items
    for (var i = 0; i < consumpGroup.preferencesArray.length; i++) {

      //Hack to remove "When" from "When Purchasing Goods Will Consider"
      if (consumpGroup.groupName == 'When Purchasing Goods Will Consider'){
        consumpGroup.preferencesArray[i].name = consumpGroup.preferencesArray[i].name.split("when")[0];
      }

      // console.log('Preference...........', consumpGroup.preferencesArray[i].name);

      if (consumpGroup.preferencesArray[i].score >= 55) {
        groupPreference.find('ul').append('<li><span style="margin-right:10px;color:#26C281;"><i class="fas fa-thumbs-up"></i></span>'+consumpGroup.preferencesArray[i].name+'</li>');
        numMax --;        
      }else if (consumpGroup.preferencesArray[i].score <= 45) {
        consumpGroup.preferencesArray[i].name = consumpGroup.preferencesArray[i].name.replace('Likely','Unlikely');
        groupPreference.find('ul').append('<li><span style="margin-right:10px;color:#EF4836;"><i class="fas fa-thumbs-down"></i></span>'+consumpGroup.preferencesArray[i].name+'</li>');
        numMax --;
      }

      if (numMax <= 0) i = consumpGroup.preferencesArray.length;
    }

    numMax = 5;

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




function _loadSpecificPersonality(personalityToLoad) {

    $('.type_description_row').show();
    $('.personality_overview_row').show();

    var personalityJSON = this.brandsPersonality_MO.breakdownTypes[personalityToLoad.toLowerCase()];
    
    console.log(personalityJSON);

    _loadPersonalityDescription.call(this,personalityJSON);
    _loadPersonalityOverviewGraph.call(this,personalityJSON.watson_profile.personality);
    _loadGenderBrakedown.call(this,personalityJSON.genderBrakeDown);
    _loadConsumptionPreferences.call(this,personalityJSON.consumptionPreferences);
    _createList($('.list-professions'),"Professions",personalityJSON.professions, '#578EBE');
    _createList($('.list-interests'),"Interests",personalityJSON.interests, '#b0cf5c');
    _updateTitles.call(this, personalityToLoad);

}



function _loadPersonalityDescription(personalityTypeData) {

  $('.type_description_row').find('.result-title').html(personalityTypeData.personality_name);
  $('.type_description_row').find('.description').html(personalityTypeData.personality_description);

}




function _loadPersonalityOverviewGraph(personalityBreakdownData){

    //-----------------------------------------------------------------------
    //DEVELOPER NOTE!
    //We need to include Needs and Values.
    // this.personality_MO = _addNeedsValues(this.personality_MO);
    //-----------------------------------------------------------------------

    var colorArray = ['#84b761','#fdd400','#cc4748','#67b7dc','#ffaf30','#d88fe8','#bfc442'];
    var bands = [];
    var allLabels = [];
    var bandValue = 100;
    var startY = 3;

    $.each(personalityBreakdownData, function( index, value ) {

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

    if (this.gaugeChart) {
      this.gaugeChart.clear();
      this.gaugeChart = null;
    }

    this.gaugeChart = AmCharts.makeChart("chartdivPersonalityOverview", {
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
            _removeAmChartsLogo();
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
    _loadPersonalityBreakdown(personalityBreakdownData[0], colorArray[0]);

}



function _loadPersonalityBreakdown(dataChild,color) {

    //Update the title
    $('.personality_overview_row').find('.result-title').eq(1).html(dataChild.name+' Breakdown');


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




module.exports = DisplayBrandsData_Ctrl;