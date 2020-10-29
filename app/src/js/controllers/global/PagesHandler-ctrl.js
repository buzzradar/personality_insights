/*jslint node: true, unused: true, esnext: true */


const _ = require("lodash");


//----------------------------
// REQUIRE 
//----------------------------
const DisplayGlobals_SRV = require('../../services/A01_DisplayGlobals-srv'); 
const HBTemplates = require('../../services/HBTemplates-srv');
const Page_CTRL = require('../global/Page-ctrl');
const Helper_SRV = require('../../services/Helper-srv');
const DisplayInfluencerData_CTRL = require('../global/DisplayInfluencerData-ctrl');
const DisplayBrandsData_CTRL = require('../global/DisplayBrandsData-ctrl');









// ------------------------------------
// Constructor
// ------------------------------------

function Page_Ctrl (stepsPagesArray) {

    DisplayGlobals_SRV.setPageController ( this ); 

    this.NAV =  DisplayGlobals_SRV.getStepsNav();
    this.stepsPagesArray =  DisplayGlobals_SRV.getPagesArray();
    this.personalityData = {
        "twitter_account":{"id":6571602,"id_str":"6571602","name":"Patrick Charlton","screen_name":"Pat_Charlton","location":"Camden Town, London","description":"Part time racing driver and floppy haired Co-Founder of Real-time social visualisation company Buzz Radar","url":null,"entities":{"description":{"urls":[]}},"protected":false,"followers_count":552,"friends_count":703,"listed_count":24,"created_at":"Mon Jun 04 14:41:13 +0000 2007","favourites_count":174,"utc_offset":null,"time_zone":null,"geo_enabled":true,"verified":false,"statuses_count":1349,"lang":"en","status":{"created_at":"Tue Nov 13 11:12:40 +0000 2018","id":1062302219255664600,"id_str":"1062302219255664640","text":"@FR314 @buzzradar Thanks @FR314! It’s been too long let’s catch up for a coffee soon please!","truncated":false,"entities":{"hashtags":[],"symbols":[],"user_mentions":[{"screen_name":"FR314","name":"Ben Donkor ⚡️","id":348736282,"id_str":"348736282","indices":[0,6]},{"screen_name":"buzzradar","name":"Buzz Radar","id":599581150,"id_str":"599581150","indices":[7,17]},{"screen_name":"FR314","name":"Ben Donkor ⚡️","id":348736282,"id_str":"348736282","indices":[25,31]}],"urls":[]},"source":"<a href=\"http://twitter.com/download/iphone\" rel=\"nofollow\">Twitter for iPhone</a>","in_reply_to_status_id":1062301313453695000,"in_reply_to_status_id_str":"1062301313453694976","in_reply_to_user_id":348736282,"in_reply_to_user_id_str":"348736282","in_reply_to_screen_name":"FR314","geo":null,"coordinates":null,"place":null,"contributors":null,"is_quote_status":false,"retweet_count":0,"favorite_count":1,"favorited":false,"retweeted":false,"lang":"en"},"contributors_enabled":false,"is_translator":false,"is_translation_enabled":false,"profile_background_color":"F05811","profile_background_image_url":"http://abs.twimg.com/images/themes/theme6/bg.gif","profile_background_image_url_https":"https://abs.twimg.com/images/themes/theme6/bg.gif","profile_background_tile":false,"profile_image_url":"http://pbs.twimg.com/profile_images/3380346586/445dc2f22bc98c993337b3f7f6bc325f_normal.jpeg","profile_image_url_https":"https://pbs.twimg.com/profile_images/3380346586/445dc2f22bc98c993337b3f7f6bc325f_normal.jpeg","profile_banner_url":"https://pbs.twimg.com/profile_banners/6571602/1363297906","profile_link_color":"FF3300","profile_sidebar_border_color":"86A4A6","profile_sidebar_fill_color":"4CBAF0","profile_text_color":"333333","profile_use_background_image":false,"has_extended_profile":true,"default_profile":false,"default_profile_image":false,"following":false,"follow_request_sent":false,"notifications":false,"translator_type":"none"},"watson_profile":{"word_count":5628,"processed_language":"en","personality":[{"trait_id":"big5_openness","name":"Openness","category":"personality","percentile":0.6669771327319516,"significant":true,"children":[{"trait_id":"facet_adventurousness","name":"Adventurousness","category":"personality","percentile":0.8560449365204296,"significant":true},{"trait_id":"facet_artistic_interests","name":"Artistic interests","category":"personality","percentile":0.32977593046157416,"significant":true},{"trait_id":"facet_emotionality","name":"Emotionality","category":"personality","percentile":0.21657340649017287,"significant":true},{"trait_id":"facet_imagination","name":"Imagination","category":"personality","percentile":0.754770976941933,"significant":true},{"trait_id":"facet_intellect","name":"Intellect","category":"personality","percentile":0.9373633934687061,"significant":true},{"trait_id":"facet_liberalism","name":"Authority-challenging","category":"personality","percentile":0.9189147507281203,"significant":true}]},{"trait_id":"big5_conscientiousness","name":"Conscientiousness","category":"personality","percentile":0.28113000171250857,"significant":true,"children":[{"trait_id":"facet_achievement_striving","name":"Achievement striving","category":"personality","percentile":0.6267951960513033,"significant":true},{"trait_id":"facet_cautiousness","name":"Cautiousness","category":"personality","percentile":0.2628175549489673,"significant":true},{"trait_id":"facet_dutifulness","name":"Dutifulness","category":"personality","percentile":0.4767515138894757,"significant":true},{"trait_id":"facet_orderliness","name":"Orderliness","category":"personality","percentile":0.21338908378897664,"significant":true},{"trait_id":"facet_self_discipline","name":"Self-discipline","category":"personality","percentile":0.32587505729977523,"significant":true},{"trait_id":"facet_self_efficacy","name":"Self-efficacy","category":"personality","percentile":0.7489518570706906,"significant":true}]},{"trait_id":"big5_extraversion","name":"Extraversion","category":"personality","percentile":0.7496147952381336,"significant":true,"children":[{"trait_id":"facet_activity_level","name":"Activity level","category":"personality","percentile":0.8555131587889617,"significant":true},{"trait_id":"facet_assertiveness","name":"Assertiveness","category":"personality","percentile":0.7693305152851844,"significant":true},{"trait_id":"facet_cheerfulness","name":"Cheerfulness","category":"personality","percentile":0.2875668311549935,"significant":true},{"trait_id":"facet_excitement_seeking","name":"Excitement-seeking","category":"personality","percentile":0.6755652598348744,"significant":true},{"trait_id":"facet_friendliness","name":"Outgoing","category":"personality","percentile":0.7222851091881237,"significant":true},{"trait_id":"facet_gregariousness","name":"Gregariousness","category":"personality","percentile":0.7198985266113084,"significant":true}]},{"trait_id":"big5_agreeableness","name":"Agreeableness","category":"personality","percentile":0.09360178346909942,"significant":true,"children":[{"trait_id":"facet_altruism","name":"Altruism","category":"personality","percentile":0.5333813552868784,"significant":true},{"trait_id":"facet_cooperation","name":"Cooperation","category":"personality","percentile":0.4565479941109289,"significant":true},{"trait_id":"facet_modesty","name":"Modesty","category":"personality","percentile":0.07506197896582284,"significant":true},{"trait_id":"facet_morality","name":"Uncompromising","category":"personality","percentile":0.142682169311733,"significant":true},{"trait_id":"facet_sympathy","name":"Sympathy","category":"personality","percentile":0.47593354995115256,"significant":true},{"trait_id":"facet_trust","name":"Trust","category":"personality","percentile":0.9138412844977934,"significant":true}]},{"trait_id":"big5_neuroticism","name":"Emotional range","category":"personality","percentile":0.5428813308683098,"significant":true,"children":[{"trait_id":"facet_anger","name":"Fiery","category":"personality","percentile":0.4751212376679332,"significant":true},{"trait_id":"facet_anxiety","name":"Prone to worry","category":"personality","percentile":0.4443794322196804,"significant":true},{"trait_id":"facet_depression","name":"Melancholy","category":"personality","percentile":0.5638348553628352,"significant":true},{"trait_id":"facet_immoderation","name":"Immoderation","category":"personality","percentile":0.6825991834964057,"significant":true},{"trait_id":"facet_self_consciousness","name":"Self-consciousness","category":"personality","percentile":0.3639916740732577,"significant":true},{"trait_id":"facet_vulnerability","name":"Susceptible to stress","category":"personality","percentile":0.2908755074751437,"significant":true}]}],"needs":[{"trait_id":"need_challenge","name":"Challenge","category":"needs","percentile":0.6831368912742659,"significant":true},{"trait_id":"need_closeness","name":"Closeness","category":"needs","percentile":0.060757273108429766,"significant":true},{"trait_id":"need_curiosity","name":"Curiosity","category":"needs","percentile":0.2475077825385456,"significant":true},{"trait_id":"need_excitement","name":"Excitement","category":"needs","percentile":0.4827901344836203,"significant":true},{"trait_id":"need_harmony","name":"Harmony","category":"needs","percentile":0.041633334933415034,"significant":true},{"trait_id":"need_ideal","name":"Ideal","category":"needs","percentile":0.3357773373517635,"significant":true},{"trait_id":"need_liberty","name":"Liberty","category":"needs","percentile":0.4077024894900151,"significant":true},{"trait_id":"need_love","name":"Love","category":"needs","percentile":0.3212700092478378,"significant":true},{"trait_id":"need_practicality","name":"Practicality","category":"needs","percentile":0.545122523211544,"significant":true},{"trait_id":"need_self_expression","name":"Self-expression","category":"needs","percentile":0.1117236994293821,"significant":true},{"trait_id":"need_stability","name":"Stability","category":"needs","percentile":0.01541744420663127,"significant":true},{"trait_id":"need_structure","name":"Structure","category":"needs","percentile":0.3032036084511348,"significant":true}],"values":[{"trait_id":"value_conservation","name":"Conservation","category":"values","percentile":0.06051510969194651,"significant":true},{"trait_id":"value_openness_to_change","name":"Openness to change","category":"values","percentile":0.7327287472285315,"significant":true},{"trait_id":"value_hedonism","name":"Hedonism","category":"values","percentile":0.3298055168494798,"significant":true},{"trait_id":"value_self_enhancement","name":"Self-enhancement","category":"values","percentile":0.7405180906970372,"significant":true},{"trait_id":"value_self_transcendence","name":"Self-transcendence","category":"values","percentile":0.20244960528328526,"significant":true}],"behavior":[{"trait_id":"behavior_sunday","name":"Sunday","category":"behavior","percentage":0.10810810810810811},{"trait_id":"behavior_monday","name":"Monday","category":"behavior","percentage":0.16216216216216217},{"trait_id":"behavior_tuesday","name":"Tuesday","category":"behavior","percentage":0.12162162162162163},{"trait_id":"behavior_wednesday","name":"Wednesday","category":"behavior","percentage":0.16756756756756758},{"trait_id":"behavior_thursday","name":"Thursday","category":"behavior","percentage":0.17027027027027028},{"trait_id":"behavior_friday","name":"Friday","category":"behavior","percentage":0.15405405405405406},{"trait_id":"behavior_saturday","name":"Saturday","category":"behavior","percentage":0.11621621621621622},{"trait_id":"behavior_0000","name":"0:00 am","category":"behavior","percentage":0.01891891891891892},{"trait_id":"behavior_0100","name":"1:00 am","category":"behavior","percentage":0.008108108108108109},{"trait_id":"behavior_0200","name":"2:00 am","category":"behavior","percentage":0.008108108108108109},{"trait_id":"behavior_0300","name":"3:00 am","category":"behavior","percentage":0.002702702702702703},{"trait_id":"behavior_0400","name":"4:00 am","category":"behavior","percentage":0},{"trait_id":"behavior_0500","name":"5:00 am","category":"behavior","percentage":0.005405405405405406},{"trait_id":"behavior_0600","name":"6:00 am","category":"behavior","percentage":0.005405405405405406},{"trait_id":"behavior_0700","name":"7:00 am","category":"behavior","percentage":0.016216216216216217},{"trait_id":"behavior_0800","name":"8:00 am","category":"behavior","percentage":0.04864864864864865},{"trait_id":"behavior_0900","name":"9:00 am","category":"behavior","percentage":0.043243243243243246},{"trait_id":"behavior_1000","name":"10:00 am","category":"behavior","percentage":0.06486486486486487},{"trait_id":"behavior_1100","name":"11:00 am","category":"behavior","percentage":0.06486486486486487},{"trait_id":"behavior_1200","name":"12:00 pm","category":"behavior","percentage":0.07837837837837838},{"trait_id":"behavior_1300","name":"1:00 pm","category":"behavior","percentage":0.08378378378378379},{"trait_id":"behavior_1400","name":"2:00 pm","category":"behavior","percentage":0.08378378378378379},{"trait_id":"behavior_1500","name":"3:00 pm","category":"behavior","percentage":0.07837837837837838},{"trait_id":"behavior_1600","name":"4:00 pm","category":"behavior","percentage":0.08108108108108109},{"trait_id":"behavior_1700","name":"5:00 pm","category":"behavior","percentage":0.07837837837837838},{"trait_id":"behavior_1800","name":"6:00 pm","category":"behavior","percentage":0.051351351351351354},{"trait_id":"behavior_1900","name":"7:00 pm","category":"behavior","percentage":0.04864864864864865},{"trait_id":"behavior_2000","name":"8:00 pm","category":"behavior","percentage":0.02702702702702703},{"trait_id":"behavior_2100","name":"9:00 pm","category":"behavior","percentage":0.051351351351351354},{"trait_id":"behavior_2200","name":"10:00 pm","category":"behavior","percentage":0.024324324324324326},{"trait_id":"behavior_2300","name":"11:00 pm","category":"behavior","percentage":0.02702702702702703}],"warnings":[]},"personality_name":"Executive","personality_description":"You are opinionated and boisterous.\nYou are philosophical: you are open to and intrigued by new ideas and love to explore them. You are proud: you hold yourself in high regard, satisfied with who you are. And you are authority-challenging: you prefer to challenge authority and traditional values to help bring about positive changes.\nYou are motivated to seek out experiences that provide a strong feeling of prestige.\nYou are relatively unconcerned with both tradition and helping others. You care more about making your own path than following what others have done. And you think people can handle their own business without interference.","brands_matched":[{"brand_name":"Alibaba Group","brand_description":"The official corporate handle for Alibaba Group.","brand_handle":"AlibabaGroup","brand_photo":"http://pbs.twimg.com/profile_images/922921690459283456/rwVj6I1R_normal.jpg","score":100},{"brand_name":"SAP","brand_description":"SAP is helping the best-run businesses make the world run better. #TheBestRun | SAP privacy statement for followers: https://t.co/JRq4xVCJA4","brand_handle":"SAP","brand_photo":"http://pbs.twimg.com/profile_images/883004037385175040/KCQKBM9__normal.jpg","score":100},{"brand_name":"Citi","brand_description":"Serving as a trusted partner to our clients by responsibly providing financial services that enable growth & economic progress. Customer service: @AskCiti","brand_handle":"Citi","brand_photo":"http://pbs.twimg.com/profile_images/1995999738/CitiBlueWave_normal.jpg","score":61},{"brand_name":"HSBC","brand_description":"Official account for HSBC. Supporting human ambition for over 150 years. Follow us for global news & information. Learn more about us at https://t.co/wZLQDzi50d","brand_handle":"HSBC","brand_photo":"http://pbs.twimg.com/profile_images/880383185993031680/DcxbeyA2_normal.jpg","score":46},{"brand_name":"YouTube","brand_description":"Pivoting to video.","brand_handle":"YouTube","brand_photo":"http://pbs.twimg.com/profile_images/985908628329771008/QGaAYux6_normal.jpg","score":46},{"brand_name":"J.P. Morgan","brand_description":"Official Twitter account for the latest company news and updates from Asset Management, Private Banking, and the Corporate and Investment Bank.","brand_handle":"jpmorgan","brand_photo":"http://pbs.twimg.com/profile_images/461908736106168320/S9sGEWmY_normal.png","score":42},{"brand_name":"Shell","brand_description":"The official Twitter handle of Royal Dutch Shell, one of the world’s most innovative energy companies.","brand_handle":"Shell","brand_photo":"http://pbs.twimg.com/profile_images/934717921816993793/H1vB6P7o_normal.jpg","score":15},{"brand_name":"Huawei Technologies","brand_description":"Welcome to the official Huawei Twitter account. Our mission is to bring digital to every person, home and organization for a fully connected, intelligent world.","brand_handle":"Huawei","brand_photo":"http://pbs.twimg.com/profile_images/1000990208643317760/6XIfnRVW_normal.jpg","score":15},{"brand_name":"Vodafone Group","brand_description":"Welcome to our official twitter account. We share news and information from across Vodafone. For customer queries, go to 'Choose Country' on our website.","brand_handle":"VodafoneGroup","brand_photo":"http://pbs.twimg.com/profile_images/915700782531522560/XJP2ZISI_normal.jpg","score":11},{"brand_name":"Nissan","brand_description":"The official Nissan global handle. https://t.co/QCj4IgZZTx","brand_handle":"Nissan","brand_photo":"http://pbs.twimg.com/profile_images/674966607362420737/9MmPsdT1_normal.png","score":3},{"brand_name":"Cisco","brand_description":"Official info on Cisco news, events and technology innovation. For help, reach out to @Cisco_Support or @HeyCisco.","brand_handle":"Cisco","brand_photo":"http://pbs.twimg.com/profile_images/925717136281976832/UUA8Cz6q_normal.jpg","score":3}]
    };
    

    _init.call(this);

}




