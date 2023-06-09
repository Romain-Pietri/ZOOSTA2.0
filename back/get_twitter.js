const puppeteer = require('puppeteer');

/*##################################################*/
/*#                                                #*/
/*#               Gestion des hashtags             #*/
/*#                                                #*/
/*##################################################*/

async function gethastag(){
    /*
    Fonction qui utilise puppeteer pour recuperer les hashtag pour les afficher sur les visiteurs du zoo
    */
    
    const browser = await puppeteer.launch({ headless: "new" });//lance le navigateur
    const page = await browser.newPage();
    
    // Naviguer jusqu'à la page Twitter
    await page.goto('https://twitter.com/zoobeauval');
    
    // Attendre que la page soit chargée
    await page.waitForSelector('div[data-testid="primaryColumn"]');
    
    //attend 2 secondes pour que la page soit bien chargée
    await new Promise(resolve => setTimeout(resolve, 2000));
  
    const hashtag = await page.$$eval('a[href*="hashtag"]', as => as.map(a => decodeURIComponent(a.href)));//recupere les hashtag dans les liens href du html et les convertit pour avoir les accent ! 

    await browser.close();
    //console.log(hashtag);
    return hashtag;
}

async function gethastag_zoosta(){
    
    const browser = await puppeteer.launch({ headless: "new" });
    const page = await browser.newPage();
    
    // Naviguer jusqu'à la page Twitter
    await page.goto('https://twitter.com/Zoosta1');
    
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
module.exports.gethastag_zoosta = gethastag_zoosta;