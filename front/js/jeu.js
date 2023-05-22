
// ==== VARIABLES ==== VARIABLES ==== VARIABLES ==== VARIABLES ==== VARIABLES ==== VARIABLES ====
let nbanimaux;
let charger = false;
let animaux;
let hashtags;
let save;
let visiteurs;
let popularitetot;

let animaux_a_afficher = [];
let animaux_a_vendre = [];
let tileHeight;
let tileWidth;

/*    Enclos        1    2   3    4   5   6   7   8   9  10  11  12   13   14        */
let Min_enclos_X = [30, 34, 54, 102, 72, 78, 30, 30, 92, 64, 50, 82, 108, 112];
let Max_enclos_X = [66, 46, 68, 116, 94, 102, 42, 56, 118, 80, 64, 94, 114, 114];
let Min_enclos_Y = [176, 124, 122, 74, 74, 178, 59, 30, 30, 34, 78, 126, 190, 118];
let Max_enclos_Y = [196, 152, 152, 102, 98, 198, 100, 53, 50, 46, 94, 158, 198, 150];
let animauxActuel_enclos = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
let animaux_t = [];

let atm;

let compteurtick2 = 1;
let compteurtick3 = 1;
let compteurtick4 = 1;
let random = 0;
let hauttick = 0;
let bastick = 0;
let droitetick = 0;
let gauchetick = 0;
let FrameUp = 0;
let FrameDown = 0;
let FrameRight = 0;
let FrameLeft = 0;
let stepCam = 1;
let menuactive = false;
let width = 2438;
let height = 1080;
let width2 = width / 2;
let height2 = height / 2;

let coinText = "";
let xpText = "";
let lvlText = "";
let nbvisitText = "";
let gainstotaux = "<==  Gains totaux";
let depenses = "<==  Dépenses totales";
let gainsreels = "<==  Gains réels";
let stonksText = "";
let not_stonksText = "";
let stonks2Text = "";
let posXTest = "";
let posYTest = "";

let coins = 1000;
let cumul = 1000;
let xps = 700;
let level = 0;
let nbvisit = 0;
let switchSpace = false;
let opened = false;
let frameP = 0;

let testPosX = 0;
let testPosY = 0;
let testPosX2 = 0;
let testPosY2 = 0;

let tablette = false;
let radio = false;

let enclos1 = false;
let enclos2 = false;
let enclos3 = false;
let enclos4 = false;
let enclos5 = false;
let enclos6 = false;
let enclos7 = false;
let enclos8 = false;
let enclos9 = false;
let enclos10 = false;
let enclos11 = false;
let enclos12 = false;
let enclos13 = false;
let enclos14 = false;

//variable
const nomsAnimaux = {
    1: 'zebre',
    2: 'girafe',
    3: 'suricate',
    4: 'autruche',
    5: 'fennec',
    6: 'elephant',
    7: 'rhino',
    8: 'hyenne',
    9: 'serpent',
    10: 'lion',
    11: 'guepard',
    12: 'renne',
    13: 'elan',
    14: 'paresseux',
    15: 'chimpanze',
    16: 'lemurien',
    17: 'koala',
    18: 'panda_roux',
    19: 'gorille',
    20: 'panda',
    21: 'loup',
    22: 'leopard',
    23: 'panthere_noire',
    24: 'ours_brun',
    25: 'tigre',
    26: 'chevre',
    27: 'mouton',
    28: 'alpaga',
    29: 'paon',
    30: 'dodo',
    31: 'bison',
    32: 'bouquetin',
    33: 'ane',
    34: 'loutre',
    35: 'otarie',
    36: 'tortue',
    37: 'crocodile',
    38: 'hippopotame',
    39: 'requin',
    40: 'baleine',
    41: 'orque',
    42: 'dauphin',
    43: 'raie',
    44: 'beluga',
    45: 'narval',
    46: 'renard_polaire',
    47: 'manchot',
    48: 'morse',
    49: 'lion_de_mer',
    50: 'ours_polaire'
}
let EtatAnimaux = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];

let temps = 0;





function hello() {
    const data = fetch('/hello', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ "hello I need the data": "thanks " })
    }
    )
        .then(response => response.json())
        .then(data => {
            return data
        }
        );
    //console.log("hell")
    return data;
}
const hell = hello();


function ec_n_to_tab(ec_n) {
    let tab = [];
    //ec_n est une string de la forme 1 2 14 ... et ca devrait donner tab=[1,2,14,...]
    let last_space = 0;
    if (ec_n != null) {
        for (let i = 0; i < ec_n.length; i++) {
            if (ec_n[i] == " ") {
                tab.push(parseInt(ec_n.slice(last_space, i)));
                last_space = i + 1;
            }
        }
        tab.push(parseInt(ec_n.slice(last_space, ec_n.length)));
    }
    return tab;
}

function db_save_into_tab(save) {
    //prend tout les element de save et renvoie un objet save
    const niveau = save.niveau;
    const coins = save.argent;
    const cumul = save.cumul_argent;
    const ec = [save.ec_1, save.ec_2, save.ec_3, save.ec_4, save.ec_5, save.ec_6, save.ec_7, save.ec_8, save.ec_9, save.ec_10, save.ec_11, save.ec_12, save.ec_13, save.ec_14];
    let ec_na = [];
    ec_na.push(ec_n_to_tab(save.ec_na_1));
    ec_na.push(ec_n_to_tab(save.ec_na_2));
    ec_na.push(ec_n_to_tab(save.ec_na_3));
    ec_na.push(ec_n_to_tab(save.ec_na_4));
    ec_na.push(ec_n_to_tab(save.ec_na_5));
    ec_na.push(ec_n_to_tab(save.ec_na_6));
    ec_na.push(ec_n_to_tab(save.ec_na_7));
    ec_na.push(ec_n_to_tab(save.ec_na_8));
    ec_na.push(ec_n_to_tab(save.ec_na_9));
    ec_na.push(ec_n_to_tab(save.ec_na_10));
    ec_na.push(ec_n_to_tab(save.ec_na_11));
    ec_na.push(ec_n_to_tab(save.ec_na_12));
    ec_na.push(ec_n_to_tab(save.ec_na_13));
    ec_na.push(ec_n_to_tab(save.ec_na_14));
    let ec_nm = [];
    ec_nm.push(ec_n_to_tab(save.ec_nm_1));
    ec_nm.push(ec_n_to_tab(save.ec_nm_2));
    ec_nm.push(ec_n_to_tab(save.ec_nm_3));
    ec_nm.push(ec_n_to_tab(save.ec_nm_4));
    ec_nm.push(ec_n_to_tab(save.ec_nm_5));
    ec_nm.push(ec_n_to_tab(save.ec_nm_6));
    ec_nm.push(ec_n_to_tab(save.ec_nm_7));
    ec_nm.push(ec_n_to_tab(save.ec_nm_8));
    ec_nm.push(ec_n_to_tab(save.ec_nm_9));
    ec_nm.push(ec_n_to_tab(save.ec_nm_10));
    ec_nm.push(ec_n_to_tab(save.ec_nm_11));
    ec_nm.push(ec_n_to_tab(save.ec_nm_12));
    ec_nm.push(ec_n_to_tab(save.ec_nm_13));
    ec_nm.push(ec_n_to_tab(save.ec_nm_14));

    return {

        niveau: niveau,
        coins: coins,
        cumul: cumul,
        ec: ec,
        ec_na: ec_na,
        ec_nm: ec_nm
    }
}

function popularitetot_nbanimaux(save) {
    let nbanimaux = 0;
    for (let i = 0; i < save.ec_na.length; i++) {
        nbanimaux += save.ec_na[i].length;
    }
    let popularitetot = 0
    for (let i = 0; i < save.ec_na.length; i++) {
        for (let j = 0; j < save.ec_na[i].length; j++) {
            //console.log(animaux[save.ec_na[i][j]-1].popularite)
            popularitetot += animaux[save.ec_na[i][j] - 1].popularite;
        }
    }
    //console.log("total animaux : ", nbanimaux)
    //console.log("popularite : ",popularitetot)
    return [nbanimaux, popularitetot]
}

function gain_visiteur(nbanimaux, popularitetot) {
    if (nbanimaux == 0) {
        return 0;
    }
    let nb_diff_animaux = 0;
    let tab_animaux_visited = [];
    for (let i = 0; i < save.ec_na.length; i++) {
        for (let j = 0; j < save.ec_na[i].length; j++) {
            if (tab_animaux_visited.indexOf(save.ec_na[i][j]) == -1) {
                tab_animaux_visited.push(save.ec_na[i][j]);
                nb_diff_animaux++;
            }
        }
    }
    return Math.round((popularitetot / nbanimaux * nb_diff_animaux) + (Math.random() * 50));
}

function gain_argent(nbvisit, nbanimaux, popularitetot) {
    if (nbanimaux == 0) {
        return 0;
    }

    return Math.round((10 * nbvisit * (popularitetot / (nbanimaux * 150))));

}

function monte_lvl(cumul) {
    if (Math.floor(Math.pow(cumul, 1.5) / 100000) >= save.niveau + 1) {
        return true;
    }
    return false;
}
function monte_ok(cumul) {
    if(cumul > cumul_requis[indice_level]){
        return true;
    }
    return false
}
//&&&&& CALCUL POUR CUMUL_REQUIS &&&&& CALCUL POUR CUMUL_REQUIS &&&&& CALCUL POUR CUMUL_REQUIS &&&&&
let indice_level = 1;
let cumul_requis = [];
cumul_requis[0] = 10000;
let mode = "test";
let speed = "normal";

if(mode == "test"){
    for(let i = 1; i < 30; i++){
        cumul_requis[i] = 10000+(i+i/10)*5000;
    }
}
else if(mode == "normal"){
    for(let i = 1; i < 15; i++){
        cumul_requis[i] = Math.floor(cumul_requis[i-1]*1.8);
        console.log(cumul_requis[i]);
    }
    for(let i = 15; i < 30; i++){
        cumul_requis[i] = Math.floor(cumul_requis[i-1]*(1+i/500));
        console.log(cumul_requis[i]);
    }
}
cumul_requis[30] = "max";
//&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&

function how_many_money(niveau) {

    return Math.floor(Math.sqrt(1000000 * niveau, 1.5))
}

function achat_animal(i, en_c) {
    //console.log(coins)
    if (animaux[i - 1].prix <= coins && save.niveau >= animaux[i - 1].niveau) {
        coins -= animaux[i - 1].prix;
        //console.log(save.ec_na)
        //console.log(save.ec_na)
        save.ec_na[en_c - 1].push(i);
        animaux_a_afficher.push(i);
    }
}
function vente_animal(i, en_c) {
    coins += Math.floor(animaux[i - 1].prix / 2);
    save.ec_na[en_c - 1].splice(save.ec_na[en_c - 1].indexOf(i), 1);
    animaux_a_supprimer.push(i);
}

function depensee(save, animaux) {
    let depense = 0;
    for (let i = 0; i < save.ec_na.length; i++) {
        for (let j = 0; j < save.ec_na[i].length; j++) {
            //console.log(animaux[save.ec_na[i][j]-1].popularite)
            depense += animaux[save.ec_na[i][j] - 1].depense;
        }
    }

    for (let k = 0; k < save.ec_nm.length; k++) {
        for (let l = 0; l < save.ec_nm[k].length; l++) {
            //console.log(animaux[save.ec_na[i][j]-1].popularite)
            depense += animaux[save.ec_nm[k][l] - 1].depense;

        }
    }
    return Math.round(depense);
}

//##############################################################################################################
//##############################################################################################################
//##############################################################################################################
//##     SCENES     ##     SCENES     ##     SCENES     ##     SCENES     ##     SCENES     ##     SCENES     ##
//##############################################################################################################
//##############################################################################################################
//##############################################################################################################


//##############################################################################################################
//##############################################################################################################
//###     BOOT     ####     BOOT     ####     BOOT     ####     BOOT     ####     BOOT     ####     BOOT     ###
//##############################################################################################################
//##############################################################################################################
class Boot extends Phaser.Scene {
    constructor() {
        super({ key: 'Boot' });
    }
    preload() {
        this.load.image('player', '../img/Prof_Tilleul.png');
        this.load.image('background', '../map/background.png');

        this.load.image('coin', '../img/coin.png');
        this.load.image('visiteur_icon','../img/visiteur_icon.png');
        this.load.image('stats','../img/stats.png');
        this.load.image('sell','../img/sell.png');
        this.load.image('stonks','../img/stonks.png');
        this.load.image('not_stonks','../img/not_stonks.png');
        this.load.image('sound','../img/sound.png');

        this.load.spritesheet('xps', '../img/sprite_bar_xp.png', { frameWidth: 700, frameHeight: 17 });

        this.load.spritesheet('visiteur', '../img/visiteur.png', { frameWidth: 48, frameHeight: 98 });
        this.load.spritesheet('visiteur2', '../img/visiteur2.png', { frameWidth: 47, frameHeight: 95 });
        this.load.spritesheet('visiteur3', '../img/visiteur3.png', { frameWidth: 45, frameHeight: 82 });
        this.load.spritesheet('visiteur4', '../img/visiteur4.png', { frameWidth: 45, frameHeight: 80 });
    
        this.load.image('menu', '../img/HUD_enclos.png');
        this.load.image('menu2', '../img/HUD_stats.png');
        this.load.image('menu3', '../img/HUD_radio.png');
        this.load.image('hashtag', '../img/hashtag.png');

        this.load.image('myn1', '../img/mynthos1.jpg');
        this.load.image('myn2', '../img/mynthos2.jpg');
        this.load.image('myn3', '../img/mynthos3.jpg');
        this.load.image('myn4', '../img/mynthos4.jpg');


        //====== ANIMAUX PRELOAD ====== ANIMAUX PRELOAD ====== ANIMAUX PRELOAD ====== ANIMAUX PRELOAD ====== ANIMAUX PRELOAD ======
        this.load.image('zebre', '../img/zebre.png');
        this.load.image('girafe', '../img/girafe.png');
        this.load.image('suricate', '../img/suricate.png');
        this.load.image('autruche', '../img/autruche.png');
        this.load.image('fennec', '../img/fennec.png');

        this.load.image('elephant', '../img/elephant.png');
        this.load.image('rhino', '../img/rhino.png');

        this.load.image('hyene', '../img/hyene.png');
        this.load.image('serpent', '../img/serpent.png');
        this.load.image('lion', '../img/lion.png');
        this.load.image('guepard', '../img/guepard.png');

        this.load.image('renne', '../img/renne.png');
        this.load.image('elan', '../img/elan.png');

        this.load.image('paresseux', '../img/paresseux.png');
        this.load.image('chimpanze', '../img/chimpanze.png');
        this.load.image('lemurien', '../img/lemurien.png');
        this.load.image('koala', '../img/koala.png');
        this.load.image('panda_roux', '../img/panda_roux.png');
        this.load.image('gorille', '../img/gorille.png');
        this.load.image('panda', '../img/panda.png');

        this.load.image('loup', '../img/loup.png');
        this.load.image('leopard', '../img/leopard.png');
        this.load.image('panthere', '../img/panthere.png');
        this.load.image('ours', '../img/ours.png');
        this.load.image('tigre', '../img/tigre.png');

        this.load.image('chevre', '../img/chevre.png');
        this.load.image('mouton', '../img/mouton.png');
        this.load.image('alpaga', '../img/alpaga.png');
        this.load.image('paon', '../img/paon.png');
        this.load.image('dodo', '../img/dodo.png');

        this.load.image('bison', '../img/bison.png');
        this.load.image('bouquetin', '../img/bouquetin.png');
        this.load.image('ane', '../img/ane.png');

        this.load.image('loutre', '../img/loutre.png');
        this.load.image('otarie', '../img/otarie.png');
        this.load.image('tortue', '../img/tortue.png');

        this.load.image('crocodile', '../img/crocodile.png');
        this.load.image('hippo', '../img/hippo.png');

        this.load.image('requin', '../img/requin.png');
        this.load.image('baleine', '../img/baleine.png');
        this.load.image('orque', '../img/orque.png');

        this.load.image('dauphin', '../img/dauphin.png');
        this.load.image('raie', '../img/raie.png');
        this.load.image('beluga', '../img/beluga.png');
        this.load.image('narval', '../img/narval.png');

        this.load.image('renard', '../img/renard.png');
        this.load.image('manchot', '../img/manchot.png');

        this.load.image('morse', '../img/morse.png');
        this.load.image('lion_mer', '../img/lion_mer.png');
        this.load.image('ours_polaire', '../img/ours_polaire.png');


        this.load.image('animal_1', '../img/animaux/savane/zebre.png');
        this.load.image('animal_2', '../img/animaux/savane/girafe.png');
        this.load.image('animal_3', '../img/animaux/savane/suricate.png');
        this.load.image('animal_4', '../img/animaux/savane/autruche.png');
        this.load.image('animal_5', '../img/animaux/savane/fennec.png');
        this.load.image('animal_6', '../img/animaux/savane/elephant.png');
        this.load.image('animal_7', '../img/animaux/savane/rhino.png');
        this.load.image('animal_8', '../img/animaux/savane/hyene.png');
        this.load.image('animal_9', '../img/animaux/savane/serpent.png');
        this.load.image('animal_10', '../img/animaux/savane/lion.png');
        this.load.image('animal_11', '../img/animaux/savane/guepard.png');
        this.load.image('animal_12', '../img/animaux/boise/renne.png');
        this.load.image('animal_13', '../img/animaux/boise/elan.png');
        this.load.image('animal_14', '../img/animaux/boise/paresseux.png');
        this.load.image('animal_15', '../img/animaux/boise/chimpanze.png');
        this.load.image('animal_16', '../img/animaux/boise/lemurien.png');
        this.load.image('animal_17', '../img/animaux/boise/koala.png');
        this.load.image('koala2', '../img/animaux/boise/koala2.png');
        this.load.image('animal_18', '../img/animaux/boise/panda_roux.png');
        this.load.image('animal_19', '../img/animaux/boise/gorille.png');
        this.load.image('animal_20', '../img/animaux/boise/panda.png');
        this.load.image('animal_21', '../img/animaux/boise/loup.png');
        this.load.image('animal_22', '../img/animaux/boise/leopard.png');
        this.load.image('animal_23', '../img/animaux/boise/panthere_noire.png');
        this.load.image('animal_24', '../img/animaux/boise/ours_brun.png');
        this.load.image('animal_25', '../img/animaux/boise/tigre.png');
        this.load.image('animal_26', '../img/animaux/plaine/chevre.png');
        this.load.image('animal_27', '../img/animaux/plaine/mouton.png');
        this.load.image('animal_28', '../img/animaux/plaine/alpaga.png');
        this.load.image('animal_29', '../img/animaux/plaine/paon.png');
        this.load.image('animal_30', '../img/animaux/plaine/dodo.png');
        this.load.image('animal_31', '../img/animaux/plaine/bison.png');
        this.load.image('animal_32', '../img/animaux/plaine/bouquetin.png');
        this.load.image('animal_33', '../img/animaux/plaine/ane.png');
        this.load.image('animal_34', '../img/animaux/aquatique/loutre.png');
        this.load.image('animal_35', '../img/animaux/aquatique/otarie.png');
        this.load.image('animal_36', '../img/animaux/aquatique/tortue.png');
        this.load.image('animal_37', '../img/animaux/aquatique/crocodile.png');
        this.load.image('animal_38', '../img/animaux/aquatique/hippopotame.png');
        this.load.image('animal_39', '../img/animaux/aquatique/requin.png');
        this.load.image('animal_40', '../img/animaux/aquatique/baleine.png');
        this.load.image('animal_41', '../img/animaux/aquatique/orque.png');
        this.load.image('animal_42', '../img/animaux/aquatique/dauphin.png');
        this.load.image('animal_43', '../img/animaux/aquatique/raie.png');
        this.load.image('animal_44', '../img/animaux/aquatique/beluga.png');
        this.load.image('animal_45', '../img/animaux/aquatique/narval.png');
        this.load.image('animal_46', '../img/animaux/arctique/renard_polaire.png');
        this.load.image('animal_47', '../img/animaux/arctique/manchot.png');
        this.load.image('animal_48', '../img/animaux/arctique/morse.png');
        this.load.image('animal_49', '../img/animaux/arctique/lion_de_mer.png');
        this.load.image('animal_50', '../img/animaux/arctique/ours_polaire.png');

        this.load.image('base_tile', '../map/tile.png');
        this.load.tilemapTiledJSON('mapData', '../map/map_m.json');
        
        this.load.audio('music1', ['../audio/music_1.mp3']);
        this.load.audio('music2', ['../audio/music_2.mp3']);
        this.load.audio('music3', ['../audio/music_3.mp3']);
        this.load.audio('music4', ['../audio/music_4.mp3']);
        this.load.audio('music5', ['../audio/music_5.mp3']);
        this.load.audio('music6', ['../audio/music_6.mp3']);
    }
    create() {
        this.scene.start('Game');
        this.scene.start('HUD');
        this.scene.start('Menu');

    }
}

