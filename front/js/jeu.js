
// ==== VARIABLES ==== VARIABLES ==== VARIABLES ==== VARIABLES ==== VARIABLES ==== VARIABLES ====
let nbanimaux;
let charger = false;
let animaux;
let hashtags;
let save;
let visiteurs;
let popularitetot;

let atm;

let compteurtick2 = 0;
let random = 0;
let hauttick = 0;
let bastick = 0;
let droitetick = 0;
let gauchetick = 0;
let FrameUp = 0;
let FrameDown = 0;
let FrameRight = 0;
let FrameLeft = 0;
let posXTest = "";
let posYTest = "";
let stepCam = 1;
let menuactive = false;
let width = 2438;
let height = 1080;
let width2 = width/2;
let height2 = height/2;
let coinText = "";
let xpText = "";
let lvlText = "";
let nbvisitText = "";
let coins = 1000;
let xps = 700;
let level = 0;
let nbvisit = 0;
let switchEchap = false;
let switchSpace = false;
let switchP = false;
let switchM = false;
let opened = false;
let frameP = 0;


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
let enclos11  = false;
let enclos12 = false;
let enclos13 = false;
let enclos14 = false;




function hello(){
    const data= fetch('/hello', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({"hello I need the data" : "thanks "})
    }
    )
    .then(response => response.json())
    .then(data => {
        return data
    }
    );
    console.log("hell")
    return data;
}
const hell = hello();


function ec_n_to_tab(ec_n){
    let tab=[];
    //ec_n est une string de la forme 1 2 14 ... et ca devrait donner tab=[1,2,14,...]
    let last_space=0;
    if(ec_n != null){
        for(let i=0;i<ec_n.length;i++){
            if(ec_n[i]==" "){
                tab.push(parseInt(ec_n.slice(last_space,i)));
                last_space=i+1;
            }
        }
        tab.push(parseInt(ec_n.slice(last_space,ec_n.length)));
    }
    return tab;
}

function db_save_into_tab(save){
    //prend tout les element de save et renvoie un objet save
    const niveau = save.niveau;
    const coins = save.argent
    const cumul= save.cumul_argent;
    const ec = [save.ec_1,save.ec_2,save.ec_3,save.ec_4,save.ec_5,save.ec_6,save.ec_7,save.ec_8,save.ec_9,save.ec_10,save.ec_11,save.ec_12,save.ec_13,save.ec_14];
    let ec_na= []
    ec_na.push( ec_n_to_tab(save.ec_na_1));
    ec_na.push( ec_n_to_tab(save.ec_na_2));
    ec_na.push( ec_n_to_tab(save.ec_na_3));
    ec_na.push( ec_n_to_tab(save.ec_na_4));
    ec_na.push( ec_n_to_tab(save.ec_na_5));
    ec_na.push( ec_n_to_tab(save.ec_na_6));
    ec_na.push( ec_n_to_tab(save.ec_na_7));
    ec_na.push( ec_n_to_tab(save.ec_na_8));
    ec_na.push( ec_n_to_tab(save.ec_na_9));
    ec_na.push( ec_n_to_tab(save.ec_na_10));
    ec_na.push( ec_n_to_tab(save.ec_na_11));
    ec_na.push( ec_n_to_tab(save.ec_na_12));
    ec_na.push( ec_n_to_tab(save.ec_na_13));
    ec_na.push( ec_n_to_tab(save.ec_na_14));
    let ec_nm= []
    ec_nm.push( ec_n_to_tab(save.ec_nm_1));
    ec_nm.push( ec_n_to_tab(save.ec_nm_2));
    ec_nm.push( ec_n_to_tab(save.ec_nm_3));
    ec_nm.push( ec_n_to_tab(save.ec_nm_4));
    ec_nm.push( ec_n_to_tab(save.ec_nm_5));
    ec_nm.push( ec_n_to_tab(save.ec_nm_6));
    ec_nm.push( ec_n_to_tab(save.ec_nm_7));
    ec_nm.push( ec_n_to_tab(save.ec_nm_8));
    ec_nm.push( ec_n_to_tab(save.ec_nm_9));
    ec_nm.push( ec_n_to_tab(save.ec_nm_10));
    ec_nm.push( ec_n_to_tab(save.ec_nm_11));
    ec_nm.push( ec_n_to_tab(save.ec_nm_12));
    ec_nm.push( ec_n_to_tab(save.ec_nm_13));
    ec_nm.push( ec_n_to_tab(save.ec_nm_14));

    return {

        niveau : niveau,
        coins : coins,
        cumul : cumul,
        ec : ec,
        ec_na : ec_na,
        ec_nm : ec_nm   
    }
}

function popularitetot_nbanimaux(save){
    let nbanimaux = 0;
    for(let i = 0; i <save.ec_na.length; i++){
        nbanimaux += save.ec_na[i].length;
    }
    let popularitetot=0
    for(let i=0; i<save.ec_na.length; i++){
        for(let j=0 ; j<save.ec_na[i].length; j++){
            //console.log(animaux[save.ec_na[i][j]-1].popularite)
            popularitetot+= animaux[save.ec_na[i][j]-1].popularite;
        }
    }
    //console.log("total animaux : ", nbanimaux)
    //console.log("popularite : ",popularitetot)
    return [nbanimaux,popularitetot]
}

function gain_visiteur(nbanimaux,popularitetot){
    if(nbanimaux==0){
        return 0;
    }
    return Math.round(((popularitetot/nbanimaux)*10/100)+(Math.random()*50));
}

function gain_argent(nbvisit,nbanimaux,popularitetot){
    if(nbanimaux==0){
        return 0;
    }
    return Math.round( (100*nbvisit*(popularitetot/(nbanimaux*100))));

}

