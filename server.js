//:HN1: Heroku_Node:01
//:     Minimal example to serve Html + Javascript.

var PORT = process.env.PORT || 5190 ;
var http = require('http');
var   fs = require('fs'  );

const HN1_Get_Fas =function( src_pat ){

    var pro=( new Promise() );

    fs.readFile( src_pat,function(obj_err,dat_fil ){
        if( obj_err ){
            pro.reject( obj_err );
        }else{
            pro.accept( dat_fil );
        };;
    });;

    return( pro );
};;

const HN1_Ser_Fil =function( rar,pac ){ "use strict"
    
    fs.readFile( pac[0],function(obj_err,dat_fil){

        if(obj_err){

            rar[1].end("[not_nil:obj_err]");

        }else{

            rar[1].writeHead(200,{ "Content-Type": pac[1] });
            rar[1].end( dat_fil , "utf-8" );

        };;
    });;

};;

const HN1_Mai=function(){ "use strict"

    http.createServer( function(req, res){
        var rar=[ req,res ];

        var jum_dic={
            "/K" : [ "./key._" , "text/plain"      ]
        ,   "/H" : [ "./htm._" , "text/html"       ]
        ,   "/J" : [ "./j_s._" , "text/javascript" ]
        };;

        HN1_Ser_Fil( rar 
        ,   jum_dic[ rar[0].url ] //:Selected_Path
        ||  jum_dic[    "/K"    ] //:Default__Path
        );;

    }).listen(PORT);
};;

HN1_Mai();