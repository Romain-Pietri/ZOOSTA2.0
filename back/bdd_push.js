//fichier gerant les push bdd et les connection
//import
const mysql = require('mysql');
const fs = require('fs');
const bdd_connect = require('./bdd_connect.js');

const connection = bdd_connect.connection;
  

/*##################################################*/
/*#                                                #*/
/*#                 PUSH INTO DB                   #*/
/*#                                                #*/
/*##################################################*/


//ANIMALS

function get_only_hashtag_name(hashtag){
    //le premier est toujours 'https://twitter.com/search?q=%2523Panda&src=hashtag_click', on ne veut que panda
    var panda = hashtag[0].split("#")[1];
    panda = panda.split("&")[0];
    hashtag[0] = panda.toLowerCase();
    //pour les autre, ne prendre que le mot entre 'hashtag' et '?src'
    for(let i=1 ; i<hashtag.length ; i++){
        //console.log(hashtag[i])
        hashtag[i] = hashtag[i].split("hashtag/")[1];
        //console.log(hashtag[i])
        hashtag[i] = hashtag[i].split("?src")[0];
        hashtag[i]=hashtag[i].toLowerCase();
    }

    return hashtag;
}
function getAnimalNamesFromFile(filename) {
    const data = fs.readFileSync(filename);
    const animals = JSON.parse(data);
    const names = animals.map(animal => animal.Nom);
    const namesLowerCase = names.map(name => name.toLowerCase());
    return namesLowerCase;
  }

function get_only_animal(hashtag){
    var real= [];
    //ouvre le fichier Animaux.json et recupere les noms des animaux en lowercase
    animal = getAnimalNamesFromFile('./JSON/Animaux.json');
    for(let i=0 ; i<hashtag.length ; i++){
        for(let j=0 ; j<animal.length ; j++){
            if(hashtag[i]==animal[j]){
                real.push(hashtag[i]);
            }
        }
    }
    //console.log(real)
    return real;


}




function occur_hashtag(hashtag){
    //creer un tableau a 2 dimensions tab [][]
    var tab = new Array(hashtag.length);
    for(let i=0 ; i<hashtag.length ; i++){
        tab[i] = new Array(2);
    }

    //compte le nombre de fois qu'un hashtag est present
    for(let i=0 ; i<hashtag.length ; i++){
        var count = 0;
        for(let j=0 ; j<hashtag.length ; j++){
            if(hashtag[i]==hashtag[j]){
                count++;
            }
        }
        tab[i][0]=hashtag[i];
        tab[i][1]=count;
    }
    return tab;
}
function without_duplicate(tableau) {
    const objSet = new Set();
    return tableau.filter((elem) => {
      if (objSet.has(elem[0])) {
        return false;
      } else {
        objSet.add(elem[0]);
        return true;
      }
    });
  }

function push_into_db(hashtag){
   // hashtag= get_only_hashtag_name(hashtag);
    hashtag = get_only_animal(hashtag);

    var tab = occur_hashtag(hashtag);
    tab = without_duplicate(tab);
    //console.log(tab);
    connection.query('DROP TABLE hashtag', function(err, results, fields) {
        if (err) throw err;
        //console.log('Table dropped');
        }
    );
    connection.query('CREATE TABLE IF NOT EXISTS hashtag (  id INT NOT NULL AUTO_INCREMENT, number INT NOT NULL ,hashtag varchar(255), primary key(id))', function(err, results, fields) {
        if (err) throw err;
        //console.log('Table created');
        }
    );
    for(let i=0 ; i<tab.length ; i++){
        connection.query('INSERT INTO hashtag (hashtag, number) VALUES ("'+tab[i][0]+'", '+tab[i][1]+')', function(err, results, fields) {
            if (err) throw err;
            //console.log('Value inserted');
            }
        );
    } 
}



//VISITEURS

function push_visiteur(nom, prenom){
    connection.query('INSERT INTO visiteur (nom, prenom) VALUES ("'+nom+'", "'+prenom+'")', function(err, results, fields) {
        if (err) throw err;
        //console.log('Value inserted');
        }
    );
}

function new_game(){
    connection.query('INSERT INTO SAVE (niveau) VALUES (1)', function(err, results, fields) {
    if (err) throw err;
        //console.log('Value inserted');
        }
    );
    
}

function push_animaux(){
    //ouvre le fichier Animaux.json et recupere les noms des animaux en lowercase
    animaux =  fs.readFileSync("./JSON/Animaux.json");
    animaux = JSON.parse(animaux);//convertit en objet
    for(let i=0 ; i<animaux.length ; i++){
        //console.log(animaux[i]);
        connection.query('INSERT INTO animaux (id,nom, enclos, alimentation, niveau, popularite, prix, depense, description) VALUES ('+animaux[i].id+',"'+animaux[i].Nom+'", '+animaux[i].Type+', "'+animaux[i].Alimentation+'", '+animaux[i].Niveau+', '+animaux[i].Popularite+', '+animaux[i].Prix+', '+animaux[i].Depense+', "'+animaux[i].Description+'")', function(err, results, fields) {
            if (err) throw err;
            //console.log('Value inserted');
            }
        );
    }
}


//export
module.exports = {
    push_visiteur: push_visiteur,
    push_into_db: push_into_db,
    new_game: new_game,
    push_animaux: push_animaux,
    get_only_hashtag_name: get_only_hashtag_name,
    //get_save:get_save,

}