function depensee(save,animaux){
    let depense=0;
    for(let i=0; i<save.ec_na.length; i++){
        for(let j=0 ; j<save.ec_na[i].length; j++){
            //console.log(animaux[save.ec_na[i][j]-1].popularite)
            depense+= animaux[save.ec_na[i][j]-1].depense;
        }
    }
    
    for(let k=0; k<save.ec_nm.length; k++){
        for(let l=0 ; l<save.ec_nm[k].length; l++){
            //console.log(animaux[save.ec_na[i][j]-1].popularite)
            depense+= animaux[save.ec_nm[k][l]-1].depense ;
            
        }
    }
    return Math.round( depense);
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
    constructor () {
        super({ key:'Boot'});
    }
    preload(){
        this.load.image('player','../img/Prof_Tilleul.png');
        this.load.image('background','../map/background.png');
        //this.load.image('background','../img/map_zoo.png');
        
        this.load.image('coin','../img/coin.png');
        this.load.spritesheet('xps','../img/sprite_bar_xp.png', { frameWidth: 700, frameHeight: 17 });
        this.load.spritesheet('visiteur','../img/visiteur.png', { frameWidth: 48, frameHeight: 98 });
        this.load.spritesheet('visiteur2','../img/visiteur2.png', { frameWidth: 47, frameHeight: 95 });
        this.load.spritesheet('visiteur3','../img/visiteur3.png', { frameWidth: 45, frameHeight: 82 });
        this.load.spritesheet('visiteur4','../img/visiteur4.png', { frameWidth: 45, frameHeight: 80 });
        this.load.image('menu0','../img/menu_bleu.png');
        this.load.image('resume','../img/resume.png');
        this.load.image('settings','../img/settings.png');
        this.load.image('quit','../img/quit.png');
        this.load.image('menu1','../img/HUD_enclos.png');
        //this.load.image('butplus','../img/HUD_bouton_plus.png');
        
        this.load.image('perso1','../img/perso1.png');
        this.load.image('perso2','../img/perso2.png');
        this.load.image('perso3','../img/perso3.png');
        this.load.image('perso4','../img/perso4.png');
        
        this.load.image('myn1','../img/mynthos1.jpg');
        this.load.image('myn2','../img/mynthos2.jpg');
        this.load.image('myn3','../img/mynthos3.jpg');
        this.load.image('myn4','../img/mynthos4.jpg');

        
        //====== ANIMAUX PRELOAD ====== ANIMAUX PRELOAD ====== ANIMAUX PRELOAD ====== ANIMAUX PRELOAD ====== ANIMAUX PRELOAD ======
        this.load.image('zebre','../img/zebre.png');
        this.load.image('girafe','../img/girafe.png');
        this.load.image('suricate','../img/suricate.png');
        this.load.image('autruche','../img/autruche.png');
        this.load.image('fennec','../img/fennec.png');
        
        this.load.image('elephant','../img/elephant.png');
        this.load.image('rhino','../img/rhino.png');
        
        this.load.image('hyene','../img/hyene.png');
        this.load.image('serpent','../img/serpent.png');
        this.load.image('lion','../img/lion.png');
        this.load.image('guepard','../img/guepard.png');
        
        this.load.image('renne','../img/renne.png');
        this.load.image('elan','../img/elan.png');
        
        this.load.image('paresseux','../img/paresseux.png');
        this.load.image('chimpanze','../img/chimpanze.png');
        this.load.image('lemurien','../img/lemurien.png');
        this.load.image('koala','../img/koala.png');
        this.load.image('panda_roux','../img/panda_roux.png');
        this.load.image('gorille','../img/gorille.png');
        this.load.image('panda','../img/panda.png');
        
        this.load.image('loup','../img/loup.png');
        this.load.image('leopard','../img/leopard.png');
        this.load.image('panthere','../img/panthere.png');
        this.load.image('ours','../img/ours.png');
        this.load.image('tigre','../img/tigre.png');
        
        this.load.image('chevre','../img/chevre.png');
        this.load.image('mouton','../img/mouton.png');
        this.load.image('alpaga','../img/alpaga.png');
        this.load.image('paon','../img/paon.png');
        this.load.image('dodo','../img/dodo.png');
        
        this.load.image('bison','../img/bison.png');
        this.load.image('bouquetin','../img/bouquetin.png');
        this.load.image('ane','../img/ane.png');
        
        this.load.image('loutre','../img/loutre.png');
        this.load.image('otarie','../img/otarie.png');
        this.load.image('tortue','../img/tortue.png');
        
        this.load.image('crocodile','../img/crocodile.png');
        this.load.image('hippo','../img/hippo.png');
        
        this.load.image('requin','../img/requin.png');
        this.load.image('baleine','../img/baleine.png');
        this.load.image('orque','../img/orque.png');
        
        this.load.image('dauphin','../img/dauphin.png');
        this.load.image('raie','../img/raie.png');
        this.load.image('beluga','../img/beluga.png');
        this.load.image('narval','../img/narval.png');
        
        this.load.image('renard','../img/renard.png');
        this.load.image('manchot','../img/manchot.png');
        
        this.load.image('morse','../img/morse.png');
        this.load.image('lion_mer','../img/lion_mer.png');
        this.load.image('ours_polaire','../img/ours_polaire.png');
        

        this.load.image('animal_1','../img/animaux/savane/zebre.png');
        this.load.image('animal_2','../img/animaux/savane/girafe.png');
        this.load.image('animal_3','../img/animaux/savane/suricate.png');
        this.load.image('animal_4','../img/animaux/savane/autruche.png');
        this.load.image('animal_5','../img/animaux/savane/Elephant.png');
        this.load.image('animal_6','../img/animaux/savane/rhino.png');
        this.load.image('animal_7','../img/animaux/savane/fennec.png');
        this.load.image('animal_8','../img/animaux/savane/hyene.png');
        this.load.image('animal_9','../img/animaux/savane/serpent.png');
        this.load.image('animal_10','../img/animaux/savane/lion.png');
        this.load.image('animal_11','../img/animaux/savane/guepard.png');
        this.load.image('animal_12','../img/animaux/boise/renne.png');
        this.load.image('animal_13','../img/animaux/boise/elan.png');
        this.load.image('animal_14','../img/animaux/boise/loup.png');
        this.load.image('animal_15','../img/animaux/boise/paresseux.png');
        this.load.image('animal_16','../img/animaux/boise/léopard.png');
        this.load.image('animal_17','../img/animaux/boise/chimpanzé.png');
        this.load.image('animal_18','../img/animaux/boise/lemurien.png');
        this.load.image('animal_19','../img/animaux/boise/panthère_noire.png');
        this.load.image('animal_20','../img/animaux/boise/koala.png');
        this.load.image('animal_21','../img/animaux/boise/panda_roux.png');
        this.load.image('animal_22','../img/animaux/boise/ours_brun.png');
        this.load.image('animal_23','../img/animaux/boise/gorille.png');
        this.load.image('animal_24','../img/animaux/boise/tigre.png');
        this.load.image('animal_25','../img/animaux/plaine/chevre.png');
        this.load.image('animal_26','../img/animaux/plaine/mouton.png');
        this.load.image('animal_27','../img/animaux/plaine/bison.png');
        this.load.image('animal_28','../img/animaux/plaine/alpaga.png');
        this.load.image('animal_29','../img/animaux/plaine/bouquetin.png');
        this.load.image('animal_30','../img/animaux/plaine/ane.png');
        this.load.image('animal_31','../img/animaux/plaine/paon.png');
        this.load.image('animal_32','../img/animaux/aquatique/loutre.png');
        this.load.image('animal_33','../img/animaux/aquatique/otarie.png');
        this.load.image('animal_34','../img/animaux/aquatique/crocodile.png');
        this.load.image('animal_35','../img/animaux/aquatique/hippopotame.png');
        this.load.image('animal_36','../img/animaux/aquatique/tortue.png');
        this.load.image('animal_37','../img/animaux/boiser/panda.png');
        this.load.image('animal_38','../img/animaux/aquatique/dauphin.png');
        this.load.image('animal_39','../img/animaux/aquatique/raie.png');
        this.load.image('animal_40','../img/animaux/aquatique/beluga.png');
        this.load.image('animal_41','../img/animaux/aquatique/narval.png');
        this.load.image('animal_42','../img/animaux/aquatique/requin.png');
        this.load.image('animal_43','../img/animaux/aquatique/baleine.png');
        this.load.image('animal_44','../img/animaux/aquatique/orque.png');
        this.load.image('animal_45','../img/animaux/arctique/renard_polaire.png');
        this.load.image('animal_46','../img/animaux/arctique/morse.png');
        this.load.image('animal_47','../img/animaux/arctique/lion_de_mer.png');
        this.load.image('animal_48','../img/animaux/arctique/manchot.png');
        this.load.image('animal_49','../img/animaux/arctique/ours_polaire.png');
        this.load.image('animal_50','../img/animaux/plaine/dodo.png');
        
        this.load.image("base_tile",'../map/tile.png');
        this.load.tilemapTiledJSON('mapData','../map/map_m.tmj');
    }
    create(){
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
class Game extends Phaser.Scene{
    constructor () {
        super({ key:'Game'});
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
            {x:805, y:770},
        ],
            [
                {x: 965, y: 675 },
                {x: 557, y: 460 },
                {x: 819, y: 335 },
                {x: 967, y: 407 },
                {x: 1215, y: 268 },
                {x: 1456, y: 397 },
                {x: 1216, y: 525 },
                {x: 1012, y: 426 },
                {x: 754, y: 566 },
                {x: 972, y: 683 },
            {x:805, y:770},
            ],
            [
                {x: 968, y: 690 },
                {x: 1230, y: 826 },
                {x: 1528, y: 669 },
                {x: 1252, y: 540 },
                {x: 826, y: 326 },
                {x: 558, y: 468 },
                {x: 966, y: 679 },
                {x:805, y:770},
            ],
            [{x: 1253, y: 539 },
                {x: 1508, y: 662 },
                {x: 1692, y: 565 },
                {x: 1695, y: 520 },
                {x: 1220, y: 276 },
                {x: 965, y: 402 },
                {x: 1236, y: 542 },
                {x:805, y:770},
            ],
            [
                {x: 965, y: 681 },
                 {x: 749, y: 567 },
                 {x: 1001, y: 425 },
                 {x: 1217, y: 525 },
                 {x: 1452, y: 397 },
                 {x: 1217, y: 278 },
                 {x: 956, y: 405 },
                 {x: 1235, y: 543 },
                    {x:805, y:770},
            ],
            [{x: 1249, y: 542 },
                {x: 1203, y: 525 },
                {x: 1450, y: 392 },
                {x: 1693, y: 518 },
                {x: 1697, y: 557 },
                {x: 1503, y: 662 },
                {x: 1254, y: 544 },
                {x: 975, y: 683 },
                {x: 759, y: 566 },
                {x: 998, y: 422 },
                {x: 963, y: 405 },
                {x: 1216, y: 275 },
                {x: 1452, y: 393 },
                {x: 1207, y: 525 },
                {x: 1252, y: 543 },]



          ];
          this.currentTargetIndex = [0];
          this.text_visiteur = [];
          this.frame=[]
          this.smiley=[]
    }
    create(){
        
        this.add.image(2438, 1080, 'background').setScale(1).setDepth(-1).setOrigin(1,1);

        //#####################################
        //#                                   #
        //# --   Création de la caméra    --  #
        //#                                   #
        //#####################################
        const map = this.make.tilemap({ key: 'mapData' });
        const tiles = map.addTilesetImage("tile_f","base_tile");
        
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
            if (tile) {
                console.log(`Clicked on tile (${tile.x}, ${tile.y}) in layer '${tile.layer.name}'`);
                if(tile.x <= 41 && tile.y <= 21){
                    console.log('plaine droite');
                    enclos8 = true;
                }
                else if(tile.x <= 21 && tile.y <= 55){
                    console.log('plaine gauche');
                    enclos7 = true;
                }
                else if(tile.x <= 78 && tile.y <= 20){
                    console.log('vase');
                    enclos10 = true;
                }
                else if(tile.x <= 55 && tile.y <= 55){
                    console.log('eau haut');
                    enclos11 = true;
                }
                else if(tile.x <= 26 && tile.y <= 96){
                    console.log('savane haut');
                    enclos2 = true;
                }
                else if(tile.x <= 59 && tile.y <= 93){
                    console.log('savane droite');
                    enclos3 = true;
                }
                else if(tile.x <= 94 && tile.y <= 54){
                    console.log('boisé haut');
                    enclos5 = true;
                }
                else if(tile.x <= 127 && tile.y <= 26){
                    console.log('banquise');
                    enclos9 = true;
                }
                else if(tile.x <= 57 && tile.y <= 124){
                    console.log('sauvage gauche');
                    enclos1 = true;
                }
                else if(tile.x <= 99 && tile.y <= 100){
                    console.log('eau mid');
                    enclos12 = true;
                }
                else if(tile.x <= 125 && tile.y <= 54){
                    console.log('boisé droite');
                    enclos4 = true;
                }
                else if(tile.x <= 105 && tile.y <= 123){
                    console.log('boisé gauche');
                    enclos6 = true;
                }
                else if(tile.x <= 124 && tile.y <= 92){
                    console.log('eau droite');
                    enclos14 = true;
                }
                else if(tile.x <= 125 && tile.y <= 125){
                    console.log('eau bas');
                    enclos13 = true;
                }
            }
        }
        this.input.on('pointerdown', detectTileClick, this);
        
        

        this.cameras.main.setZoom(1);
        
        /* de côté ça peut aider
        this.input.keyboard.on("keydown-A", function () {
            this.cameras.main.ignore([this.coinText, this.xpText]);
        }, this);
        */
        
    //Ajout des contrôles de la caméra
        this.input.on("wheel", function (pointer, gameObjects, deltaX, deltaY, deltaZ) {
            if(stepCam > 1  && stepCam <= 16 && deltaY > 0 && opened == false) {
                stepCam = stepCam / 2;
                this.cameras.main.setZoom(stepCam);
                //console.log(stepCam, "dezoom");
            }
            if(stepCam >= 1  && stepCam < 16 && deltaY < 0 && opened == false){
                stepCam = stepCam * 2;
                this.cameras.main.setZoom(stepCam);
                //console.log(stepCam, "zoom");
            }
            if(stepCam == 1){
                this.cameras.main.centerOn(1220,540);
            }
            /*
            else if(stepCam == 2){
                
            }
            else if(stepCam == 4){
                
            }
            else if(stepCam == 8){
                
            }*/
        }, this);
        
        this.input.on("pointerdown", function (pointer) {
            this.input.on("pointermove", function (pointer) {
                if (pointer.isDown) {
                    if(stepCam == 1){
                        //this.cameras.main.scrollX -= pointer.velocity.x * (this.cameras.main.zoom /16);
                        //this.cameras.main.scrollY -= pointer.velocity.y * (this.cameras.main.zoom /10);
                    }
                    else if(stepCam == 2){
                        this.cameras.main.scrollX -= (pointer.x - pointer.prevPosition.x) / this.cameras.main.zoom;
                        this.cameras.main.scrollY -= (pointer.y - pointer.prevPosition.y) / this.cameras.main.zoom;
                    }
                    else if(stepCam == 4){
                        this.cameras.main.scrollX -= (pointer.x - pointer.prevPosition.x) / this.cameras.main.zoom;
                        this.cameras.main.scrollY -= (pointer.y - pointer.prevPosition.y) / this.cameras.main.zoom;
                    }
                    else if(stepCam == 8){
                        this.cameras.main.scrollX -= (pointer.x - pointer.prevPosition.x) / this.cameras.main.zoom;
                        this.cameras.main.scrollY -= (pointer.y - pointer.prevPosition.y) / this.cameras.main.zoom;
                    }
                    else if(stepCam == 16){
                        this.cameras.main.scrollX -= (pointer.x - pointer.prevPosition.x) / this.cameras.main.zoom;
                        this.cameras.main.scrollY -= (pointer.y - pointer.prevPosition.y) / this.cameras.main.zoom;
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
        


        /*this.player = this.physics.add.sprite(760, 800, 'player');
        this.player.setCollideWorldBounds(true);
        this.player.setScale(0.2);
        this.player.depth = 4;*/

        
        /*var config3 = {
            key: 'visiteur',
            frames: this.anims.generateFrameNumbers('visiteur', {
                start: 0,
                end: 12,
                first: 0
            }),
            frameRate: 8,
            repeat: -1
        };*/
        //this.anims.create(config3);
        //this.add.sprite(1000, 400, "visiteur").play("visiteur");
        /*this.visiteur = this.physics.add.image(1000, 600, 'visiteur');
        this.visiteur.setScale(0.32);
        this.visiteur.depth = 14;*/

        
        this.cursors = this.input.keyboard.createCursorKeys();
        this.spacebar = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE);

        let nombreVisiteurs = 100;// Nombre de visiteurs à créer
        const nom_sprite = ["visiteur","visiteur2", "visiteur3", "visiteur4"]
        this.input.on('pointerdown', (pointer) => {
            if (pointer.leftButtonDown()) {
              const { x, y } = pointer;
              console.log(`{x: ${parseInt(x)}, y: ${parseInt(y)} },`);
            }
          });
        hell.then(data => {
            visiteurs = data.visiteurs;
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
                
                               
                this.texte = this.add.text(0, 0, visiteurs[i].nom+" "+visiteurs[i].prenom, { fontSize: '10px', fill: '#000000' });
                this.texte.setOrigin(0.5);
                this.texte.depth = 4; 
                this.text_visiteur.push(this.texte);
                
                this.currentTargetIndex.push(0);
                this.frame.push([9,0,0]);
                this.smile = this.add.text(0, 0, "", { fontSize: '10px', fill: '#000000' });
                this.smile.setOrigin(0.5);
                this.smile.depth = 4; 
                this.smiley.push(this.smile);
                this.moveVisiteurToNextTarget(i,cheminIndex,vitesse);
        
            
            }    
        });

        this.input.on('pointerdown', (pointer) => {
            if (pointer.leftButtonDown()) {
              const { x, y } = pointer;
              console.log(`{x: ${parseInt(x)}, y: ${parseInt(y)} },`);
            }
          });
    }
    wich_direction(x,y,targetx,targety){
        if(targetx-x<0 && targety-y<0){
            
            return 6;
        }
        if(targetx-x<0){
            
            return 0;
        }
        if(targety-y<0){
            
            return 9;
        }
        
        return 3;

       
    }
    wich_direction(x,y,targetx,targety){
        if(targetx-x<0 && targety-y<0){
            
            return 6;
        }
        if(targetx-x<0){
            
            return 0;
        }
        if(targety-y<0){
            
            return 9;
        }
        
        return 3;

        
    }
    moveVisiteurToNextTarget(i,chemin,vitesse){
        if (this.currentTargetIndex[i] >= this.targetCoordinates[chemin].length) {
            // Toutes les cibles ont été atteintes, arrêter le déplacement
            this.currentTargetIndex[i] = 0;
            this.moveVisiteurToNextTarget(i,chemin,vitesse);
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
            t:1,
            onUpdate: () => {
                // Mise à jour de la position du texte
                if(this.frame[i][1]==30){
                    this.visiteur[i].setFrame(this.frame[i][0]);
                    this.frame[i][0] = (this.frame[i][0]+1)%3+this.wich_direction(this.visiteur[i].x,this.visiteur[i].y,target.x,target.y);
                    this.frame[i][1] = 0;
                    
    
                }
                if(this.frame[i][2]==300){
                    this.frame[i][2]=0;
                    let proba = Phaser.Math.Between(0, 300);
                    if(proba==1){
                        this.smiley[i].setText("😀");
                    }
                    else if(proba==2){
                        this.smiley[i].setText("😂");
                    }
                    else if(proba==3){
                        this.smiley[i].setText("😍");
                    }
                    else if(proba==4){
                        this.smiley[i].setText("😘");
                    }
                    else if(proba==5){
                        this.smiley[i].setText("😜");
                    }
                    else if(proba==6){
                        this.smiley[i].setText("😎");
                    }
                    else if(proba==7){
                        this.smiley[i].setText("😡");
                    }
                    else if(proba==8){
                        this.smiley[i].setText("😱");
                    }
                    else if(proba==9){
                        this.smiley[i].setText("😭");
                    }
                    else{
                        this.smiley[i].setText("");
                    }
                }
                this.frame[i][1] += 1;
                this.frame[i][2]+=1;

                //console.log(this.frame[i])
                
                this.text_visiteur[i].x = this.visiteur[i].x;
                this.text_visiteur[i].y = this.visiteur[i].y -30;
                this.smiley[i].x = this.visiteur[i].x+13;
                this.smiley[i].y = this.visiteur[i].y -15;
                //random 1/100 pour smiley
                
            },
            onComplete: () => {
              // Appel récursif pour passer à la cible suivante
                this.currentTargetIndex[i]++;
                this.moveVisiteurToNextTarget(i,chemin,vitesse);
                this.frame[i][0] = (this.frame[i][0]+1)%3+this.wich_direction(this.visiteur[i].x,this.visiteur[i].y,chemin);
                this.visiteur[i].setFrame(this.frame[i][0]);
                this.frame[i][1] = 0;
                    

            }
        });
    }
}

//##############################################################################################################
//##############################################################################################################
//###     HUD     #####     HUD     #####     HUD     #####     HUD     #####     HUD     #####     HUD     ####
//##############################################################################################################
//##############################################################################################################
class HUD extends Phaser.Scene{
    constructor () {
        super({ key:'HUD'});
    }
    create(){
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
        this.anim_xp = this.add.image(1224, 50, 'xps');
        this.anim_xp.setScale(1.4);
        this.anim_xp.depth = 14;
        

        this.coin = this.add.image(260, 52, 'coin');
        this.coin.setScale(0.8);
        this.coin.state = 1000;
        this.coin.depth = 8;

        
        coinText = this.add.text(360, 32, '1000', {font: '40px', fontFamily: 'Georgia, "Goudy Bookletter 1911", Times, serif', fill: '#fff'});
        xpText = this.add.text(1780, 32, '0 / 1000', {font: '40px', fontFamily: 'Georgia, "Goudy Bookletter 1911", Times, serif', fill: '#fff'});
        lvlText = this.add.text(620, 30, '0', {font: '48px', fontFamily: 'Georgia, "Goudy Bookletter 1911", Times, serif', fill: '#fff'});
        nbvisitText = this.add.text(60, 1000, '0', {font: '40px', fontFamily: 'Georgia, "Goudy Bookletter 1911", Times, serif', fill: '#fff'});

        posXTest = this.add.text(2180, 40, '-', {font: '18px', fontFamily: 'Georgia, "Goudy Bookletter 1911", Times, serif', fill: '#fff'});
        posYTest = this.add.text(2180, 70, '-', {font: '18px', fontFamily: 'Georgia, "Goudy Bookletter 1911", Times, serif', fill: '#fff'});
        
        
        this.P = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.P);


    }
    update(){
        posXTest.setText(game.input.mousePointer.x);
        posYTest.setText(game.input.mousePointer.y);
        
        //PAS BESOIN DE MODIF JE PENSE (ce sera pas gardé de toute façon)
            //BAR XP
            if(this.P.isDown && switchP == false)
            {
                frameP = (frameP+1)%19;
                this.anim_xp.setFrame(frameP);
                //targetXP.setFrame(framePlus);
                switchP = true;
            }
            else if(this.P.isUp && switchP == true)
            {
                switchP = false;
            }   
    }
}

//##############################################################################################################
//##############################################################################################################
//###     MENU     ####     MENU     ####     MENU     ####     MENU     ####     MENU     ####     MENU     ###
//##############################################################################################################
//##############################################################################################################
class Menu extends Phaser.Scene{
    constructor () {
        super({ key:'Menu'});
    }
    create(){
        let xView = 0;
        let yView = 0;
        let xMask = 0;
        let yMask = 324;
        let widthMask = 2000;
        let heightMask = 560;

        // Ajoutez une zone d'affichage avec un masque pour définir la zone visible
        const viewport = this.add.container(xView, yView);
        viewport.depth = 12;
        const mask = this.add.graphics().fillRect(xMask, yMask, widthMask, heightMask);
        //const mask2 = this.add.graphics().fillRect(xMask, yMask, widthMask, heightMask);
        viewport.mask = new Phaser.Display.Masks.GeometryMask(this, mask);
        //viewport.mask2 = new Phaser.Display.Masks.GeometryMask(this, mask);


        this.menu0 = this.add.image(1214, 560, 'menu0');
        this.menu0.setScale(2);
        this.menu0.depth = 10;
        this.menu0.visible = false;
        
        this.menu1 = this.add.image(1220, 572, 'menu1');
        this.menu1.setScale(1.2);
        this.menu1.depth = 10;
        this.menu1.visible = false;
        //viewport.add(this.menu1);

        /* this.but_plus = this.add.image(1842, 808, 'butplus')
        .setInteractive({ useHandCursor: true })
        .on('pointerover', () => {
            this.but_plus.setScale(0.64);
        })
        .on('pointerout', () => {
            this.but_plus.setScale(0.6);
        });
        this.but_plus.setScale(0.6);
        this.but_plus.depth = 10;
        this.but_plus.visible = false;*/

        this.resume = this.add.image(1214, 360, 'resume');
        this.resume.setScale(1.46);
        this.resume.depth = 11;
        this.resume.visible = false;
        this.settings = this.add.image(1214, 570, 'settings');
        this.settings.setScale(0.52);
        this.settings.depth = 11;
        this.settings.visible = false;
        this.quit = this.add.image(1214, 780, 'quit');
        this.quit.setScale(1);
        this.quit.depth = 11;
        this.quit.visible = false;
        
        
        //===== TABLEAUX ANIMALS ===== TABLEAUX ANIMALS ===== TABLEAUX ANIMALS ===== TABLEAUX ANIMALS =====
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
        });
        this.animals[1].setScale(0.5);
        this.animals[1].depth = 11;
        this.animals[1].visible = false;
        viewport.add(this.animals[1]);
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
        });
        this.animals[2].setScale(0.5);
        this.animals[2].depth = 11;
        this.animals[2].visible = false;
        viewport.add(this.animals[2]);
        //animal 3
        this.animals[3] = this.add.image(750, 1060, 'suricate')
        .setInteractive({ useHandCursor: true })
        .on('pointerover', () => {
            this.animals[3].setTint(0xffaaff),
            this.animals[3].setScale(0.54);
        })
        .on('pointerout', () => {
            this.animals[3].setTint(0xffffff),
            this.animals[3].setScale(0.5);
        });
        this.animals[3].setScale(0.5);
        this.animals[3].depth = 11;
        this.animals[3].visible = false;
        viewport.add(this.animals[3]);
        //animal 4
        this.animals[4] = this.add.image(750, 1360, 'autruche')
        .setInteractive({ useHandCursor: true })
        .on('pointerover', () => {
            this.animals[4].setTint(0xffaaff),
            this.animals[4].setScale(0.54);
        })
        .on('pointerout', () => {
            this.animals[4].setTint(0xffffff),
            this.animals[4].setScale(0.5);
        });
        this.animals[4].setScale(0.5);
        this.animals[4].depth = 11;
        this.animals[4].visible = false;
        viewport.add(this.animals[4]);
        //animal 5
        this.animals[5] = this.add.image(750, 1660, 'fennec')
        .setInteractive({ useHandCursor: true })
        .on('pointerover', () => {
            this.animals[5].setTint(0xffaaff),
            this.animals[5].setScale(0.54);
        })
        .on('pointerout', () => {
            this.animals[5].setTint(0xffffff),
            this.animals[5].setScale(0.5);
        });
        this.animals[5].setScale(0.5);
        this.animals[5].depth = 11;
        this.animals[5].visible = false;
        viewport.add(this.animals[5]);
        //animal 6
        this.animals[6] = this.add.image(750, 460, 'elephant')
        .setInteractive({ useHandCursor: true })
        .on('pointerover', () => {
            this.animals[6].setTint(0xffaaff),
            this.animals[6].setScale(0.54);
        })
        .on('pointerout', () => {
            this.animals[6].setTint(0xffffff),
            this.animals[6].setScale(0.5);
        });
        this.animals[6].setScale(0.5);
        this.animals[6].depth = 11;
        this.animals[6].visible = false;
        viewport.add(this.animals[6]);
        //animal 7
        this.animals[7] = this.add.image(750, 760, 'rhino')
        .setInteractive({ useHandCursor: true })
        .on('pointerover', () => {
            this.animals[7].setTint(0xffaaff),
            this.animals[7].setScale(0.54);
        })
        .on('pointerout', () => {
            this.animals[7].setTint(0xffffff),
            this.animals[7].setScale(0.5);
        });
        this.animals[7].setScale(0.5);
        this.animals[7].depth = 11;
        this.animals[7].visible = false;
        viewport.add(this.animals[7]);
        //animal 8
        this.animals[8] = this.add.image(750, 460, 'hyene')
        .setInteractive({ useHandCursor: true })
        .on('pointerover', () => {
            this.animals[8].setTint(0xffaaff),
            this.animals[8].setScale(0.54);
        })
        .on('pointerout', () => {
            this.animals[8].setTint(0xffffff),
            this.animals[8].setScale(0.5);
        });
        this.animals[8].setScale(0.5);
        this.animals[8].depth = 11;
        this.animals[8].visible = false;
        viewport.add(this.animals[8]);
        //animal 9
        this.animals[9] = this.add.image(750, 760, 'serpent')
        .setInteractive({ useHandCursor: true })
        .on('pointerover', () => {
            this.animals[9].setTint(0xffaaff),
            this.animals[9].setScale(0.54);
        })
        .on('pointerout', () => {
            this.animals[9].setTint(0xffffff),
            this.animals[9].setScale(0.5);
        });
        this.animals[9].setScale(0.5);
        this.animals[9].depth = 11;
        this.animals[9].visible = false;
        viewport.add(this.animals[9]);
        //animal 10
        this.animals[10] = this.add.image(750, 1060, 'lion')
        .setInteractive({ useHandCursor: true })
        .on('pointerover', () => {
            this.animals[10].setTint(0xffaaff),
            this.animals[10].setScale(0.54);
        })
        .on('pointerout', () => {
            this.animals[10].setTint(0xffffff),
            this.animals[10].setScale(0.5);
        });
        this.animals[10].setScale(0.5);
        this.animals[10].depth = 11;
        this.animals[10].visible = false;
        viewport.add(this.animals[10]);
        //animal 11
        this.animals[11] = this.add.image(750, 1360, 'guepard')
        .setInteractive({ useHandCursor: true })
        .on('pointerover', () => {
            this.animals[11].setTint(0xffaaff),
            this.animals[11].setScale(0.54);
        })
        .on('pointerout', () => {
            this.animals[11].setTint(0xffffff),
            this.animals[11].setScale(0.5);
        });
        this.animals[11].setScale(0.5);
        this.animals[11].depth = 11;
        this.animals[11].visible = false;
        viewport.add(this.animals[11]);
        //animal 12
        this.animals[12] = this.add.image(750, 460, 'renne')
        .setInteractive({ useHandCursor: true })
        .on('pointerover', () => {
            this.animals[12].setTint(0xffaaff),
            this.animals[12].setScale(0.54);
        })
        .on('pointerout', () => {
            this.animals[12].setTint(0xffffff),
            this.animals[12].setScale(0.5);
        });
        this.animals[12].setScale(0.5);
        this.animals[12].depth = 11;
        this.animals[12].visible = false;
        viewport.add(this.animals[12]);
        //animal 13
        this.animals[13] = this.add.image(750, 760, 'elan')
        .setInteractive({ useHandCursor: true })
        .on('pointerover', () => {
            this.animals[13].setTint(0xffaaff),
            this.animals[13].setScale(0.54);
        })
        .on('pointerout', () => {
            this.animals[13].setTint(0xffffff),
            this.animals[13].setScale(0.5);
        });
        this.animals[13].setScale(0.5);
        this.animals[13].depth = 11;
        this.animals[13].visible = false;
        viewport.add(this.animals[13]);
        //animal 14
        this.animals[14] = this.add.image(750, 460, 'paresseux')
        .setInteractive({ useHandCursor: true })
        .on('pointerover', () => {
            this.animals[14].setTint(0xffaaff),
            this.animals[14].setScale(0.54);
        })
        .on('pointerout', () => {
            this.animals[14].setTint(0xffffff),
            this.animals[14].setScale(0.5);
        });
        this.animals[14].setScale(0.5);
        this.animals[14].depth = 11;
        this.animals[14].visible = false;
        viewport.add(this.animals[14]);
        //animal 15
        this.animals[15] = this.add.image(750, 760, 'chimpanze')
        .setInteractive({ useHandCursor: true })
        .on('pointerover', () => {
            this.animals[15].setTint(0xffaaff),
            this.animals[15].setScale(0.54);
        })
        .on('pointerout', () => {
            this.animals[15].setTint(0xffffff),
            this.animals[15].setScale(0.5);
        });
        this.animals[15].setScale(0.5);
        this.animals[15].depth = 11;
        this.animals[15].visible = false;
        viewport.add(this.animals[15]);
        //animal 16
        this.animals[16] = this.add.image(750, 1060, 'lemurien')
        .setInteractive({ useHandCursor: true })
        .on('pointerover', () => {
            this.animals[16].setTint(0xffaaff),
            this.animals[16].setScale(0.54);
        })
        .on('pointerout', () => {
            this.animals[16].setTint(0xffffff),
            this.animals[16].setScale(0.5);
        });
        this.animals[16].setScale(0.5);
        this.animals[16].depth = 11;
        this.animals[16].visible = false;
        viewport.add(this.animals[16]);
        //animal 17
        this.animals[17] = this.add.image(750, 1360, 'koala')
        .setInteractive({ useHandCursor: true })
        .on('pointerover', () => {
            this.animals[17].setTint(0xffaaff),
            this.animals[17].setScale(0.54);
        })
        .on('pointerout', () => {
            this.animals[17].setTint(0xffffff),
            this.animals[17].setScale(0.5);
        });
        this.animals[17].setScale(0.5);
        this.animals[17].depth = 11;
        this.animals[17].visible = false;
        viewport.add(this.animals[17]);
        //animal 18
        this.animals[18] = this.add.image(750, 1660, 'panda_roux')
        .setInteractive({ useHandCursor: true })
        .on('pointerover', () => {
            this.animals[18].setTint(0xffaaff),
            this.animals[18].setScale(0.54);
        })
        .on('pointerout', () => {
            this.animals[18].setTint(0xffffff),
            this.animals[18].setScale(0.5);
        });
        this.animals[18].setScale(0.5);
        this.animals[18].depth = 11;
        this.animals[18].visible = false;
        viewport.add(this.animals[18]);
        //animal 19
        this.animals[19] = this.add.image(750, 1960, 'gorille')
        .setInteractive({ useHandCursor: true })
        .on('pointerover', () => {
            this.animals[19].setTint(0xffaaff),
            this.animals[19].setScale(0.54);
        })
        .on('pointerout', () => {
            this.animals[19].setTint(0xffffff),
            this.animals[19].setScale(0.5);
        });
        this.animals[19].setScale(0.5);
        this.animals[19].depth = 11;
        this.animals[19].visible = false;
        viewport.add(this.animals[19]);
        //animal 20
        this.animals[20] = this.add.image(750, 2260, 'panda')
        .setInteractive({ useHandCursor: true })
        .on('pointerover', () => {
            this.animals[20].setTint(0xffaaff),
            this.animals[20].setScale(0.54);
        })
        .on('pointerout', () => {
            this.animals[20].setTint(0xffffff),
            this.animals[20].setScale(0.5);
        });
        this.animals[20].setScale(0.5);
        this.animals[20].depth = 11;
        this.animals[20].visible = false;
        viewport.add(this.animals[20]);
        //animal 21
        this.animals[21] = this.add.image(750, 460, 'loup')
        .setInteractive({ useHandCursor: true })
        .on('pointerover', () => {
            this.animals[21].setTint(0xffaaff),
            this.animals[21].setScale(0.54);
        })
        .on('pointerout', () => {
            this.animals[21].setTint(0xffffff),
            this.animals[21].setScale(0.5);
        });
        this.animals[21].setScale(0.5);
        this.animals[21].depth = 11;
        this.animals[21].visible = false;
        viewport.add(this.animals[21]);
        //animal 22
        this.animals[22] = this.add.image(750, 760, 'leopard')
        .setInteractive({ useHandCursor: true })
        .on('pointerover', () => {
            this.animals[22].setTint(0xffaaff),
            this.animals[22].setScale(0.54);
        })
        .on('pointerout', () => {
            this.animals[22].setTint(0xffffff),
            this.animals[22].setScale(0.5);
        });
        this.animals[22].setScale(0.5);
        this.animals[22].depth = 11;
        this.animals[22].visible = false;
        viewport.add(this.animals[22]);
        //animal 23
        this.animals[23] = this.add.image(750, 1060, 'panthere')
        .setInteractive({ useHandCursor: true })
        .on('pointerover', () => {
            this.animals[23].setTint(0xffaaff),
            this.animals[23].setScale(0.54);
        })
        .on('pointerout', () => {
            this.animals[23].setTint(0xffffff),
            this.animals[23].setScale(0.5);
        });
        this.animals[23].setScale(0.5);
        this.animals[23].depth = 11;
        this.animals[23].visible = false;
        viewport.add(this.animals[23]);
        //animal 24
        this.animals[24] = this.add.image(750, 1360, 'ours')
        .setInteractive({ useHandCursor: true })
        .on('pointerover', () => {
            this.animals[24].setTint(0xffaaff),
            this.animals[24].setScale(0.54);
        })
        .on('pointerout', () => {
            this.animals[24].setTint(0xffffff),
            this.animals[24].setScale(0.5);
        });
        this.animals[24].setScale(0.5);
        this.animals[24].depth = 11;
        this.animals[24].visible = false;
        viewport.add(this.animals[24]);
        //animal 25
        this.animals[25] = this.add.image(750, 1660, 'tigre')
        .setInteractive({ useHandCursor: true })
        .on('pointerover', () => {
            this.animals[25].setTint(0xffaaff),
            this.animals[25].setScale(0.54);
        })
        .on('pointerout', () => {
            this.animals[25].setTint(0xffffff),
            this.animals[25].setScale(0.5);
        });
        this.animals[25].setScale(0.5);
        this.animals[25].depth = 11;
        this.animals[25].visible = false;
        viewport.add(this.animals[25]);
        //animal 26
        this.animals[26] = this.add.image(750, 460, 'chevre')
        .setInteractive({ useHandCursor: true })
        .on('pointerover', () => {
            this.animals[26].setTint(0xffaaff),
            this.animals[26].setScale(0.54);
        })
        .on('pointerout', () => {
            this.animals[26].setTint(0xffffff),
            this.animals[26].setScale(0.5);
        });
        this.animals[26].setScale(0.5);
        this.animals[26].depth = 11;
        this.animals[26].visible = false;
        viewport.add(this.animals[26]);
        //animal 27
        this.animals[27] = this.add.image(750, 760, 'mouton')
        .setInteractive({ useHandCursor: true })
        .on('pointerover', () => {
            this.animals[27].setTint(0xffaaff),
            this.animals[27].setScale(0.54);
        })
        .on('pointerout', () => {
            this.animals[27].setTint(0xffffff),
            this.animals[27].setScale(0.5);
        });
        this.animals[27].setScale(0.5);
        this.animals[27].depth = 11;
        this.animals[27].visible = false;
        viewport.add(this.animals[27]);
        //animal 28
        this.animals[28] = this.add.image(750, 1060, 'alpaga')
        .setInteractive({ useHandCursor: true })
        .on('pointerover', () => {
            this.animals[28].setTint(0xffaaff),
            this.animals[28].setScale(0.54);
        })
        .on('pointerout', () => {
            this.animals[28].setTint(0xffffff),
            this.animals[28].setScale(0.5);
        });
        this.animals[28].setScale(0.5);
        this.animals[28].depth = 11;
        this.animals[28].visible = false;
        viewport.add(this.animals[28]);
        //animal 29
        this.animals[29] = this.add.image(750, 1360, 'paon')
        .setInteractive({ useHandCursor: true })
        .on('pointerover', () => {
            this.animals[29].setTint(0xffaaff),
            this.animals[29].setScale(0.54);
        })
        .on('pointerout', () => {
            this.animals[29].setTint(0xffffff),
            this.animals[29].setScale(0.5);
        });
        this.animals[29].setScale(0.5);
        this.animals[29].depth = 11;
        this.animals[29].visible = false;
        viewport.add(this.animals[29]);
        //animal 30
        this.animals[30] = this.add.image(750, 1660, 'dodo')
        .setInteractive({ useHandCursor: true })
        .on('pointerover', () => {
            this.animals[30].setTint(0xffaaff),
            this.animals[30].setScale(0.54);
        })
        .on('pointerout', () => {
            this.animals[30].setTint(0xffffff),
            this.animals[30].setScale(0.5);
        });
        this.animals[30].setScale(0.5);
        this.animals[30].depth = 11;
        this.animals[30].visible = false;
        viewport.add(this.animals[30]);
        //animal 31
        this.animals[31] = this.add.image(750, 460, 'bison')
        .setInteractive({ useHandCursor: true })
        .on('pointerover', () => {
            this.animals[31].setTint(0xffaaff),
            this.animals[31].setScale(0.54);
        })
        .on('pointerout', () => {
            this.animals[31].setTint(0xffffff),
            this.animals[31].setScale(0.5);
        });
        this.animals[31].setScale(0.5);
        this.animals[31].depth = 11;
        this.animals[31].visible = false;
        viewport.add(this.animals[31]);
        //animal 32
        this.animals[32] = this.add.image(750, 760, 'bouquetin')
        .setInteractive({ useHandCursor: true })
        .on('pointerover', () => {
            this.animals[32].setTint(0xffaaff),
            this.animals[32].setScale(0.54);
        })
        .on('pointerout', () => {
            this.animals[32].setTint(0xffffff),
            this.animals[32].setScale(0.5);
        });
        this.animals[32].setScale(0.5);
        this.animals[32].depth = 11;
        this.animals[32].visible = false;
        viewport.add(this.animals[32]);
        //animal 33
        this.animals[33] = this.add.image(750, 1060, 'ane')
        .setInteractive({ useHandCursor: true })
        .on('pointerover', () => {
            this.animals[33].setTint(0xffaaff),
            this.animals[33].setScale(0.54);
        })
        .on('pointerout', () => {
            this.animals[33].setTint(0xffffff),
            this.animals[33].setScale(0.5);
        });
        this.animals[33].setScale(0.5);
        this.animals[33].depth = 11;
        this.animals[33].visible = false;
        viewport.add(this.animals[33]);
        //animal 34
        this.animals[34] = this.add.image(750, 460, 'loutre')
        .setInteractive({ useHandCursor: true })
        .on('pointerover', () => {
            this.animals[34].setTint(0xffaaff),
            this.animals[34].setScale(0.54);
        })
        .on('pointerout', () => {
            this.animals[34].setTint(0xffffff),
            this.animals[34].setScale(0.5);
        });
        this.animals[34].setScale(0.5);
        this.animals[34].depth = 11;
        this.animals[34].visible = false;
        viewport.add(this.animals[34]);
        //animal 35
        this.animals[35] = this.add.image(750, 760, 'otarie')
        .setInteractive({ useHandCursor: true })
        .on('pointerover', () => {
            this.animals[35].setTint(0xffaaff),
            this.animals[35].setScale(0.54);
        })
        .on('pointerout', () => {
            this.animals[35].setTint(0xffffff),
            this.animals[35].setScale(0.5);
        });
        this.animals[35].setScale(0.5);
        this.animals[35].depth = 11;
        this.animals[35].visible = false;
        viewport.add(this.animals[35]);
        //animal 36
        this.animals[36] = this.add.image(750, 1060, 'tortue')
        .setInteractive({ useHandCursor: true })
        .on('pointerover', () => {
            this.animals[36].setTint(0xffaaff),
            this.animals[36].setScale(0.54);
        })
        .on('pointerout', () => {
            this.animals[36].setTint(0xffffff),
            this.animals[36].setScale(0.5);
        });
        this.animals[36].setScale(0.5);
        this.animals[36].depth = 11;
        this.animals[36].visible = false;
        viewport.add(this.animals[36]);
        //animal 37
        this.animals[37] = this.add.image(750, 460, 'crocodile')
        .setInteractive({ useHandCursor: true })
        .on('pointerover', () => {
            this.animals[37].setTint(0xffaaff),
            this.animals[37].setScale(0.54);
        })
        .on('pointerout', () => {
            this.animals[37].setTint(0xffffff),
            this.animals[37].setScale(0.5);
        });
        this.animals[37].setScale(0.5);
        this.animals[37].depth = 11;
        this.animals[37].visible = false;
        viewport.add(this.animals[37]);
        //animal 38
        this.animals[38] = this.add.image(750, 760, 'hippo')
        .setInteractive({ useHandCursor: true })
        .on('pointerover', () => {
            this.animals[38].setTint(0xffaaff),
            this.animals[38].setScale(0.54);
        })
        .on('pointerout', () => {
            this.animals[38].setTint(0xffffff),
            this.animals[38].setScale(0.5);
        });
        this.animals[38].setScale(0.5);
        this.animals[38].depth = 11;
        this.animals[38].visible = false;
        viewport.add(this.animals[38]);
        //animal 39
        this.animals[39] = this.add.image(750, 460, 'requin')
        .setInteractive({ useHandCursor: true })
        .on('pointerover', () => {
            this.animals[39].setTint(0xffaaff),
            this.animals[39].setScale(0.54);
        })
        .on('pointerout', () => {
            this.animals[39].setTint(0xffffff),
            this.animals[39].setScale(0.5);
        });
        this.animals[39].setScale(0.5);
        this.animals[39].depth = 11;
        this.animals[39].visible = false;
        viewport.add(this.animals[39]);
        //animal 40
        this.animals[40] = this.add.image(750, 760, 'baleine')
        .setInteractive({ useHandCursor: true })
        .on('pointerover', () => {
            this.animals[40].setTint(0xffaaff),
            this.animals[40].setScale(0.54);
        })
        .on('pointerout', () => {
            this.animals[40].setTint(0xffffff),
            this.animals[40].setScale(0.5);
        });
        this.animals[40].setScale(0.5);
        this.animals[40].depth = 11;
        this.animals[40].visible = false;
        viewport.add(this.animals[40]);
        //animal 41
        this.animals[41] = this.add.image(750, 1060, 'orque')
        .setInteractive({ useHandCursor: true })
        .on('pointerover', () => {
            this.animals[41].setTint(0xffaaff),
            this.animals[41].setScale(0.54);
        })
        .on('pointerout', () => {
            this.animals[41].setTint(0xffffff),
            this.animals[41].setScale(0.5);
        });
        this.animals[41].setScale(0.5);
        this.animals[41].depth = 11;
        this.animals[41].visible = false;
        viewport.add(this.animals[41]);
        //animal 42
        this.animals[42] = this.add.image(750, 460, 'dauphin')
        .setInteractive({ useHandCursor: true })
        .on('pointerover', () => {
            this.animals[42].setTint(0xffaaff),
            this.animals[42].setScale(0.54);
        })
        .on('pointerout', () => {
            this.animals[42].setTint(0xffffff),
            this.animals[42].setScale(0.5);
        });
        this.animals[42].setScale(0.5);
        this.animals[42].depth = 11;
        this.animals[42].visible = false;
        viewport.add(this.animals[42]);
        //animal 43
        this.animals[43] = this.add.image(750, 760, 'raie')
        .setInteractive({ useHandCursor: true })
        .on('pointerover', () => {
            this.animals[43].setTint(0xffaaff),
            this.animals[43].setScale(0.54);
        })
        .on('pointerout', () => {
            this.animals[43].setTint(0xffffff),
            this.animals[43].setScale(0.5);
        });
        this.animals[43].setScale(0.5);
        this.animals[43].depth = 11;
        this.animals[43].visible = false;
        viewport.add(this.animals[43]);
        //animal 44
        this.animals[44] = this.add.image(750, 1060, 'beluga')
        .setInteractive({ useHandCursor: true })
        .on('pointerover', () => {
            this.animals[44].setTint(0xffaaff),
            this.animals[44].setScale(0.54);
        })
        .on('pointerout', () => {
            this.animals[44].setTint(0xffffff),
            this.animals[44].setScale(0.5);
        });
        this.animals[44].setScale(0.5);
        this.animals[44].depth = 11;
        this.animals[44].visible = false;
        viewport.add(this.animals[44]);
        //animal 45
        this.animals[45] = this.add.image(750, 1360, 'narval')
        .setInteractive({ useHandCursor: true })
        .on('pointerover', () => {
            this.animals[45].setTint(0xffaaff),
            this.animals[45].setScale(0.54);
        })
        .on('pointerout', () => {
            this.animals[45].setTint(0xffffff),
            this.animals[45].setScale(0.5);
        });
        this.animals[45].setScale(0.5);
        this.animals[45].depth = 11;
        this.animals[45].visible = false;
        viewport.add(this.animals[45]);
        //animal 46
        this.animals[46] = this.add.image(750, 460, 'renard')
        .setInteractive({ useHandCursor: true })
        .on('pointerover', () => {
            this.animals[46].setTint(0xffaaff),
            this.animals[46].setScale(0.54);
        })
        .on('pointerout', () => {
            this.animals[46].setTint(0xffffff),
            this.animals[46].setScale(0.5);
        });
        this.animals[46].setScale(0.5);
        this.animals[46].depth = 11;
        this.animals[46].visible = false;
        viewport.add(this.animals[46]);
        //animal 47
        this.animals[47] = this.add.image(750, 760, 'manchot')
        .setInteractive({ useHandCursor: true })
        .on('pointerover', () => {
            this.animals[47].setTint(0xffaaff),
            this.animals[47].setScale(0.54);
        })
        .on('pointerout', () => {
            this.animals[47].setTint(0xffffff),
            this.animals[47].setScale(0.5);
        });
        this.animals[47].setScale(0.5);
        this.animals[47].depth = 11;
        this.animals[47].visible = false;
        viewport.add(this.animals[47]);
        //animal 48
        this.animals[48] = this.add.image(750, 460, 'morse')
        .setInteractive({ useHandCursor: true })
        .on('pointerover', () => {
            this.animals[48].setTint(0xffaaff),
            this.animals[48].setScale(0.54);
        })
        .on('pointerout', () => {
            this.animals[48].setTint(0xffffff),
            this.animals[48].setScale(0.5);
        });
        this.animals[48].setScale(0.5);
        this.animals[48].depth = 11;
        this.animals[48].visible = false;
        viewport.add(this.animals[48]);
        //animal 49
        this.animals[49] = this.add.image(750, 760, 'lion_mer')
        .setInteractive({ useHandCursor: true })
        .on('pointerover', () => {
            this.animals[49].setTint(0xffaaff),
            this.animals[49].setScale(0.54);
        })
        .on('pointerout', () => {
            this.animals[49].setTint(0xffffff),
            this.animals[49].setScale(0.5);
        });
        this.animals[49].setScale(0.5);
        this.animals[49].depth = 11;
        this.animals[49].visible = false;
        viewport.add(this.animals[49]);
        //animal 50
        this.animals[50] = this.add.image(750, 1060, 'ours_polaire')
        .setInteractive({ useHandCursor: true })
        .on('pointerover', () => {
            this.animals[50].setTint(0xffaaff),
            this.animals[50].setScale(0.54);
        })
        .on('pointerout', () => {
            this.animals[50].setTint(0xffffff),
            this.animals[50].setScale(0.5);
        });
        this.animals[50].setScale(0.5);
        this.animals[50].depth = 11;
        this.animals[50].visible = false;
        viewport.add(this.animals[50]);




        //perso version animal 101-104
        this.animals[101] = this.add.image(750, 400, 'perso1')
        .setInteractive({ useHandCursor: true })
        .on('pointerover', () => { console.log("yolo"); });
        this.animals[101].setScale(0.26);
        this.animals[101].depth = 11;
        this.animals[101].visible = false;
        this.animals[102] = this.add.image(750, 760, 'perso2')
        .setInteractive({ useHandCursor: true })
        .on('pointerover', () => { console.log("yolo"); });
        this.animals[102].setScale(0.26);
        this.animals[102].depth = 11;
        this.animals[102].visible = false;
        this.animals[103] = this.add.image(750, 1060, 'perso3')
        .setInteractive({ useHandCursor: true })
        .on('pointerover', () => { console.log("yolo"); });
        this.animals[103].setScale(0.26);
        this.animals[103].depth = 11;
        this.animals[103].visible = false;
        this.animals[104] = this.add.image(750, 1360, 'perso4')
        .setInteractive({ useHandCursor: true })
        .on('pointerover', () => { console.log("yolo"); });
        this.animals[104].setScale(0.26);
        this.animals[104].depth = 11;
        this.animals[104].visible = false;
        
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
        this.M = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.M);

    //|||| DEBUT WHEEL |||| DEBUT WHEEL |||| DEBUT WHEEL |||| DEBUT WHEEL |||| DEBUT WHEEL |||| DEBUT WHEEL ||||
        let indiceWheel = 0;
        let indiceNb = 0;
        let multiplicateur = 0;
        this.input.on("wheel", function (pointer, gameObjects, deltaX, deltaY, deltaZ) {
            if(this.animals[1].visible == true){
                indiceWheel = 1;
                indiceNb = 5; //on affiche que les 5 premiers
            }
            else if(this.animals[6].visible == true){
                indiceWheel = 6;
                indiceNb = 2;
            }
            else if(this.animals[8].visible == true){
                indiceWheel = 8;
                indiceNb = 4;
            }
            else if(this.animals[12].visible == true){
                indiceWheel = 12;
                indiceNb = 2;
            }
            else if(this.animals[14].visible == true){
                indiceWheel = 14;
                indiceNb = 7;
            }
            else if(this.animals[21].visible == true){
                indiceWheel = 21;
                indiceNb = 5;
            }
            else if(this.animals[26].visible == true){
                indiceWheel = 26;
                indiceNb = 5;
            }
            else if(this.animals[31].visible == true){
                indiceWheel = 31;
                indiceNb = 3;
            }
            else if(this.animals[34].visible == true){
                indiceWheel = 34;
                indiceNb = 3;
            }
            else if(this.animals[37].visible == true){
                indiceWheel = 37;
                indiceNb = 2;
            }
            else if(this.animals[39].visible == true){
                indiceWheel = 39;
                indiceNb = 3;
            }
            else if(this.animals[42].visible == true){
                indiceWheel = 42;
                indiceNb = 4;
            }
            else if(this.animals[46].visible == true){
                indiceWheel = 46;
                indiceNb = 2;
            }
            else if(this.animals[48].visible == true){
                indiceWheel = 48;
                indiceNb = 3;
            }
            else if(this.animals[111].visible == true){
                indiceWheel = 111;
                indiceNb = 4;
            }
            //wheel
            if(this.menu0.visible == false && opened == true && this.animals[indiceWheel].visible == true){
                console.log(deltaY);
                if(deltaY < 0 && this.animals[indiceWheel].y > 450){
                    for(let i = indiceWheel; i < indiceWheel+indiceNb; i++){
                        this.animals[i].y = 460 + 300*multiplicateur;
                        multiplicateur++;
                    }
                    multiplicateur = 0;
                }
                else if(deltaY > 0 && this.animals[indiceWheel+indiceNb-1].y < 470){
                    for(let i = indiceWheel; i < indiceWheel+indiceNb; i++){
                        this.animals[i].y = (460-300*(indiceNb-1)) + 300*multiplicateur;
                        multiplicateur++;
                    }
                    multiplicateur = 0;
                }
                else{
                    for(let i = indiceWheel; i < indiceWheel+indiceNb; i++){
                        this.animals[i].y -= deltaY;
                    }
                }
            }
        }, this);

    }
    update(){
        
        atm = this;
        hell.then(function(value) {
            //console.log(value);
            //console.log(time);

            if(charger == false){
                //console.log(value);
                charger = true;
                animaux = value.animaux;
                hashtags = value.hashtags;
                visiteurs = value.visiteurs;
                save  = db_save_into_tab(value.last_save);
                /*console.log(animaux);
                console.log(hashtags);
                console.log(save);
                console.log("visiteurs");
                console.log(visiteurs);*/
                //parcours les animaux
                for(let i = 0; i < animaux.length; i++){
                    for(let j =0 ; j<hashtags.length; j++){
                        if(animaux[i].nom.toLowerCase()==hashtags[j].hashtag.toLowerCase()){
                            animaux[i].popularite+=50*hashtags[j].number;
                            //console.log(animaux[i]);
                        }
                    }
                coins = save.coins;
                }
            }

            if(compteurtick2 == 0){
                xps = (xps+100)%1000;
                coinText.setText(coins);
                nbvisitText.setText(nbvisit);
                xpText.setText(xps + ' / 1000');
                if(xps == 0){
                    level++;
                    lvlText.setText(level);
                }
    
                [nbanimaux,popularitetot] = popularitetot_nbanimaux(save);
                //console.log(nbanimaux,popularitetot);
                nbvisit = gain_visiteur(nbanimaux,popularitetot);
                //console.log(nbvisit,nbanimaux,popularitetot);
                const gaintemp = gain_argent(nbvisit,nbanimaux,popularitetot)-depensee(save,animaux);
                //console.log("bénef : ", gaintemp);
                coins += gaintemp;
                //console.log("coins : ", coins);
                //console.log("nbvist : ", nbvisit);
            }
            compteurtick2 = (compteurtick2+1)%10;
            
            
            if(opened == false){
                for(let i = 1; i < 9; i++){
                    atm.animals[i].visible = false;
                }
            }
            
            //######## GESTION TOUCHES/CLICKS AVEC VARIABLES ######## GESTION TOUCHES/CLICKS AVEC VARIABLES ########
            
            // ====== AFFICHAGE FENETRES avec switch ====== AFFICHAGE FENETRES avec switch ======
            //MENU ECHAP
            if(atm.echap.isDown && switchEchap == false)
            {
                if(atm.menu0.visible == false && opened == true){
                    atm.menu1.visible = false;
                    //atm.but_plus.visible = false;
                    for(let i = 111; i < 115; i++){
                        atm.animals[i].visible = false;
                    }
                    for(let i = 101; i < 105; i++){
                        atm.animals[i].visible = false;
                    }
                    for(let i = 1; i < 51; i++){
                        atm.animals[i].visible = false;
                    }
                    switchEchap = true;
                    opened = false;
                }
                else if(atm.menu0.visible == false){
                    atm.menu0.visible = true;
                    atm.resume.visible = true;
                    atm.settings.visible = true;
                    atm.quit.visible = true;
                    switchEchap = true;
                    opened = true;
                }
                else{
                    atm.menu0.visible = false;
                    atm.resume.visible = false;
                    atm.settings.visible = false;
                    atm.quit.visible = false;
                    switchEchap = true;
                    opened = false;
                }
            }
            else if(atm.echap.isUp && switchEchap == true)
            {
                switchEchap = false;
            }
            
            //MENU PERSONNEL
            /*if(atm.M.isDown && switchM == false)
            {
                if(atm.menu1.visible == false && opened == false)
                {
                    atm.menu1.visible = true;
                    //atm.but_plus.visible = true;
                    for(let i = 101; i < 105; i++){
                        atm.animals[i].visible = true;
                    }
                    switchM = true;
                    opened = true;
                }
                else
                {
                    atm.menu1.visible = false;
                    //atm.but_plus.visible = false;
                    for(let i = 101; i < 105; i++){
                        atm.animals[i].visible = false;
                    }
                    switchM = true;
                    opened = false;
                }
            }
            else if(atm.M.isUp && switchM == true)
            {
                switchM = false;
            }*/

//$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$
//$$$$$ ENCLOS ANIMAUX $$$$$ ENCLOS ANIMAUX $$$$$ ENCLOS ANIMAUX $$$$$ ENCLOS ANIMAUX $$$$$ ENCLOS ANIMAUX $$$$$
//$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$
        //MENU ENCLOS1
            if(enclos1 == true){
                if(opened == false){
                    atm.menu1.visible = true;
                    //atm.but_plus.visible = true;
                    for(let i = 1; i < 6; i++){
                        atm.animals[i].visible = true;
                    }
                    opened = true;
                }
                enclos1 = false;
            }
        //MENU ENCLOS2
            if(enclos2 == true){
                if(opened == false){
                    atm.menu1.visible = true;
                    //atm.but_plus.visible = true;
                    for(let i = 6; i < 8; i++){
                        atm.animals[i].visible = true;
                    }
                    opened = true;
                }
                enclos2 = false;
            }
        //MENU ENCLOS3
            if(enclos3 == true){
                if(opened == false){
                    atm.menu1.visible = true;
                    //atm.but_plus.visible = true;
                    for(let i = 8; i < 12; i++){
                        atm.animals[i].visible = true;
                    }
                    opened = true;
                }
                enclos3 = false;
            }
        //MENU ENCLOS4
            if(enclos4 == true){
                if(opened == false){
                    atm.menu1.visible = true;
                    //atm.but_plus.visible = true;
                    for(let i = 12; i < 14; i++){
                        atm.animals[i].visible = true;
                    }
                    opened = true;
                }
                enclos4 = false;
            }
        //MENU ENCLOS5
            if(enclos5 == true){
                if(opened == false){
                    atm.menu1.visible = true;
                    //atm.but_plus.visible = true;
                    for(let i = 14; i < 21; i++){
                        atm.animals[i].visible = true;
                    }
                    opened = true;
                }
                enclos5 = false;
            }
        //MENU ENCLOS6
            if(enclos6 == true){
                if(opened == false){
                    atm.menu1.visible = true;
                    //atm.but_plus.visible = true;
                    for(let i = 21; i < 26; i++){
                        atm.animals[i].visible = true;
                    }
                    opened = true;
                }
                enclos6 = false;
            }
        //MENU ENCLOS7
            if(enclos7 == true){
                if(opened == false){
                    atm.menu1.visible = true;
                    //atm.but_plus.visible = true;
                    for(let i = 26; i < 31; i++){
                        atm.animals[i].visible = true;
                    }
                    opened = true;
                }
                enclos7 = false;
            }
        //MENU ENCLOS8
            if(enclos8 == true){
                if(opened == false){
                    atm.menu1.visible = true;
                    //atm.but_plus.visible = true;
                    for(let i = 31; i < 34; i++){
                        atm.animals[i].visible = true;
                    }
                    opened = true;
                }
                enclos8 = false;
            }
        //MENU ENCLOS9
            if(enclos9 == true){
                if(opened == false){
                    atm.menu1.visible = true;
                    //atm.but_plus.visible = true;
                    for(let i = 34; i < 37; i++){
                        atm.animals[i].visible = true;
                    }
                    opened = true;
                }
                enclos9 = false;
            }
        //MENU ENCLOS10
            if(enclos10 == true)
            {
                if(opened == false){
                    atm.menu1.visible = true;
                    //atm.but_plus.visible = true;
                    for(let i = 37; i < 39; i++){
                        atm.animals[i].visible = true;
                    }
                    /*for(let i = 111; i < 115; i++){
                        atm.animals[i].visible = true;
                    }*/
                    opened = true;
                }
                enclos10 = false;
            }
        //MENU ENCLOS11
            if(enclos11 == true){
                if(opened == false){
                    atm.menu1.visible = true;
                    //atm.but_plus.visible = true;
                    for(let i = 39; i < 42; i++){
                        atm.animals[i].visible = true;
                    }
                    opened = true;
                }
                enclos11 = false;
            }
        //MENU ENCLOS12
            if(enclos12 == true){
                if(opened == false){
                    atm.menu1.visible = true;
                    //atm.but_plus.visible = true;
                    for(let i = 42; i < 46; i++){
                        atm.animals[i].visible = true;
                    }
                    opened = true;
                }
                enclos12 = false;
            }
        //MENU ENCLOS13
            if(enclos13 == true){
                if(opened == false){
                    atm.menu1.visible = true;
                    //atm.but_plus.visible = true;
                    for(let i = 46; i < 48; i++){
                        atm.animals[i].visible = true;
                    }
                    opened = true;
                }
                enclos13 = false;
            }
        //MENU ENCLOS14
            if(enclos14 == true){
                if(opened == false){
                    atm.menu1.visible = true;
                    //atm.but_plus.visible = true;
                    for(let i = 48; i < 51; i++){
                        atm.animals[i].visible = true;
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
    parent : 'big-head',
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
        HUD,
        Menu
    ],
    physics: {
        default : "arcade",
        arcade : {
            debug: false,
            gravity : {y: 0},
        }
    }
};

let game = new Phaser.Game(config);

