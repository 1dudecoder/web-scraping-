const request = require("request");
const cheerio = require("cheerio");
const fs = require("fs");


request("https://github.com/topics",callback);


function callback(err,res, html){
    if(!err){
        let $ = cheerio.load(html);

        let name = $(".topic-box a");

        console.log(name.length);

        for(let i = 0 ; i < name.length; i++){
            let go = $(name[i]).attr("href");
            let box_links = "https://github.com" + go;

            // console.log(box_links);  //print this to cheak the links 

            request(box_links,callrepo);
        }
    }
}

    function callrepo(err, res, html){

        if(!err){
            let $ = cheerio.load(html);

            let anc = $(".f3 a+a");
            for(let i = 0; i <= 8;i++){
                let links = $(anc[i]).attr("href");
                let myrepos = "https://github.com" + links;

                // console.log(myrepos); //print to cheack all reposes links 

                request(myrepos,issuescallback);
            }
        }
    }

    function issuescallback(err,res,html){
        if(!err){
            let $ = cheerio.load(html);
            let iss = $(".js-selected-navigation-item");
            let iss_links = $(iss[1]);
            let is_pages_links = $(iss_links).attr("href");
            let pageslink = "https://github.com" + is_pages_links;

            // console.log(pageslink);  //print this to cheak all the issues links 


            request(pageslink,findissues);
        }
    }

    function findissues(err, res, html){

        if(!err){
            let $ = cheerio.load(html);
            let issues_a = $(".Box-row .d-block");
            for(let i = 0; i < issues_a.length; i++){
                let ans = $(issues_a[i]).attr("aria-label");
                console.log(ans);  //heres all the links boi

            }
        }
    }