//##############################################################################################################
//##############################################################################################################
//###     GAME     ####     GAME     ####     GAME     ####     GAME     ####     GAME     ####     GAME     ###
//##############################################################################################################
//##############################################################################################################
class Game extends Phaser.Scene {
    constructor() {
        super('Game');
        this.path = null;
        this.visiteur = [];
        this.targetCoordinates = [[
            { x: 1245, y: 540 },
            { x: 970, y: 391 },
            { x: 1220, y: 275 },
            { x: 1690, y: 501 },
            { x: 1696, y: 560 },
            { x: 1500, y: 665 },
            { x: 1525, y: 675 },
            { x: 1230, y: 830 },
            { x: 1230, y: 830 },
            { x: 963, y: 695 },
            { x: 805, y: 770 },
        ],
        [
            { x: 965, y: 675 },
            { x: 557, y: 460 },
            { x: 819, y: 335 },
            { x: 967, y: 407 },
            { x: 1215, y: 268 },
            { x: 1456, y: 397 },
            { x: 1216, y: 525 },
            { x: 1012, y: 426 },
            { x: 754, y: 566 },
            { x: 972, y: 683 },
            { x: 805, y: 770 },
        ],
        [
            { x: 968, y: 690 },
            { x: 1230, y: 826 },
            { x: 1528, y: 669 },
            { x: 1252, y: 540 },
            { x: 826, y: 326 },
            { x: 558, y: 468 },
            { x: 966, y: 679 },
            { x: 805, y: 770 },
        ],
        [{ x: 1253, y: 539 },
        { x: 1508, y: 662 },
        { x: 1692, y: 565 },
        { x: 1695, y: 520 },
        { x: 1220, y: 276 },
        { x: 965, y: 402 },
        { x: 1236, y: 542 },
        { x: 805, y: 770 },
        ],
        [
            { x: 965, y: 681 },
            { x: 749, y: 567 },
            { x: 1001, y: 425 },
            { x: 1217, y: 525 },
            { x: 1452, y: 397 },
            { x: 1217, y: 278 },
            { x: 956, y: 405 },
            { x: 1235, y: 543 },
            { x: 805, y: 770 },
        ],
        [{ x: 1249, y: 542 },
        { x: 1203, y: 525 },
        { x: 1450, y: 392 },
        { x: 1693, y: 518 },
        { x: 1697, y: 557 },
        { x: 1503, y: 662 },
        { x: 1254, y: 544 },
        { x: 975, y: 683 },
        { x: 759, y: 566 },
        { x: 998, y: 422 },
        { x: 963, y: 405 },
        { x: 1216, y: 275 },
        { x: 1452, y: 393 },
        { x: 1207, y: 525 },
        { x: 1252, y: 543 },]



        ];
        this.currentTargetIndex = [0];
        this.text_visiteur = [];
        this.frame = []
        this.smiley = []

        this.currentTargetIndex = [0];
        this.text_visiteur = [];
        this.frame = [];
        this.smiley = [];
    }
    // Fonction pour supprimer un animal du tableau et de la scène
    suppressionAnimal(idAnimal, scene) {
        console.log("suppression animal")
        let enclosIndex;
        if (1 <= idAnimal && idAnimal <= 5) {
            //console.log("enclos 1")
            enclosIndex = 0;
        } else if (idAnimal == 6 || idAnimal == 7) {
            enclosIndex = 1;
        } else if (8 <= idAnimal && idAnimal <= 11) {
            enclosIndex = 2;
        } else if (idAnimal == 12 || idAnimal == 13) {
            enclosIndex = 3;
        } else if (14 <= idAnimal && idAnimal <= 20) {
            enclosIndex = 4;
        } else if (21 <= idAnimal && idAnimal <= 25) {
            enclosIndex = 5;
        } else if (26 <= idAnimal && idAnimal <= 30) {
            enclosIndex = 6;
        } else if (31 <= idAnimal && idAnimal <= 33) {
            enclosIndex = 7;
        } else if (34 <= idAnimal && idAnimal <= 36) {
            enclosIndex = 8;
        } else if (idAnimal == 37 || idAnimal == 38) {
            enclosIndex = 9;
        } else if (39 <= idAnimal && idAnimal <= 41) {
            enclosIndex = 10;
        } else if (42 <= idAnimal && idAnimal <= 45) {
            enclosIndex = 11;
        } else if (46 <= idAnimal && idAnimal <= 47) {
            enclosIndex = 12;
        } else if (48 <= idAnimal && idAnimal <= 50) {
            enclosIndex = 13;
        } else {
            console.error("L'ID de l'animal est invalide.");
            return;
        }
        const index = animaux_t.findIndex(animal => animal.idAnimal === idAnimal);
        animauxActuel_enclos[enclosIndex]--;
        if (index !== -1) {
            animaux_t.splice(index, 1); // Suppression de l'animal du tableau

            // Recherche et suppression de l'animal dans le groupe correspondant
            const groupeAnimal = scene.animauxGroup;
            const animalToRemove = groupeAnimal.getChildren().find(child => child.idAnimal === idAnimal);

            if (animalToRemove) {
                animalToRemove.destroy(); // Suppression de l'animal de la scène
            }
        }
    }
    updateAnimal(idAnimal, scene) {
            
        const groupeAnimal = scene.animauxGroup;
        const animalToUpdate = groupeAnimal.getChildren().find(child => child.idAnimal === idAnimal);
    
        if (animalToUpdate) {
            // Supprimer l'animal existant
            animalToUpdate.destroy();
    
            // Récupérer le nom de l'animal à partir de son ID
            const nomAnimal = nomsAnimaux[idAnimal];
    
            if (nomAnimal && EtatAnimaux[idAnimal] == 0) {
                // Créer un nouvel animal avec une nouvelle image
                const nouvelleImage = nomAnimal + '2';
                const nouvelAnimal = scene.add.sprite(animalToUpdate.x, animalToUpdate.y, nouvelleImage);
                nouvelAnimal.idAnimal = idAnimal;
    
                // Réattribuer les mêmes propriétés à l'animal
                nouvelAnimal.setOrigin(-50.85, 6.7);
                nouvelAnimal.setDepth(3);
                nouvelAnimal.setScale(0.04);
    
                // Remplacer l'animal dans le groupe
                groupeAnimal.add(nouvelAnimal);
            } else if (nomAnimal && EtatAnimaux[idAnimal] == 1) {
                const nouvelleImage = 'animal_'+ idAnimal;
            
                const nouvelAnimal = scene.add.sprite(animalToUpdate.x, animalToUpdate.y, nouvelleImage);
                nouvelAnimal.idAnimal = idAnimal;
    
                // Réattribuer les mêmes propriétés à l'animal
                nouvelAnimal.setOrigin(-50.85, 6.7);
                nouvelAnimal.setDepth(3);
                nouvelAnimal.setScale(0.04);
    
                // Remplacer l'animal dans le groupe
                groupeAnimal.add(nouvelAnimal);
            }
        
        }
    }
    afficherAnimal(idAnimal, scene) {
        var animauxMax_enclos = [(Max_enclos_X[idAnimal] - Min_enclos_X[idAnimal]) / 2 * (((Max_enclos_Y[idAnimal] - 2) - (Min_enclos_Y[idAnimal] - 2)) / 4)];
        //console.log(Max_enclos_X[0], Min_enclos_X[0], Max_enclos_Y[0], Min_enclos_Y[0], animauxActuel_enclos[0], animauxMax_enclos[0]);
        // Vérification de l'ID de l'animal et détermination de l'index de l'enclos correspondant
        let enclosIndex;
        if (1 <= idAnimal && idAnimal <= 5) {
            enclosIndex = 0;
        }
        else if (idAnimal == 6 || idAnimal == 7) {
            enclosIndex = 1;
        }
        else if (8 <= idAnimal && idAnimal <= 11) {
            enclosIndex = 2;
        }
        else if (idAnimal == 12 || idAnimal == 13) {
            enclosIndex = 3;
        }
        else if (14 <= idAnimal && idAnimal <= 20) {
            enclosIndex = 4;
        }
        else if (21 <= idAnimal && idAnimal <= 25) {
            enclosIndex = 5;
        }
        else if (26 <= idAnimal && idAnimal <= 30) {
            enclosIndex = 6;
        }
        else if (31 <= idAnimal && idAnimal <= 33) {
            enclosIndex = 7;
        }
        else if (34 <= idAnimal && idAnimal <= 36) {
            enclosIndex = 8;
        }
        else if (idAnimal == 37 || idAnimal == 38) {
            enclosIndex = 9;
        }
        else if (39 <= idAnimal && idAnimal <= 41) {
            enclosIndex = 10;
        }
        else if (42 <= idAnimal && idAnimal <= 45) {
            enclosIndex = 11;
        }
        else if (46 <= idAnimal && idAnimal <= 47) {
            enclosIndex = 12;
        }
        else if (48 <= idAnimal && idAnimal <= 50) {
            enclosIndex = 13;
        }
        else {
            console.error("L'ID de l'animal est invalide.");
            return;
        }

        // Vérification de la capacité maximale de l'enclos
        if (animauxActuel_enclos[enclosIndex] + 1 === animauxMax_enclos[enclosIndex]) {
            console.log("plus de place pour les animaux");
            return;
        }

        let overlap = true;
        let animaux_X, animaux_Y;
        // Génération des coordonnées isométriques aléatoires
        while (overlap) {
            animaux_X = Phaser.Math.Between(Min_enclos_X[enclosIndex], Max_enclos_X[enclosIndex]);
            if (Math.floor(animaux_X) % 2 !== 0) {
                animaux_X = animaux_X + 1;
            }
            animaux_X = animaux_X / 10;
            animaux_X = Number(animaux_X.toFixed(1));

            animaux_Y = Phaser.Math.Between(Min_enclos_Y[enclosIndex], Max_enclos_Y[enclosIndex]);
            if (Math.floor(animaux_Y - 2) % 4 !== 0) {
                animaux_Y = animaux_Y + 1;
            }
            if (Math.floor(animaux_Y - 2) % 4 !== 0) {
                animaux_Y = animaux_Y + 1;
            }
            if (Math.floor(animaux_Y - 2) % 4 !== 0) {
                animaux_Y = animaux_Y + 1;
            }
            animaux_Y = animaux_Y / 10;
            animaux_Y = Number(animaux_Y.toFixed(1));

            overlap = false;
            for (let i = 0; i < animaux_t.length; i++) {
                if (animaux_t[i].animaux_X === animaux_X && animaux_t[i].animaux_Y === animaux_Y) {
                    overlap = true;
                    break;
                }
            }
        }

        animauxActuel_enclos[enclosIndex]++;
        animaux_t.push({ idAnimal, animaux_X, animaux_Y });


        const cartX = animaux_X * tileWidth + tileWidth / 2;
        const cartY = animaux_Y * tileHeight;

        const isoX = (cartX - cartY) * tileWidth / 2;
        const isoY = (cartX + cartY) * tileHeight / 2;

        // Ajout de l'animal à la couche "enclos" de la carte aux coordonnées isométriques avec la taille prédéfinie
        const animalSprite = scene.animauxGroup.create(isoX, isoY, "animal_" + idAnimal);
        animalSprite.idAnimal = idAnimal;
        //console.log(isoX, isoY, "animal_" + idAnimal);

        animalSprite.setOrigin(-50.85, 6.7);
        animalSprite.setDepth(3);
        animalSprite.setScale(0.04);

        //console.log(animaux_X, animaux_Y);

        // Démarrage du chargement des ressources
        scene.load.start();
        // Définition du groupe d'animaux

    }
    create() {


        this.add.image(2438, 1080, 'background').setScale(1).setDepth(-1).setOrigin(1, 1);


        //#####################################
        //#                                   #
        //# --   Création de la caméra    --  #
        //#                                   #
        //#####################################
        const map = this.make.tilemap({ key: 'mapData' });
        const tiles = map.addTilesetImage('tile', 'base_tile');

        const layers = {
            sol: map.createLayer('sol', tiles, 0, 0),
            path: map.createLayer('path', tiles, 0, 0),
            enclos: map.createLayer('enclos', tiles, 0, 0)
        };

        // Modifier l'emplacement et la taille de chaque couche en fonction de leur profondeur
        layers.sol.setPosition(width2, 100);
        layers.sol.setScale(0.11);
        layers.path.setPosition(width2, 100);
        layers.path.setScale(0.11);
        layers.enclos.setPosition(width2, 100);
        layers.enclos.setScale(0.11);

        layers.sol.setDepth(0);
        layers.path.setDepth(1);
        layers.enclos.setDepth(2);

        const layerNames = map.layers.map(layer => layer.name);
        // Fonction de détection de tuile sur clic
        function detectTileClick(pointer) {
            const worldPoint = pointer.positionToCamera(this.cameras.main);
            const { x, y } = worldPoint;
            const tile = map.getTileAtWorldXY(x, y);
            testPosX = pointer.x;
            testPosY = pointer.y;

            if (tile && testPosX == testPosX2 && testPosY == testPosY2) {
                console.log(`Clicked on tile (${tile.x}, ${tile.y}) in layer '${tile.layer.name}'`);
                if (tile.x <= 41 && tile.y <= 21) {
                    console.log('plaine droite');
                    enclos8 = true;
                }
                else if (tile.x <= 21 && tile.y <= 55) {
                    console.log('plaine gauche');
                    enclos7 = true;
                }
                else if (tile.x <= 78 && tile.y <= 20) {
                    console.log('vase');
                    enclos10 = true;
                }
                else if (tile.x <= 55 && tile.y <= 54) {
                    console.log('eau haut');
                    enclos11 = true;
                }
                else if (tile.x <= 26 && tile.y <= 93) {
                    console.log('savane haut');
                    enclos2 = true;
                }
                else if (tile.x <= 59 && tile.y <= 93) {
                    console.log('savane droite');
                    enclos3 = true;
                }
                else if (tile.x <= 94 && tile.y <= 54 && tile.y > 30) {
                    console.log('boisé haut');
                    enclos5 = true;
                }
                else if (tile.x <= 127 && tile.y <= 27) {
                    console.log('eau droite');
                    enclos9 = true;
                }
                else if (tile.x <= 55 && tile.y <= 124) {
                    console.log('savane gauche');
                    enclos1 = true;
                }
                else if (tile.x <= 99 && tile.y <= 100) {
                    console.log('eau bas');
                    enclos12 = true;
                }
                else if (tile.x <= 125 && tile.y <= 54) {
                    console.log('boisé droite');
                    enclos4 = true;
                }
                else if (tile.x <= 105 && tile.y <= 123) {
                    console.log('boisé gauche');
                    enclos6 = true;
                }
                else if (tile.x <= 124 && tile.y <= 92) {
                    console.log('banquise droite');
                    enclos14 = true;
                }
                else if (tile.x <= 125 && tile.y <= 125) {
                    console.log('banquise bas');
                    enclos13 = true;
                }
            }
        }
        function stockthepos(pointer2) {
            testPosX2 = pointer2.x;
            testPosY2 = pointer2.y;
        }
        this.input.on('pointerdown', stockthepos, this);
        this.input.on('pointerup', detectTileClick, this);


        this.animauxGroup = this.add.group();
        this.cameras.main.setZoom(1);

        /* de côté ça peut aider
        this.input.keyboard.on("keydown-A", function () {
            this.cameras.main.ignore([this.coinText, this.xpText]);
        }, this);
        */

        //Ajout des contrôles de la caméra
        this.input.on("wheel", function (pointer, gameObjects, deltaX, deltaY, deltaZ) {
            const mouseWorldX = this.cameras.main.getWorldPoint(pointer.x, pointer.y).x;
            const mouseWorldY = this.cameras.main.getWorldPoint(pointer.x, pointer.y).y;
            const originX = 1220;
            const originY = 540;
            const tileWidth = 128;
            const tileHeight = 64;
            const isoX = (mouseWorldX - originX) / tileWidth - (mouseWorldY - originY) / tileHeight;
            const isoY = (mouseWorldX - originX) / tileWidth + (mouseWorldY - originY) / tileHeight;
            //console.log(isoX, isoY);

            if (stepCam > 1 && stepCam <= 16 && deltaY > 0 && opened == false) {
                stepCam = stepCam / 2; //dezoom
                this.cameras.main.setZoom(stepCam);
                const offsetX = (mouseWorldX - this.cameras.main.worldView.centerX) * (1 - 1 / stepCam);
                const offsetY = (mouseWorldY - this.cameras.main.worldView.centerY) * (1 - 1 / stepCam);
                this.cameras.main.centerOn(this.cameras.main.worldView.centerX + offsetX + ((1217 - this.cameras.main.worldView.centerX + offsetX) / stepCam), this.cameras.main.worldView.centerY + offsetY + ((540 - this.cameras.main.worldView.centerY + offsetY) / stepCam));
                
            }

            if (stepCam >= 1 && stepCam < 16 && deltaY < 0 && opened == false) {
                if (isoX >= -6.8 && isoX <= 6.8 && isoY >= -7 && isoY <= 7.5)  {
                    //console.log("Mouse is over the map");
                }
                else { return; }
                stepCam = stepCam * 2; //zoom
                this.cameras.main.setZoom(stepCam);
                const offsetX = (mouseWorldX - this.cameras.main.worldView.centerX) * (1 - 1 / stepCam);
                const offsetY = (mouseWorldY - this.cameras.main.worldView.centerY) * (1 - 1 / stepCam);
                if(stepCam == 2){
                    this.cameras.main.centerOn(this.cameras.main.worldView.centerX + offsetX, this.cameras.main.worldView.centerY + offsetY);
                }
                else if(stepCam == 4){
                    this.cameras.main.centerOn(this.cameras.main.worldView.centerX + offsetX/1.5, this.cameras.main.worldView.centerY + offsetY/1.5);
                }
                else if(stepCam == 8){
                    this.cameras.main.centerOn(this.cameras.main.worldView.centerX + offsetX/1.72, this.cameras.main.worldView.centerY + offsetY/1.72);
                }
                else if(stepCam == 16){
                    this.cameras.main.centerOn(this.cameras.main.worldView.centerX + offsetX/2, this.cameras.main.worldView.centerY + offsetY/2);
                }
                
            }

            if (stepCam == 1) {
                this.cameras.main.centerOn(1220, 540);
            }
        }, this);




        this.input.on("pointerdown", function (pointer) {
            this.input.on("pointermove", function (pointer) {
                if (pointer.isDown) {
                    const offsetX = (pointer.x - pointer.prevPosition.x) / this.cameras.main.zoom;
                    const offsetY = (pointer.y - pointer.prevPosition.y) / this.cameras.main.zoom;
                    const cameraWidth = this.cameras.main.width / this.cameras.main.zoom;
                    const cameraHeight = this.cameras.main.height / this.cameras.main.zoom;
                    const newScrollX = this.cameras.main.scrollX - offsetX;
                    const newScrollY = this.cameras.main.scrollY - offsetY;
                    if (stepCam == 2) {
                        if(newScrollX >= -610 && newScrollX + cameraWidth <= 1830) {
                            this.cameras.main.scrollX = newScrollX;
                        }
                        if(newScrollY >= -268 && newScrollY + cameraHeight <= 808){
                            this.cameras.main.scrollY = newScrollY;
                        }
                    }
                    else if (stepCam == 4) {
                        if(newScrollX >= -900 && newScrollX + cameraWidth <= 1520) {
                            this.cameras.main.scrollX = newScrollX;
                        }
                        if(newScrollY >= -380 && newScrollY + cameraHeight <= 668){
                            this.cameras.main.scrollY = newScrollY;
                        }
                    }
                    else if (stepCam == 8) {
                        if(newScrollX >= -920 && newScrollX + cameraWidth <= 1340) {
                            this.cameras.main.scrollX = newScrollX;
                        }
                        if(newScrollY >= -466 && newScrollY + cameraHeight <= 600){
                            this.cameras.main.scrollY = newScrollY;
                        }
                    }
                    else if (stepCam == 16) {
                        if(newScrollX >= -800 && newScrollX + cameraWidth <= 1000) {
                            this.cameras.main.scrollX = newScrollX;
                        }
                        if(newScrollY >= -400 && newScrollY + cameraHeight <= 500){
                            this.cameras.main.scrollY = newScrollY;
                        }
                    }
                }
            }, this);
        }, this);
        this.input.on("pointerup", function (pointer) {
            this.input.off("pointermove");
        }, this);

        //################################
        //# --   Fin de la caméra    --  #
        //################################
        tileWidth = map.tileWidth * layers.enclos.scaleX;
        tileHeight = map.tileHeight * layers.enclos.scaleY;
        //################################




        this.cursors = this.input.keyboard.createCursorKeys();
        this.spacebar = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE);

