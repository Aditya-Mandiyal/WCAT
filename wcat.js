
//===================================== import fs Module ==============================================================//
const fs=require("fs");


//===================================== Take the command in inputCmd array ============================================//
var inputCmd=process.argv;


//=============================== Remove first 2 elements from inputCmd ===============================================//
inputCmd=process.argv.slice(2);


//=========================== make 2 array one for filePath one for (-n)or(-s)or(-b)===================================//
var filesarr=[]; 
var optionarr=[];


//=========================== push elements in arrays (jo jo unme aane hai )===========================================//
for (let index = 0; index < inputCmd.length; index++) {
    if(inputCmd[index].charAt(0)=='-')
    {
        optionarr.push(inputCmd[index]);
    }
    else
    {
        filesarr.push(inputCmd[index]);
    }
}


//============================== Check weather Files are exist or not if not print not exist and return ===============//
for (let index = 0; index < filesarr.length; index++) {
    var check=fs.existsSync(filesarr[index]);
    if(!check)
    {   console.log(`"${filesarr[index]}" This file Path does not exist :( \n Thank you :)`);
        process.exit();
    }   
}


//======================================= 1st and 2nd cmd Apply =======================================================//
var content="";
for (let index = 0; index < filesarr.length; index++) {
    let subcontent=fs.readFileSync(filesarr[index]);
    content+=subcontent+"\r\n"; 
}
if(optionarr[0]==null)
console.log(content);


//=================== first split lines using split() funtion and put all lines in arr ================================//
var contentarr=content.split("\r\n");
// console.table(contentarr);

//===============================  (-s) cmd apply =====================================================================//
if(optionarr.includes("-s"))
{             //________agr 2 or more than 2 spaces hai toh usme null daal do bs ek space rkho________//
     for (let i = 0; i < contentarr.length-1; i++) {
         if(contentarr[i]=="" && contentarr[i+1]=="")
         {
            contentarr[i]=null;
         }
     }

              //_______ abhi contentarr me se sbhi data ko temparr me daalo null ko shod kr_________//
     var temparr=[];
     for(var i=0;i<contentarr.length;i++)
     {
        if(contentarr[i]!=null)    
        temparr.push(contentarr[i]);
     } 
             //___________________Print content after -s____________________//   
             var content="";
             for (var index = 0; index < temparr.length; index++) {
                 var subcontent=temparr[index];
                 content+=subcontent+"\r\n"; 
             }
             console.log(content);                 
}


//===============================  (-n) cmd apply =====================================================================//
if(optionarr.includes("-n"))
{
    var lineCounter=1;
    for(var i=0;i<contentarr.length;i++)
    { 
        console.log(`${lineCounter} ${contentarr[i]}`);
        lineCounter++;
    }
}


//================================= (-b) cmd Apply ====================================================================//
if(optionarr.includes("-b"))
{
    var lineCounter=0;
    for(var i=0;i<contentarr.length;i++)
    {    if(contentarr[i]!="")
         {
             lineCounter++;
             console.log(`${lineCounter} ${contentarr[i]}`);
         }
         else
         console.log(`${contentarr[i]}`);
    }
}



