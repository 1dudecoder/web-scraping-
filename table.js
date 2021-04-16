const request = require("request");
const cheerio = require("cheerio");
const fs = require("fs");
const { find } = require("domutils");


request("https://www.espncricinfo.com/series/ipl-2020-21-1210595/match-results",callback);



function callback(err,res,html){
    if(!err){
        let $ = cheerio.load(html);
        let links = $("a.match-info-link-FIXTURES")
        for(let i = 0; i < links.length;i++){  // lines bdhani hai 
            let hreflink = $(links[i]).attr("href");
            let matchlinks = "https://www.espncricinfo.com/" + hreflink;
            // console.log(matchlinks);
            
            request(matchlinks,tablecallback);
        }
    }
}

function tablecallback(err,res,html){
    let myarr = [];
    if(!err){
        let $ = cheerio.load(html);
        let table_batman = $(".Collapsible__contentInner table.table.batsman tbody tr");
        // console.log(table_batman.length);


        for(let i = 0; i < table_batman.length; i+=2){

            let batsmencol = $(table_batman[i]).find("td");

            let bname = $(batsmencol[0]).text();
              

            if(bname == "Extras" ){
                i -= 1
                continue;
            }
            // console.log(bname);
            let run = $(batsmencol[2]).text();
            let b = $(batsmencol[3]).text();
            let four = $(batsmencol[4]).text();
            let six = $(batsmencol[5]).text();
            let sr = $(batsmencol[6]).text();
            myarr.push({
                "batman":{
                "name":bname,
                "run":run,
                "ball":b,
                "four":four,
                "six":six,
                "sr":sr},
            });
            // console.log( + run + ",  ball  " + b  + ",  four  "+four+",  six  "+six+",  sr  " + sr);

        }


        let table_bowler = $(".Collapsible__contentInner table.table.bowler tbody tr");

        for(let i = 0; i < table_bowler.length; i++){
            let bowler_name = $(table_bowler[i]).find("td");
            let bo_name = $(bowler_name[0]).text();
            // console.log(name);
             let o = $(bowler_name[1]).text();
            let m = $(bowler_name[2]).text();
            let r = $(bowler_name[3]).text();
            let w = $(bowler_name[4]).text();
            let econ = $(bowler_name[5]).text();
            
            myarr.push({
                "bowler_name":bo_name,
                "over":o,
                "madein":m,
                "run":r,
                "wicket":w,
                "econ":econ
            });

            fs.writeFileSync("myarr.json",JSON.stringify(myarr));
            // console.log("over " + o + ",  match  " + m  + ",  run  "+r+",  wicket  "+w+",  econ  " + econ);
        }



    }

}