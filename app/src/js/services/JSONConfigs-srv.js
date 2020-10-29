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

            "step_title" : "Choose Demo",
            "step_idName": "choose_demo",       

            "page0" : {
                "title" : "Buzz Radar Demo Assistant",
                "introtext"  : "<p>Hi!</p><p>Here you can pick the Buzz Radar service you'd like to explore.</p>",
                "item" : {
                    type : "2choices",
                },
                "cta"   : {
                    
                }
            },

            "page1" : {
                "title" : "Buzz Radar Demo Assistant",
                "introtext"  : '<p>You have chosen <strong><u>Influencer/Individual</u></strong> Analysis</p><p class="mb-3 mt-3"><img class="img-fluid rounded" src="images/br_simple_diagram.jpg" alt="Answer two key questions every marketer has today"></p><p>For this demo we are going to profile an individual of your choice from Twitter using our Audience AI technology.</p>',
                "item" : {
                    type : "textandpar",
                },
                "cta"   : {
                    "back" : '<i class="fa fa-arrow-left"></i> Back',
                    "submit" : "Let's Go",
                }
            },

        },




        









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


        },





        "step2" : {

            "step_title" : "Your Details",
            "step_idName": "user_details",       

            "page0" : {
                "title" : "Your Details",
                "introtext"  : "<p>For the last step of the assistant we need to get some of your details.</p><p>Tell us who you are.</p>",
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

            "page1" : {
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

            "page2" : {
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

            "page3" : {
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
            },

            "page4" : {
                "title" : "Privacy Settings",
                "introtext"  : '<img class="img-fluid" src="images/gdpr.png" alt="GDPR" /><p>With such powerful technology comes great responsibility to use data ethically and within all legal and industry guidelines. That’s why, even though we only use publicly available social posts, we anonymise and aggregate all profiles while not storing any specific customer identifying data after processing, all in compliance with GDPR.</p>',
                "item" : {
                    type : "textandpar",
                },
                "cta"   : {
                    "back" : '<i class="fa fa-arrow-left"></i> Back',
                    "submit" : "Good! Carry on",
                }
            },

            "page5" : {
                "title" : "Checking your data...",
                "introtext"  : "<p>We are now analysing the data using our Audience AI. The results come in the form of Big 5 (OCEAN) model, which you can learn more about <a href='https://en.wikipedia.org/wiki/Big_Five_personality_traits' target='_blank'>here</a>, and the Myres Briggs Analysis model you can learn about <a href='https://en.wikipedia.org/wiki/Myers%E2%80%93Briggs_Type_Indicator' target='_blank'>here</a>. Results can take a few moments depending how much you post.</p>",
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
