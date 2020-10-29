

const _ = require("lodash");
const DisplayGlobals_SRV = require('./A01_DisplayGlobals-srv'); 




//----------------------------
// CONSTRUCTOR
//----------------------------

let _CopySRV;
let _blinkingDOM = $('.blinking_copy');

function CopySRV () {

  _CopySRV = this;

}


















//----------------------------
// PUBLIC METHODS
//----------------------------

CopySRV.prototype.getCopyFlip_MO = function (copyView, speed, flipFrequency) {

    return {

        active:false,
        timeOut:null,
        copyView:copyView,
        newCopy:"",
        flipFrequency:flipFrequency,
        flipIndex:flipFrequency,
        sliceIndex:0,
        speed:speed,
        delay:0

    };

};


CopySRV.prototype.flipCopy = function (copyFlip_MO) {

    console.log(copyFlip_MO);

    let randomLetter = "";

    copyFlip_MO.flipIndex --;

    if (copyFlip_MO.flipIndex > 0) {
        // randomLetter = BZ_Utils_SRV.getRandomLetter (copyFlip_MO.charType, copyFlip_MO.newCopy.slice(0, copyFlip_MO.sliceIndex));
        randomLetter = this.getRandomLetter();
    } else {
        copyFlip_MO.flipIndex = copyFlip_MO.flipFrequency;
        copyFlip_MO.sliceIndex ++;
    }

    let copyTemp = copyFlip_MO.newCopy.slice(0, copyFlip_MO.sliceIndex) + randomLetter;

    copyFlip_MO.copyView.textContent = copyTemp;

    console.log(copyTemp);
    
    if (copyFlip_MO.sliceIndex < copyFlip_MO.newCopy.length) {
        copyFlip_MO.timeOut = setTimeout(_flipCopy, copyFlip_MO.speed, copyFlip_MO);
    } else {
        copyFlip_MO.active = false;
        copyFlip_MO.sliceIndex = 0;
    }

};



CopySRV.prototype.getRandomLetter = function () {

    var letters = "abcdefghijklmnopqrstuvwxyz";
    var random = _.random(0,letters.length);

    return letters.slice(random,1);

}













module.exports = new CopySRV ();
