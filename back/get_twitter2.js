const puppeteer = require('puppeteer');



/*##################################################*/
/*#                                                #*/
/*#               Gestion des hashtags             #*/
/*#                                                #*/
/*##################################################*/

async function gethastag(){
    
    const browser = await puppeteer.launch({ headless: "new" });
    const page = await browser.newPage();
    
    // Naviguer jusqu'à la page Twitter
    await page.goto('https://twitter.com/zoobeauval');
    
    // Attendre que la page soit chargée
    await page.waitForSelector('div[data-testid="primaryColumn"]');
    

    await new Promise(resolve => setTimeout(resolve, 2000));
  
    const hashtag = await page.$$eval('a[href*="hashtag"]', as => as.map(a => decodeURIComponent(a.href)));//recupere les hashtag dans les liens href du html et les convertit pour avoir les accent ! 

    await browser.close();
    //console.log(hashtag);
    return hashtag;
}

//export
module.exports.gethastag = gethastag;