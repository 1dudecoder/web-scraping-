const request = require("request");
const cheerio = require("cheerio");
const fs = require("fs");

request("https://github.com/topics",callback);

let finaldata = [];
function callback(err,res, html){
    if(!err){
        let $ = cheerio.load(html);

        let name = $(".topic-box a");

        console.log(name.length);

        for(let i = 0 ; i < name.length; i++){
            let go = $(name[i]).attr("href");
            let box = go;
            let box_links = "https://github.com" + go;

            finaldata.push({"box_name": box,
            "box_links": box_links,
            "repositry" : []}            
            );

            request(box_links,callrepo.bind(this,i));
                
            // console.log(box_links);  //print this to cheak the links 
            // console.log(finaldata);
        }
    }
}

    function callrepo(index_of_i,err, res, html){

        if(!err){
            let $ = cheerio.load(html);
            let anc = $(".f3 a+a");
            for(let i = 0; i < 8;i++){
                let links = $(anc[i]).attr("href");
                let reponame = links;
                let myrepos = "https://github.com" + links;

                // console.log(index_of_i); //print to cheack all reposes links 

                finaldata[index_of_i]["repositry"].push({
                    "reponame" : reponame,
                    "repolinks" : myrepos,
                    "issues": []
                })

                // console.log(finaldata);
                fs.writeFileSync("finalGit.json", JSON.stringify(finaldata));

                request(myrepos,issuescallback.bind(index_of_i,i));
            }
        }
    }
    

    function issuescallback(index_of_i, index_of_second_i , err,res,html){
        if(!err){
            let $ = cheerio.load(html);
            let iss = $(".js-selected-navigation-item");
            let iss_links = $(iss[1]);
            let is_pages_links = $(iss_links).attr("href");
            let issues_names = is_pages_links;
            let pageslink = "https://github.com" + is_pages_links;

            // console.log(pageslink);  //print this to cheak all the issues links 

            // finaldata[index_of_i]["repositry"][index_of_second_i]["issues"].push({
            //     "issues name ": issues_names,
            //     "issues links": pageslink,
            //     "issues" : [] 
            // })

            request(pageslink,findissues.bind(index_of_i,index_of_second_i));
            
        }
    }

    function findissues(err, res, html){

        if(!err){
            let $ = cheerio.load(html);
            let issues_a = $(".Box-row .d-block");
            for(let i = 0; i < 8; i++){
                let ans = $(issues_a[i]).attr("aria-label");
                // console.log(ans);  //heres all the links boi

            }
        }
    }