        let nombreVisiteurs = 40;// Nombre de visiteurs à créer
        const nom_sprite = ["visiteur", "visiteur2", "visiteur3", "visiteur4"]
        this.input.on('pointerdown', (pointer) => {
            if (pointer.leftButtonDown()) {
                const { x, y } = pointer;
                console.log(`{x: ${parseInt(x)}, y: ${parseInt(y)} },`);
            }
        });
        hell.then(data => {
            visiteurs = data.visiteurs;
            let s = db_save_into_tab(data.last_save)
            for (let i = 0; i < s.ec_na.length; i++) {
                for (let j = 0; j < s.ec_na[i].length; j++) {
                    this.afficherAnimal(s.ec_na[i][j], this);
                }
            }
            for (let i = 0; i < nombreVisiteurs; i++) {
                const cheminIndex = Phaser.Math.Between(0, this.targetCoordinates.length - 1);
                const vitesse = Phaser.Math.Between(50, 100);

                this.visiteur.push(null);
                const nb_nom_sprite = Phaser.Math.Between(0, nom_sprite.length - 1);
                this.visiteur[i] = this.physics.add.image(805, 770, nom_sprite[nb_nom_sprite]);

                this.visiteur[i].setScale(0.32);
                this.visiteur[i].depth = 14;
                this.visiteur[i].setCollideWorldBounds(false);
                this.visiteur[i].body.setAllowGravity(false);


                this.texte = this.add.text(0, 0, /*visiteurs[i].nom + " " + */visiteurs[i].prenom, { fontSize: '10px', fill: '#000000' });
                this.texte.setOrigin(0.5);
                this.texte.depth = 4;
                this.text_visiteur.push(this.texte);

                this.currentTargetIndex.push(0);
                this.frame.push([9, 0, 0]);
                this.smile = this.add.text(0, 0, "", { fontSize: '10px', fill: '#000000' });
                this.smile.setOrigin(0.5);
                this.smile.depth = 4;
                this.smiley.push(this.smile);
                this.moveVisiteurToNextTarget(i, cheminIndex, vitesse);



            }
        });

        this.input.on('pointerdown', (pointer) => {
            if (pointer.leftButtonDown()) {
                const { x, y } = pointer;
                console.log(`{x: ${parseInt(x)}, y: ${parseInt(y)} },`);
            }
        });
    }
    wich_direction(x, y, targetx, targety) {
        if (targetx - x < 0 && targety - y < 0) {

            return 6;
        }
        if (targetx - x < 0) {

            return 0;
        }
        if (targety - y < 0) {

            return 9;
        }

        return 3;

    }
    moveVisiteurToNextTarget(i, chemin, vitesse) {
        if (this.currentTargetIndex[i] >= this.targetCoordinates[chemin].length) {
            // Toutes les cibles ont été atteintes, arrêter le déplacement
            this.currentTargetIndex[i] = 0;
            this.moveVisiteurToNextTarget(i, chemin, vitesse);
            return;
        }

        const target = this.targetCoordinates[chemin][this.currentTargetIndex[i]];
        const distance = Phaser.Math.Distance.Between(this.visiteur[i].x, this.visiteur[i].y, target.x, target.y);

        // Calcul de la durée du déplacement à une vitesse constante
        const duration = distance / vitesse * 1000; // Convertir en millisecondes

        // Déplacement du visiteur vers la cible actuelle
        this.tweens.add({
            targets: this.visiteur[i],
            x: target.x,
            y: target.y,
            //se déplace a une vitesse de 100px/s
            duration: duration,
            ease: 'Linear',
            t: 1,
            onUpdate: () => {
                // Mise à jour de la position du texte
                if (this.frame[i][1] == 30) {
                    this.visiteur[i].setFrame(this.frame[i][0]);
                    this.frame[i][0] = (this.frame[i][0] + 1) % 3 + this.wich_direction(this.visiteur[i].x, this.visiteur[i].y, target.x, target.y);
                    this.frame[i][1] = 0;


                }
                if (this.frame[i][2] == 300) {
                    this.frame[i][2] = 0;
                    let proba = Phaser.Math.Between(0, 300);
                    if (proba == 1) {
                        this.smiley[i].setText("😀");
                    }
                    else if (proba == 2) {
                        this.smiley[i].setText("😂");
                    }
                    else if (proba == 3) {
                        this.smiley[i].setText("😍");
                    }
                    else if (proba == 4) {
                        this.smiley[i].setText("😘");
                    }
                    else if (proba == 5) {
                        this.smiley[i].setText("😜");
                    }
                    else if (proba == 6) {
                        this.smiley[i].setText("😎");
                    }
                    else if (proba == 7) {
                        this.smiley[i].setText("😡");
                    }
                    else if (proba == 8) {
                        this.smiley[i].setText("😱");
                    }
                    else if (proba == 9) {
                        this.smiley[i].setText("😭");
                    }
                    else {
                        this.smiley[i].setText("");
                    }
                }
                if (this.frame[i][2] == 300) {
                    this.frame[i][2] = 0;
                    let proba = Phaser.Math.Between(0, 300);
                    if (proba == 1) {
                        this.smiley[i].setText("😀");
                    }
                    else if (proba == 2) {
                        this.smiley[i].setText("😂");
                    }
                    else if (proba == 3) {
                        this.smiley[i].setText("😍");
                    }
                    else if (proba == 4) {
                        this.smiley[i].setText("😘");
                    }
                    else if (proba == 5) {
                        this.smiley[i].setText("😜");
                    }
                    else if (proba == 6) {
                        this.smiley[i].setText("😎");
                    }
                    else if (proba == 7) {
                        this.smiley[i].setText("😡");
                    }
                    else if (proba == 8) {
                        this.smiley[i].setText("😱");
                    }
                    else if (proba == 9) {
                        this.smiley[i].setText("😭");
                    }
                    else {
                        this.smiley[i].setText("");
                    }

                }
                this.frame[i][1] += 1;
                this.frame[i][2] += 1;

                //console.log(this.frame[i])

                this.text_visiteur[i].x = this.visiteur[i].x;
                this.text_visiteur[i].y = this.visiteur[i].y - 30;

                this.smiley[i].x = this.visiteur[i].x + 13;
                this.smiley[i].y = this.visiteur[i].y - 15;
                //random 1/100 pour smiley
            },
            onComplete: () => {
                // Appel récursif pour passer à la cible suivante
                this.currentTargetIndex[i]++;
                this.moveVisiteurToNextTarget(i, chemin, vitesse);
                this.frame[i][0] = (this.frame[i][0] + 1) % 3 + this.wich_direction(this.visiteur[i].x, this.visiteur[i].y, chemin);
                this.visiteur[i].setFrame(this.frame[i][0]);
                this.frame[i][1] = 0;


            }
        });
    }
    update() {
        for (let i = 0; i < animaux_a_afficher.length; i++) {
            this.afficherAnimal(animaux_a_afficher[i], this);
            animaux_a_afficher.splice(i, 1);

        }
        for (let i = 0; i < animaux_a_vendre.length; i++) {
            this.suppressionAnimal(animaux_a_vendre[i], this);
            animaux_a_vendre.splice(i, 1);
        }

        const deltaTime = this.game.loop.delta;
        temps += deltaTime;

        // Vérifiez si 2 secondes se sont écoulées
        if (temps >= 2000) {
          
          const idAnimal = 17; // Remplacez par l'ID de l'animal que vous souhaitez mettre à jour
          this.updateAnimal(idAnimal, this);
          if (EtatAnimaux[idAnimal] == 0) {
            EtatAnimaux[idAnimal] = 1;
          } else { EtatAnimaux[idAnimal] = 0; }
          // Réinitialisez le temps écoulé
          temps = 0;
        }
    }
}

