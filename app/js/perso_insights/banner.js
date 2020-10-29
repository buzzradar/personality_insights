/**
 * Created by Juan Infante on 5/11/2018
 */

var Banner = function () {

	var sentenceIndex = 0;
	var charIndex = 0;
	var bannerCopyArray = [		
        "Understand your audiences more intimately",
        "Create audience insight that your creative team actually want to use rather than relying on just their instinct",
		"Insights about an audience’s personality that help spark the idea for the next great campaign",
	];
	var delayBetweenSentences = 3000;


    
    /**
     * Starts the copy animation in the banner
     */
    var startAnimation = function(){
        
        $('.banner_text_animation').find('.blinking_copy').empty();
    	animateSentence(charIndex);

    };



    var animateSentence = function(charIndex) {

    	var sentence = bannerCopyArray[sentenceIndex];
    	if (charIndex < sentence.length){
	    	setTimeout(function() {
				$('.banner_text_animation').find('.blinking_copy').append(sentence.charAt(charIndex))
				charIndex++;
				animateSentence(charIndex);
			},50);
    	}else{
    		//console.log("Sentence is over!!!");
    		//wait for a delay and then show the next one
    		sentenceIndex++;
    		if (sentenceIndex >= bannerCopyArray.length){
    			sentenceIndex = 0;
    			charIndex = 0;
    		}
    		setTimeout(function() {
	    		startAnimation();			
    		},delayBetweenSentences);
    	}
    	
    };



    

    return {
        init: function () {
        	//startAnimation();
        }
    };
}();

Banner.init();