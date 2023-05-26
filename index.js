// Description: Fichier principal du serveur

// Importation des modules
const express = require('express');
const app = express();
const opn = require('opn');
const http = require('http').Server(app);
const mysql = require('mysql')
const bodyParser = require('body-parser');
const jsonParser = bodyParser.json();
const puppeteer = require('puppeteer');
const readline = require('readline');
const urlencodedParser = bodyParser.urlencoded({ extended: false });
const ProgressBar = require('cli-progress');

const session = require("express-session")({
// CIR2-chat encode in sha256
    secret: "eb8fcc253281389225b4f7872f2336918ddc7f689e1fc41b64d5c4f378cdc438",
    resave: true,
    saveUninitialized: true,
    cookie: {
        maxAge: 2 * 60 * 60 * 1000,
        secure: false
    }
});
app.use(express.static(__dirname + 'front'));
app.use(urlencodedParser);
app.use(session);
app.use(jsonParser);


//  RECUP DATA FROM WEBSITE

//recupere les module du dossier back
const bdd_connect = require('./back/bdd_connect.js');
const bdd_push = require('./back/bdd_push.js');
const get_nom = require('./back/get_nom.js');
const get_twitter = require('./back/get_twitter.js');
//on cree les tables si elles n'existent pas
bdd_connect.config_db();
bdd_push.push_animaux();
const connection = bdd_connect.connection;//recupere la connection a la db


let wich_save = 1;



const progressBar = new ProgressBar.SingleBar({}, ProgressBar.Presets.shades_classic);
const total_progress = 100;

/*##################################################*/
/*#                                                #*/
/*#               Gestion de la DB                 #*/
/*#                                                #*/
/*##################################################*/


(async ()=> {//recupere les donnees et les push dans la db
time_1= new Date();
    await new Promise(resolve => setTimeout(resolve, 1));
    //attend un peu pour que la barre de chargement s'affiche correctement
    progressBar.start(total_progress, 0);
    progressBar.update(10);
    //partie nom
    const [nom, prenom] = await get_nom.get_depute();//on recupere les député
    progressBar.update(30);
    for( var i = 0; i < 100; i++){//randomise les nom
        rand1 = Math.floor(Math.random() * nom.length);
        rand2 = Math.floor(Math.random() * nom.length);
        rand3 = Math.floor(Math.random() * prenom.length);
        var nom_prenom = get_nom.mix_nom_prenom(nom[rand1],nom[rand2],prenom[rand3]);
        bdd_push.push_visiteur(nom_prenom.split(" ")[1], nom_prenom.split(" ")[0]);//on push les visiteurs dans la db
    }
    progressBar.update(40);

    //partie twitter
    var hashtag = await get_twitter.gethastag();//recupere les hashtag du @zoobeauval
    hashtag= bdd_push.get_only_hashtag_name(hashtag);
    progressBar.update(60);

    var hashtag_zoosta = await get_twitter.gethastag_zoosta();//recupere les hashtag de @zoosta1
    hashtag_zoosta = bdd_push.get_only_hashtag_name(hashtag_zoosta);
    progressBar.update(70);

    let hashtag_tot = [];
    hashtag_tot = hashtag.concat(hashtag_zoosta);//on concatene les deux tableaux
    progressBar.update(80);
    bdd_push.push_into_db(hashtag_tot);//on push les hashtag dans la db
    progressBar.update(90);

    progressBar.update(100);
    progressBar.stop();
    
    time_2= new Date();
    console.log("\x1b[35m%s\x1b[0m",`Serveur lancé en : ${(time_2-time_1)/1000}s \u{2705}`)

  while(true){//tout les 60s on recupere les hashtag et on les push dans la db

    await new Promise(resolve => setTimeout(resolve, 60000));
    try{
      hashtag = await get_twitter.gethastag();
      hashtag= bdd_push.get_only_hashtag_name(hashtag);
      hashtag_zoosta = await get_twitter.gethastag_zoosta();
      hashtag_zoosta = bdd_push.get_only_hashtag_name(hashtag_zoosta);
      hashtag_tot = [];
      hashtag_tot = hashtag.concat(hashtag_zoosta);
      bdd_push.push_into_db(hashtag_tot);

    }
    catch{//s'il y a une erreur avec puppeteer on push les anciens hashtag
      console.log("\x1b[33m%s\x1b[0m","Erreur lors de la récupération des hashtags \u{26A0}\u{FE0F}")
      hashtag_tot = previus_hashtag;
      bdd_push.push_into_db(hashtag_tot);
    }

  }


})();