//##############################################################################################################
//##############################################################################################################
//###     MENU     ####     MENU     ####     MENU     ####     MENU     ####     MENU     ####     MENU     ###
//##############################################################################################################
//##############################################################################################################
class Menu extends Phaser.Scene {
    constructor() {
        super({ key: 'Menu' });
    }
    create() {
        posXTest = this.add.text(2120, 10, '-', { font: 'bold 18px Georgia', fill: '#fff' });
        posYTest = this.add.text(2120, 40, '-', { font: 'bold 18px Georgia', fill: '#fff' });
        
        this.stats = this.add.image(2300, 940, 'stats')
        .setInteractive({ useHandCursor: true })
            .on('pointerover', () => {
                this.stats.setScale(0.24);
            })
            .on('pointerout', () => {
                this.stats.setScale(0.2);
            })
            .on('pointerdown', () => {
                this.stats.setScale(0.16);
            })
            .on('pointerup', () => {
                this.stats.setScale(0.2);
                tablette = true;
        });
        this.stats.setScale(0.2);
        this.stats.depth = 14;
        this.stats.visible = true;

        this.sound_logo = this.add.image(80, 1000, 'sound')
        .setInteractive({ useHandCursor: true })
            .on('pointerover', () => {
                this.sound_logo.setScale(0.4);
            })
            .on('pointerout', () => {
                this.sound_logo.setScale(0.32);
            })
            .on('pointerdown', () => {
                this.sound_logo.setScale(0.26);
            })
            .on('pointerup', () => {
                this.sound_logo.setScale(0.32);
                radio = true;
        });
        this.sound_logo.setScale(0.32);


        this.music1 = this.sound.add('music1', { loop: true });
        this.music2 = this.sound.add('music2', { loop: true });
        this.music3 = this.sound.add('music3', { loop: true });
        this.music4 = this.sound.add('music4', { loop: true });
        this.music5 = this.sound.add('music5', { loop: true });
        this.music6 = this.sound.add('music6', { loop: true });


        /*
        var config2 = {
            key: 'bar_xp_anim',
            frames: this.anims.generateFrameNumbers('xps', {
                start: 0,
                end: 18,
                first: 0
            }),
            frameRate: 8,
            repeat: -1
        };
        */
        //this.anims.create(config2);
        //this.add.sprite(960, 50, "xps").play("bar_xp_anim");
        this.anim_xp = this.add.image(1224, 72, 'xps');
        this.anim_xp.setScale(1.4);
        this.anim_xp.depth = 14;

        this.coin = this.add.image(200, 56, 'coin');
        this.coin.setScale(0.8);
        this.coin.state = 1000;
        this.coin.depth = 8;

        this.stonks = this.add.image(620, 400, 'stonks');
        this.stonks.setScale(0.05);
        this.stonks.state = 1000;
        this.stonks.depth = 11;
        this.stonks.visible = false;

        this.not_stonks = this.add.image(620, 590, 'not_stonks');
        this.not_stonks.setScale(0.05);
        this.not_stonks.state = 1000;
        this.not_stonks.depth = 11;
        this.not_stonks.visible = false;

        this.stonks2 = this.add.image(620, 780, 'stonks');
        this.stonks2.setScale(0.05);
        this.stonks2.state = 1000;
        this.stonks2.depth = 11;
        this.stonks2.visible = false;


        coinText = this.add.text(280, 28, '1000', { font: 'bold 40px Georgia', fill: '#fff' });
        xpText = this.add.text(1220, 6, '0 / ???', { font: 'bold 40px Georgia', fill: '#fff' }).setOrigin(0.5,0);
        lvlText = this.add.text(1780, 32, '0', { font: 'bold 64px Georgia', fill: '#fff' });
        stonksText = this.add.text(760, 380, '0', { font: 'bold 40px Georgia', fill: '#000' });
        stonksText.depth = 11;
        stonksText.visible = false;
        not_stonksText = this.add.text(760, 570, '0', { font: 'bold 40px Georgia', fill: '#000' });
        not_stonksText.depth = 11;
        not_stonksText.visible = false;
        stonks2Text = this.add.text(760, 760, '0', { font: 'bold 40px Georgia', fill: '#000' });
        stonks2Text.depth = 11;
        stonks2Text.visible = false;
        
        gainstotaux = this.add.text(960, 380, '<==  Gains totaux', { font: 'bold 40px Georgia', fill: '#000' });
        gainstotaux.depth = 11;
        gainstotaux.visible = false;

        depenses = this.add.text(960, 570, '<==  Dépenses totales', { font: 'bold 40px Georgia', fill: '#000' });
        depenses.depth = 11;
        depenses.visible = false;

        gainsreels = this.add.text(960, 760, '<==  Gains réels', { font: 'bold 40px Georgia', fill: '#000' });
        gainsreels.depth = 11;
        gainsreels.visible = false;


        this.visit = this.add.image(200, 144, 'visiteur_icon');
        this.visit.setScale(0.168);
        this.visit.depth = 14;
        nbvisitText = this.add.text(280, 112, '0', { font: 'bold 40px Georgia', fill: '#fff' });
        

        this.menu = this.add.image(1220, 572, 'menu');
        this.menu.setScale(1.2);
        this.menu.depth = 10;
        this.menu.visible = false;
        
        this.menu2 = this.add.image(1220, 572, 'menu2');
        this.menu2.setScale(1.28);
        this.menu2.depth = 10;
        this.menu2.visible = false;

        this.menu3 = this.add.image(1220, 572, 'menu3');
        this.menu3.setScale(1.2);
        this.menu3.depth = 10;
        this.menu3.visible = false;


        this.hashtag = this.add.image(2220, 288, 'hashtag');
        this.hashtag.setScale(1.8);
        this.hashtag.depth = 10;
        this.hashtag.visible = true;



        let xView = 0;
        let yView = 0;
        let xMask = 500;
        let yMask = 324;
        let widthMask = 1400;
        let heightMask = 560;
        const viewport = this.add.container(xView, yView);
        viewport.depth = 12;
        const mask = this.add.graphics().fillRect(xMask, yMask, widthMask, heightMask);
        viewport.mask = new Phaser.Display.Masks.GeometryMask(this, mask);


        this.hashtagText = [];
        this.hashtagText[0] = this.add.text(2100, 200, '-', { font: 'bold 28px Georgia', fill: '#000' });
        this.hashtagText[0].visible = true;
        this.hashtagText[0].depth = 11;
        this.hashtagText[1] = this.add.text(2100, 250, '-', { font: 'bold 28px Georgia', fill: '#000' });
        this.hashtagText[1].visible = true;
        this.hashtagText[1].depth = 11;
        this.hashtagText[2] = this.add.text(2100, 300, '-', { font: 'bold 28px Georgia', fill: '#000' });
        this.hashtagText[2].visible = true;
        this.hashtagText[2].depth = 11;
        this.hashtagText[3] = this.add.text(2100, 350, '-', { font: 'bold 28px Georgia', fill: '#000' });
        this.hashtagText[3].visible = true;
        this.hashtagText[3].depth = 11;
        this.hashtagText[4] = this.add.text(2100, 400, '-', { font: 'bold 28px Georgia', fill: '#000' });
        this.hashtagText[4].visible = true;
        this.hashtagText[4].depth = 11;
        this.hashtagText[5] = this.add.text(2100, 450, '-', { font: 'bold 28px Georgia', fill: '#000' });
        this.hashtagText[5].visible = true;
        this.hashtagText[5].depth = 11;
        this.hashtagText[6] = this.add.text(2100, 500, '-', { font: 'bold 28px Georgia', fill: '#000' });
        this.hashtagText[6].visible = true;
        this.hashtagText[6].depth = 11;
        this.hashtagText[7] = this.add.text(2100, 200, '-', { font: 'bold 28px Georgia', fill: '#000' });
        this.hashtagText[7].visible = false;
        this.hashtagText[7].depth = 11;
        this.hashtagText[8] = this.add.text(2100, 250, '-', { font: 'bold 28px Georgia', fill: '#000' });
        this.hashtagText[8].visible = false;
        this.hashtagText[8].depth = 11;
        this.hashtagText[9] = this.add.text(2100, 300, '-', { font: 'bold 28px Georgia', fill: '#000' });
        this.hashtagText[9].visible = false;
        this.hashtagText[9].depth = 11;
        this.hashtagText[10] = this.add.text(2100, 350, '-', { font: 'bold 28px Georgia', fill: '#000' });
        this.hashtagText[10].visible = false;
        this.hashtagText[10].depth = 11;
        this.hashtagText[11] = this.add.text(2100, 400, '-', { font: 'bold 28px Georgia', fill: '#000' });
        this.hashtagText[11].visible = false;
        this.hashtagText[11].depth = 11;
        this.hashtagText[12] = this.add.text(2100, 450, '-', { font: 'bold 28px Georgia', fill: '#000' });
        this.hashtagText[12].visible = false;
        this.hashtagText[12].depth = 11;
        this.hashtagText[13] = this.add.text(2100, 500, '-', { font: 'bold 28px Georgia', fill: '#000' });
        this.hashtagText[13].visible = false;
        this.hashtagText[13].depth = 11;
        this.hashtagText[14] = this.add.text(2100, 200, '-', { font: 'bold 28px Georgia', fill: '#000' });
        this.hashtagText[14].visible = false;
        this.hashtagText[14].depth = 11;
        this.hashtagText[15] = this.add.text(2100, 250, '-', { font: 'bold 28px Georgia', fill: '#000' });
        this.hashtagText[15].visible = false;
        this.hashtagText[15].depth = 11;
        this.hashtagText[16] = this.add.text(2100, 300, '-', { font: 'bold 28px Georgia', fill: '#000' });
        this.hashtagText[16].visible = false;
        this.hashtagText[16].depth = 11;
        this.hashtagText[17] = this.add.text(2100, 350, '-', { font: 'bold 28px Georgia', fill: '#000' });
        this.hashtagText[17].visible = false;
        this.hashtagText[17].depth = 11;
        this.hashtagText[18] = this.add.text(2100, 400, '-', { font: 'bold 28px Georgia', fill: '#000' });
        this.hashtagText[18].visible = false;
        this.hashtagText[18].depth = 11;
        this.hashtagText[19] = this.add.text(2100, 450, '-', { font: 'bold 28px Georgia', fill: '#000' });
        this.hashtagText[19].visible = false;
        this.hashtagText[19].depth = 11;
        this.hashtagText[20] = this.add.text(2100, 500, '-', { font: 'bold 28px Georgia', fill: '#000' });
        this.hashtagText[20].visible = false;
        this.hashtagText[20].depth = 11;


        //===== TABLEAUX ANIMALS ===== TABLEAUX ANIMALS ===== TABLEAUX ANIMALS ===== TABLEAUX ANIMALS =====
        this.descr = [];
        this.animals = [];
        //animal 1
        this.animals[1] = this.add.image(750, 460, 'zebre')
            .setInteractive({ useHandCursor: true })
            .on('pointerover', () => {
                this.animals[1].setTint(0xffaaff),
                this.animals[1].setScale(0.54);
            })
            .on('pointerout', () => {
                this.animals[1].setTint(0xffffff),
                this.animals[1].setScale(0.5);
            })
            .on('pointerdown', () => {
                this.animals[1].setTint(0xffffff),
                this.animals[1].setScale(0.42);
                achat_animal(1, 1);
            })
            .on('pointerup', () => {
                this.animals[1].setScale(0.5);
        });
        this.animals[1].setScale(0.5);
        this.animals[1].depth = 11;
        this.animals[1].visible = false;
        viewport.add(this.animals[1]);
        this.descr[1] = this.add.text(1000, 360, '\n\nDéblocage au niveau 1', { font: 'bold 24px Georgia', fill: '#000' });
        this.descr[1].visible = false;
        viewport.add(this.descr[1]);
        //animal 2
        this.animals[2] = this.add.image(750, 760, 'girafe')
            .setInteractive({ useHandCursor: true })
            .on('pointerover', () => {
                this.animals[2].setTint(0xffaaff),
                this.animals[2].setScale(0.54);
            })
            .on('pointerout', () => {
                this.animals[2].setTint(0xffffff),
                this.animals[2].setScale(0.5);
            })
            .on('pointerdown', () => {
                this.animals[2].setTint(0xffffff),
                this.animals[2].setScale(0.42);
                achat_animal(2, 1);
            })
            .on('pointerup', () => {
                this.animals[2].setScale(0.5);
        });
        this.animals[2].setScale(0.5);
        this.animals[2].depth = 11;
        this.animals[2].visible = false;
        viewport.add(this.animals[2]);
        this.descr[2] = this.add.text(1000, 660, '\n\nDéblocage au niveau 1', { font: 'bold 24px Georgia', fill: '#000' });
        this.descr[2].visible = false;
        viewport.add(this.descr[2]);
        //animal 3
        this.animals[3] = this.add.image(750, 1060, 'suricate')
            .setInteractive({ useHandCursor: true })
            .on('pointerover', () => {
                if (level >= 2) {
                    this.animals[3].setTint(0xffaaff),
                    this.animals[3].setScale(0.54);
                }
                else {
                    this.animals[3].setTint(0x888888);
                }
            })
            .on('pointerout', () => {
                if (level >= 2) {
                    this.animals[3].setTint(0xffffff),
                    this.animals[3].setScale(0.5);
                }
                else {
                    this.animals[3].setTint(0x888888);
                }
            })
            .on('pointerdown', () => {
                this.animals[3].setTint(0xffffff),
                    this.animals[3].setScale(0.42);
                achat_animal(3, 1);
            })
            .on('pointerup', () => {
                this.animals[3].setScale(0.5);
        });
        this.animals[3].setScale(0.5);
        this.animals[3].depth = 11;
        this.animals[3].visible = false;
        viewport.add(this.animals[3]);
        this.descr[3] = this.add.text(1000, 960, 'Déblocage au niveau 2\n\nInformations supplémentaires', { font: 'bold 24px Georgia', fill: '#000' });
        this.descr[3].visible = false;
        viewport.add(this.descr[3]);
        //animal 4
        this.animals[4] = this.add.image(750, 1360, 'autruche')
            .setInteractive({ useHandCursor: true })
            .on('pointerover', () => {
                if (level >= 2) {
                    this.animals[4].setTint(0xffaaff),
                    this.animals[4].setScale(0.54);
                }
                else {
                    this.animals[4].setTint(0x888888);
                }
            })
            .on('pointerout', () => {
                if (level >= 2) {
                    this.animals[4].setTint(0xffffff),
                    this.animals[4].setScale(0.5);
                }
                else {
                    this.animals[4].setTint(0x888888);
                }
            })
            .on('pointerdown', () => {
                this.animals[4].setTint(0xffffff),
                this.animals[4].setScale(0.42);
                achat_animal(4, 1);
            })
            .on('pointerup', () => {
                this.animals[4].setScale(0.5);
        });
        this.animals[4].setScale(0.5);
        this.animals[4].depth = 11;
        this.animals[4].visible = false;
        viewport.add(this.animals[4]);
        this.descr[4] = this.add.text(1000, 1260, 'Déblocage au niveau 2\n\nInformations supplémentaires', { font: 'bold 24px Georgia', fill: '#000' });
        this.descr[4].visible = false;
        viewport.add(this.descr[4]);
        //animal 5
        this.animals[5] = this.add.image(750, 1660, 'fennec')
            .setInteractive({ useHandCursor: true })
            .on('pointerover', () => {
                if (level >= 3) {
                    this.animals[5].setTint(0xffaaff),
                    this.animals[5].setScale(0.54);
                }
                else {
                    this.animals[5].setTint(0x888888);
                }
            })
            .on('pointerout', () => {
                if (level >= 3) {
                    this.animals[5].setTint(0xffffff),
                    this.animals[5].setScale(0.5);
                }
                else {
                    this.animals[5].setTint(0x888888);
                }
            })
            .on('pointerdown', () => {
                this.animals[5].setTint(0xffffff),
                this.animals[5].setScale(0.42);
                achat_animal(5, 1);
            })
            .on('pointerup', () => {
                this.animals[5].setScale(0.5);
        });
        this.animals[5].setScale(0.5);
        this.animals[5].depth = 11;
        this.animals[5].visible = false;
        viewport.add(this.animals[5]);
        this.descr[5] = this.add.text(1000, 1560, 'Déblocage au niveau 3\n\nInformations supplémentaires', { font: 'bold 24px Georgia', fill: '#000' });
        this.descr[5].visible = false;
        viewport.add(this.descr[5]);
        //animal 6
        this.animals[6] = this.add.image(750, 460, 'elephant')
            .setInteractive({ useHandCursor: true })
            .on('pointerover', () => {
                if (level >= 2) {
                    this.animals[6].setTint(0xffaaff),
                    this.animals[6].setScale(0.54);
                }
                else {
                    this.animals[6].setTint(0x888888);
                }
            })
            .on('pointerout', () => {
                if (level >= 2) {
                    this.animals[6].setTint(0xffffff),
                    this.animals[6].setScale(0.5);
                }
                else {
                    this.animals[6].setTint(0x888888);
                }
            })
            .on('pointerdown', () => {
                this.animals[6].setTint(0xffffff),
                this.animals[6].setScale(0.42);
                achat_animal(6, 2);
            })
            .on('pointerup', () => {
                this.animals[6].setScale(0.5);
        });
        this.animals[6].setScale(0.5);
        this.animals[6].depth = 11;
        this.animals[6].visible = false;
        viewport.add(this.animals[6]);
        this.descr[6] = this.add.text(1000, 360, 'Déblocage au niveau 2\n\nInformations supplémentaires', { font: 'bold 24px Georgia', fill: '#000' });
        this.descr[6].visible = false;
        viewport.add(this.descr[6]);
        //animal 7
        this.animals[7] = this.add.image(750, 760, 'rhino')
            .setInteractive({ useHandCursor: true })
            .on('pointerover', () => {
                if (level >= 2) {
                    this.animals[7].setTint(0xffaaff),
                    this.animals[7].setScale(0.54);
                }
                else {
                    this.animals[7].setTint(0x888888);
                }
            })
            .on('pointerout', () => {
                if (level >= 2) {
                    this.animals[7].setTint(0xffffff),
                    this.animals[7].setScale(0.5);
                }
                else {
                    this.animals[7].setTint(0x888888);
                }
            })
            .on('pointerdown', () => {
                this.animals[7].setTint(0xffffff),
                this.animals[7].setScale(0.42);
                achat_animal(7, 2);
            })
            .on('pointerup', () => {
                this.animals[7].setScale(0.5);
        });
        this.animals[7].setScale(0.5);
        this.animals[7].depth = 11;
        this.animals[7].visible = false;
        viewport.add(this.animals[7]);
        this.descr[7] = this.add.text(1000, 660, 'Déblocage au niveau 2\n\nInformations supplémentaires', { font: 'bold 24px Georgia', fill: '#000' });
        this.descr[7].visible = false;
        viewport.add(this.descr[7]);
        //animal 8
        this.animals[8] = this.add.image(750, 460, 'hyene')
            .setInteractive({ useHandCursor: true })
            .on('pointerover', () => {
                if (level >= 3) {
                    this.animals[8].setTint(0xffaaff),
                    this.animals[8].setScale(0.54);
                }
                else {
                    this.animals[8].setTint(0x888888);
                }
            })
            .on('pointerout', () => {
                if (level >= 3) {
                    this.animals[8].setTint(0xffffff),
                    this.animals[8].setScale(0.5);
                }
                else {
                    this.animals[8].setTint(0x888888);
                }
            })
            .on('pointerdown', () => {
                this.animals[8].setTint(0xffffff),
                this.animals[8].setScale(0.42);
                achat_animal(8, 3);
            })
            .on('pointerup', () => {
                this.animals[8].setScale(0.5);
        });
        this.animals[8].setScale(0.5);
        this.animals[8].depth = 11;
        this.animals[8].visible = false;
        viewport.add(this.animals[8]);
        this.descr[8] = this.add.text(1000, 360, 'Déblocage au niveau 3\n\nInformations supplémentaires', { font: 'bold 24px Georgia', fill: '#000' });
        this.descr[8].visible = false;
        viewport.add(this.descr[8]);
        //animal 9
        this.animals[9] = this.add.image(750, 760, 'serpent')
            .setInteractive({ useHandCursor: true })
            .on('pointerover', () => {
                if (level >= 3) {
                    this.animals[9].setTint(0xffaaff),
                    this.animals[9].setScale(0.54);
                }
                else {
                    this.animals[9].setTint(0x888888);
                }
            })
            .on('pointerout', () => {
                if (level >= 3) {
                    this.animals[9].setTint(0xffffff),
                    this.animals[9].setScale(0.5);
                }
                else {
                    this.animals[9].setTint(0x888888);
                }
            })
            .on('pointerdown', () => {
                this.animals[9].setTint(0xffffff),
                this.animals[9].setScale(0.42);
                achat_animal(9, 3);
            })
            .on('pointerup', () => {
                this.animals[9].setScale(0.5);
        });
        this.animals[9].setScale(0.5);
        this.animals[9].depth = 11;
        this.animals[9].visible = false;
        viewport.add(this.animals[9]);
        this.descr[9] = this.add.text(1000, 660, 'Déblocage au niveau 3\n\nInformations supplémentaires', { font: 'bold 24px Georgia', fill: '#000' });
        this.descr[9].visible = false;
        viewport.add(this.descr[9]);
        //animal 10
        this.animals[10] = this.add.image(750, 1060, 'lion')
            .setInteractive({ useHandCursor: true })
            .on('pointerover', () => {
                if (level >= 4) {
                    this.animals[10].setTint(0xffaaff),
                    this.animals[10].setScale(0.54);
                }
                else {
                    this.animals[10].setTint(0x888888);
                }
            })
            .on('pointerout', () => {
                if (level >= 4) {
                    this.animals[10].setTint(0xffffff),
                    this.animals[10].setScale(0.5);
                }
                else {
                    this.animals[10].setTint(0x888888);
                }
            })
            .on('pointerdown', () => {
                this.animals[10].setTint(0xffffff),
                this.animals[10].setScale(0.42);
                achat_animal(10, 3);
            })
            .on('pointerup', () => {
                this.animals[10].setScale(0.5);
        });
        this.animals[10].setScale(0.5);
        this.animals[10].depth = 11;
        this.animals[10].visible = false;
        viewport.add(this.animals[10]);
        this.descr[10] = this.add.text(1000, 960, 'Déblocage au niveau 4\n\nInformations supplémentaires', { font: 'bold 24px Georgia', fill: '#000' });
        this.descr[10].visible = false;
        viewport.add(this.descr[10]);
        //animal 11
        this.animals[11] = this.add.image(750, 1360, 'guepard')
            .setInteractive({ useHandCursor: true })
            .on('pointerover', () => {
                if (level >= 4) {
                    this.animals[11].setTint(0xffaaff),
                    this.animals[11].setScale(0.54);
                }
                else {
                    this.animals[11].setTint(0x888888);
                }
            })
            .on('pointerout', () => {
                if (level >= 4) {
                    this.animals[11].setTint(0xffffff),
                    this.animals[11].setScale(0.5);
                }
                else {
                    this.animals[11].setTint(0x888888);
                }
            })
            .on('pointerdown', () => {
                this.animals[11].setTint(0xffffff),
                this.animals[11].setScale(0.42);
                achat_animal(11, 3);
            })
            .on('pointerup', () => {
                this.animals[11].setScale(0.5);
        });
        this.animals[11].setScale(0.5);
        this.animals[11].depth = 11;
        this.animals[11].visible = false;
        viewport.add(this.animals[11]);
        this.descr[11] = this.add.text(1000, 1260, 'Déblocage au niveau 4\n\nInformations supplémentaires', { font: 'bold 24px Georgia', fill: '#000' });
        this.descr[11].visible = false;
        viewport.add(this.descr[11]);
        //animal 12
        this.animals[12] = this.add.image(750, 460, 'renne')
            .setInteractive({ useHandCursor: true })
            .on('pointerover', () => {
                if (level >= 5) {
                    this.animals[12].setTint(0xffaaff),
                    this.animals[12].setScale(0.54);
                }
                else {
                    this.animals[12].setTint(0x888888);
                }
            })
            .on('pointerout', () => {
                if (level >= 5) {
                    this.animals[12].setTint(0xffffff),
                    this.animals[12].setScale(0.5);
                }
                else {
                    this.animals[12].setTint(0x888888);
                }
            })
            .on('pointerdown', () => {
                this.animals[12].setTint(0xffffff),
                this.animals[12].setScale(0.42);
                achat_animal(12, 4);
            })
            .on('pointerup', () => {
                this.animals[12].setScale(0.5);
        });
        this.animals[12].setScale(0.5);
        this.animals[12].depth = 11;
        this.animals[12].visible = false;
        viewport.add(this.animals[12]);
        this.descr[12] = this.add.text(1000, 360, 'Déblocage au niveau 5\n\nInformations supplémentaires', { font: 'bold 24px Georgia', fill: '#000' });
        this.descr[12].visible = false;
        viewport.add(this.descr[12]);
        //animal 13
        this.animals[13] = this.add.image(750, 760, 'elan')
            .setInteractive({ useHandCursor: true })
            .on('pointerover', () => {
                if (level >= 5) {
                    this.animals[13].setTint(0xffaaff),
                    this.animals[13].setScale(0.54);
                }
                else {
                    this.animals[13].setTint(0x888888);
                }
            })
            .on('pointerout', () => {
                if (level >= 5) {
                    this.animals[13].setTint(0xffffff),
                    this.animals[13].setScale(0.5);
                }
                else {
                    this.animals[13].setTint(0x888888);
                }
            })
            .on('pointerdown', () => {
                this.animals[13].setTint(0xffffff),
                this.animals[13].setScale(0.42);
                achat_animal(13, 4);
            })
            .on('pointerup', () => {
                this.animals[13].setScale(0.5);
        });
        this.animals[13].setScale(0.5);
        this.animals[13].depth = 11;
        this.animals[13].visible = false;
        viewport.add(this.animals[13]);
        this.descr[13] = this.add.text(1000, 660, 'Déblocage au niveau 5\n\nInformations supplémentaires', { font: 'bold 24px Georgia', fill: '#000' });
        this.descr[13].visible = false;
        viewport.add(this.descr[13]);
        //animal 14
        this.animals[14] = this.add.image(750, 460, 'paresseux')
            .setInteractive({ useHandCursor: true })
            .on('pointerover', () => {
                if (level >= 6) {
                    this.animals[14].setTint(0xffaaff),
                    this.animals[14].setScale(0.54);
                }
                else {
                    this.animals[14].setTint(0x888888);
                }
            })
            .on('pointerout', () => {
                if (level >= 6) {
                    this.animals[14].setTint(0xffffff),
                    this.animals[14].setScale(0.5);
                }
                else {
                    this.animals[14].setTint(0x888888);
                }
            })
            .on('pointerdown', () => {
                this.animals[14].setTint(0xffffff),
                this.animals[14].setScale(0.42);
                achat_animal(14, 5);
            })
            .on('pointerup', () => {
                this.animals[14].setScale(0.5);
        });
        this.animals[14].setScale(0.5);
        this.animals[14].depth = 11;
        this.animals[14].visible = false;
        viewport.add(this.animals[14]);
        this.descr[14] = this.add.text(1000, 360, 'Déblocage au niveau 6\n\nInformations supplémentaires', { font: 'bold 24px Georgia', fill: '#000' });
        this.descr[14].visible = false;
        viewport.add(this.descr[14]);
        //animal 15
        this.animals[15] = this.add.image(750, 760, 'chimpanze')
            .setInteractive({ useHandCursor: true })
            .on('pointerover', () => {
                if (level >= 7) {
                    this.animals[15].setTint(0xffaaff),
                    this.animals[15].setScale(0.54);
                }
                else {
                    this.animals[15].setTint(0x888888);
                }
            })
            .on('pointerout', () => {
                if (level >= 7) {
                    this.animals[15].setTint(0xffffff),
                    this.animals[15].setScale(0.5);
                }
                else {
                    this.animals[15].setTint(0x888888);
                }
            })
            .on('pointerdown', () => {
                this.animals[15].setTint(0xffffff),
                this.animals[15].setScale(0.42);
                achat_animal(15, 5);
            })
            .on('pointerup', () => {
                this.animals[15].setScale(0.5);
        });
        this.animals[15].setScale(0.5);
        this.animals[15].depth = 11;
        this.animals[15].visible = false;
        viewport.add(this.animals[15]);
        this.descr[15] = this.add.text(1000, 660, 'Déblocage au niveau 7\n\nInformations supplémentaires', { font: 'bold 24px Georgia', fill: '#000' });
        this.descr[15].visible = false;
        viewport.add(this.descr[15]);
        //animal 16
        this.animals[16] = this.add.image(750, 1060, 'lemurien')
            .setInteractive({ useHandCursor: true })
            .on('pointerover', () => {
                if (level >= 7) {
                    this.animals[16].setTint(0xffaaff),
                    this.animals[16].setScale(0.54);
                }
                else {
                    this.animals[16].setTint(0x888888);
                }
            })
            .on('pointerout', () => {
                if (level >= 7) {
                    this.animals[16].setTint(0xffffff),
                    this.animals[16].setScale(0.5);
                }
                else {
                    this.animals[16].setTint(0x888888);
                }
            })
            .on('pointerdown', () => {
                this.animals[16].setTint(0xffffff),
                this.animals[16].setScale(0.42);
                achat_animal(16, 5);
            })
            .on('pointerup', () => {
                this.animals[16].setScale(0.5);
        });
        this.animals[16].setScale(0.5);
        this.animals[16].depth = 11;
        this.animals[16].visible = false;
        viewport.add(this.animals[16]);
        this.descr[16] = this.add.text(1000, 960, 'Déblocage au niveau 7\n\nInformations supplémentaires', { font: 'bold 24px Georgia', fill: '#000' });
        this.descr[16].visible = false;
        viewport.add(this.descr[16]);
        //animal 17
        this.animals[17] = this.add.image(750, 1360, 'koala')
            .setInteractive({ useHandCursor: true })
            .on('pointerover', () => {
                if (level >= 8) {
                    this.animals[17].setTint(0xffaaff),
                    this.animals[17].setScale(0.54);
                }
                else {
                    this.animals[17].setTint(0x888888);
                }
            })
            .on('pointerout', () => {
                if (level >= 8) {
                    this.animals[17].setTint(0xffffff),
                    this.animals[17].setScale(0.5);
                }
                else {
                    this.animals[17].setTint(0x888888);
                }
            })
            .on('pointerdown', () => {
                this.animals[17].setTint(0xffffff),
                this.animals[17].setScale(0.42);
                achat_animal(17, 5);
            })
            .on('pointerup', () => {
                this.animals[17].setScale(0.5);
        });
        this.animals[17].setScale(0.5);
        this.animals[17].depth = 11;
        this.animals[17].visible = false;
        viewport.add(this.animals[17]);
        this.descr[17] = this.add.text(1000, 1260, 'Déblocage au niveau 8\n\nInformations supplémentaires', { font: 'bold 24px Georgia', fill: '#000' });
        this.descr[17].visible = false;
        viewport.add(this.descr[17]);
        //animal 18
        this.animals[18] = this.add.image(750, 1660, 'panda_roux')
            .setInteractive({ useHandCursor: true })
            .on('pointerover', () => {
                if (level >= 8) {
                    this.animals[18].setTint(0xffaaff),
                    this.animals[18].setScale(0.54);
                }
                else {
                    this.animals[18].setTint(0x888888);
                }
            })
            .on('pointerout', () => {
                if (level >= 8) {
                    this.animals[18].setTint(0xffffff),
                    this.animals[18].setScale(0.5);
                }
                else {
                    this.animals[18].setTint(0x888888);
                }
            })
            .on('pointerdown', () => {
                this.animals[18].setTint(0xffffff),
                this.animals[18].setScale(0.42);
                achat_animal(18, 5);
            })
            .on('pointerup', () => {
                this.animals[18].setScale(0.5);
        });
        this.animals[18].setScale(0.5);
        this.animals[18].depth = 11;
        this.animals[18].visible = false;
        viewport.add(this.animals[18]);
        this.descr[18] = this.add.text(1000, 1560, 'Déblocage au niveau 8\n\nInformations supplémentaires', { font: 'bold 24px Georgia', fill: '#000' });
        this.descr[18].visible = false;
        viewport.add(this.descr[18]);
        //animal 19
        this.animals[19] = this.add.image(750, 1960, 'gorille')
            .setInteractive({ useHandCursor: true })
            .on('pointerover', () => {
                if (level >= 9) {
                    this.animals[19].setTint(0xffaaff),
                    this.animals[19].setScale(0.54);
                }
                else {
                    this.animals[19].setTint(0x888888);
                }
            })
            .on('pointerout', () => {
                if (level >= 9) {
                    this.animals[19].setTint(0xffffff),
                    this.animals[19].setScale(0.5);
                }
                else {
                    this.animals[19].setTint(0x888888);
                }
            })
            .on('pointerdown', () => {
                this.animals[19].setTint(0xffffff),
                this.animals[19].setScale(0.42);
                achat_animal(19, 5);
            })
            .on('pointerup', () => {
                this.animals[19].setScale(0.5);
        });
        this.animals[19].setScale(0.5);
        this.animals[19].depth = 11;
        this.animals[19].visible = false;
        viewport.add(this.animals[19]);
        this.descr[19] = this.add.text(1000, 1860, 'Déblocage au niveau 9\n\nInformations supplémentaires', { font: 'bold 24px Georgia', fill: '#000' });
        this.descr[19].visible = false;
        viewport.add(this.descr[19]);
        //animal 20
        this.animals[20] = this.add.image(750, 2260, 'panda')
            .setInteractive({ useHandCursor: true })
            .on('pointerover', () => {
                if (level >= 20) {
                    this.animals[20].setTint(0xffaaff),
                    this.animals[20].setScale(0.54);
                }
                else {
                    this.animals[20].setTint(0x888888);
                }
            })
            .on('pointerout', () => {
                if (level >= 20) {
                    this.animals[20].setTint(0xffffff),
                    this.animals[20].setScale(0.5);
                }
                else {
                    this.animals[20].setTint(0x888888);
                }
            })
            .on('pointerdown', () => {
                this.animals[20].setTint(0xffffff),
                this.animals[20].setScale(0.42);
                achat_animal(20, 5);
            })
            .on('pointerup', () => {
                this.animals[20].setScale(0.5);
        });
        this.animals[20].setScale(0.5);
        this.animals[20].depth = 11;
        this.animals[20].visible = false;
        viewport.add(this.animals[20]);
        this.descr[20] = this.add.text(1000, 2160, 'Déblocage au niveau 20\n\nInformations supplémentaires', { font: 'bold 24px Georgia', fill: '#000' });
        this.descr[20].visible = false;
        viewport.add(this.descr[20]);
        //animal 21
        this.animals[21] = this.add.image(750, 460, 'loup')
            .setInteractive({ useHandCursor: true })
            .on('pointerover', () => {
                if (level >= 5) {
                    this.animals[21].setTint(0xffaaff),
                    this.animals[21].setScale(0.54);
                }
                else {
                    this.animals[21].setTint(0x888888);
                }
            })
            .on('pointerout', () => {
                if (level >= 5) {
                    this.animals[21].setTint(0xffffff),
                    this.animals[21].setScale(0.5);
                }
                else {
                    this.animals[21].setTint(0x888888);
                }
            })
            .on('pointerdown', () => {
                this.animals[21].setTint(0xffffff),
                this.animals[21].setScale(0.42);
                achat_animal(21, 6);
            })
            .on('pointerup', () => {
                this.animals[21].setScale(0.5);
        });
        this.animals[21].setScale(0.5);
        this.animals[21].depth = 11;
        this.animals[21].visible = false;
        viewport.add(this.animals[21]);
        this.descr[21] = this.add.text(1000, 360, 'Déblocage au niveau 5\n\nInformations supplémentaires', { font: 'bold 24px Georgia', fill: '#000' });
        this.descr[21].visible = false;
        viewport.add(this.descr[21]);
        //animal 22
        this.animals[22] = this.add.image(750, 760, 'leopard')
            .setInteractive({ useHandCursor: true })
            .on('pointerover', () => {
                if (level >= 6) {
                    this.animals[22].setTint(0xffaaff),
                    this.animals[22].setScale(0.54);
                }
                else {
                    this.animals[22].setTint(0x888888);
                }
            })
            .on('pointerout', () => {
                if (level >= 6) {
                    this.animals[22].setTint(0xffffff),
                    this.animals[22].setScale(0.5);
                }
                else {
                    this.animals[22].setTint(0x888888);
                }
            })
            .on('pointerdown', () => {
                this.animals[22].setTint(0xffffff),
                this.animals[22].setScale(0.42);
                achat_animal(22, 6);
            })
            .on('pointerup', () => {
                this.animals[22].setScale(0.5);
        });
        this.animals[22].setScale(0.5);
        this.animals[22].depth = 11;
        this.animals[22].visible = false;
        viewport.add(this.animals[22]);
        this.descr[22] = this.add.text(1000, 660, 'Déblocage au niveau 6\n\nInformations supplémentaires', { font: 'bold 24px Georgia', fill: '#000' });
        this.descr[22].visible = false;
        viewport.add(this.descr[22]);
        //animal 23
        this.animals[23] = this.add.image(750, 1060, 'panthere')
            .setInteractive({ useHandCursor: true })
            .on('pointerover', () => {
                if (level >= 7) {
                    this.animals[23].setTint(0xffaaff),
                    this.animals[23].setScale(0.54);
                }
                else {
                    this.animals[23].setTint(0x888888);
                }
            })
            .on('pointerout', () => {
                if (level >= 7) {
                    this.animals[23].setTint(0xffffff),
                    this.animals[23].setScale(0.5);
                }
                else {
                    this.animals[23].setTint(0x888888);
                }
            })
            .on('pointerdown', () => {
                this.animals[23].setTint(0xffffff),
                this.animals[23].setScale(0.42);
                achat_animal(23, 6);
            })
            .on('pointerup', () => {
                this.animals[23].setScale(0.5);
        });
        this.animals[23].setScale(0.5);
        this.animals[23].depth = 11;
        this.animals[23].visible = false;
        viewport.add(this.animals[23]);
        this.descr[23] = this.add.text(1000, 960, 'Déblocage au niveau 7\n\nInformations supplémentaires', { font: 'bold 24px Georgia', fill: '#000' });
        this.descr[23].visible = false;
        viewport.add(this.descr[23]);
        //animal 24
        this.animals[24] = this.add.image(750, 1360, 'ours')
            .setInteractive({ useHandCursor: true })
            .on('pointerover', () => {
                if (level >= 8) {
                    this.animals[24].setTint(0xffaaff),
                    this.animals[24].setScale(0.54);
                }
                else {
                    this.animals[24].setTint(0x888888);
                }
            })
            .on('pointerout', () => {
                if (level >= 8) {
                    this.animals[24].setTint(0xffffff),
                    this.animals[24].setScale(0.5);
                }
                else {
                    this.animals[24].setTint(0x888888);
                }
            })
            .on('pointerdown', () => {
                this.animals[24].setTint(0xffffff),
                this.animals[24].setScale(0.42);
                achat_animal(24, 6);
            })
            .on('pointerup', () => {
                this.animals[24].setScale(0.5);
        });
        this.animals[24].setScale(0.5);
        this.animals[24].depth = 11;
        this.animals[24].visible = false;
        viewport.add(this.animals[24]);
        this.descr[24] = this.add.text(1000, 1260, 'Déblocage au niveau 8\n\nInformations supplémentaires', { font: 'bold 24px Georgia', fill: '#000' });
        this.descr[24].visible = false;
        viewport.add(this.descr[24]);
        //animal 25
        this.animals[25] = this.add.image(750, 1660, 'tigre')
            .setInteractive({ useHandCursor: true })
            .on('pointerover', () => {
                if (level >= 9) {
                    this.animals[25].setTint(0xffaaff),
                    this.animals[25].setScale(0.54);
                }
                else {
                    this.animals[25].setTint(0x888888);
                }
            })
            .on('pointerout', () => {
                if (level >= 9) {
                    this.animals[25].setTint(0xffffff),
                    this.animals[25].setScale(0.5);
                }
                else {
                    this.animals[25].setTint(0x888888);
                }
            })
            .on('pointerdown', () => {
                this.animals[25].setTint(0xffffff),
                this.animals[25].setScale(0.42);
                achat_animal(25, 6);
            })
            .on('pointerup', () => {
                this.animals[25].setScale(0.5);
        });
        this.animals[25].setScale(0.5);
        this.animals[25].depth = 11;
        this.animals[25].visible = false;
        viewport.add(this.animals[25]);
        this.descr[25] = this.add.text(1000, 1560, 'Déblocage au niveau 9\n\nInformations supplémentaires', { font: 'bold 24px Georgia', fill: '#000' });
        this.descr[25].visible = false;
        viewport.add(this.descr[25]);
        //animal 26
        this.animals[26] = this.add.image(750, 460, 'chevre')
            .setInteractive({ useHandCursor: true })
            .on('pointerover', () => {
                if (level >= 10) {
                    this.animals[26].setTint(0xffaaff),
                    this.animals[26].setScale(0.54);
                }
                else {
                    this.animals[26].setTint(0x888888);
                }
            })
            .on('pointerout', () => {
                if (level >= 10) {
                    this.animals[26].setTint(0xffffff),
                    this.animals[26].setScale(0.5);
                }
                else {
                    this.animals[26].setTint(0x888888);
                }
            })
            .on('pointerdown', () => {
                this.animals[26].setTint(0xffffff),
                this.animals[26].setScale(0.42);
                achat_animal(26, 7);
            })
            .on('pointerup', () => {
                this.animals[26].setScale(0.5);
        });
        this.animals[26].setScale(0.5);
        this.animals[26].depth = 11;
        this.animals[26].visible = false;
        viewport.add(this.animals[26]);
        this.descr[26] = this.add.text(1000, 360, 'Déblocage au niveau 10\n\nInformations supplémentaires', { font: 'bold 24px Georgia', fill: '#000' });
        this.descr[26].visible = false;
        viewport.add(this.descr[26]);
        //animal 27
        this.animals[27] = this.add.image(750, 760, 'mouton')
            .setInteractive({ useHandCursor: true })
            .on('pointerover', () => {
                if (level >= 10) {
                    this.animals[27].setTint(0xffaaff),
                    this.animals[27].setScale(0.54);
                }
                else {
                    this.animals[27].setTint(0x888888);
                }
            })
            .on('pointerout', () => {
                if (level >= 10) {
                    this.animals[27].setTint(0xffffff),
                    this.animals[27].setScale(0.5);
                }
                else {
                    this.animals[27].setTint(0x888888);
                }
            })
            .on('pointerdown', () => {
                this.animals[27].setTint(0xffffff),
                this.animals[27].setScale(0.42);
                achat_animal(27, 7);
            })
            .on('pointerup', () => {
                this.animals[27].setScale(0.5);
        });
        this.animals[27].setScale(0.5);
        this.animals[27].depth = 11;
        this.animals[27].visible = false;
        viewport.add(this.animals[27]);
        this.descr[27] = this.add.text(1000, 660, 'Déblocage au niveau 10\n\nInformations supplémentaires', { font: 'bold 24px Georgia', fill: '#000' });
        this.descr[27].visible = false;
        viewport.add(this.descr[27]);
        //animal 28
        this.animals[28] = this.add.image(750, 1060, 'alpaga')
            .setInteractive({ useHandCursor: true })
            .on('pointerover', () => {
                if (level >= 12) {
                    this.animals[28].setTint(0xffaaff),
                    this.animals[28].setScale(0.54);
                }
                else {
                    this.animals[28].setTint(0x888888);
                }
            })
            .on('pointerout', () => {
                if (level >= 12) {
                    this.animals[28].setTint(0xffffff),
                    this.animals[28].setScale(0.5);
                }
                else {
                    this.animals[28].setTint(0x888888);
                }
            })
            .on('pointerdown', () => {
                this.animals[28].setTint(0xffffff),
                this.animals[28].setScale(0.42);
                achat_animal(28, 7);
            })
            .on('pointerup', () => {
                this.animals[28].setScale(0.5);
        });
        this.animals[28].setScale(0.5);
        this.animals[28].depth = 11;
        this.animals[28].visible = false;
        viewport.add(this.animals[28]);
        this.descr[28] = this.add.text(1000, 960, 'Déblocage au niveau 12\n\nInformations supplémentaires', { font: 'bold 24px Georgia', fill: '#000' });
        this.descr[28].visible = false;
        viewport.add(this.descr[28]);
        //animal 29
        this.animals[29] = this.add.image(750, 1360, 'paon')
            .setInteractive({ useHandCursor: true })
            .on('pointerover', () => {
                if (level >= 14) {
                    this.animals[29].setTint(0xffaaff),
                    this.animals[29].setScale(0.54);
                }
                else {
                    this.animals[29].setTint(0x888888);
                }
            })
            .on('pointerout', () => {
                if (level >= 14) {
                    this.animals[29].setTint(0xffffff),
                    this.animals[29].setScale(0.5);
                }
                else {
                    this.animals[29].setTint(0x888888);
                }
            })
            .on('pointerdown', () => {
                this.animals[29].setTint(0xffffff),
                this.animals[29].setScale(0.42);
                achat_animal(29, 7);
            })
            .on('pointerup', () => {
                this.animals[29].setScale(0.5);
        });
        this.animals[29].setScale(0.5);
        this.animals[29].depth = 11;
        this.animals[29].visible = false;
        viewport.add(this.animals[29]);
        this.descr[29] = this.add.text(1000, 1260, 'Déblocage au niveau 14\n\nInformations supplémentaires', { font: 'bold 24px Georgia', fill: '#000' });
        this.descr[29].visible = false;
        viewport.add(this.descr[29]);
        //animal 30
        this.animals[30] = this.add.image(750, 1660, 'dodo')
            .setInteractive({ useHandCursor: true })
            .on('pointerover', () => {
                if (level >= 30) {
                    this.animals[30].setTint(0xffaaff),
                    this.animals[30].setScale(0.54);
                }
                else {
                    this.animals[30].setTint(0x888888);
                }
            })
            .on('pointerout', () => {
                if (level >= 30) {
                    this.animals[30].setTint(0xffffff),
                    this.animals[30].setScale(0.5);
                }
                else {
                    this.animals[30].setTint(0x888888);
                }
            })
            .on('pointerdown', () => {
                this.animals[30].setTint(0xffffff),
                this.animals[30].setScale(0.42);
                achat_animal(30, 7);
            })
            .on('pointerup', () => {
                this.animals[30].setScale(0.5);
        });
        this.animals[30].setScale(0.5);
        this.animals[30].depth = 11;
        this.animals[30].visible = false;
        viewport.add(this.animals[30]);
        this.descr[30] = this.add.text(1000, 1560, 'Déblocage au niveau 30\n\nInformations supplémentaires', { font: 'bold 24px Georgia', fill: '#000' });
        this.descr[30].visible = false;
        viewport.add(this.descr[30]);
        //animal 31
        this.animals[31] = this.add.image(750, 460, 'bison')
            .setInteractive({ useHandCursor: true })
            .on('pointerover', () => {
                if (level >= 11) {
                    this.animals[31].setTint(0xffaaff),
                    this.animals[31].setScale(0.54);
                }
                else {
                    this.animals[31].setTint(0x888888);
                }
            })
            .on('pointerout', () => {
                if (level >= 11) {
                    this.animals[31].setTint(0xffffff),
                    this.animals[31].setScale(0.5);
                }
                else {
                    this.animals[31].setTint(0x888888);
                }
            })
            .on('pointerdown', () => {
                this.animals[31].setTint(0xffffff),
                this.animals[31].setScale(0.42);
                achat_animal(31, 8);
            })
            .on('pointerup', () => {
                this.animals[31].setScale(0.5);
        });
        this.animals[31].setScale(0.5);
        this.animals[31].depth = 11;
        this.animals[31].visible = false;
        viewport.add(this.animals[31]);
        this.descr[31] = this.add.text(1000, 360, 'Déblocage au niveau 11\n\nInformations supplémentaires', { font: 'bold 24px Georgia', fill: '#000' });
        this.descr[31].visible = false;
        viewport.add(this.descr[31]);
        //animal 32
        this.animals[32] = this.add.image(750, 760, 'bouquetin')
            .setInteractive({ useHandCursor: true })
            .on('pointerover', () => {
                if (level >= 13) {
                    this.animals[32].setTint(0xffaaff),
                    this.animals[32].setScale(0.54);
                }
                else {
                    this.animals[32].setTint(0x888888);
                }
            })
            .on('pointerout', () => {
                if (level >= 13) {
                    this.animals[32].setTint(0xffffff),
                    this.animals[32].setScale(0.5);
                }
                else {
                    this.animals[32].setTint(0x888888);
                }
            })
            .on('pointerdown', () => {
                this.animals[32].setTint(0xffffff),
                this.animals[32].setScale(0.42);
                achat_animal(32, 8);
            })
            .on('pointerup', () => {
                this.animals[32].setScale(0.5);
        });
        this.animals[32].setScale(0.5);
        this.animals[32].depth = 11;
        this.animals[32].visible = false;
        viewport.add(this.animals[32]);
        this.descr[32] = this.add.text(1000, 660, 'Déblocage au niveau 13\n\nInformations supplémentaires', { font: 'bold 24px Georgia', fill: '#000' });
        this.descr[32].visible = false;
        viewport.add(this.descr[32]);
        //animal 33
        this.animals[33] = this.add.image(750, 1060, 'ane')
            .setInteractive({ useHandCursor: true })
            .on('pointerover', () => {
                if (level >= 13) {
                    this.animals[33].setTint(0xffaaff),
                    this.animals[33].setScale(0.54);
                }
                else {
                    this.animals[33].setTint(0x888888);
                }
            })
            .on('pointerout', () => {
                if (level >= 13) {
                    this.animals[33].setTint(0xffffff),
                    this.animals[33].setScale(0.5);
                }
                else {
                    this.animals[33].setTint(0x888888);
                }
            })
            .on('pointerdown', () => {
                this.animals[33].setTint(0xffffff),
                this.animals[33].setScale(0.42);
                achat_animal(33, 8);
            })
            .on('pointerup', () => {
                this.animals[33].setScale(0.5);
        });
        this.animals[33].setScale(0.5);
        this.animals[33].depth = 11;
        this.animals[33].visible = false;
        viewport.add(this.animals[33]);
        this.descr[33] = this.add.text(1000, 960, 'Déblocage au niveau 13\n\nInformations supplémentaires', { font: 'bold 24px Georgia', fill: '#000' });
        this.descr[33].visible = false;
        viewport.add(this.descr[33]);
        //animal 34
        this.animals[34] = this.add.image(750, 460, 'loutre')
            .setInteractive({ useHandCursor: true })
            .on('pointerover', () => {
                if (level >= 15) {
                    this.animals[34].setTint(0xffaaff),
                    this.animals[34].setScale(0.54);
                }
                else {
                    this.animals[34].setTint(0x888888);
                }
            })
            .on('pointerout', () => {
                if (level >= 15) {
                    this.animals[34].setTint(0xffffff),
                    this.animals[34].setScale(0.5);
                }
                else {
                    this.animals[34].setTint(0x888888);
                }
            })
            .on('pointerdown', () => {
                this.animals[34].setTint(0xffffff),
                this.animals[34].setScale(0.42);
                achat_animal(34, 9);
            })
            .on('pointerup', () => {
                this.animals[34].setScale(0.5);
        });
        this.animals[34].setScale(0.5);
        this.animals[34].depth = 11;
        this.animals[34].visible = false;
        viewport.add(this.animals[34]);
        this.descr[34] = this.add.text(1000, 360, 'Déblocage au niveau 15\n\nInformations supplémentaires', { font: 'bold 24px Georgia', fill: '#000' });
        this.descr[34].visible = false;
        viewport.add(this.descr[34]);
        //animal 35
        this.animals[35] = this.add.image(750, 760, 'otarie')
            .setInteractive({ useHandCursor: true })
            .on('pointerover', () => {
                if (level >= 16) {
                    this.animals[35].setTint(0xffaaff),
                    this.animals[35].setScale(0.54);
                }
                else {
                    this.animals[35].setTint(0x888888);
                }
            })
            .on('pointerout', () => {
                if (level >= 16) {
                    this.animals[35].setTint(0xffffff),
                    this.animals[35].setScale(0.5);
                }
                else {
                    this.animals[35].setTint(0x888888);
                }
            })
            .on('pointerdown', () => {
                this.animals[35].setTint(0xffffff),
                this.animals[35].setScale(0.42);
                achat_animal(35, 9);
            })
            .on('pointerup', () => {
                this.animals[35].setScale(0.5);
        });
        this.animals[35].setScale(0.5);
        this.animals[35].depth = 11;
        this.animals[35].visible = false;
        viewport.add(this.animals[35]);
        this.descr[35] = this.add.text(1000, 660, 'Déblocage au niveau 16\n\nInformations supplémentaires', { font: 'bold 24px Georgia', fill: '#000' });
        this.descr[35].visible = false;
        viewport.add(this.descr[35]);
        //animal 36
        this.animals[36] = this.add.image(750, 1060, 'tortue')
            .setInteractive({ useHandCursor: true })
            .on('pointerover', () => {
                if (level >= 19) {
                    this.animals[36].setTint(0xffaaff),
                    this.animals[36].setScale(0.54);
                }
                else {
                    this.animals[36].setTint(0x888888);
                }
            })
            .on('pointerout', () => {
                if (level >= 19) {
                    this.animals[36].setTint(0xffffff),
                    this.animals[36].setScale(0.5);
                }
                else {
                    this.animals[36].setTint(0x888888);
                }
            })
            .on('pointerdown', () => {
                this.animals[36].setTint(0xffffff),
                this.animals[36].setScale(0.42);
                achat_animal(36, 9);
            })
            .on('pointerup', () => {
                this.animals[36].setScale(0.5);
        });
        this.animals[36].setScale(0.5);
        this.animals[36].depth = 11;
        this.animals[36].visible = false;
        viewport.add(this.animals[36]);
        this.descr[36] = this.add.text(1000, 960, 'Déblocage au niveau 19\n\nInformations supplémentaires', { font: 'bold 24px Georgia', fill: '#000' });
        this.descr[36].visible = false;
        viewport.add(this.descr[36]);
        //animal 37
        this.animals[37] = this.add.image(750, 460, 'crocodile')
            .setInteractive({ useHandCursor: true })
            .on('pointerover', () => {
                if (level >= 17) {
                    this.animals[37].setTint(0xffaaff),
                    this.animals[37].setScale(0.54);
                }
                else {
                    this.animals[37].setTint(0x888888);
                }
            })
            .on('pointerout', () => {
                if (level >= 17) {
                    this.animals[37].setTint(0xffffff),
                    this.animals[37].setScale(0.5);
                }
                else {
                    this.animals[37].setTint(0x888888);
                }
            })
            .on('pointerdown', () => {
                this.animals[37].setTint(0xffffff),
                this.animals[37].setScale(0.42);
                achat_animal(37, 10);
            })
            .on('pointerup', () => {
                this.animals[37].setScale(0.5);
        });
        this.animals[37].setScale(0.5);
        this.animals[37].depth = 11;
        this.animals[37].visible = false;
        viewport.add(this.animals[37]);
        this.descr[37] = this.add.text(1000, 360, 'Déblocage au niveau 17\n\nInformations supplémentaires', { font: 'bold 24px Georgia', fill: '#000' });
        this.descr[37].visible = false;
        viewport.add(this.descr[37]);
        //animal 38
        this.animals[38] = this.add.image(750, 760, 'hippo')
            .setInteractive({ useHandCursor: true })
            .on('pointerover', () => {
                if (level >= 18) {
                    this.animals[38].setTint(0xffaaff),
                    this.animals[38].setScale(0.54);
                }
                else {
                    this.animals[38].setTint(0x888888);
                }
            })
            .on('pointerout', () => {
                if (level >= 18) {
                    this.animals[38].setTint(0xffffff),
                    this.animals[38].setScale(0.5);
                }
                else {
                    this.animals[38].setTint(0x888888);
                }
            })
            .on('pointerdown', () => {
                this.animals[38].setTint(0xffffff),
                this.animals[38].setScale(0.42);
                achat_animal(38, 10);
            })
            .on('pointerup', () => {
                this.animals[38].setScale(0.5);
        });
        this.animals[38].setScale(0.5);
        this.animals[38].depth = 11;
        this.animals[38].visible = false;
        viewport.add(this.animals[38]);
        this.descr[38] = this.add.text(1000, 660, 'Déblocage au niveau 18\n\nInformations supplémentaires', { font: 'bold 24px Georgia', fill: '#000' });
        this.descr[38].visible = false;
        viewport.add(this.descr[38]);
        //animal 39
        this.animals[39] = this.add.image(750, 460, 'requin')
            .setInteractive({ useHandCursor: true })
            .on('pointerover', () => {
                if (level >= 23) {
                    this.animals[39].setTint(0xffaaff),
                    this.animals[39].setScale(0.54);
                }
                else {
                    this.animals[39].setTint(0x888888);
                }
            })
            .on('pointerout', () => {
                if (level >= 23) {
                    this.animals[39].setTint(0xffffff),
                    this.animals[39].setScale(0.5);
                }
                else {
                    this.animals[39].setTint(0x888888);
                }
            })
            .on('pointerdown', () => {
                this.animals[39].setTint(0xffffff),
                this.animals[39].setScale(0.42);
                achat_animal(39, 11);
            })
            .on('pointerup', () => {
                this.animals[39].setScale(0.5);
        });
        this.animals[39].setScale(0.5);
        this.animals[39].depth = 11;
        this.animals[39].visible = false;
        viewport.add(this.animals[39]);
        this.descr[39] = this.add.text(1000, 360, 'Déblocage au niveau 23\n\nInformations supplémentaires', { font: 'bold 24px Georgia', fill: '#000' });
        this.descr[39].visible = false;
        viewport.add(this.descr[39]);
        //animal 40
        this.animals[40] = this.add.image(750, 760, 'baleine')
            .setInteractive({ useHandCursor: true })
            .on('pointerover', () => {
                if (level >= 24) {
                    this.animals[40].setTint(0xffaaff),
                    this.animals[40].setScale(0.54);
                }
                else {
                    this.animals[40].setTint(0x888888);
                }
            })
            .on('pointerout', () => {
                if (level >= 24) {
                    this.animals[40].setTint(0xffffff),
                    this.animals[40].setScale(0.5);
                }
                else {
                    this.animals[40].setTint(0x888888);
                }
            })
            .on('pointerdown', () => {
                this.animals[40].setTint(0xffffff),
                this.animals[40].setScale(0.42);
                achat_animal(40, 11);
            })
            .on('pointerup', () => {
                this.animals[40].setScale(0.5);
        });
        this.animals[40].setScale(0.5);
        this.animals[40].depth = 11;
        this.animals[40].visible = false;
        viewport.add(this.animals[40]);
        this.descr[40] = this.add.text(1000, 660, 'Déblocage au niveau 24\n\nInformations supplémentaires', { font: 'bold 24px Georgia', fill: '#000' });
        this.descr[40].visible = false;
        viewport.add(this.descr[40]);
        //animal 41
        this.animals[41] = this.add.image(750, 1060, 'orque')
            .setInteractive({ useHandCursor: true })
            .on('pointerover', () => {
                if (level >= 24) {
                    this.animals[41].setTint(0xffaaff),
                    this.animals[41].setScale(0.54);
                }
                else {
                    this.animals[41].setTint(0x888888);
                }
            })
            .on('pointerout', () => {
                if (level >= 24) {
                    this.animals[41].setTint(0xffffff),
                    this.animals[41].setScale(0.5);
                }
                else {
                    this.animals[41].setTint(0x888888);
                }
            })
            .on('pointerdown', () => {
                this.animals[41].setTint(0xffffff),
                this.animals[41].setScale(0.42);
                achat_animal(41, 11);
            })
            .on('pointerup', () => {
                this.animals[41].setScale(0.5);
        });
        this.animals[41].setScale(0.5);
        this.animals[41].depth = 11;
        this.animals[41].visible = false;
        viewport.add(this.animals[41]);
        this.descr[41] = this.add.text(1000, 960, 'Déblocage au niveau 24\n\nInformations supplémentaires', { font: 'bold 24px Georgia', fill: '#000' });
        this.descr[41].visible = false;
        viewport.add(this.descr[41]);
        //animal 42
        this.animals[42] = this.add.image(750, 460, 'dauphin')
            .setInteractive({ useHandCursor: true })
            .on('pointerover', () => {
                if (level >= 20) {
                    this.animals[42].setTint(0xffaaff),
                    this.animals[42].setScale(0.54);
                }
                else {
                    this.animals[42].setTint(0x888888);
                }
            })
            .on('pointerout', () => {
                if (level >= 20) {
                    this.animals[42].setTint(0xffffff),
                    this.animals[42].setScale(0.5);
                }
                else {
                    this.animals[42].setTint(0x888888);
                }
            })
            .on('pointerdown', () => {
                this.animals[42].setTint(0xffffff),
                this.animals[42].setScale(0.42);
                achat_animal(42, 12);
            })
            .on('pointerup', () => {
                this.animals[42].setScale(0.5);
        });
        this.animals[42].setScale(0.5);
        this.animals[42].depth = 11;
        this.animals[42].visible = false;
        viewport.add(this.animals[42]);
        this.descr[42] = this.add.text(1000, 360, 'Déblocage au niveau 20\n\nInformations supplémentaires', { font: 'bold 24px Georgia', fill: '#000' });
        this.descr[42].visible = false;
        viewport.add(this.descr[42]);
        //animal 43
        this.animals[43] = this.add.image(750, 760, 'raie')
            .setInteractive({ useHandCursor: true })
            .on('pointerover', () => {
                if (level >= 20) {
                    this.animals[43].setTint(0xffaaff),
                    this.animals[43].setScale(0.54);
                }
                else {
                    this.animals[43].setTint(0x888888);
                }
            })
            .on('pointerout', () => {
                if (level >= 20) {
                    this.animals[43].setTint(0xffffff),
                    this.animals[43].setScale(0.5);
                }
                else {
                    this.animals[43].setTint(0x888888);
                }
            })
            .on('pointerdown', () => {
                this.animals[43].setTint(0xffffff),
                this.animals[43].setScale(0.42);
                achat_animal(43, 12);
            })
            .on('pointerup', () => {
                this.animals[43].setScale(0.5);
        });
        this.animals[43].setScale(0.5);
        this.animals[43].depth = 11;
        this.animals[43].visible = false;
        viewport.add(this.animals[43]);
        this.descr[43] = this.add.text(1000, 660, 'Déblocage au niveau 20\n\nInformations supplémentaires', { font: 'bold 24px Georgia', fill: '#000' });
        this.descr[43].visible = false;
        viewport.add(this.descr[43]);
        //animal 44
        this.animals[44] = this.add.image(750, 1060, 'beluga')
            .setInteractive({ useHandCursor: true })
            .on('pointerover', () => {
                if (level >= 21) {
                    this.animals[44].setTint(0xffaaff),
                    this.animals[44].setScale(0.54);
                }
                else {
                    this.animals[44].setTint(0x888888);
                }
            })
            .on('pointerout', () => {
                if (level >= 21) {
                    this.animals[44].setTint(0xffffff),
                    this.animals[44].setScale(0.5);
                }
                else {
                    this.animals[44].setTint(0x888888);
                }
            })
            .on('pointerdown', () => {
                this.animals[44].setTint(0xffffff),
                this.animals[44].setScale(0.42);
                achat_animal(44, 12);
            })
            .on('pointerup', () => {
                this.animals[44].setScale(0.5);
        });
        this.animals[44].setScale(0.5);
        this.animals[44].depth = 11;
        this.animals[44].visible = false;
        viewport.add(this.animals[44]);
        this.descr[44] = this.add.text(1000, 960, 'Déblocage au niveau 21\n\nInformations supplémentaires', { font: 'bold 24px Georgia', fill: '#000' });
        this.descr[44].visible = false;
        viewport.add(this.descr[44]);
        //animal 45
        this.animals[45] = this.add.image(750, 1360, 'narval')
            .setInteractive({ useHandCursor: true })
            .on('pointerover', () => {
                if (level >= 22) {
                    this.animals[45].setTint(0xffaaff),
                    this.animals[45].setScale(0.54);
                }
                else {
                    this.animals[45].setTint(0x888888);
                }
            })
            .on('pointerout', () => {
                if (level >= 22) {
                    this.animals[45].setTint(0xffffff),
                    this.animals[45].setScale(0.5);
                }
                else {
                    this.animals[45].setTint(0x888888);
                }
            })
            .on('pointerdown', () => {
                this.animals[45].setTint(0xffffff),
                this.animals[45].setScale(0.42);
                achat_animal(45, 12);
            })
            .on('pointerup', () => {
                this.animals[45].setScale(0.5);
        });
        this.animals[45].setScale(0.5);
        this.animals[45].depth = 11;
        this.animals[45].visible = false;
        viewport.add(this.animals[45]);
        this.descr[45] = this.add.text(1000, 1260, 'Déblocage au niveau 22\n\nInformations supplémentaires', { font: 'bold 24px Georgia', fill: '#000' });
        this.descr[45].visible = false;
        viewport.add(this.descr[45]);
        //animal 46
        this.animals[46] = this.add.image(750, 460, 'renard')
            .setInteractive({ useHandCursor: true })
            .on('pointerover', () => {
                if (level >= 25) {
                    this.animals[46].setTint(0xffaaff),
                    this.animals[46].setScale(0.54);
                }
                else {
                    this.animals[46].setTint(0x888888);
                }
            })
            .on('pointerout', () => {
                if (level >= 25) {
                    this.animals[46].setTint(0xffffff),
                    this.animals[46].setScale(0.5);
                }
                else {
                    this.animals[46].setTint(0x888888);
                }
            })
            .on('pointerdown', () => {
                this.animals[46].setTint(0xffffff),
                this.animals[46].setScale(0.42);
                achat_animal(46, 13);
            })
            .on('pointerup', () => {
                this.animals[46].setScale(0.5);
        });
        this.animals[46].setScale(0.5);
        this.animals[46].depth = 11;
        this.animals[46].visible = false;
        viewport.add(this.animals[46]);
        this.descr[46] = this.add.text(1000, 360, 'Déblocage au niveau 25\n\nInformations supplémentaires', { font: 'bold 24px Georgia', fill: '#000' });
        this.descr[46].visible = false;
        viewport.add(this.descr[46]);
        //animal 47
        this.animals[47] = this.add.image(750, 760, 'manchot')
            .setInteractive({ useHandCursor: true })
            .on('pointerover', () => {
                if (level >= 28) {
                    this.animals[47].setTint(0xffaaff),
                    this.animals[47].setScale(0.54);
                }
                else {
                    this.animals[47].setTint(0x888888);
                }
            })
            .on('pointerout', () => {
                if (level >= 28) {
                    this.animals[47].setTint(0xffffff),
                    this.animals[47].setScale(0.5);
                }
                else {
                    this.animals[47].setTint(0x888888);
                }
            })
            .on('pointerdown', () => {
                this.animals[47].setTint(0xffffff),
                this.animals[47].setScale(0.42);
                achat_animal(47, 13);
            })
            .on('pointerup', () => {
                this.animals[47].setScale(0.5);
        });
        this.animals[47].setScale(0.5);
        this.animals[47].depth = 11;
        this.animals[47].visible = false;
        viewport.add(this.animals[47]);
        this.descr[47] = this.add.text(1000, 660, 'Déblocage au niveau 28\n\nInformations supplémentaires', { font: 'bold 24px Georgia', fill: '#000' });
        this.descr[47].visible = false;
        viewport.add(this.descr[47]);
        //animal 48
        this.animals[48] = this.add.image(750, 460, 'morse')
            .setInteractive({ useHandCursor: true })
            .on('pointerover', () => {
                if (level >= 26) {
                    this.animals[48].setTint(0xffaaff),
                    this.animals[48].setScale(0.54);
                }
                else {
                    this.animals[48].setTint(0x888888);
                }
            })
            .on('pointerout', () => {
                if (level >= 26) {
                    this.animals[48].setTint(0xffffff),
                    this.animals[48].setScale(0.5);
                }
                else {
                    this.animals[48].setTint(0x888888);
                }
            })
            .on('pointerdown', () => {
                this.animals[48].setTint(0xffffff),
                this.animals[48].setScale(0.42);
                achat_animal(48, 14);
            })
            .on('pointerup', () => {
                this.animals[48].setScale(0.5);
        });
        this.animals[48].setScale(0.5);
        this.animals[48].depth = 11;
        this.animals[48].visible = false;
        viewport.add(this.animals[48]);
        this.descr[48] = this.add.text(1000, 360, 'Déblocage au niveau 26\n\nInformations supplémentaires', { font: 'bold 24px Georgia', fill: '#000' });
        this.descr[48].visible = false;
        viewport.add(this.descr[48]);
        //animal 49
        this.animals[49] = this.add.image(750, 760, 'lion_mer')
            .setInteractive({ useHandCursor: true })
            .on('pointerover', () => {
                if (level >= 27) {
                    this.animals[49].setTint(0xffaaff),
                    this.animals[49].setScale(0.54);
                }
                else {
                    this.animals[49].setTint(0x888888);
                }
            })
            .on('pointerout', () => {
                if (level >= 27) {
                    this.animals[49].setTint(0xffffff),
                    this.animals[49].setScale(0.5);
                }
                else {
                    this.animals[49].setTint(0x888888);
                }
            })
            .on('pointerdown', () => {
                this.animals[49].setTint(0xffffff),
                this.animals[49].setScale(0.42);
                achat_animal(49, 14);
            })
            .on('pointerup', () => {
                this.animals[49].setScale(0.5);
        });
        this.animals[49].setScale(0.5);
        this.animals[49].depth = 11;
        this.animals[49].visible = false;
        viewport.add(this.animals[49]);
        this.descr[49] = this.add.text(1000, 660, 'Déblocage au niveau 27\n\nInformations supplémentaires', { font: 'bold 24px Georgia', fill: '#000' });
        this.descr[49].visible = false;
        viewport.add(this.descr[49]);
        //animal 50
        this.animals[50] = this.add.image(750, 1060, 'ours_polaire')
            .setInteractive({ useHandCursor: true })
            .on('pointerover', () => {
                if (level >= 29) {
                    this.animals[50].setTint(0xffaaff),
                    this.animals[50].setScale(0.54);
                }
                else {
                    this.animals[50].setTint(0x888888);
                }
            })
            .on('pointerout', () => {
                if (level >= 29) {
                    this.animals[50].setTint(0xffffff),
                    this.animals[50].setScale(0.5);
                }
                else {
                    this.animals[50].setTint(0x888888);
                }
            })
            .on('pointerdown', () => {
                this.animals[50].setTint(0xffffff),
                this.animals[50].setScale(0.42);
                achat_animal(50, 14);
            })
            .on('pointerup', () => {
                this.animals[50].setScale(0.5);
        });
        this.animals[50].setScale(0.5);
        this.animals[50].depth = 11;
        this.animals[50].visible = false;
        viewport.add(this.animals[50]);
        this.descr[50] = this.add.text(1000, 960, 'Déblocage au niveau 29\n\nInformations supplémentaires', { font: 'bold 24px Georgia', fill: '#000' });
        this.descr[50].visible = false;
        viewport.add(this.descr[50]);



        //mynthos version animal 111-114
        this.animals[111] = this.add.image(750, 460, 'myn1')
            .setInteractive({ useHandCursor: true })
            .on('pointerover', () => { console.log("yolo"); });
        this.animals[111].setScale(0.6);
        this.animals[111].depth = 11;
        this.animals[111].visible = false;
        //viewport.add(this.animals[111]);
        this.animals[112] = this.add.image(750, 760, 'myn2')
            .setInteractive({ useHandCursor: true })
            .on('pointerover', () => { console.log("yolo"); });
        this.animals[112].setScale(0.6);
        this.animals[112].depth = 11;
        this.animals[112].visible = false;
        //viewport.add(this.animals[112]);
        this.animals[113] = this.add.image(750, 1060, 'myn3')
            .setInteractive({ useHandCursor: true })
            .on('pointerover', () => { console.log("yolo"); });
        this.animals[113].setScale(1.2);
        this.animals[113].depth = 11;
        this.animals[113].visible = false;
        //viewport.add(this.animals[113]);
        this.animals[114] = this.add.image(750, 1360, 'myn4')
            .setInteractive({ useHandCursor: true })
            .on('pointerover', () => { console.log("yolo"); });
        this.animals[114].setScale(1.2);
        this.animals[114].depth = 11;
        this.animals[114].visible = false;
        //viewport.add(this.animals[114]);


        this.echap = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.ESC);

