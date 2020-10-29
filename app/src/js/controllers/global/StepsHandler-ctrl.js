/*jslint node: true, unused: true, esnext: true */



//----------------------------
// REQUIRE 
//----------------------------
const DisplayGlobals_SRV = require('../../services/A01_DisplayGlobals-srv'); 
const DotSVG_CTRL = require('./DotSVG-ctrl');
const Helper_SRV = require('../../services/Helper-srv');








// ------------------------------------
// Constructor
// ------------------------------------

function StepsNav_Ctrl (stepsPagesArray) {

    DisplayGlobals_SRV.setStepsNav ( this ); 

	this.currentStepId = 0;   //0 means we will have to load the landing page
    this.currentPageId = 0;

    this.stepsPagesArray = stepsPagesArray;
    this.dotsArray = [];

    _createNavigation.call(this);

}







function _createNavigation() {
    
    //Create the Navigation SVG Dots
    for (var i = 0; i < this.stepsPagesArray.length; i++) {

        this.dotsArray[i] = new DotSVG_CTRL(this.stepsPagesArray[i]) ;        

    }

    this.updateProgress.call(this);

}






StepsNav_Ctrl.prototype.updateProgress = function () {

    let totalPagesStep = this.stepsPagesArray[this.currentStepId].pagesArray.length;
    let perc = this.currentPageId/totalPagesStep * 100;

    $('.modal-title').html( this.stepsPagesArray[this.currentStepId].pagesArray[this.currentPageId].pageConfigObj.title );

    this.dotsArray[this.currentStepId].highlight();
    this.dotsArray[this.currentStepId].updateProgress(perc);    

}




















StepsNav_Ctrl.prototype.nextPage = function () {

    // 1) Flag current page as COMPLETED
    // 2) Upate Navigation Progress
    // 3) Go to next page

    Helper_SRV.consoleLog("Step / Page : ", this.currentStepId + this.currentPageId);

    this.stepsPagesArray[this.currentStepId].pagesArray[this.currentPageId].completed = true;

    this.currentPageId ++;
    if ( this.currentPageId < this.stepsPagesArray[this.currentStepId].pagesArray.length ) {
        //Load Next Available page
    }else{
        //Load Next Step
        this.dotsArray[this.currentStepId].updateProgress(100);
        this.currentPageId = 0;
        this.currentStepId ++;
    }

    DisplayGlobals_SRV.getPageController().loadPage();

};



StepsNav_Ctrl.prototype.previousPage = function () {

    // 1) Upate Navigation Progress
    // 2) Go to previous page

    this.currentPageId --;

    if ( this.currentPageId < 0 ) {
        if (this.currentStepId != 0) {
            //Make the current Step as completed
            this.dotsArray[this.currentStepId].unhighlight();
        }
        this.currentStepId --;
        this.currentPageId = this.stepsPagesArray[this.currentStepId].pagesArray.length-1;
    }else{
        //Load Next Available page
    }

   DisplayGlobals_SRV.getPageController().loadPage();

};





StepsNav_Ctrl.prototype.getCurrentPosition = function () {

    return [this.currentStepId,this.currentPageId];

};



StepsNav_Ctrl.prototype.goToStep = function (stepId) {

    this.currentStepId = stepId; 
    this.currentPageId = 0;

    for (var i = this.dotsArray.length-1; i > stepId; i--) {
        this.dotsArray[i].reset();
    }

    DisplayGlobals_SRV.getPageController().loadPage();

};










module.exports = StepsNav_Ctrl;