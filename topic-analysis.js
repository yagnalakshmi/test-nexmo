var request = require("request")

var requestData = {
                "ServiceFlag": "EDP,RISKREPT,SEG", 
                "TestData": [
                                {
                                "Topic": "Reference check",
                                "Question": "Background",
                                "Power": 10,
                                "URL": "https://yagnalakshmi.github.io/test-nexmo-voice/Question1.mp3"
                                }, 
                                {
                                "Topic": "Reference check",
                                "Question": "Strengths",
                                "Power": 30,
                                "URL": "https://yagnalakshmi.github.io/test-nexmo-voice/Question2.mp3"
                                }, 
                                {
                                "Topic": "Reference check",
                                "Question": "Weakness",
                                "Power": 40,
                                "URL": "https://yagnalakshmi.github.io/test-nexmo-voice/Question3.mp3"
                                } ,
                                {
                                    "Topic": "Reference check",
                                    "Question": "Hiring Potenial",
                                    "Power": 40,
                                    "URL": "https://yagnalakshmi.github.io/test-nexmo-voice/Question4.mp3"
                                    } ,
                                {
                                  "Topic": "Reference check",
                                  "Question": "Recommendation",
                                  "Power": 30,
                                   "URL": "https://yagnalakshmi.github.io/test-nexmo-voice/Question5.mp3"
                                }     
                            ]
                       }

    url = 'http://rservice.nemesysco.net/RadvAnalysis/'

    request({
        url: url,
        method: "POST",
        json: requestData,
        headers:{
            'N-MS-AUTHCB': "5ED9672B-EB26-40A4-9C75-E1F88B6E8757",
            'Content-Type': 'application/json'
         }

        
    }, function (error, response, body) {
        if (!error && response.statusCode === 200) {
            console.log(body)
        }
        else {

            console.log("error: " + error)
            console.log("response.statusCode: " + response.statusCode)
            console.log("response.statusText: " + response.statusText)
        }
    });