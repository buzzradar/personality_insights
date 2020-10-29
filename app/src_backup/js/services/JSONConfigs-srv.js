/*jslint node: true, unused: true, esnext: true */




const DisplayGlobals_SRV = require('./A01_DisplayGlobals-srv'); 
const Helper_SRV = require('./Helper-srv');









//----------------------------
// CONSTRUCTOR
//----------------------------

var _JSONConfigs;


function JSONConfigs () {

  _JSONConfigs = this;

}


















//----------------------------
// PUBLIC METHODS
//----------------------------



JSONConfigs.prototype.getConfig = function () {

    var configName = "jsonConfigStructure";

    Helper_SRV.consoleLog(" -> JSON Master Config : ", configName, 'info', 'ffffa2');

    return eval(configName);
  
};


















//----------------------------
// JSON CONFIG
//----------------------------


var jsonConfigStructure = {

    "structure" : {

        "step0" : {

            "step_title" : "Your Details",
            "step_idName": "user_details",       

            "page0" : {
                "title" : "Audience Analyser Demo Tool",
                "introtext"  : "<p>Hello!</p><p>Lets get you started trying out our psychometric AI  on a social profile of your choice! This assistant will take you thought a few brief steps so we can collect some data needed for our AI to analyse.</p>",
                "item" : {
                    type : "textandpar",
                },
                "cta"   : {
                    "submit" : "Let's Go",
                }
            },

            "page1" : {
                "title" : "Your Details",
                "introtext"  : "<p>Tell us who you are.</p>",
                "item" : {
                    type            : "singleinput",
                    input_label     : "First Name",
                    input_name      : "first_name",
                },
                "cta"   : {
                    "back" : '<i class="fa fa-arrow-left"></i> Back',
                    "submit" : "Next",
                }
            },

            "page2" : {
                "title" : "Your Details",
                "introtext"  : "<p>Tell us who you are.</p>",
                "item" : {
                    type            : "singleinput",
                    input_label     : "Last Name",
                    input_name      : "last_name",
                },
                "cta"   : {
                    "back" : '<i class="fa fa-arrow-left"></i> Back',
                    "submit" : "Next",
                }
            },

            "page3" : {
                "title" : "Your Details",
                "introtext"  : "<p>Tell us who you work for.</p>",
                "item" : {
                    type            : "singleinput",
                    input_label     : "Your Company",
                    input_name      : "your_company",
                },
                "cta"   : {
                    "back" : '<i class="fa fa-arrow-left"></i> Back',
                    "submit" : "Next",
                }
            },

            "page4" : {
                "title" : "Your Details",
                "introtext"  : "<p>Tell us how to get hold of you.</p>",
                "item" : {
                    type            : "email",
                    input_label     : "Your Email",
                    input_name      : "your_email",
                    checkbox_name      : "keep_informed",
                },
                "cta"   : {
                    "back" : '<i class="fa fa-arrow-left"></i> Back',
                    "submit" : "Next",
                }
            }

        },






        // "step1" : {

        //     "step_title" : "Social Accounts",
        //     "step_idName": "social_accounts",      


        //     "page0" : {
        //         "title" : "Stage 1 Complete",
        //         "introtext"  : "<p>Right thats all the boring stuff done. Now on to the really interesting bit.</p>",
        //         "item" : {
        //             type : "textandpar",
        //         },
        //         "cta"   : {
        //             "back" : '<i class="fa fa-arrow-left"></i> Back',
        //             "submit" : "Next",   
        //         }
        //     }, 

        //     "page1" : {
        //         "title" : "Connect Facebook",
        //         "introtext"  : "<p>In order to get the best possible results we’d like your consent to connect to your Facebook. We will only be using this once to help generate the insights and once you’ve closed the page we will never use it again or store any of your data. If you don’t want to connect your facebook thats ok you can {{skipbutton}} but it may effect the accuracy of your results as the more data we have the better the result.</p>",
        //         "item" : {
        //             type            : "socialconnection",
        //             social          : "facebook",
        //             label           : "Facebook",
        //         },
        //         "cta"   : {
        //             "back" : '<i class="fa fa-arrow-left"></i> Back',
        //             "skip" : "skip",
        //         }
        //     },

        //     "page2" : {
        //         "title" : "Connect Instagram",
        //         "introtext"  : "<p>In order to get the best possible results we’d like your consent to connect to your Instagram. We will only be using this once to help generate the insights and once you’ve closed the page we will never use it again or store any of your data. If you don’t want to connect your Instagram that’s ok you can {{skipbutton}} but it may effect the accuracy of your results as the more data we have the better the result.</p>",
        //         "item" : {
        //             type            : "socialconnection",
        //             social          : "instagram",
        //             label           : "Instagram",
        //         },
        //         "cta"   : {
        //             "back" : '<i class="fa fa-arrow-left"></i> Back',
        //             "skip" : "skip",
        //         }
        //     }, 

        // },










        "step1" : {

            "step_title" : "Twitter Handle",
            "step_idName": "twitter_handle",       

            "page0" : {
                "title" : "Enter your Twitter Handle",
                "introtext"  : "<p>Now this is generally the best source of the type of unstructured data our AI loves so it can analyse your personality. So if you could enter your Twitter Handle so it can take a look that would be great. If you haven’t got a Twitter try analysing another Twitter account of someone you know well.</p>",
                "item" : {
                    type            : "singleinput",
                    input_label     : "Twitter Handle",
                    input_name      : "your_twitter_handle",
                },
                "cta"   : {
                    "back" : '<i class="fa fa-arrow-left"></i> Back',
                    "submit" : "Start Analysis",
                }
            },

            "page1" : {
                "title" : "Checking your data...",
                "introtext"  : "<p>We are now analysing your social posts using our Psychometric AI. The results come in the form of Big 5 (OCEAN) model which you can learn more about <a href='https://en.wikipedia.org/wiki/Big_Five_personality_traits' target='_blank'>here</a> and the Myres Briggs Analysis model you can learn about <a href='https://en.wikipedia.org/wiki/Myers%E2%80%93Briggs_Type_Indicator' target='_blank'>here</a>. Results can take a few moments depending how much you post.</p>",
                "item" : {
                    type            : "preloader",
                },
                "cta"   : {
                    
                }
            },

        },
























    } 

};




































































module.exports = new JSONConfigs ();
