const fs = require('fs')
const needle = require('needle');
const express = require('express')
const app = express()
const port = 3000
var tlist = []

const userId = "745273"
const userId2 = "33104659"
const userId3 = "226428094"
const userId4 = "2188509068"
const userId5 = "388426142"
const url = `https://api.twitter.com/2/users/${userId}/tweets`
const url2 = `https://api.twitter.com/2/users/${userId2}/tweets`
const url3 = `https://api.twitter.com/2/users/${userId3}/tweets`
const url4 = `https://api.twitter.com/2/users/${userId4}/tweets`
const url5 = `https://api.twitter.com/2/users/${userId5}/tweets`

const bearerToken = 'AAAAAAAAAAAAAAAAAAAAAFRZVAEAAAAAc3SZiBTPqBCv7i9d27BmXtrg8n8%3DplhZZQcBosg4yuDtiZuGFtT1RoPa2JwtUMM8tkrI3lpxIzHuUO';

async function gettweets(){
    fs.readFile('./time.json', 'utf8', (err, time) => {

        if (err) {
            console.log(`Error reading file from disk: ${err}`);
        } else {
    
            // parse JSON string to JSON object
            const lasttime = JSON.parse(time);
            lasttime.forEach(last => {
                console.log(last.timestamp);
                lastreq = last.timestamp
            });
            const d = new Date();
            const curtime = d.getTime();
            if(curtime > (lastreq + 86400000)){
                console.log("ready to fetch new tweets")
                let newtime = {
                    timestamp: curtime
                }
                const newstamp = '[' + JSON.stringify(newtime) + ']';
                fs.writeFile('./time.json', newstamp, 'utf8', (err) => {

                    if (err) {
                        console.log(`Error writing file: ${err}`);
                    } else {
                        console.log(`File is written successfully!`);
                    }

                });
                fs.readFile('./tweets.json', 'utf8', (err, data) => {

                    if (err) {
                        console.log(`Error reading file: ${err}`);
                    } else {
                        // parse JSON string to JSON object
                        const tweets = JSON.parse(data);
                        async function fetch(){
                            let userTweets = [];

                            let params = {
                                "max_results": 5,
                                "tweet.fields": "created_at",
                                "expansions": "author_id"
                            }
                        
                            const options = {
                                headers: {
                                    "User-Agent": "v2UserTweetsJS",
                                    "authorization": `Bearer ${bearerToken}`
                                }
                            }
                        
                            let hasNextPage = true;
                            let nextToken = null;
                            let userName;
                            console.log("Retrieving Tweets...");
                        
                            if (nextToken) {
                                params.pagination_token = nextToken;
                            }
                        
                            try {
                                const resp = await needle('get', url, params, options);
                        
                                if (resp.statusCode != 200) {
                                    return;
                                }
                                const resp2 = await needle('get', url2, params, options);
                        
                                if (resp2.statusCode != 200) {
                                    return;
                                }
                                const resp3 = await needle('get', url3, params, options);
                        
                                if (resp3.statusCode != 200) {
                                    return;
                                }
                                const resp4 = await needle('get', url4, params, options);
                        
                                if (resp4.statusCode != 200) {
                                    return;
                                }
                                const resp5 = await needle('get', url5, params, options);
                                if (resp5.statusCode != 200) {
                                    return;
                                }

                                console.log(resp5.body.data[0]["id"])
                                tlist.push("<div class='t'><blockquote class='twitter-tweet'><a href='https://twitter.com/" + "IAmMarkManson" + "/status/" + resp5.body.data[0]["id"] + "?ref_src=twsrc%5Etfw'></a></blockquote> <script async src='https://platform.twitter.com/widgets.js' charset='utf-8'></script></div>")
                                tlist.push("<div class='t'><blockquote class='twitter-tweet'><a href='https://twitter.com/" + "IAmMarkManson" + "/status/" + resp5.body.data[1]["id"] + "?ref_src=twsrc%5Etfw'></a></blockquote> <script async src='https://platform.twitter.com/widgets.js' charset='utf-8'></script></div>")
                                tlist.push("<div class='t'><blockquote class='twitter-tweet'><a href='https://twitter.com/" + "IAmMarkManson" + "/status/" + resp5.body.data[2]["id"] + "?ref_src=twsrc%5Etfw'></a></blockquote> <script async src='https://platform.twitter.com/widgets.js' charset='utf-8'></script></div>")
                                tlist.push("<div class='t'><blockquote class='twitter-tweet'><a href='https://twitter.com/" + "mkobach" + "/status/" + resp4.body.data[0]["id"] + "?ref_src=twsrc%5Etfw'></a></blockquote> <script async src='https://platform.twitter.com/widgets.js' charset='utf-8'></script></div>")
                                tlist.push("<div class='t'><blockquote class='twitter-tweet'><a href='https://twitter.com/" + "mkobach" + "/status/" + resp4.body.data[1]["id"] + "?ref_src=twsrc%5Etfw'></a></blockquote> <script async src='https://platform.twitter.com/widgets.js' charset='utf-8'></script></div>")
                                tlist.push("<div class='t'><blockquote class='twitter-tweet'><a href='https://twitter.com/" + "mkobach" + "/status/" + resp4.body.data[2]["id"] + "?ref_src=twsrc%5Etfw'></a></blockquote> <script async src='https://platform.twitter.com/widgets.js' charset='utf-8'></script></div>")
                                tlist.push("<div class='t'><blockquote class='twitter-tweet'><a href='https://twitter.com/" + "JamesClear" + "/status/" + resp3.body.data[0]["id"] + "?ref_src=twsrc%5Etfw'></a></blockquote> <script async src='https://platform.twitter.com/widgets.js' charset='utf-8'></script></div>")
                                tlist.push("<div class='t'><blockquote class='twitter-tweet'><a href='https://twitter.com/" + "JamesClear" + "/status/" + resp3.body.data[1]["id"] + "?ref_src=twsrc%5Etfw'></a></blockquote> <script async src='https://platform.twitter.com/widgets.js' charset='utf-8'></script></div>")
                                tlist.push("<div class='t'><blockquote class='twitter-tweet'><a href='https://twitter.com/" + "JamesClear" + "/status/" + resp3.body.data[2]["id"] + "?ref_src=twsrc%5Etfw'></a></blockquote> <script async src='https://platform.twitter.com/widgets.js' charset='utf-8'></script></div>")
                                tlist.push("<div class='t'><blockquote class='twitter-tweet'><a href='https://twitter.com/" + "ShaneAParrish" + "/status/" + resp2.body.data[0]["id"] + "?ref_src=twsrc%5Etfw'></a></blockquote> <script async src='https://platform.twitter.com/widgets.js' charset='utf-8'></script></div>")
                                tlist.push("<div class='t'><blockquote class='twitter-tweet'><a href='https://twitter.com/" + "ShaneAParrish" + "/status/" + resp2.body.data[1]["id"] + "?ref_src=twsrc%5Etfw'></a></blockquote> <script async src='https://platform.twitter.com/widgets.js' charset='utf-8'></script></div>")
                                tlist.push("<div class='t'><blockquote class='twitter-tweet'><a href='https://twitter.com/" + "ShaneAParrish" + "/status/" + resp2.body.data[2]["id"] + "?ref_src=twsrc%5Etfw'></a></blockquote> <script async src='https://platform.twitter.com/widgets.js' charset='utf-8'></script></div>")
                                tlist.push("<div class='t'><blockquote class='twitter-tweet'><a href='https://twitter.com/" + "naval" + "/status/" + resp.body.data[0]["id"] + "?ref_src=twsrc%5Etfw'></a></blockquote> <script async src='https://platform.twitter.com/widgets.js' charset='utf-8'></script></div>")
                                tlist.push("<div class='t'><blockquote class='twitter-tweet'><a href='https://twitter.com/" + "naval" + "/status/" + resp.body.data[1]["id"] + "?ref_src=twsrc%5Etfw'></a></blockquote> <script async src='https://platform.twitter.com/widgets.js' charset='utf-8'></script></div>")
                                tlist.push("<div class='t'><blockquote class='twitter-tweet'><a href='https://twitter.com/" + "naval" + "/status/" + resp.body.data[2]["id"] + "?ref_src=twsrc%5Etfw'></a></blockquote> <script async src='https://platform.twitter.com/widgets.js' charset='utf-8'></script></div>")
                                console.log(tlist.length)
                            } catch (err) {
                                throw new Error(`Request failed: ${err}`);
                            }
                            var item = tlist[Math.floor(Math.random()*tlist.length)];
                            tlist.splice(tlist.indexOf(item), 1)
                            var item2 = tlist[Math.floor(Math.random()*tlist.length)];
                            tlist.splice(tlist.indexOf(item2), 1)
                            var item3 = tlist[Math.floor(Math.random()*tlist.length)];
                            tlist.splice(tlist.indexOf(item3), 1)
                            var item4 = tlist[Math.floor(Math.random()*tlist.length)];
                            tlist.splice(tlist.indexOf(item4), 1)
                            var item5 = tlist[Math.floor(Math.random()*tlist.length)];
                            tlist.splice(tlist.indexOf(item5), 1)
                            var item6 = tlist[Math.floor(Math.random()*tlist.length)];
                            tlist.splice(tlist.indexOf(item6), 1)
                            var item7 = tlist[Math.floor(Math.random()*tlist.length)];
                            tlist.splice(tlist.indexOf(item7), 1)
                            var item8 = tlist[Math.floor(Math.random()*tlist.length)];
                            tlist.splice(tlist.indexOf(item8), 1)
                            var item9 = tlist[Math.floor(Math.random()*tlist.length)];
                            tlist.splice(tlist.indexOf(item9), 1)
                            var item10 = tlist[Math.floor(Math.random()*tlist.length)];
                            tlist.splice(tlist.indexOf(item10), 1)
                            var item11 = tlist[Math.floor(Math.random()*tlist.length)];
                            tlist.splice(tlist.indexOf(item11), 1)
                            var item12 = tlist[Math.floor(Math.random()*tlist.length)];
                            tlist.splice(tlist.indexOf(item12), 1)
                            console.log(tlist)
                            var item13 = tlist[Math.floor(Math.random()*tlist.length)];
                            tlist.splice(tlist.indexOf(item13), 1)
                            var item14 = tlist[Math.floor(Math.random()*tlist.length)];
                            tlist.splice(tlist.indexOf(item14), 1)
                            var item15 = tlist[Math.floor(Math.random()*tlist.length)];
                            console.log(tlist.length)
                            let addtweet = [
                                { tweet: item },
                                { tweet: item2 },
                                { tweet: item3 },
                                { tweet: item4 },
                                { tweet: item5 },
                                { tweet: item6 },
                                { tweet: item7 },
                                { tweet: item8 },
                                { tweet: item9 },
                                { tweet: item10 },
                                { tweet: item11 },
                                { tweet: item12 },
                                { tweet: item13 },
                                { tweet: item14 },
                                { tweet: item15 }
                            ];
                            
                            // convert JSON object to a string
                            const newtweet = JSON.stringify(addtweet);
                            const fulldata = newtweet
                            fs.writeFile('./tweets.json', fulldata, 'utf8', (err) => {
                                if (err) {
                                    console.log(`Error writing file: ${err}`);
                                } else {
                                    console.log(`File is written successfully!`);
                                }
                            
                            });
                        }
                        fetch()
                        
                    }
                });
            }
            else{
                console.log("not ready yet")
            }
        }
    
    });
}
gettweets();