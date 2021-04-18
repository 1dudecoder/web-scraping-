const request = require("request");
const cheerio = require("cheerio");
const fs = require("fs");

request("https://www.pagalworld.tv/indian-pop-mp3-songs-2019/files.html",songscall0);
let testdata =[];
function songscall0(err,res,html)
{
    if(!err)
    {
        let $= cheerio.load(html);
        let nextpage = $(".name-sort li a");
        for( let j =0; j<4; j++)
            {   let npage = $(nextpage[j]).attr("href");
                request("https://www.pagalworld.tv/"+npage,songscall);
            }
    }
}
function songscall(err,res,html)
{
    if(!err)
    {   fs.writeFileSync("ht.html",html);
        let $ = cheerio.load(html);
        let songslist = $(".listbox");
        let len = songslist.length;
        // console.log(len);
        for( let i =0; i<len; i++)
        {   
                let songslink = $(songslist[i]).find("a").attr("href");
                request("https://www.pagalworld.tv/"+songslink, download);
           
        }
    }
}

function download(err,res,html)
{
    if(!err)
    {   
        fs.writeFileSync("dt.html",html);
        let $ = cheerio.load(html);
        let artist = $(".col-xs-8.col-sm-12.col-md-9.col-lg-9.f-desc");
        let artist_name = $(artist[1]).text();
        let downloadlinks = $(".downloaddiv");
        let downloadlink =$(downloadlinks[0]).find("a").attr("href");
        testdata.push({
            "Artist": artist_name,
            "Download_Link":"https://pwdown.com/"+downloadlink,
        });
        
        fs.writeFileSync("test.json",JSON.stringify(testdata));
       
    }
}