const puppeteer = require('puppeteer');


/*##################################################*/
/*#                                                #*/
/*#               Gestion des noms                 #*/
/*#                                                #*/
/*##################################################*/


function mix_nom_prenom(nom1,nom2, prenom){
    // coupe les noms en 2
    var tmp_nom1 = nom1.substring(0, nom1.length/2);
    
    var tmp_nom2 = nom2.substring(nom2.length/2-1,nom2.length);
    // lowercase de nom2_1
    tmp_nom2 = tmp_nom2.toLowerCase();
    var nom = tmp_nom1 + tmp_nom2;

    return prenom + " " + nom;
}

async function get_depute(){
    const browser = await puppeteer.launch({ headless: "new" });
    const page = await browser.newPage();
    await page.goto('https://www.nosdeputes.fr/deputes');


    //recupere les span de la classe list_nom
    const span = await page.$$eval('span[class="list_nom"]', as => as.map(a => a.innerText));
    //console.log(span);
        
    await browser.close();
    var nom=[];
    var prenom=[];
    for( i in span){
        var nomPrenom = span[i].split(", ");
        nom.push(nomPrenom[0]);
        prenom.push(nomPrenom[1]);
    }
    //console.log(nom);
    //console.log(prenom);
    return [nom, prenom];
    
}

//export {get_depute, mix_nom_prenom};

module.exports.get_depute = get_depute;
module.exports.mix_nom_prenom = function(nom1, nom2, prenom) {
  return mix_nom_prenom(nom1, nom2, prenom);
};