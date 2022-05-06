import {parse} from './parse.js';
// Manual console tests only since no unit testing set up for this project as per brief

// Example input strings from briefing document
console.log("now()+1d:", parse("now()+1d"));
console.log("now()-1d: ", parse("now()-1d"));
console.log("now()@d: ", parse("now()@d"));
console.log("now()-1y: ", parse("now()-1y"));
console.log("now()+10d+12h: ", parse("now()+10d+12h"));
console.log("\n---------------------------------\n")

//test complex compound input string
console.log("now()+1y+3d-3h@m: ", parse("now()+1y+3d-3h+24m-3s@m"))
console.log("now()+1d+3d: ", parse("now()+1d+3d"));
console.log("now()+1d+3d-2d: ", parse("now()+1d+3d-2d"));
console.log("now()@y: ", parse("now()@y"));


console.log("\n--------- error tests ----------\n")
//test for input string errors
console.log("Example formatting error ---", parse("now()+10k+12h"));
console.log("Example formatting error ---", parse("now+10d+12h"));
console.log("Example formatting error ---", parse("now()+10d+-12h"));

