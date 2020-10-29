/*jslint node: true, unused: true, esnext: true */



//----------------------------
// REQUIRE 
//----------------------------
const DisplayGlobals_SRV = require('../../services/A01_DisplayGlobals-srv'); 
const HBTemplates = require('../../services/HBTemplates-srv');
const d3 = require("d3");







// ------------------------------------
// Constructor
// ------------------------------------

function DotSVG_Ctrl (svgDotMOD) {

    this.parentDOM = $('.assist-steps');
    this.ITEM;
    this.svgDotMOD = svgDotMOD;
    this.num_steps = DisplayGlobals_SRV.getPagesArray().length - 1;  //landing page does not count
    this.dot_ID = this.svgDotMOD.stepId;


    _createDotDIV.call(this);

}
















function _createDotDIV() {

    this.ITEM = HBTemplates.getTemplate('step_item');
    var col_md = "col-4";

    if (this.svgDotMOD.stepId === 0) {
        //this.ITEM.addClass('offset-md-3');
    }
    // else if(this.svgDotMOD.stepId === this.num_steps) {
    //     col_md = "col-xs-" + ( Math.round(12/this.num_steps) + (12 % this.num_steps));
    //     this.ITEM.addClass('last');
    // }
    this.ITEM.addClass(col_md);
    this.parentDOM.append(this.ITEM);


    _addTitle.call(this, this.ITEM);
    _addSVG.call(this, this.ITEM);

}


function _addTitle(elem) {

    elem.find('.mt-step-title').html(this.svgDotMOD.stepTitle);

}



function _addSVG(elem) {

    let divHolderSVG = document.createElement("div");
    divHolderSVG.className = 'bz-svg-dot';
    elem.find('.mt-step-number').html(divHolderSVG);



    let width = $(divHolderSVG).width();
    let height = $(divHolderSVG).height();
    let radius = (Math.min(width, height) / 2) - 2 ;
    let τ = 2 * Math.PI;
    let fgColor = "#d9dadc";
    let bgColor = "#ffffff";


    let svg = d3.select(divHolderSVG).append("svg")
                .attr("width", width)
                .attr("height", height)
                .append("g")
                .attr("transform", "translate(" + width / 2 + "," + height / 2 + ")")


    this.arc = d3.svg.arc()
        .innerRadius(0)
        .outerRadius(radius)
        .startAngle(0);

    this.arcInner = d3.svg.arc()
        .innerRadius(0)
        .outerRadius(radius-2)
        .startAngle(0);


    // Add the background arc, from 0 to 100% (τ).
    this.background = svg.append("path")
        .attr("stroke-width", 3)
        .attr("stroke", "#e5e5e5")
        .datum({endAngle: τ})
        .style("fill", bgColor)
        .attr("d", this.arc);

    // Add the foreground arc in orange, currently showing 12.7%.
    this.foreground = svg.append("path")
        .attr("stroke-width", 0)
        .attr("stroke", "#c2cad8")
        .datum({endAngle: 0})   //.127 * τ
        .style("fill", fgColor)
        .attr("d", this.arcInner);

    let textG = svg.append("g")

    this.stepTxt = textG.append("text")
        .attr("x", 0)
        .attr("y", 0)
        .attr("dx", "-.28em")
        .attr("dy", ".35em")
        .attr("font-size","20px")
        .style("fill", "#666")
        .style("font-weight", "bold")
        .text(this.dot_ID + 1)

    // this.updateProgress.call(this,100);

    this.tickImg = $('<i class="fas fa-check" style="position:absolute;font-size:35px;top:12px;left:13px;color:white;"></i>');
    $(divHolderSVG).append(this.tickImg);
    this.tickImg.hide();

}





function arcTween(transition, newAngle, arc) {

  transition.attrTween("d", function(d) {
    let interpolate = d3.interpolate(d.endAngle, newAngle);
    return function(t) {
      d.endAngle = interpolate(t);
      return arc(d);
    };
  });
}






function progressUpdateEnd(objCallback) {

    let fgColor = "#d9dadc";
    let bgColor = "#ffffff";
    let τ = 2 * Math.PI;


    if (objCallback.endAngle === 2*Math.PI) {

        this.foreground.transition()
            .duration(300)
            .style('fill', '#2b3643');

        this.stepTxt
            .text(' ')        
            .attr("dx", "-.34em")
            .style("fill", "#fff")

        this.tickImg.show();
                

    }else{

        this.foreground.transition()
            .duration(300)
            .style('fill', fgColor)

        this.stepTxt
            .text(this.dot_ID + 1)        
            .attr("dx", "-.34em")
            .style("fill", "#fff")
            .style("fill", "#666")


    }

}















DotSVG_Ctrl.prototype.updateProgress = function(perc) {

    let τ = 2 * Math.PI;

    this.tickImg.hide();


    this.foreground.transition()
        .duration(500)
        .call(arcTween, perc * τ / 100, this.arcInner)   //τ =  full / 0 = empty
        .each("end", progressUpdateEnd.bind(this), perc);

};



DotSVG_Ctrl.prototype.highlight = function() {

    var stroke;
    if (DisplayGlobals_SRV.getArguments().platform === 'buzzradar') {
        stroke = "#f6921e";
    }else{
        stroke = "#21c6ca";
    }

    this.background
        .attr("stroke-width", 3)
        .attr("stroke", stroke)

    this.ITEM.find('.mt-step-title').addClass("active");


};


DotSVG_Ctrl.prototype.unhighlight = function() {

    this.background
        .attr("stroke-width", 3)
        .attr("stroke", "#e5e5e5")

    this.updateProgress(0);

};



DotSVG_Ctrl.prototype.reset = function() {

    this.background
        .attr("stroke-width", 3)
        .attr("stroke", "#e5e5e5")

    this.ITEM.find('.mt-step-title').removeClass("active");

    this.updateProgress(0);

};















module.exports = DotSVG_Ctrl;