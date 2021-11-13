// Get User Tweet timeline by user ID
// https://developer.twitter.com/en/docs/twitter-api/tweets/timelines/quick-start

const needle = require('needle');
const express = require('express')
const fs = require('fs')
const { exec } = require('child_process');
const app = express()
const port = 3000
var tlist = []

app.get('/', (req, res) => {
    const ls = exec('node fetch.js', function (error, stdout, stderr) {
        if (error) {
          console.log(error.stack);
          console.log('Error code: '+error.code);
          console.log('Signal received: '+error.signal);
        }
        console.log('Child Process STDOUT: '+stdout);
    });
      
    ls.on('exit', function (code) {
        console.log('Child process exited with exit code '+code);
    });
    fs.readFile('layout.html', 'utf8' , (err, htmldata) => {
        if (err) {
            console.error(err)
            return
        }
        fs.readFile('./tweets.json', 'utf8', (err, tweets) => {

            if (err) {
                console.log(`Error reading file from disk: ${err}`);
            } else {
        
                // parse JSON string to JSON object
                const fetchtweets = JSON.parse(tweets);
        
                // print all databases
                fetchtweets.forEach(tweet => {
                    console.log(tweet.tweet);
                    tlist.push(tweet.tweet)
                });
                res.send(htmldata + "<div class='tc' id='tc'>" + tlist[0] + tlist[1] + tlist[2] + tlist[3] + tlist[4] + tlist[5] + tlist[6] + tlist[7] + tlist[8] + tlist[9] + tlist[10] + tlist[11] + tlist[12] + tlist[13] + tlist[14] + "</div>" + "<script> function sleep(ms) { return new Promise(resolve => setTimeout(resolve, ms)); } async function jeff(){ await sleep(10000); var tw = document.getElementById('tc'); var height = await tw.offsetHeight; console.log(height); return new Promise(resolve => { if(height > 20){resolve();console.log(height); var ads = `<div style='background-image: radial-gradient( circle farthest-corner at 10% 20%,  rgba(97,186,255,1) 0%, rgba(166,239,253,1) 90.1% ); border: 4px solid white; height: ${height}px; width: 20%; position: absolute; top: 37%; left: 1%;'></div><div style='background-image: radial-gradient( circle farthest-corner at 10% 20%,  rgba(97,186,255,1) 0%, rgba(166,239,253,1) 90.1% );border: 4px solid white; height: ${height}px; width: 20%; position: absolute; top: 37%; right: 1%;'></div>`; const ww = window.screen.availWidth; if(ww > 940){ document.getElementById('ac').innerHTML = ads; }else{ console.log('screen too small'); } }else{console.log('not yet')} });} jeff(); </script>")
            }
        
        });
    })
})
  
app.listen(port, () => {
    console.log(`App listening at http://localhost:${port}`)
})

