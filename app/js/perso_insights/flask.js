/**
 * Created by Juan Infante on 5/11/2018
 */

var FLASK = function () {

    var heart_VIEW = document.getElementById("flask_heart");
    var brainCircle1_VIEW = document.getElementById("brain_circle1");
    var brainCircle2_VIEW = document.getElementById("brain_circle2");
    var brainCircle3_VIEW = document.getElementById("brain_circle3");


    var _flaskAnimateIn = function () {
        var heart_VIEW = document.getElementById("flask_heart");

        TweenMax.to(document.getElementById("flask_bottle"), 0.8, {css:{opacity:1}});
        TweenMax.to(document.getElementById("flask_brain"), 4, {delay:0.1, css:{opacity:1}});
        TweenMax.to(heart_VIEW, 0.6, {delay:0.2, css:{opacity:1}});

        setTimeout(_heartPump, 800);

        _circuit1 ();
        _circuit2 ();
        _circuit3 ();

    };

    var _heartPump = function () {
        
        var heart_VIEW = document.getElementById("flask_heart");
        TweenMax.to(heart_VIEW, 0.5, {delay:0.1, x:-4, y:-3, scaleX:1.04, scaleY:1.04, repeat:99999, yoyo:true});

    };
    
    var _circuit1 = function () {

        var tl = new TimelineMax({delay:0.5, repeat:99999});
        var brainCircle1_VIEW = document.getElementById("brain_circle1");

        tl.to (brainCircle1_VIEW, 0, {x:147, y:389, scaleX:0, scaleY:0})
            .to(brainCircle1_VIEW, 0.3, {delay:1, x:127, y:369, scaleX:1, scaleY:1, opacity:1})
            .to(brainCircle1_VIEW, 0.4, {x:58, y:300})
            .to(brainCircle1_VIEW, 0.4, {x:189, y:209})
            .to(brainCircle1_VIEW, 0.4, {x:80, y:123})
            .to(brainCircle1_VIEW, 0.3, {x:102, y:146, scaleX:0, scaleY:0, opacity:0});

    };

    var _circuit2 = function () {

        var tl = new TimelineMax({delay:0.6, repeat:99999, repeatDelay:1});
        var brainCircle2_VIEW = document.getElementById("brain_circle2");

        tl.to (brainCircle2_VIEW, 0, {x:453, y:196, scaleX:0, scaleY:0})
            .to(brainCircle2_VIEW, 0.3, {x:431, y:174, scaleX:1, scaleY:1, opacity:1})
            .to(brainCircle2_VIEW, 0.4, {x:343, y:247})
            .to(brainCircle2_VIEW, 0.4, {x:302, y:125})
            .to(brainCircle2_VIEW, 0.4, {x:492, y:86})
            .to(brainCircle2_VIEW, 0.3, {x:514, y:108, scaleX:0, scaleY:0, opacity:0});

    };

    var _circuit3 = function () {

        var tl = new TimelineMax({delay:0.8, repeat:99999, repeatDelay:1});
        var brainCircle3_VIEW = document.getElementById("brain_circle3");

        tl.to (brainCircle3_VIEW, 0, {x:578, y:214, scaleX:0, scaleY:0})
            .to(brainCircle3_VIEW, 0.3, {x:557, y:193, scaleX:1, scaleY:1, opacity:1})
            .to(brainCircle3_VIEW, 0.4, {x:504, y:295})
            .to(brainCircle3_VIEW, 0.4, {x:344, y:249})
            .to(brainCircle3_VIEW, 0.4, {x:303, y:126})
            .to(brainCircle3_VIEW, 0.4, {x:178, y:43})
            .to(brainCircle3_VIEW, 0.3, {x:200, y:65, scaleX:0, scaleY:0, opacity:0});


    };

    return {
        init: function () {
            setTimeout(_flaskAnimateIn,100);
        }
    };

}();

// FLASK.init();