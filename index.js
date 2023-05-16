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

const connection = bdd_connect.connection;//recupere la connection a la db

const rl = readline.createInterface({//pour recuperer le numero de sauvegarde
  input: process.stdin,
  output: process.stdout
});

let wich_save = 1;
let question_rep=false;
rl.question('\n', (save) => {//recupere le numero de sauvegarde
  if(save==""){
    save=1;
  }
  wich_save = parseInt(save);
  if(wich_save<1){
    wich_save=1;
  }
  console.log("\x1b[32m%s\x1b[0m",`Vous avez choisi la sauvegarde ${save} \u{2714}\u{FE0F}`);
  question_rep=true;
  if(question_rep){
    rl.close();
  }
});

const progressBar = new ProgressBar.SingleBar({}, ProgressBar.Presets.shades_classic);
const total_progress = 100;

/*##################################################*/
/*#                                                #*/
/*#               Gestion de la DB                 #*/
/*#                                                #*/
/*##################################################*/


(async ()=> {//recupere les donnees et les push dans la db
    //console.log("\x1b[35m%s\x1b[0m","Lancement du serveur");
    //console.log("\x1b[34m%s\x1b[0m","Récupération des données")
    //console.log("\x1b[33m%s\x1b[0m","Récupération des nom et prénom des députés")
    await new Promise(resolve => setTimeout(resolve, 1));
    progressBar.start(total_progress, 0);
    progressBar.update(10);
    //partie nom
    const [nom, prenom] = await get_nom.get_depute();
    //console.log("\x1b[32m%s\x1b[0m","Visiteurs récupérés")
    progressBar.update(30);
    for( var i = 0; i < 100; i++){//randomise les no
        rand1 = Math.floor(Math.random() * nom.length);
        rand2 = Math.floor(Math.random() * nom.length);
        rand3 = Math.floor(Math.random() * prenom.length);
        var nom_prenom = get_nom.mix_nom_prenom(nom[rand1],nom[rand2],prenom[rand3]);
        bdd_push.push_visiteur(nom_prenom.split(" ")[1], nom_prenom.split(" ")[0]);
    }
    progressBar.update(40);
    //console.log("\x1b[33m%s\x1b[0m","Récupération des hashtags")
    //partie twitter
    var hashtag = await get_twitter.gethastag();
    hashtag= bdd_push.get_only_hashtag_name(hashtag);
    progressBar.update(60);
    //console.log("\x1b[32m%s\x1b[0m","50%")
    var hashtag_zoosta = await get_twitter.gethastag_zoosta();
    hashtag_zoosta = bdd_push.get_only_hashtag_name(hashtag_zoosta);
    progressBar.update(70);
    //console.log("\x1b[32m%s\x1b[0m","100%")
    let hashtag_tot = [];       
    hashtag_tot = hashtag.concat(hashtag_zoosta);
    progressBar.update(80);
    bdd_push.push_into_db(hashtag_tot);
    progressBar.update(90);
    //console.log("\x1b[32m%s\x1b[0m","Hashtags récupérés")
    progressBar.update(100);
    progressBar.stop();
    //enleve la barre de chargement

    let time_question1 = 0;
    let time_question2 = 0;
    while(!question_rep){
        time_question1++;
        time_question2++;
      await new Promise(resolve => setTimeout(resolve, 100));
      if(time_question1>20){
        console.log("\x1b[31m%s\x1b[0m","Veuillez entrer le numéro de sauvegarde \u{26A0}\u{FE0F}")
        time_question1=0;
      }
      if(time_question2>200){
        console.log("\x1b[33m%s\x1b[0m","Vous n'avez pas répondu, la sauvegarde 1 a été choisie \u{26A0}\u{FE0F}")
        question_rep=true;
        wich_save=1;
      }
    }
    opn('http://localhost:4300/');//ouvre le navigateur sur la page du jeu


})();


/*##################################################*/
/*#                                                #*/
/*#                  Connexion                     #*/
/*#                                                #*/
/*##################################################*/
app.post('/hello', (req, res) => {
    const last_save = new Promise((resolve, reject) => {
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



http.listen(4300, () => {
    console.log("\x1b[36m%s\x1b[0m",'Serveur lancé sur le port 4300 \u{1F525}');//lance le serveur
});

