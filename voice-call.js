const Nexmo = require('nexmo')
const express = require('express')
const app = express()
const SpeechToTextV1 = require('ibm-watson/speech-to-text/v1');
var fs = require('fs');
const bodyParser = require('body-parser');
app.use(bodyParser.json());


const speechToText = new SpeechToTextV1({
  iam_apikey: 'lWwztB9Xgh9m7M7dskno9PgmV7pfg-h6Tg1XJG8PyV65',
  url: 'https://gateway-syd.watsonplatform.net/speech-to-text/api'
});


app.get('/answer', function (req, res) {
 
    const ncco = [
    {
     "action": "talk",
     "voiceName": "Raveena",
    "text": "Hi! this is an automated call from Snaphunt for reference check of the candidate.This call is being recorded."
    },
    {
     "action": "talk",
     "voiceName": "Raveena",
     "text": "Can you please tell us more about roles and responsibilities when you worked together. Please press # after answering each question"
    },
    {
    'action': 'record',
    'eventUrl': ['https://83e9ed2b.ngrok.io/questionone'],
    'endOnSilence': '3',
    'endOnKey' : '#',
    'beepStart': 'true'
    },
    {
        "action": "talk",
        "voiceName": "Raveena",
        "text": "What were their strengths"
    },
   {
       'action': 'record',
       'eventUrl': ['https://83e9ed2b.ngrok.io/questiontwo'],
       'endOnSilence': '3',
       'endOnKey' : '#',
       'beepStart': 'true'
    },
   
    
    {
    'action': 'talk',
     "voiceName": "Raveena",
    'text': 'What are their areas of development'
    },

    {
      'action': 'record',
      'eventUrl': ['https://83e9ed2b.ngrok.io/questionthree'],
      'endOnSilence': '3',
      'endOnKey' : '#',
      'beepStart': 'true'
   },
   {
    'action': 'talk',
     "voiceName": "Raveena",
    'text': 'Given a chance, would you hire them'
    },
    {
      'action': 'record',
      'eventUrl': [' https://83e9ed2b.ngrok.io/questionfour'],
      'endOnSilence': '3',
      'endOnKey' : '#',
      'beepStart': 'true'
   },
   {
    'action': 'talk',
     "voiceName": "Raveena",
    'text': 'What advice would you share with their employer'
    },
    {
      'action': 'record',
      'eventUrl': ['https://83e9ed2b.ngrok.io/questionfive'],
      'endOnSilence': '3',
      'endOnKey' : '#',
      'beepStart': 'true'
   },
   {
    'action': 'talk',
     "voiceName": "Raveena",
    'text': 'Thank you for completing this reference check on Snaphunt. Would you like to be contacted to see a demo of how Snaphunt could help with your hiring'
    }
    

    ];
    res.json(ncco);
    });

    //SPEECH RECOGNITION
   
    const speech =(audio) => {

      var params = {
        objectMode: false,
        content_type: 'audio/mp3',
        timestamps: true,
        inactivity_timeout : -1,
        interim_results: true,
        smart_formatting: true
      };
      
      var recognizeStream = speechToText.recognizeUsingWebSocket(params);

     // pipe in some audio,
      fs.createReadStream('/Users/yagnalakshmisomayajulu/Desktop/test-voice-nexmo-app/'+ audio).pipe(recognizeStream);

      recognizeStream.pipe(fs.createWriteStream('transcription.txt'));

      // To get strings instead of Buffers from received `data` events:
      recognizeStream.setEncoding('utf8');

      // Listen for events.
        recognizeStream.on('data', function(event) { onEvent('Final Transcript:', event); });
        recognizeStream.on('error', function(event) { onEvent('Error:', event); });
        recognizeStream.on('close', function(event) { onEvent('Close', event); });

        // Display events on the console.
        function onEvent(name, event) {
            console.log(name, JSON.stringify(event, null, 2));
          /*  // sentiment analysis
             if(name === 'Close'){
              try {
                const data = fs.createReadStream('/Users//yagnalakshmisomayajulu/Desktop/speech-to-text-demo/transcription.txt');
                console.log("Text:" + data);
                sentimentAnalysis(data);
              } catch (err) {
                console.error(err)
              }
             }*/
        };
  
      }


    app.post('/questionone', (req, res) => {
        let audioURL = req.body.recording_url;
        let audioFile = audioURL.split('/').pop() + '.mp3';
        
         nexmo.files.save(audioURL, audioFile, (err, response) => {
        if(response) {
          console.log('The audio is downloaded successfully!');
          speech(audioFile);
        }
        });
        res.status(204).end();
        });
      
    

     app.post('/questiontwo', (req, res) => {
            let audioURL = req.body.recording_url;
            let audioFile = audioURL.split('/').pop() + '.mp3';
             
            nexmo.files.save(audioURL, audioFile, (err, response) => {
            if(response) {
              console.log('The audio is downloaded successfully!');
              speech(audioFile);
            }

            });
            res.status(204).end();
            });    
     
      app.post('/questionthree', (req, res) => {
                let audioURL = req.body.recording_url;
                let audioFile = audioURL.split('/').pop() + '.mp3';
                
                nexmo.files.save(audioURL, audioFile, (err, response) => {
                if(response) {
                  console.log('The audio is downloaded successfully!');
                  speech(audioFile);
                }
    
                });
                res.status(204).end();
                });    
        app.post('/questionfour', (req, res) => {
                  let audioURL = req.body.recording_url;
                  let audioFile = audioURL.split('/').pop() + '.mp3';
                  
                  nexmo.files.save(audioURL, audioFile, (err, response) => {
                  if(response) {
                    console.log('The audio is downloaded successfully!');
                    speech(audioFile);
                  }
      
                  });
                  res.status(204).end();
                  });    
          app.post('/questionfive', (req, res) => {
                    let audioURL = req.body.recording_url;
                    let audioFile = audioURL.split('/').pop() + '.mp3';
                    
                    nexmo.files.save(audioURL, audioFile, (err, response) => {
                    if(response) {
                      console.log('The audio is downloaded successfully!');
                      speech(audioFile);
                    }
        
                    });
                    res.status(204).end();
                    });                       
       
    app.listen(3000);    


const nexmo = new Nexmo({
  apiKey: 'fa7df442',
  apiSecret: 'cfFNk2gSNyCHMnmT',
  applicationId: '54cda250-f699-4c73-853b-8d9968a62f26',
  privateKey: '/Users/yagnalakshmisomayajulu/Downloads/private.key'
})

nexmo.calls.create({
  to: [{
    type: 'phone',
    number: '6598280244'
  }],
  from: {
    type: 'phone',
    number: '12345678901'
  },
  answer_url: ['https://83e9ed2b.ngrok.io/answer']
}, (err, res) =>{
if(err) { console.error(err); }
else { console.log(res); }
});