function _init() {

    _loadPage.call(this);

}




function _loadPage() {




	// console.clear();
	// console.log("HARDCODED DATA - Bose");

	// var brandId = 'bose';
	// var jsonBrand = "js/json/"+brandId+".json";

	// $.getJSON( jsonBrand, function( data ) {
	//   	console.log("Json Brand Data",brandId, data);
 //    	new DisplayBrandsData_CTRL( brandId, data.dataObj );
	// });




    let currentStepId = this.NAV.getCurrentPosition()[0];
    let currentPageId = this.NAV.getCurrentPosition()[1];

    if (currentStepId >= this.stepsPagesArray.length){

        Helper_SRV.consoleLog("The assistant is over!!!! Num Steps done:", currentStepId, "info");

        //At this point all steps are completed, small delay and display all data
        setTimeout(function(){

        	var typeDemo = DisplayGlobals_SRV.getPersonalityInsightsData().type;
        	var dataToShow = DisplayGlobals_SRV.getPersonalityInsightsData().data;
        	var brand = DisplayGlobals_SRV.getPersonalityInsightsData().brand_name;

        	if (typeDemo == "influencer") {
	            new DisplayInfluencerData_CTRL( dataToShow );
        	}else{
        		new DisplayBrandsData_CTRL( brand, dataToShow );
        	}

        },1300);

    }else{

        $('.bz-page-messages').empty();
        $('.form-actions').removeClass('no-border');

        this.NAV.updateProgress();
        this.stepsPagesArray[currentStepId].pagesArray[currentPageId].pageControllerObj = new Page_CTRL(this.stepsPagesArray[currentStepId].pagesArray[currentPageId]); 
    }

}




function _resetPage() {

    this.pageId = 0;

}













































Page_Ctrl.prototype.completeSection = function () {

    this.NAV.completeCurrentSection();
    this.NAV.next();
    _resetPage.call(this);
    _loadPage.call(this);

};



Page_Ctrl.prototype.endAssistant = function () {

    this.NAV.completeCurrentSection();

};



Page_Ctrl.prototype.loadPage = function () {

    _loadPage.call(this);
    
};



Page_Ctrl.prototype.getCurrentPageObject = function () {

    return this.ARRAY_PAGES[this.NAV.getCurrentStep()][this.pageId];

};



Page_Ctrl.prototype.showMessage = function (messageCopy, typeMessage) {

    let msgContainer = $('.bz-page-messages');
    let message = '';

    switch(typeMessage){
        case "error":
            $('.btn').addClass('disabled');
            message = '<div class="alert alert-danger">'+messageCopy+'</div>';
        break;
        case "warning":
            message = '<div class="alert alert-warning">'+messageCopy+'</div>';
        break;
    }

    msgContainer.html(message);

};















module.exports = Page_Ctrl;