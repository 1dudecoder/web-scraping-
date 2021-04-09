const request = require("request");
const cheerio = require("cheerio");

const fs = require("fs");

request("https://www.espncricinfo.com/series/sri-lanka-tour-of-west-indies-2020-21-1252062/west-indies-vs-sri-lanka-2nd-test-1252074/full-scorecard",callback);

function callback (err,res,html){

    if(!err){
        fs.writeFileSync("hello.html",html);
        let $ = cheerio.load(html);
        let batsman_name  = $(".batsman-cell");
        let links = $(".batsman-cell a");

        // console.log(links.length);
        // console.log(batsman_name.length);

        for(let i = 0; i < links.length; i++){
            let batman_links = $(links[i]);
            let mylink = batman_links.attr("href");
            let name = batman_links.attr("href").text();
            
            request(mylink,newcallback);
        }

        function newcallback(err,res,html){
            if(!err){
                    fs.writeFileSync("player.html",html);

                    let $ = cheerio.load(html);
                    let born_date = $(".ciPlayerinformationtxt span");
                    let date = $(born_date[1]);

                    for(let i = 0; i < batsman_name.length; i++){
                    let names = $(batsman_name[i]);
                    console.log(names.text() + " you born on " );
                    }
                    console.log(date.text());
                    }
            }
        }
    }
