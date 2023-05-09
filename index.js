
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

/*##################################################*/
/*#                                                #*/
/*#               Gestion de la DB                 #*/
/*#                                                #*/
/*##################################################*/


(async ()=> {
    const [nom, prenom] = await get_nom.get_depute();
    console.log(nom);
    console.log("shit");
    console.log(prenom);
    for( var i = 0; i < 100; i++){//randomise les nom pour eviter les problemes d'usurpation d'identité ou autre
        rand1 = Math.floor(Math.random() * nom.length);
        rand2 = Math.floor(Math.random() * nom.length);
        rand3 = Math.floor(Math.random() * prenom.length);
        var nom_prenom = get_nom.mix_nom_prenom(nom[rand1],nom[rand2],prenom[rand3]);
        bdd_push.push_visiteur(nom_prenom.split(" ")[1], nom_prenom.split(" ")[0]);
    }

    var previous=[]
    while(true){
        var hashtag = await get_twitter.gethastag();
        if(previous[1]!= hashtag[1] || previous[2]!= hashtag[2]){// s'il y a eu un changement dans les hashtags
            previous = hashtag.slice();
            bdd_push.push_into_db(hashtag);//on push les hashtags dans la db
        }
        await new Promise(resolve => setTimeout(resolve, 20000));//on attend 20 secondes avant de relancer la boucle

    }

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
      connection.query('SELECT * FROM SAVE ORDER BY id DESC LIMIT 1', (error, results, fields) => {
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
  
    Promise.all([last_save, animaux, hashtags])
      .then(([last_save, animaux, hashtags]) => {
        // Envoyer les résultats en réponse
        res.json({
          last_save: last_save,
          animaux: animaux,
          hashtags: hashtags
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


/*##################################################*/
/*#                                                #*/
/*#               Gestion du serveur               #*/
/*#                                                #*/
/*##################################################*/

app.use(express.static(__dirname + '/front/'));

app.get('/', (req, res) => {
    res.sendFile(__dirname + '/front/html/jeu.html');
});

app.get('/accueil', (req, res) => {
    res.sendFile(__dirname + '/front/html/accueil.html');
});

app.get('/inscription', (req, res) => {
    res.sendFile(__dirname + '/front/html/inscription.html');
});

app.get('/jeu', (req, res) => {
    res.sendFile(__dirname + '/front/html/jeu.html');
});


http.listen(4300, () => {
    console.log('Serveur lancé sur le port 4300');
});