/*##################################################*/
/*#                                                #*/
/*#                  Connexion                     #*/
/*#                                                #*/
/*##################################################*/
app.post('/hello', (req, res) => {//quand on recoit un socket hello
        const last_save = new Promise((resolve, reject) => {
        let date= new Date()
        let heure = date.getHours();
      let minutes = date.getMinutes();
      let secondes = date.getSeconds();
      let jour = date.getDate();
      let mois = date.getMonth() + 1;
      let annee = date.getFullYear();
      console.log("\x1b[32m%s\x1b[0m",`[${jour}/${mois}/${annee} ${heure}:${minutes}:${secondes}] Nouvelle connexion \u{1F525}`);//on affiche la nouvelle connexion et l'horodatage

      // Récupérer le dernier élément de la table save avec l'id de wich_save
      connection.query('SELECT * FROM SAVE WHERE id = ?', [wich_save], (error, results, fields) => {
        if (error) reject(error);
        if(results.length == 0){
            console.log("La sauvegarde n'existe pas, nouvelle partie");
            //renvoie la sauvegarde 1
            bdd_push.new_game();
            resolve({id: 1,argent: 10000,cumul_argent: 10000,niveau: 1,ec_1: 0,ec_2: 0,ec_3: 0,ec_4: 0,ec_5: 0,ec_6: 0,ec_7: 0,ec_8: 0,ec_9: 0,ec_10: 0,ec_11: 0,ec_12: 0,ec_13: 0,ec_14: 0,ec_na_1: null,ec_na_2: null,ec_na_3: null,ec_na_4: null,ec_na_5: null,ec_na_6: null,ec_na_7: null,ec_na_8: null,ec_na_9: null,ec_na_10: null,ec_na_11: null,ec_na_12: null,ec_na_13: null,ec_na_14: null,ec_nm_1: null,ec_nm_2: null,ec_nm_3: null,ec_nm_4: null,ec_nm_5: null,ec_nm_6: null,ec_nm_7: null,ec_nm_8: null,ec_nm_9: null,ec_nm_10: null,ec_nm_11: null,ec_nm_12: null,ec_nm_13: null,ec_nm_14: null})
        }
        resolve(results[0]);
      });
    });
    //recupere les animaux
    const animaux = new Promise((resolve, reject) => {
    connection.query('SELECT * FROM animaux', (error, results, fields) => {
        if (error) reject(error);
        resolve(results);
      });
    });
    //recupere les hashtags
    const hashtags = new Promise((resolve, reject) => {
      connection.query('SELECT * FROM hashtag', (error, results, fields) => {
        if (error) reject(error);
        resolve(results);
      });
    });
    //recupere les visiteurs
  const visiteurs = new Promise((resolve, reject) => {
      connection.query('SELECT nom,prenom FROM visiteur', (error, results, fields) => {
        if (error) reject(error);
        //console.log(results)
        resolve(results);
      });
    });

    Promise.all([last_save, animaux, hashtags, visiteurs])
      .then(([last_save, animaux, hashtags,visiteurs]) => {

        // Envoyer les résultats en réponse
        res.json({
          last_save: last_save,
          animaux: animaux,
          hashtags: hashtags,
          visiteurs: visiteurs,
        });
      })
      .catch(error => {
        // En cas d'erreur, envoyer une réponse d'erreur
        console.error(error);
        res.status(500).json({ error: 'Une erreur est survenue' });
      });
  });


//coucou

/*##################################################*/
/*#                                                #*/
/*#               Gestion du serveur               #*/
/*#                                                #*/
/*##################################################*/

app.use(express.static(__dirname + '/front/'));

app.get('/', (req, res) => {//cree la route pour la page d'accueil
    res.sendFile(__dirname + '/front/html/jeu.html');
});



http.listen(8080, "127.0.0.1",() => {
    console.log("\x1b[34m%s\x1b[0m",'Serveur lancé sur le port 4300 \u{1F525}');//lance le serveur
var date = new Date();
    var heure = date.getHours();
    var minutes = date.getMinutes();
    var secondes = date.getSeconds();
    var jour = date.getDate();
    var mois = date.getMonth() + 1;
    var annee = date.getFullYear();
    console.log("\x1b[34m%s\x1b[0m",`${jour}/${mois}/${annee}  ${heure}:${minutes}:${secondes}`);
});
