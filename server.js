//:HN2: Heroku_Node(lean):02
//:     HN1: Minimal example to serve Html + Javascript.
//:     HN2: Serve File as text, promises, routing refactor.

var PORT = process.env.PORT || 5190 ;
var http = require('http');
var   fs = require('fs'  );

const HN2_Get_Fas =function( src_pat ){

    const hn2_executor=( njs_resolver , njs_rejector )=>{

        fs.readFile( src_pat,function(obj_err,dat_fil ){
            if( obj_err ){

                njs_rejector( obj_err );

            }else{

                njs_resolver( dat_fil );

            };;
        });;
    };;

    var pro=( new Promise( hn2_executor ) );
    return( pro );
};;

const HN2_SQL_Get_Tes =function( rar_daw ){ "use strict"

    //: rar daw = raw_daw[0|1]
    var rar     = rar_daw[ 0 ];
    var     daw = rar_daw[ 1 ];

    HN2_Get_Fas( daw[0] /* src_pat */ )
        .then((dat_fil)=>{
        
            rar[1].end( dat_fil );
        
        }).catch((obj_err)=>{
        
            rar[1].end( "[UH_OH]:" + obj_err.toString() );
        
        });;

};;

const HN1_Ser_Fil =function( rar_daw ){ "use strict"

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
    /* -- */        "/K" : [ "./server.js", "text/plain"      ]
    /* -- */    ,   "/H" : [ "./htm._"    , "text/html"       ]
    /* -- */    ,   "/J" : [ "./j_s._"    , "text/javascript" ]
    /* -- */    ,   "/T" : [ "./sql._"    , "SQL_GET_TEST"    ]
    /* -- */    };;
    /* 02 */    daw=( tab_daw[ url ] || tab_daw[ "/K" ] );
    /* 03 */    tab_act={ 
    /* -- */        "text/plain"      : HN1_Ser_Fil
    /* -- */    ,   "text/html"       : HN1_Ser_Fil
    /* -- */    ,   "text/javascript" : HN1_Ser_Fil
    /* -- */    ,   "SQL_GET_TEST"    : HN2_SQL_Get_Tes
    /* -- */    };;
    /* 04 */    act = tab_act[ daw[ 1 ] ];
    /* 05 */    rar_daw=[rar,daw]; 
    /* 06 */    act(     rar_daw );

};;

const HN1_Mai=function(){ "use strict"

    http.createServer( HN2_Rou ).listen(PORT);

};;
HN1_Mai();

/**-*********************************************************-**

                 ": Double quote character. Same as single:'
                 ': Single quote character. Same as double:"
                 +: [ addition | string concat | english:And ]
                 ,: Seperates elements of array or object.
                 .: English period or dot operator.
                 /: Forward slash, url or file path seperator
                 0: Array access of first element
                 1: Array access of second element
                 :: Colon character, used for {key:value}
                 ;: End a single-line statement
                 =: Assign 
                (): Operator precedence or function invokation.
                //: comment character
                01: First project in Heroku_Node project series
                ;;: End a multi-line  statement
                ==: Equality Comparison
                []: Array literal or array access.
                if: Denotes condition required to execute block
                to: Participle or denoting conversion.
                {}: [ object / dictionary ] literal.
               //:: My personal colored comment sequence
               200: HTTP Status Code: Okay.
               ===: Strict Equality Comparison
               HN1: Heroku_Node_01 (Project Namespace)
               UTF: Unicode Transformation Format (ASCI++)
               end: Server is done talking to client.
               env: contains virtual machine's environment vars
               fs: file_system, built-in Node.js package.
               pac: Path And Contenttype
               rar: rar[0]==req, rar[1]==res
               req: REQuest  object
               res: RESponse object (TYPE:ServerResponse)
               src: Denote path to javascript source file
               url: Uniform_Resource_Locator
               var: function scope variable
              "/H": Routes to our HTML file.
              "/J": Routes to our JavaScript file.
              "/K": Routes to our "key._" file.
              5190: Default Port Number if PORT undefined
              HTML: Hyper Text Markup Language
              Html: A stupid way to write "HTML"
              PORT: PORT number server application listens on
              PORT: defined if deployed on Heroku or Azure
              else: Denotes alternative block of code.
              func: NOT a keyword. Function pointer variable.
              http: http package that comes with Node.js
             alert: Display an alert box
             const: immutable block-scope variable
             http: hyper_text_transer_protocol
             serve: To deliver data from server to client
             title: Node representing <title> element.
            <head>: Metadata container element.
            script: Declare script reference in HTML file.
            window: Represents an open window in a browser.
           "utf-8": Unicode byte encoding. Extends: US-ASCII
           <title>: Denote title of html page
           DOCTYPE: Tell browser what markup language is used.
           HN1_Mai: Main entry point.
           Minimal: No extranious moving parts.
           charset: Denote character encoding of file. 
           dat_fil: Data of type "file" AKA: File data.
           example: Show you how it is done
           jum_dic: JUMp_DICtionary (Like a jumptable)
           not_nil: Denote object is not [nil/null]
           obj_err: Object of duck-type error.
           process: built-in Node.js global [variable/object]
           require: Like: Java import, C# using , C include
          "listen": Creates listener on specified port.
          document: Root node of the HTML document.
          function: Used for functions assigned to const
          readFile: Async file load
         "./htm._": Html file with "_" extension
         "./j_s._": Javascript file with "_" extension
         "./key._": File documenting 100% of source tokens.
         setHeader: Sets single header value for headers object.
         writeHead: Sends a response header to the request
        JavaScript: The language used by Node.js servers
        Javascript: Poorly capitalized "JavaScript"
       "text/html": "Content-Type" for html files
       HN1_Ser_Fil: HN1_Serve_File: Serves a file to client.
       Heroku_Node: Denotes a project using Heroku & Node.js
      "text/plain": "Content-Type" for plain text, NOT code.
      "use strict": Warnings are errors.
      createServer: SEE[ https://nodejs.org/api/http.html ]
     Default__Path: Default path if browser url is invalid
     Selected_Path: Path selected in browser url
    "WINDOW_ALERT": Placeholder string.
   " Content-Type": Header indicating media type of resource.
   <!DOCTYPE HTML>: Tell browser document type is HTML.
  "DOCUMENT_TITLE": Placeholder string.
"tex t/javascript": "Content-Type" for javascript files
const A=(B)=>{...}: function "A" taking param "B"

**-*********************************************************-**/