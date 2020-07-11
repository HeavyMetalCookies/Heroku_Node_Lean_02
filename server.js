//:HN1: Heroku_Node:01
//:     Minimal example to serve Html + Javascript.

var PORT = process.env.PORT || 5190 ;
var http = require('http');
var   fs = require('fs'  );

//: function New_SimplePromise(){
//: 
//:     var trigger=( 0 );
//: 
//:     function executor( func_1, func_2 ){
//:         
//:         while( 1 ){
//: 
//:             if( trigger == 1 ){ func_1( a ); break; };
//:             if( trigger == 2 ){ func_2( b ); break; };
//: 
//:     };;
//:     var pro=( new Promise( executor ) );
//:     return( pro );
//: 
//: };;

const HN2_Get_Fas =function( src_pat ){

  //  const RESOLVER=(a)=>{ return( a ); };
  //  const REJECTOR=(a)=>{ return( a ); };
    const EXECUTOR=( RESOLVER , REJECTOR )=>{

        fs.readFile( src_pat,function(obj_err,dat_fil ){
            if( obj_err ){

                REJECTOR( obj_err );

            }else{

                RESOLVER( dat_fil );

            };;
        });;
    };;

    var pro=( new Promise( EXECUTOR ) );
    return( pro );
};;

const HN2_SQL_Get_Tes =function( rar_daw ){ "use strict"

    var rar=rar_daw[ 0 ];
    var daw=rar_daw[ 1 ];
    //:rar[1].end("[TODO:HN2_SQL_Get_Tes]");

   
    HN2_Get_Fas( daw[0] /* src_pat */ )
        .then((dat_fil)=>{
        
            rar[1].end( dat_fil );
        
        }).catch((obj_err)=>{
        
            rar[1].end( "[UH_OH]:" + obj_err.toString() );
        
        });;

};;

const HN2_Ser_Fil =function( rar_daw ){ "use strict"

    var rar=rar_daw[ 0 ];
    var daw=rar_daw[ 1 ];
    
    fs.readFile( daw[0],function(obj_err,dat_fil){

        if(obj_err){

            rar[1].end("[not_nil:obj_err]");

        }else{

            rar[1].writeHead(200,{ "Content-Type": daw[1] });
            rar[1].end( dat_fil , "utf-8" );

        };;
    });;

};;

//:¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯://
//: main request routing function.                           ://
//:                                                          ://
//: Routes can be thought of shortcuts that are associated   ://
//: with a piece of data and an action, in a triplet.        ://
//:                                                          ://
//:     ROUTE           : The URL requested by client        ://
//:     DATA            : Data associated with route         ://
//:     ACTION|WHATEVER : What to do with the DATA           ://
//:                                                          ://
//: Because the last entry of the triplet is an              ://
//: "ACTION | WHATEVER" we need to resolve the               ://
//: "ACTION | WHATEVER" string to an ACTION function         ://
//: to perform using the DATA associated with ROUTE.         ://
//:                                                          ://
//:__________________________________________________________://
const HN2_Rou=function( req , res ){ "use strict"

    //:Declare_And_Summarize_All_Function_Variables:
    var rar     =[ req,res ]; //:Request_And_Response_Tuple
    var url     = rar[0].url; //:Requested_URL
    var tab_daw = null      ; //:TABle_of:Data_and_Whatever
    var     daw = null      ; //:selected:Data_and_Whatever
    var tab_act = null      ; //:TABle_of:ACTion(s)
    var     act = null      ; //:selected:ACTion
    var rar_daw = null      ; //:[ rar, daw ]
    
    //:To_Avoid_Clutter_Summarize_And_Label_Actions_Below:
    //: 01: [ shortcut / path ]==>[ data , action ]
    //:     In other words:
    //:         tab_daw[ url ][ 0 ] == Associated data
    //:         tab_daw[ url ][ 1 ] == What to do with data?
    //:
    //: 02: Decide what [ data, action ] pair to use:
    //:     In other words:
    //:         what_to_do_with_data_FUNCTION=(
    //:             tab_act[ what_to_do_with_data_STRING ] )
    //:         
    //: 03: [ action (string) ]==>[ action (function) ]
    //: 04: Select action to use with data:
    //: 05: Help connect_the_dots when reading code.
    //: 06: Perform selected action on data:
             
    /* 01 */    tab_daw={  
    /* -- */        "/K" : [ "./key._"   , "text/plain"      ]
    /* -- */    ,   "/H" : [ "./htm._"   , "text/html"       ]
    /* -- */    ,   "/J" : [ "./j_s._"   , "text/javascript" ]
    /* -- */    ,   "/T" : [ "./sql._"   , "SQL_GET_TEST"    ]
    /* -- */    };;
    /* 02 */    daw=( tab_daw[ url ] || tab_daw[ "/K" ] );
    /* 03 */    tab_act={ 
    /* -- */        "text/plain"      : HN2_Ser_Fil
    /* -- */    ,   "text/html"       : HN2_Ser_Fil
    /* -- */    ,   "text/javascript" : HN2_Ser_Fil
    /* -- */    ,   "SQL_GET_TEST"    : HN2_SQL_Get_Tes
    /* -- */    };;
    /* 04 */    act = tab_act[ daw[ 1 ] ];
    /* 05 */    rar_daw=[rar,daw]; 
    /* 06 */    act(     rar_daw );

};;

const HN2_Mai=function(){ "use strict"

    http.createServer( HN2_Rou ).listen(PORT);

};;
HN2_Mai();

/** 
    HN2_Rou: Main request routing function.
    HN2_Mai: Main entry point for project HN2 (HerokuNodeLean02)
    ent[1]: Action to perform on data
    ent[0]: The data associated with selected route

        daw:Data_And_Whatever (Usually:What to do with the data)
    tab_daw:TABle_of_Data_And_Whatever
    tab_rou:TABle_of_ROUtes (SEE: tab_dap)
    tab_dap:TABle_of_DataActionPairs ( [data,action] )
    tab_dap:Old, See: tab_daw
    tab_act:TABle_of_ACTions
    sel_act:Selected_Action
        act:Shorthand for sel_act

    dic: An object used as a dictionary.
    ent: Entry taken from dictionary or array.
    url: String path requested by client.
**/