        //|||| DEBUT WHEEL |||| DEBUT WHEEL |||| DEBUT WHEEL |||| DEBUT WHEEL |||| DEBUT WHEEL |||| DEBUT WHEEL ||||
        let indiceWheel = 0;
        let indiceNb = 0;
        let multiplicateur = 0;
        this.input.on("wheel", function (pointer, gameObjects, deltaX, deltaY, deltaZ) {
            if (this.animals[1].visible == true) {
                indiceWheel = 1;
                indiceNb = 5; //on affiche que les 5 premiers
            }
            else if (this.animals[6].visible == true) {
                indiceWheel = 6;
                indiceNb = 2;
            }
            else if (this.animals[8].visible == true) {
                indiceWheel = 8;
                indiceNb = 4;
            }
            else if (this.animals[12].visible == true) {
                indiceWheel = 12;
                indiceNb = 2;
            }
            else if (this.animals[14].visible == true) {
                indiceWheel = 14;
                indiceNb = 7;
            }
            else if (this.animals[21].visible == true) {
                indiceWheel = 21;
                indiceNb = 5;
            }
            else if (this.animals[26].visible == true) {
                indiceWheel = 26;
                indiceNb = 5;
            }
            else if (this.animals[31].visible == true) {
                indiceWheel = 31;
                indiceNb = 3;
            }
            else if (this.animals[34].visible == true) {
                indiceWheel = 34;
                indiceNb = 3;
            }
            else if (this.animals[37].visible == true) {
                indiceWheel = 37;
                indiceNb = 2;
            }
            else if (this.animals[39].visible == true) {
                indiceWheel = 39;
                indiceNb = 3;
            }
            else if (this.animals[42].visible == true) {
                indiceWheel = 42;
                indiceNb = 4;
            }
            else if (this.animals[46].visible == true) {
                indiceWheel = 46;
                indiceNb = 2;
            }
            else if (this.animals[48].visible == true) {
                indiceWheel = 48;
                indiceNb = 3;
            }
            else if (this.animals[111].visible == true) {
                indiceWheel = 111;
                indiceNb = 4;
            }
            //wheel
            if (opened == true && this.animals[indiceWheel].visible == true) {
                //console.log(deltaY);
                if (deltaY < 0 && this.animals[indiceWheel].y > 450) {
                    for (let i = indiceWheel; i < indiceWheel + indiceNb; i++) {
                        this.animals[i].y = 460 + 300 * multiplicateur;
                        this.descr[i].y = 360 + 300 * multiplicateur;
                        multiplicateur++;
                    }
                    multiplicateur = 0;
                }
                else if (deltaY > 0 && this.animals[indiceWheel + indiceNb - 1].y < 470) {
                    for (let i = indiceWheel; i < indiceWheel + indiceNb; i++) {
                        this.animals[i].y = (460 - 300 * (indiceNb - 1)) + 300 * multiplicateur;
                        this.descr[i].y = (360 - 300 * (indiceNb - 1)) + 300 * multiplicateur;
                        multiplicateur++;
                    }
                    multiplicateur = 0;
                }
                else {
                    for (let i = indiceWheel; i < indiceWheel + indiceNb; i++) {
                        this.animals[i].y -= deltaY;
                        this.descr[i].y -= deltaY;
                    }
                }
            }
        }, this);

    }
    update() {
        posXTest.setText(game.input.mousePointer.x);
        posYTest.setText(game.input.mousePointer.y);


        atm = this;
        hell.then(function (value) {

            if (charger == false) {
                console.log(value);
                charger = true;
                animaux = value.animaux;
                hashtags = value.hashtags;
                visiteurs = value.visiteurs;
                save = db_save_into_tab(value.last_save);
                //console.log(animaux);
                //console.log(hashtags);
                //console.log(save);
                //console.log("visiteurs");
                //console.log(visiteurs);

                //parcours les animaux
                for (let i = 0; i < animaux.length; i++) {
                    for (let j = 0; j < hashtags.length; j++) {
                        if (j <= 20) {
                            atm.hashtagText[j].setText('#'+hashtags[j].hashtag+' x'+hashtags[j].number);
                        }
                        if (animaux[i].nom.toLowerCase() == hashtags[j].hashtag.toLowerCase()) {
                            animaux[i].popularite += 25 * hashtags[j].number;
                            //console.log(animaux[i]);
                        }
                    }
                    coins = save.coins;
                    cumul = save.cumul;
                    lvlText.setText(save.niveau);
                    
                    atm.descr[1].setText(animaux[0].nom + " (" + animaux[0].alimentation + ")\n\n" + animaux[0].description + "\n\nPrix : " + animaux[0].prix + "                Depenses : " + animaux[0].depense + "                Popularité : " + animaux[0].popularite);
                    atm.descr[2].setText(animaux[1].nom + " (" + animaux[1].alimentation + ")\n\n" + animaux[1].description + "\n\nPrix : " + animaux[1].prix + "                Depenses : " + animaux[1].depense + "                Popularité : " + animaux[1].popularite);
                
                }
            }

            if (compteurtick2 == 0) {

                xps = (xps + 100) % 1000;
                if(coins > 0){
                    coinText.setText(coins);
                }
                else{
                    coinText.setText(0);
                }
                nbvisitText.setText(nbvisit);
                xpText.setText(cumul + ' / ' + cumul_requis[indice_level]);
                frameP = Math.floor((cumul_requis[indice_level]-cumul_requis[indice_level-1]) / 18);
                atm.anim_xp.setFrame(Math.floor((cumul-cumul_requis[indice_level-1])/frameP));
                stonksText.setText(gain_argent(nbvisit, nbanimaux, popularitetot));
                not_stonksText.setText(depensee(save, animaux));
                stonks2Text.setText(gain_argent(nbvisit, nbanimaux, popularitetot) - depensee(save, animaux));
                

                if (monte_ok(cumul) && level < 30) {
                    save.niveau++;
                    level = save.niveau;
                    lvlText.setText(level);
                    indice_level++;
                    console.log("next level : " + level);


                    if (level >= 1) {
                        atm.descr[1].setText(animaux[0].nom + " (" + animaux[0].alimentation + ")\n\n" + animaux[0].description + "\n\nPrix : " + animaux[0].prix + "                Depenses : " + animaux[0].depense + "                Popularité : " + animaux[0].popularite);
                        atm.descr[2].setText(animaux[1].nom + " (" + animaux[1].alimentation + ")\n\n" + animaux[1].description + "\n\nPrix : " + animaux[1].prix + "                Depenses : " + animaux[1].depense + "                Popularité : " + animaux[1].popularite);
                    }
                    if (level >= 2) {
                        atm.descr[3].setText(animaux[2].nom + " (" + animaux[2].alimentation + ")\n\n" + animaux[2].description + "\n\nPrix : " + animaux[2].prix + "                Depenses : " + animaux[2].depense + "                Popularité : " + animaux[2].popularite);
                        atm.descr[4].setText(animaux[3].nom + " (" + animaux[3].alimentation + ")\n\n" + animaux[3].description + "\n\nPrix : " + animaux[3].prix + "                Depenses : " + animaux[3].depense + "                Popularité : " + animaux[3].popularite);
                        atm.descr[6].setText(animaux[5].nom + " (" + animaux[5].alimentation + ")\n\n" + animaux[5].description + "\n\nPrix : " + animaux[5].prix + "                Depenses : " + animaux[5].depense + "                Popularité : " + animaux[5].popularite);
                        atm.descr[7].setText(animaux[6].nom + " (" + animaux[6].alimentation + ")\n\n" + animaux[6].description + "\n\nPrix : " + animaux[6].prix + "                Depenses : " + animaux[6].depense + "                Popularité : " + animaux[6].popularite);
                    }
                    if (level >= 3) {
                        atm.descr[5].setText(animaux[4].nom + " (" + animaux[4].alimentation + ")\n\n" + animaux[4].description + "\n\nPrix : " + animaux[4].prix + "                Depenses : " + animaux[4].depense + "                Popularité : " + animaux[4].popularite);
                        atm.descr[8].setText(animaux[7].nom + " (" + animaux[7].alimentation + ")\n\n" + animaux[7].description + "\n\nPrix : " + animaux[7].prix + "                Depenses : " + animaux[7].depense + "                Popularité : " + animaux[7].popularite);
                        atm.descr[9].setText(animaux[8].nom + " (" + animaux[8].alimentation + ")\n\n" + animaux[8].description + "\n\nPrix : " + animaux[8].prix + "                Depenses : " + animaux[8].depense + "                Popularité : " + animaux[8].popularite);
                    }
                    if (level >= 4) {
                        atm.descr[10].setText(animaux[9].nom + " (" + animaux[9].alimentation + ")\n\n" + animaux[9].description + "\n\nPrix : " + animaux[9].prix + "                Depenses : " + animaux[9].depense + "                Popularité : " + animaux[9].popularite);
                        atm.descr[11].setText(animaux[10].nom + " (" + animaux[10].alimentation + ")\n\n" + animaux[10].description + "\n\nPrix : " + animaux[10].prix + "                Depenses : " + animaux[10].depense + "                Popularité : " + animaux[10].popularite);
                    }
                    if (level >= 5) {
                        atm.descr[12].setText(animaux[11].nom + " (" + animaux[11].alimentation + ")\n\n" + animaux[11].description + "\n\nPrix : " + animaux[11].prix + "                Depenses : " + animaux[11].depense + "                Popularité : " + animaux[11].popularite);
                        atm.descr[13].setText(animaux[12].nom + " (" + animaux[12].alimentation + ")\n\n" + animaux[12].description + "\n\nPrix : " + animaux[12].prix + "                Depenses : " + animaux[12].depense + "                Popularité : " + animaux[12].popularite);
                        atm.descr[21].setText(animaux[20].nom + " (" + animaux[20].alimentation + ")\n\n" + animaux[20].description + "\n\nPrix : " + animaux[20].prix + "                Depenses : " + animaux[20].depense + "                Popularité : " + animaux[20].popularite);
                    }
                    if (level >= 6) {
                        atm.descr[14].setText(animaux[13].nom + " (" + animaux[13].alimentation + ")\n\n" + animaux[13].description + "\n\nPrix : " + animaux[13].prix + "                Depenses : " + animaux[13].depense + "                Popularité : " + animaux[13].popularite);
                        atm.descr[22].setText(animaux[21].nom + " (" + animaux[21].alimentation + ")\n\n" + animaux[21].description + "\n\nPrix : " + animaux[21].prix + "                Depenses : " + animaux[21].depense + "                Popularité : " + animaux[21].popularite);
                    }
                    if (level >= 7) {
                        atm.descr[15].setText(animaux[14].nom + " (" + animaux[14].alimentation + ")\n\n" + animaux[14].description + "\n\nPrix : " + animaux[14].prix + "                Depenses : " + animaux[14].depense + "                Popularité : " + animaux[14].popularite);
                        atm.descr[16].setText(animaux[15].nom + " (" + animaux[15].alimentation + ")\n\n" + animaux[15].description + "\n\nPrix : " + animaux[15].prix + "                Depenses : " + animaux[15].depense + "                Popularité : " + animaux[15].popularite);
                        atm.descr[23].setText(animaux[22].nom + " (" + animaux[22].alimentation + ")\n\n" + animaux[22].description + "\n\nPrix : " + animaux[22].prix + "                Depenses : " + animaux[22].depense + "                Popularité : " + animaux[22].popularite);
                    }
                    if (level >= 8) {
                        atm.descr[17].setText(animaux[16].nom + " (" + animaux[16].alimentation + ")\n\n" + animaux[16].description + "\n\nPrix : " + animaux[16].prix + "                Depenses : " + animaux[16].depense + "                Popularité : " + animaux[16].popularite);
                        atm.descr[18].setText(animaux[17].nom + " (" + animaux[17].alimentation + ")\n\n" + animaux[17].description + "\n\nPrix : " + animaux[17].prix + "                Depenses : " + animaux[17].depense + "                Popularité : " + animaux[17].popularite);
                        atm.descr[24].setText(animaux[23].nom + " (" + animaux[23].alimentation + ")\n\n" + animaux[23].description + "\n\nPrix : " + animaux[23].prix + "                Depenses : " + animaux[23].depense + "                Popularité : " + animaux[23].popularite);
                    }
                    if (level >= 9) {
                        atm.descr[19].setText(animaux[18].nom + " (" + animaux[18].alimentation + ")\n\n" + animaux[18].description + "\n\nPrix : " + animaux[18].prix + "                Depenses : " + animaux[18].depense + "                Popularité : " + animaux[18].popularite);
                        atm.descr[25].setText(animaux[24].nom + " (" + animaux[24].alimentation + ")\n\n" + animaux[24].description + "\n\nPrix : " + animaux[24].prix + "                Depenses : " + animaux[24].depense + "                Popularité : " + animaux[24].popularite);
                    }
                    if (level >= 10) {
                        atm.descr[26].setText(animaux[25].nom + " (" + animaux[25].alimentation + ")\n\n" + animaux[25].description + "\n\nPrix : " + animaux[25].prix + "                Depenses : " + animaux[25].depense + "                Popularité : " + animaux[25].popularite);
                        atm.descr[27].setText(animaux[26].nom + " (" + animaux[26].alimentation + ")\n\n" + animaux[26].description + "\n\nPrix : " + animaux[26].prix + "                Depenses : " + animaux[26].depense + "                Popularité : " + animaux[26].popularite);
                    }
                    if (level >= 11) {
                        atm.descr[31].setText(animaux[30].nom + " (" + animaux[30].alimentation + ")\n\n" + animaux[30].description + "\n\nPrix : " + animaux[30].prix + "                Depenses : " + animaux[30].depense + "                Popularité : " + animaux[30].popularite);
                    }
                    if (level >= 12) {
                        atm.descr[28].setText(animaux[27].nom + " (" + animaux[27].alimentation + ")\n\n" + animaux[27].description + "\n\nPrix : " + animaux[27].prix + "                Depenses : " + animaux[27].depense + "                Popularité : " + animaux[27].popularite);
                    }
                    if (level >= 13) {
                        atm.descr[32].setText(animaux[31].nom + " (" + animaux[31].alimentation + ")\n\n" + animaux[31].description + "\n\nPrix : " + animaux[31].prix + "                Depenses : " + animaux[31].depense + "                Popularité : " + animaux[31].popularite);
                        atm.descr[33].setText(animaux[32].nom + " (" + animaux[32].alimentation + ")\n\n" + animaux[32].description + "\n\nPrix : " + animaux[32].prix + "                Depenses : " + animaux[32].depense + "                Popularité : " + animaux[32].popularite);
                    }
                    if (level >= 14) {
                        atm.descr[29].setText(animaux[28].nom + " (" + animaux[28].alimentation + ")\n\n" + animaux[28].description + "\n\nPrix : " + animaux[28].prix + "                Depenses : " + animaux[28].depense + "                Popularité : " + animaux[28].popularite);
                    }
                    if (level >= 15) {
                        atm.descr[34].setText(animaux[33].nom + " (" + animaux[33].alimentation + ")\n\n" + animaux[33].description + "\n\nPrix : " + animaux[33].prix + "                Depenses : " + animaux[33].depense + "                Popularité : " + animaux[33].popularite);
                    }
                    if (level >= 16) {
                        atm.descr[35].setText(animaux[34].nom + " (" + animaux[34].alimentation + ")\n\n" + animaux[34].description + "\n\nPrix : " + animaux[34].prix + "                Depenses : " + animaux[34].depense + "                Popularité : " + animaux[34].popularite);
                    }
                    if (level >= 17) {
                        atm.descr[37].setText(animaux[36].nom + " (" + animaux[36].alimentation + ")\n\n" + animaux[36].description + "\n\nPrix : " + animaux[36].prix + "                Depenses : " + animaux[36].depense + "                Popularité : " + animaux[36].popularite);
                    }
                    if (level >= 18) {
                        atm.descr[38].setText(animaux[37].nom + " (" + animaux[37].alimentation + ")\n\n" + animaux[37].description + "\n\nPrix : " + animaux[37].prix + "                Depenses : " + animaux[37].depense + "                Popularité : " + animaux[37].popularite);
                    }
                    if (level >= 19) {
                        atm.descr[36].setText(animaux[35].nom + " (" + animaux[35].alimentation + ")\n\n" + animaux[35].description + "\n\nPrix : " + animaux[35].prix + "                Depenses : " + animaux[35].depense + "                Popularité : " + animaux[35].popularite);
                    }
                    if (level >= 20) {
                        atm.descr[20].setText(animaux[19].nom + " (" + animaux[19].alimentation + ")\n\n" + animaux[19].description + "\n\nPrix : " + animaux[19].prix + "                Depenses : " + animaux[19].depense + "                Popularité : " + animaux[19].popularite);
                        atm.descr[42].setText(animaux[41].nom + " (" + animaux[41].alimentation + ")\n\n" + animaux[41].description + "\n\nPrix : " + animaux[41].prix + "                Depenses : " + animaux[41].depense + "                Popularité : " + animaux[41].popularite);
                        atm.descr[43].setText(animaux[42].nom + " (" + animaux[42].alimentation + ")\n\n" + animaux[42].description + "\n\nPrix : " + animaux[42].prix + "                Depenses : " + animaux[42].depense + "                Popularité : " + animaux[42].popularite);
                    }
                    if (level >= 21) {
                        atm.descr[44].setText(animaux[43].nom + " (" + animaux[43].alimentation + ")\n\n" + animaux[43].description + "\n\nPrix : " + animaux[43].prix + "                Depenses : " + animaux[43].depense + "                Popularité : " + animaux[43].popularite);
                    }
                    if (level >= 22) {
                        atm.descr[45].setText(animaux[44].nom + " (" + animaux[44].alimentation + ")\n\n" + animaux[44].description + "\n\nPrix : " + animaux[44].prix + "                Depenses : " + animaux[44].depense + "                Popularité : " + animaux[44].popularite);
                    }
                    if (level >= 23) {
                        atm.descr[39].setText(animaux[38].nom + " (" + animaux[38].alimentation + ")\n\n" + animaux[38].description + "\n\nPrix : " + animaux[38].prix + "                Depenses : " + animaux[38].depense + "                Popularité : " + animaux[38].popularite);
                    }
                    if (level >= 24) {
                        atm.descr[40].setText(animaux[39].nom + " (" + animaux[39].alimentation + ")\n\n" + animaux[39].description + "\n\nPrix : " + animaux[39].prix + "                Depenses : " + animaux[39].depense + "                Popularité : " + animaux[39].popularite);
                        atm.descr[41].setText(animaux[40].nom + " (" + animaux[40].alimentation + ")\n\n" + animaux[40].description + "\n\nPrix : " + animaux[40].prix + "                Depenses : " + animaux[40].depense + "                Popularité : " + animaux[40].popularite);
                    }
                    if (level >= 25) {
                        atm.descr[46].setText(animaux[45].nom + " (" + animaux[45].alimentation + ")\n\n" + animaux[45].description + "\n\nPrix : " + animaux[45].prix + "                Depenses : " + animaux[45].depense + "                Popularité : " + animaux[45].popularite);
                    }
                    if (level >= 26) {
                        atm.descr[48].setText(animaux[47].nom + " (" + animaux[47].alimentation + ")\n\n" + animaux[47].description + "\n\nPrix : " + animaux[47].prix + "                Depenses : " + animaux[47].depense + "                Popularité : " + animaux[47].popularite);
                    }
                    if (level >= 27) {
                        atm.descr[49].setText(animaux[48].nom + " (" + animaux[48].alimentation + ")\n\n" + animaux[48].description + "\n\nPrix : " + animaux[48].prix + "                Depenses : " + animaux[48].depense + "                Popularité : " + animaux[48].popularite);
                    }
                    if (level >= 28) {
                        atm.descr[47].setText(animaux[46].nom + " (" + animaux[46].alimentation + ")\n\n" + animaux[46].description + "\n\nPrix : " + animaux[46].prix + "                Depenses : " + animaux[46].depense + "                Popularité : " + animaux[46].popularite);
                    }
                    if (level >= 29) {
                        atm.descr[50].setText(animaux[49].nom + " (" + animaux[49].alimentation + ")\n\n" + animaux[49].description + "\n\nPrix : " + animaux[49].prix + "                Depenses : " + animaux[49].depense + "                Popularité : " + animaux[49].popularite);
                    }
                    if (level >= 30) {
                        atm.descr[30].setText(animaux[29].nom + " (" + animaux[29].alimentation + ")\n\n" + animaux[29].description + "\n\nPrix : " + animaux[29].prix + "                Depenses : " + animaux[29].depense + "                Popularité : " + animaux[29].popularite);
                    }
                }

            }
            if(speed == "fast"){
                compteurtick2 = (compteurtick2 + 1)%4;
            }
            else if(speed == "normal"){
                compteurtick2 = (compteurtick2 + 1)%8;
            }


            if(compteurtick3 == 0) {
                if(atm.hashtagText[0].visible == true && atm.hashtagText[7].text != '-'){
                    for(let i = 0; i < 7; i++){
                        atm.hashtagText[i].visible = false;
                        atm.hashtagText[i+7].visible = true;
                    }
                }
                else if(atm.hashtagText[7].visible == true && atm.hashtagText[14].text != '-'){
                    for(let i = 0; i < 7; i++){
                        atm.hashtagText[i+7].visible = false;
                        atm.hashtagText[i+14].visible = true;
                    }
                }
                else if(atm.hashtagText[7].visible == true && atm.hashtagText[0].text != '-'){
                    for(let i = 0; i < 7; i++){
                        atm.hashtagText[i+7].visible = false;
                        atm.hashtagText[i].visible = true;
                    }
                }
            }
            compteurtick3 = (compteurtick3+1)%64;


            if(compteurtick4 == 0) {
                [nbanimaux, popularitetot] = popularitetot_nbanimaux(save);
                //console.log(nbanimaux,popularitetot);
                nbvisit = gain_visiteur(nbanimaux, popularitetot);
                //console.log(nbvisit,nbanimaux,popularitetot);
                const gaintemp = gain_argent(nbvisit, nbanimaux, popularitetot) - depensee(save, animaux);
                //console.log("benef : ", gaintemp);
                coins += gaintemp;
                if(gaintemp > 0){
                    cumul += gaintemp;
                }
                else{ }
                //console.log("coins : ", coins);
                //console.log("nbvist : ", nbvisit);
            }
            if(speed == "fast"){
                compteurtick4 = (compteurtick4+1)%10;
            }
            else if(speed == "normal"){
                compteurtick4 = (compteurtick4+1)%24;
            }


            //######## GESTION TOUCHES/CLICKS AVEC VARIABLES ######## GESTION TOUCHES/CLICKS AVEC VARIABLES ########

            // ====== AFFICHAGE FENETRES ====== AFFICHAGE FENETRES ====== AFFICHAGE FENETRES ======
            //MENU ECHAP
            if (atm.echap.isDown) {
                if (opened == true) {
                    atm.menu.visible = false;
                    atm.menu2.visible = false;
                    atm.menu3.visible = false;
                    atm.stonks.visible = false;
                    atm.not_stonks.visible = false;
                    atm.stonks2.visible = false;
                    stonksText.visible = false;
                    not_stonksText.visible = false;
                    stonks2Text.visible = false;
                    gainstotaux.visible = false;
                    depenses.visible = false;
                    gainsreels.visible = false;
                    for (let i = 1; i < 51; i++) {
                        atm.animals[i].visible = false;
                        atm.descr[i].visible = false;
                    }
                    opened = false;
                }
            }
            
            //MENU STATISTIQUES
            if (tablette == true) {
                if (opened == false) {
                    atm.menu2.visible = true;
                    atm.stonks.visible = true;
                    atm.not_stonks.visible = true;
                    atm.stonks2.visible = true;
                    stonksText.visible = true;
                    not_stonksText.visible = true;
                    stonks2Text.visible = true;
                    gainstotaux.visible = true;
                    depenses.visible = true;
                    gainsreels.visible = true;
                    
                    opened = true;
                }
                tablette = false;
            }

            //MENU RADIO
            if (radio == true) {
                if (opened == false) {
                    atm.menu3.visible = true;
                    /*for (let i = 1; i < 6; i++) {
                        atm.animals[i].visible = true;
                        atm.descr[i].visible = true;
                    }*/
                    opened = true;
                }
                radio = false;
            }



            //$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$
            //$$$$$ ENCLOS ANIMAUX $$$$$ ENCLOS ANIMAUX $$$$$ ENCLOS ANIMAUX $$$$$ ENCLOS ANIMAUX $$$$$ ENCLOS ANIMAUX $$$$$
            //$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$
            //MENU ENCLOS1
            if (enclos1 == true) {
                if (opened == false) {
                    atm.menu.visible = true;
                    for (let i = 1; i < 6; i++) {
                        atm.animals[i].visible = true;
                        atm.descr[i].visible = true;
                    }
                    opened = true;
                }
                enclos1 = false;
            }
            //MENU ENCLOS2
            if (enclos2 == true) {
                if (opened == false) {
                    atm.menu.visible = true;
                    for (let i = 6; i < 8; i++) {
                        atm.animals[i].visible = true;
                        atm.descr[i].visible = true;
                    }
                    opened = true;
                }
                enclos2 = false;
            }
            //MENU ENCLOS3
            if (enclos3 == true) {
                if (opened == false) {
                    atm.menu.visible = true;
                    for (let i = 8; i < 12; i++) {
                        atm.animals[i].visible = true;
                        atm.descr[i].visible = true;
                    }
                    opened = true;
                }
                enclos3 = false;
            }
            //MENU ENCLOS4
            if (enclos4 == true) {
                if (opened == false) {
                    atm.menu.visible = true;
                    for (let i = 12; i < 14; i++) {
                        atm.animals[i].visible = true;
                        atm.descr[i].visible = true;
                    }
                    opened = true;
                }
                enclos4 = false;
            }
            //MENU ENCLOS5
            if (enclos5 == true) {
                if (opened == false) {
                    atm.menu.visible = true;
                    for (let i = 14; i < 21; i++) {
                        atm.animals[i].visible = true;
                        atm.descr[i].visible = true;
                    }
                    opened = true;
                }
                enclos5 = false;
            }
            //MENU ENCLOS6
            if (enclos6 == true) {
                if (opened == false) {
                    atm.menu.visible = true;
                    for (let i = 21; i < 26; i++) {
                        atm.animals[i].visible = true;
                        atm.descr[i].visible = true;
                    }
                    opened = true;
                }
                enclos6 = false;
            }
            //MENU ENCLOS7
            if (enclos7 == true) {
                if (opened == false) {
                    atm.menu.visible = true;
                    for (let i = 26; i < 31; i++) {
                        atm.animals[i].visible = true;
                        atm.descr[i].visible = true;
                    }
                    opened = true;
                }
                enclos7 = false;
            }
            //MENU ENCLOS8
            if (enclos8 == true) {
                if (opened == false) {
                    atm.menu.visible = true;
                    for (let i = 31; i < 34; i++) {
                        atm.animals[i].visible = true;
                        atm.descr[i].visible = true;
                    }
                    opened = true;
                }
                enclos8 = false;
            }
            //MENU ENCLOS9
            if (enclos9 == true) {
                if (opened == false) {
                    atm.menu.visible = true;
                    for (let i = 34; i < 37; i++) {
                        atm.animals[i].visible = true;
                        atm.descr[i].visible = true;
                    }
                    opened = true;
                }
                enclos9 = false;
            }
            //MENU ENCLOS10
            if (enclos10 == true) {
                if (opened == false) {
                    atm.menu.visible = true;
                    for (let i = 37; i < 39; i++) {
                        atm.animals[i].visible = true;
                        atm.descr[i].visible = true;
                    }
                    opened = true;
                }
                enclos10 = false;
            }
            //MENU ENCLOS11
            if (enclos11 == true) {
                if (opened == false) {
                    atm.menu.visible = true;
                    for (let i = 39; i < 42; i++) {
                        atm.animals[i].visible = true;
                        atm.descr[i].visible = true;
                    }
                    opened = true;
                }
                enclos11 = false;
            }
            //MENU ENCLOS12
            if (enclos12 == true) {
                if (opened == false) {
                    atm.menu.visible = true;
                    for (let i = 42; i < 46; i++) {
                        atm.animals[i].visible = true;
                        atm.descr[i].visible = true;
                    }
                    opened = true;
                }
                enclos12 = false;
            }
            //MENU ENCLOS13
            if (enclos13 == true) {
                if (opened == false) {
                    atm.menu.visible = true;
                    for (let i = 46; i < 48; i++) {
                        atm.animals[i].visible = true;
                        atm.descr[i].visible = true;
                    }
                    opened = true;
                }
                enclos13 = false;
            }
            //MENU ENCLOS14
            if (enclos14 == true) {
                if (opened == false) {
                    atm.menu.visible = true;
                    for (let i = 48; i < 51; i++) {
                        atm.animals[i].visible = true;
                        atm.descr[i].visible = true;
                    }
                    opened = true;
                }
                enclos14 = false;
            }


        });
    }
}


let config = {
    type: Phaser.AUTO,
    parent: 'big-head',
    scale: {
        mode: Phaser.Scale.FIT,
        parent: 'phaser-example',
        autoCenter: Phaser.Scale.CENTER_BOTH,
        width: 2438,
        height: 1080
    },
    scene: [
        Boot,
        Game,
        Menu
    ],
    physics: {
        default: "arcade",
        arcade: {
            debug: false,
            gravity: { y: 0 }
        }
    },
    audio: {
        disableWebAudio: true
    }
};

let game = new Phaser.Game(config);

