
import { tokens } from '@equinor/eds-tokens';

import { darkTokens } from '../style/darkTokens';



export default function getTokens() {

  console.log("tokens");
  const themeAttribute = document.documentElement.getAttribute('data-theme');

  
if (themeAttribute === "dark") {
    console.log("dark mode activated");
    console.log(darkTokens);
    
    return darkTokens;
  
  }
   else {

    console.log("nothing found");
    
    return tokens;
    
  }
}


