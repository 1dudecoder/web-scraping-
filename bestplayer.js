const request = require("request");
const cheerio = require("cheerio");
const fs = require("fs");


request("https://www.espncricinfo.com/series/a20-league-2020-21-1255254/goltay-cricket-academy-vs-rajkot-thunders-12th-match-1255778/full-scorecard",callback);


function callback(err,res, html){
    if(!err){
        fs.writeFileSync("bestplayer.html",html);
        let $ = cheerio.load(html);
        let name = $(".best-player-name");
        let ans = $(name);
        console.log(ans.text());
    }
}