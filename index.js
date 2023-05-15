
const express = require('express');
const app = express();
const http = require('http').Server(app);
const io = require('socket.io')(http);
const mysql = require('mysql')
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


const sharedsession = require("express-socket.io-session");
const bodyParser = require('body-parser');
const { body, validationResult } = require('express-validator');

/**** Project configuration ****/

const jsonParser = bodyParser.json();
const urlencodedParser = bodyParser.urlencoded({ extended: false });

// Init of express, to point our assets
app.use(express.static(__dirname + 'front'));
app.use(urlencodedParser);
app.use(session);
app.use(jsonParser);

// Configure socket io with session middleware
io.use(sharedsession(session, {
    // Session automatiquement sauvegardée en cas de modification
    autoSave: true
}));

// Détection de si nous sommes en production, pour sécuriser en https
if (app.get('env') === 'production') {
    app.set('trust proxy', 1) // trust first proxy
    session.cookie.secure = true // serve secure cookies
}

//  RECUP DATA FROM WEBSITE
const puppeteer = require('puppeteer');






//recupere les module du dossier back
const bdd_connect = require('./back/bdd_connect.js');
const bdd_push = require('./back/bdd_push.js');
const get_nom = require('./back/get_nom.js');
const get_twitter = require('./back/get_twitter.js');
bdd_connect.config_db();

//bdd_push.push_animaux()
const connection = bdd_connect.connection;

const readline = require('readline');

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

let wich_save = 1;
rl.question('Entrez le numéro de sauvegarde \n', (save) => {
  wich_save = parseInt(save);
  console.log(`Vous avez choisi la sauvegarde ${save}`);
  rl.close();
});



/*##################################################*/
/*#                                                #*/
/*#               Gestion de la DB                 #*/
/*#                                                #*/
/*##################################################*/


(async ()=> {
    const [nom, prenom] = await get_nom.get_depute();
    for( var i = 0; i < 100; i++){//randomise les nom pour eviter les problemes d'usurpation d'identité ou autre
        rand1 = Math.floor(Math.random() * nom.length);
        rand2 = Math.floor(Math.random() * nom.length);
        rand3 = Math.floor(Math.random() * prenom.length);
        var nom_prenom = get_nom.mix_nom_prenom(nom[rand1],nom[rand2],prenom[rand3]);
        bdd_push.push_visiteur(nom_prenom.split(" ")[1], nom_prenom.split(" ")[0]);
    }

    
      var hashtag = await get_twitter.gethastag();
      hashtag= bdd_push.get_only_hashtag_name(hashtag);
      var hashtag_zoosta = await get_twitter.gethastag_zoosta();
      hashtag_zoosta = bdd_push.get_only_hashtag_name(hashtag_zoosta);
      let hashtag_tot = []
      //if(previous[1]!= hashtag[1] || previous[2]!= hashtag[2]){// s'il y a eu un changement dans les hashtags
          
      hashtag_tot = hashtag.concat(hashtag_zoosta);
      bdd_push.push_into_db(hashtag_tot);
      //console.log(hashtag_tot)
      // await new Promise(resolve => setTimeout(resolve, 20000));//on attend 20 secondes avant de relancer la boucle

    

})();


/*##################################################*/
/*#                                                #*/
/*#                  Connexion                     #*/
/*#                                                #*/
/*##################################################*/
app.post('/new_game', (req, res) => {
    bdd_push.new_game();
    console.log("new game");
    //recupere le dernier element de la table save
    connection.query('SELECT * FROM SAVE ORDER BY id DESC LIMIT 1', function(err, results, fields) {
        if (err) throw err;
        //console.log(results[0]);
        res.send(results[0]);
        }
    );
});


app.post('/hello', (req, res) => {
    const last_save = new Promise((resolve, reject) => {
      // Récupérer le dernier élément de la table save avec l'id de wich_save
      connection.query('SELECT * FROM SAVE WHERE id = ?', [wich_save], (error, results, fields) => {
        if (error) reject(error);
        resolve(results[0]);
      });
    });
    const animaux = new Promise((resolve, reject) => {
    connection.query('SELECT * FROM animaux', (error, results, fields) => {
        if (error) reject(error);
        resolve(results);
      });
    });
  
    const hashtags = new Promise((resolve, reject) => {
      connection.query('SELECT * FROM hashtag', (error, results, fields) => {
        if (error) reject(error);
        resolve(results);
      });
    });
  const visiteurs = new Promise((resolve, reject) => {
      connection.query('SELECT nom,prenom FROM visiteur', (error, results, fields) => {
        if (error) reject(error);
        console.log(results)
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
  


app.post('/show_load', (req, res) => {
    //recupere toutes les sauvegardes
    connection.query('SELECT * FROM SAVE', function(err, results, fields) {
        if (err) throw err;
        //console.log(results);
        res.send(results);
        }
    );
    
});


//coucou

/*##################################################*/
/*#                                                #*/
/*#               Gestion du serveur               #*/
/*#                                                #*/
/*##################################################*/

app.use(express.static(__dirname + '/front/'));

app.get('/', (req, res) => {
    res.sendFile(__dirname + '/front/html/jeu.html');
});
app.get('/jeu', (req, res) => {
    res.sendFile(__dirname + '/front/html/jeu.html');
});


http.listen(4300, () => {
    console.log('Serveur lancé sur le port 4300');
});

