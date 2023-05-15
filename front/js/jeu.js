
// ==== VARIABLES ==== VARIABLES ==== VARIABLES ==== VARIABLES ==== VARIABLES ==== VARIABLES ====
let nbanimaux;
let charger = false;
let animaux;
let hashtags;
let save;
let visiteurs;
let popularitetot;

var compteurtick2 = 0;
var random = 0;
let posXTest = "";
let posYTest = "";
let stepCam = 1;
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
let mynthos = false;
let bois = false;
let sava = false;
let glace = false;
let atm;


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
//##     SCENES     ##     SCENES     ##     SCENES     ##     SCENES     ##     SCENES     ##     SCENES     ##
//##############################################################################################################
//##############################################################################################################
class Boot extends Phaser.Scene {
    constructor () {
        super({ key:'Boot'});
    }

    preload(){
        this.load.image('player','../img/Prof_Tilleul.png', { frameWidth: 32, frameHeight: 48 });
        //this.load.image('background','../img/map_zoo.png', { frameWidth: 32, frameHeight: 48 });
        
        this.load.image('coin','../img/coin.png', { frameWidth: 32, frameHeight: 48 });
        this.load.spritesheet('xps','../img/sprite_bar_xp.png', { frameWidth: 700, frameHeight: 17 });
        this.load.image('menu0','../img/menu_bleu.png', { frameWidth: 32, frameHeight: 48 });
        this.load.image('resume','../img/resume.png', { frameWidth: 32, frameHeight: 48 });
        this.load.image('settings','../img/settings.png', { frameWidth: 32, frameHeight: 48 });
        this.load.image('quit','../img/quit.png', { frameWidth: 32, frameHeight: 48 });
        this.load.image('menu1','../img/HUD_enclos.png', { frameWidth: 32, frameHeight: 48 });
        this.load.image('butplus','../img/HUD_bouton_plus.png', { frameWidth: 32, frameHeight: 48 });
        
        this.load.image('perso1','../img/perso1.png', { frameWidth: 32, frameHeight: 48 });
        this.load.image('perso2','../img/perso2.png', { frameWidth: 32, frameHeight: 48 });
        this.load.image('perso3','../img/perso3.png', { frameWidth: 32, frameHeight: 48 });
        this.load.image('perso4','../img/perso4.png', { frameWidth: 32, frameHeight: 48 });
        
        this.load.image('myn1','../img/mynthos1.jpg', { frameWidth: 32, frameHeight: 48 });
        this.load.image('myn2','../img/mynthos2.jpg', { frameWidth: 32, frameHeight: 48 });
        this.load.image('myn3','../img/mynthos3.jpg', { frameWidth: 32, frameHeight: 48 });
        this.load.image('myn4','../img/mynthos4.jpg', { frameWidth: 32, frameHeight: 48 });
        
        this.load.image('nicotine','../img/nicotine.png', { frameWidth: 32, frameHeight: 48 });
        
        this.load.image('koala','../img/koala.png', { frameWidth: 32, frameHeight: 48 });
        this.load.image('panda','../img/panda.png', { frameWidth: 32, frameHeight: 48 });
        this.load.image('panda_roux','../img/panda_roux.png', { frameWidth: 32, frameHeight: 48 });
        this.load.image('renne','../img/renne.png', { frameWidth: 32, frameHeight: 48 });
        this.load.image('fennec','../img/fennec.png', { frameWidth: 32, frameHeight: 48 });
        this.load.image('girafe','../img/girafe.png', { frameWidth: 32, frameHeight: 48 });
        this.load.image('manchot','../img/manchot.png', { frameWidth: 32, frameHeight: 48 });
        this.load.image('paon','../img/paon.png', { frameWidth: 32, frameHeight: 48 });
        
        this.load.image("base_tile",'../map/tile.png',{ frameWidth: 32, frameHeight: 32 });
        this.load.tilemapTiledJSON('mapData','../map/map_m.tmj', { frameWidth: 32, frameHeight: 48 });
    }
    create(){
        this.scene.start('Game');
        this.scene.start('HUD');
        this.scene.start('Menu');
    }
    update(){
        
    }
}

class Game extends Phaser.Scene{
    constructor () {
        super({ key:'Game'});
    }
    create(){
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
                }
                else if(tile.x <= 21 && tile.y <= 55){
                    console.log('plaine gauche');
                }
                else if(tile.x <= 78 && tile.y <= 20){
                    console.log('vase');
                    mynthos = true;
                }
                else if(tile.x <= 55 && tile.y <= 55){
                    console.log('eau haut');
                    glace = true;
                }
                else if(tile.x <= 26 && tile.y <= 96){
                    console.log('savane haut');
                    sava = true;
                }
                else if(tile.x <= 59 && tile.y <= 93){
                    console.log('savane droite');
                    sava = true;
                }
                else if(tile.x <= 94 && tile.y <= 54){
                    console.log('boisé haut');
                    bois = true;
                }
                else if(tile.x <= 127 && tile.y <= 26){
                    console.log('banquise');
                    glace = true;
                }
                else if(tile.x <= 57 && tile.y <= 124){
                    console.log('sauvage gauche');
                    sava = true;
                }
                else if(tile.x <= 99 && tile.y <= 100){
                    console.log('eau mid');
                    glace = true;
                }
                else if(tile.x <= 125 && tile.y <= 54){
                    console.log('boisé droite');
                    bois = true;
                }
                else if(tile.x <= 105 && tile.y <= 123){
                    console.log('boisé gauche');
                    bois = true;
                }
                else if(tile.x <= 124 && tile.y <= 92){
                    console.log('eau droite');
                    glace = true;
                }
                else if(tile.x <= 125 && tile.y <= 125){
                    console.log('eau bas');
                    glace = true;
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
            if(stepCam > 1  && stepCam <= 16 && deltaY > 0) {
                stepCam = stepCam / 2;
                this.cameras.main.setZoom(stepCam);
                //console.log(stepCam, "dezoom");
            }
            if(stepCam >= 1  && stepCam < 16 && deltaY < 0){
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
        
        
        this.player = this.physics.add.sprite(760, 800, 'player');
        //this.player.setCollideWorldBounds(true);
        this.player.setScale(0.2);
        this.player.depth = 4;
        
        
        this.cursors = this.input.keyboard.createCursorKeys();
        this.spacebar = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE);
        
        //this.scale.startFullscreen();
    }
    update(){
        
        this.player.setVelocityX(0);
        this.player.setVelocityY(0);
        if (this.cursors.left.isDown)
        {
            this.player.setVelocityX(-100);
        }
        if (this.cursors.right.isDown)
        {
            this.player.setVelocityX(100);
        }
        if (this.cursors.up.isDown)
        {
            this.player.setVelocityY(-100);
        }
        if (this.cursors.down.isDown)
        {
            this.player.setVelocityY(100);
        }

        if(this.spacebar.isDown && switchSpace == false)
            {
                this.player.setPosition(Phaser.Math.Between(600, 1800), Phaser.Math.Between(400, 800));
                switchSpace = true;
            }
            else if(this.spacebar.isUp && switchSpace == true)
            {
                switchSpace = false;
            }
    }
}

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
        xpText = this.add.text(1740, 32, '0 / 1000', {font: '40px', fontFamily: 'Georgia, "Goudy Bookletter 1911", Times, serif', fill: '#fff'});
        lvlText = this.add.text(660, 30, '0', {font: '48px', fontFamily: 'Georgia, "Goudy Bookletter 1911", Times, serif', fill: '#fff'});
        nbvisitText = this.add.text(60, 1000, '0', {font: '40px', fontFamily: 'Georgia, "Goudy Bookletter 1911", Times, serif', fill: '#fff'});

        posXTest = this.add.text(2180, 40, '-', {font: '18px', fontFamily: 'Georgia, "Goudy Bookletter 1911", Times, serif', fill: '#fff'});
        posYTest = this.add.text(2180, 70, '-', {font: '18px', fontFamily: 'Georgia, "Goudy Bookletter 1911", Times, serif', fill: '#fff'});
                
        
        
        
        this.P = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.P);


//TEST POUR LE SCROLL DE L'ENCLOS ET DE LA BOUTIQUE

/*
        let xMask = 400;
        let yMask = 200;
        let xScroll = 2000;
        let yScroll = 190;
        let widthMask = 1600;
        let heightMask = 800;

        // Ajoutez une zone d'affichage avec un masque pour définir la zone visible
        const viewport = this.add.container(xMask, yMask);
        const mask = this.add.graphics().fillRect(xMask, yMask, widthMask, heightMask);
        viewport.mask = new Phaser.Display.Masks.GeometryMask(this, mask);

        // Ajoutez votre contenu à la zone d'affichage
        const image = this.add.image(700, 800, 'myn1');
        viewport.add(image);

        // Créez une barre de défilement verticale
        const scrollbarWidth = 32;
        const scrollbar = this.add.graphics().fillStyle(0xaaaaaa).fillRect(xScroll, yScroll, scrollbarWidth, heightMask);
        scrollbar.alpha = 0.4;

        // Définissez la hauteur de la barre de défilement en fonction du contenu
        const contentHeight = 1200 //hauteur totale de votre contenu
        const viewportHeight = 600 //hauteur visible du contenu
        const scrollbarHeight = Math.max(Math.ceil((viewportHeight / contentHeight) * heightMask), 10);
        scrollbar.height = scrollbarHeight;

        // Gérez le défilement lorsque la barre de défilement est déplacée
        scrollbar.setInteractive().on('pointerdown', (pointer, localX, localY, event) => {
            event.stopPropagation();
            alert("TEST SCROLL");
            const startY = scrollbar.y;
            const startPointerY = pointer.y;

            this.input.on('pointermove', (pointer) => {

                const deltaY = pointer.y - startPointerY;
                const scrollY = startY + deltaY;

                // Assurez-vous que la barre de défilement reste dans les limites
                scrollbar.y = Phaser.Math.Clamp(scrollY, yScroll, yScroll + heightMask - scrollbarHeight);

                // Calculez la position de défilement en fonction de la position de la barre de défilement
                const scrollRatio = (scrollbar.y - yScroll) / (heightMask - scrollbarHeight);
                const maxScroll = contentHeight - viewportHeight;
                const scrollPosition = Math.ceil(maxScroll * scrollRatio);

                // Faites défiler le contenu en conséquence
                viewport.y = -scrollPosition;
            });

            this.input.on('pointerup', () => {
                this.input.off('pointermove');
                this.input.off('pointerup');
            });
        });
*/

    }
    update(){
        posXTest.setText(game.input.mousePointer.x);
        posYTest.setText(game.input.mousePointer.y);
        
        
    }
}

class Menu extends Phaser.Scene{
    constructor () {
        super({ key:'Menu'});
    }
    create(){
        this.menu0 = this.add.image(1214, 560, 'menu0');
        this.menu0.setScale(2);
        this.menu0.depth = 10;
        this.menu0.visible = false;
        
        this.menu1 = this.add.image(1220, 572, 'menu1');
        this.menu1.setScale(1.2);
        this.menu1.depth = 10;
        this.menu1.visible = false;

        this.but_plus = this.add.image(1842, 808, 'butplus')
        .setInteractive({ useHandCursor: true })
        .on('pointerover', () => {
            this.but_plus.setScale(0.64);
        })
        .on('pointerout', () => {
            this.but_plus.setScale(0.6);
        });
        this.but_plus.setScale(0.6);
        this.but_plus.depth = 10;
        this.but_plus.visible = false;

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
        
        this.persotab = [];
        this.persotab[0] = this.add.image(750, 400, 'perso1')
        .setInteractive({ useHandCursor: true })
        .on('pointerover', () => { console.log("yolo"); });
        this.persotab[0].setScale(0.26);
        this.persotab[0].depth = 11;
        this.persotab[0].visible = false;
        this.persotab[1] = this.add.image(1400, 400, 'perso2')
        .setInteractive({ useHandCursor: true })
        .on('pointerover', () => { console.log("yolo"); });
        this.persotab[1].setScale(0.26);
        this.persotab[1].depth = 11;
        this.persotab[1].visible = false;
        this.persotab[2] = this.add.image(750, 760, 'perso3')
        .setInteractive({ useHandCursor: true })
        .on('pointerover', () => { console.log("yolo"); });
        this.persotab[2].setScale(0.26);
        this.persotab[2].depth = 11;
        this.persotab[2].visible = false;
        this.persotab[3] = this.add.image(1400, 760, 'perso4')
        .setInteractive({ useHandCursor: true })
        .on('pointerover', () => { console.log("yolo"); });
        this.persotab[3].setScale(0.26);
        this.persotab[3].depth = 11;
        this.persotab[3].visible = false;
        
        this.myntab = [];
        this.myntab[0] = this.add.image(750, 400, 'myn1')
        .setInteractive({ useHandCursor: true })
        .on('pointerover', () => { console.log("yolo"); });
        this.myntab[0].setScale(0.6);
        this.myntab[0].depth = 11;
        this.myntab[0].visible = false;
        this.myntab[1] = this.add.image(1400, 400, 'myn2')
        .setInteractive({ useHandCursor: true })
        .on('pointerover', () => { console.log("yolo"); });
        this.myntab[1].setScale(0.6);
        this.myntab[1].depth = 11;
        this.myntab[1].visible = false;
        this.myntab[2] = this.add.image(750, 760, 'myn3')
        .setInteractive({ useHandCursor: true })
        .on('pointerover', () => { console.log("yolo"); });
        this.myntab[2].setScale(1.2);
        this.myntab[2].depth = 11;
        this.myntab[2].visible = false;
        this.myntab[3] = this.add.image(1400, 760, 'myn4')
        .setInteractive({ useHandCursor: true })
        .on('pointerover', () => { console.log("yolo"); });
        this.myntab[3].setScale(1.2);
        this.myntab[3].depth = 11;
        this.myntab[3].visible = false;
        
        //===== TABLEAUX ANIMALS ===== TABLEAUX ANIMALS ===== TABLEAUX ANIMALS ===== TABLEAUX ANIMALS =====
        this.animals = [];
        //animal 0
        this.animals[0] = this.add.image(750, 400, 'koala')
        .setInteractive({ useHandCursor: true })
        .on('pointerover', () => {
            this.animals[0].setTint(0xffaaff),
            this.animals[0].setScale(0.54);
        })
        .on('pointerout', () => {
            this.animals[0].setTint(0xffffff),
            this.animals[0].setScale(0.5);
        });
        this.animals[0].setScale(0.5);
        this.animals[0].depth = 11;
        this.animals[0].visible = false;
        //animal 1
        this.animals[1] = this.add.image(1400, 400, 'panda')
        .setInteractive({ useHandCursor: true })
        .on('pointerover', () => {
            this.animals[1].setTint(0xffaaff),
            this.animals[1].setScale(0.54);;
        })
        .on('pointerout', () => {
            this.animals[1].setTint(0xffffff),
            this.animals[1].setScale(0.5);
        });
        this.animals[1].setScale(0.5);
        this.animals[1].depth = 11;
        this.animals[1].visible = false;
        //animal 2
        this.animals[2] = this.add.image(750, 760, 'panda_roux')
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
        //animal 3
        this.animals[3] = this.add.image(1400, 760, 'renne')
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
        //animal 4
        this.animals[4] = this.add.image(750, 400, 'fennec')
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
        //animal 5
        this.animals[5] = this.add.image(750, 760, 'girafe')
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
        //animal 6
        this.animals[6] = this.add.image(750, 400, 'manchot')
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
        //animal 7
        this.animals[7] = this.add.image(750, 760, 'paon')
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
        
        this.echap = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.ESC);
        this.M = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.M);

    }
    update(){
        atm = this;
        hell.then(function(value) {
            //console.log(value);
            //console.log(time);

            if(charger == false){
                console.log(value);
                charger = true;
                animaux = value.animaux;
                hashtags = value.hashtags;
                visiteurs = value.visiteurs;
                save  = db_save_into_tab(value.last_save);
                console.log(animaux);
                console.log(hashtags);
                console.log(save);
                console.log("visiteurs");
                console.log(visiteurs);
                //parcours les animaux
                for(let i = 0; i < animaux.length; i++){
                    for(let j =0 ; j<hashtags.length; j++){
                        if(animaux[i].nom.toLowerCase()==hashtags[j].hashtag.toLowerCase()){
                            animaux[i].popularite+=50*hashtags[j].number;
                            console.log(animaux[i]);
                        }
                    }
                coins = save.coins;
                }
            }

            if(compteurtick2 == 0){
                random = Math.floor(Math.random() * 4); //presque inutile
                nbvisit += random*random;
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
                console.log("bénef : ", gaintemp);
                coins += gaintemp;
                console.log("coins : ", coins);
                console.log("nbvist : ", nbvisit);
            }
            compteurtick2 = (compteurtick2+1)%10;
            
            
            if(atm.menu1.visible == false){
                for(let i = 0; i < 8; i++){
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
                    atm.but_plus.visible = false;
                    for(let i = 0; i < 4; i++){
                        atm.myntab[i].visible = false;
                    }
                    for(let i = 0; i < 4; i++){
                        atm.persotab[i].visible = false;
                    }
                    for(let i = 0; i < 8; i++){
                        atm.animals[i].visible = false;
                    }
                    switchEchap = true;
                    opened = false;
                }
                else if(atm.menu0.visible == false)
                {
                    atm.menu0.visible = true;
                    atm.resume.visible = true;
                    atm.settings.visible = true;
                    atm.quit.visible = true;
                    switchEchap = true;
                    opened = true;
                }
                else
                {
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
            if(atm.M.isDown && switchM == false)
            {
                if(atm.menu1.visible == false && opened == false)
                {
                    atm.menu1.visible = true;
                    atm.but_plus.visible = true;
                    for(let i = 0; i < 4; i++){
                        atm.persotab[i].visible = true;
                    }
                    switchM = true;
                    opened = true;
                }
                else
                {
                    atm.menu1.visible = false;
                    atm.but_plus.visible = false;
                    for(let i = 0; i < 4; i++){
                        atm.persotab[i].visible = false;
                    }
                    switchM = true;
                    opened = false;
                }
            }
            else if(atm.M.isUp && switchM == true)
            {
                switchM = false;
            }
            //MENU ENCLOS COCHONGS
            if(mynthos == true)
            {
                if(opened == false){
                    atm.menu1.visible = true;
                    atm.but_plus.visible = true;
                    for(let i = 0; i < 4; i++){
                        atm.myntab[i].visible = true;
                    }
                    opened = true;
                }
                mynthos = false;
            }
            //MENU ENCLOS GOATS
            if(bois == true)
            {
                if(opened == false){
                    atm.menu1.visible = true;
                    atm.but_plus.visible = true;
                    for(let i = 0; i < 4; i++){
                        atm.animals[i].visible = true;
                    }
                    opened = true;
                }
                bois = false;
            }
            //MENU ENCLOS POULETS
            if(sava == true)
            {
                if(opened == false){
                    atm.menu1.visible = true;
                    atm.but_plus.visible = true;
                    for(let i = 4; i < 6; i++){
                        atm.animals[i].visible = true;
                    }
                    opened = true;
                }
                sava = false;
            }
            //MENU ENCLOS POULETS
            if(glace == true)
            {
                if(opened == false){
                    atm.menu1.visible = true;
                    atm.but_plus.visible = true;
                    for(let i = 6; i < 8; i++){
                        atm.animals[i].visible = true;
                    }
                    opened = true;
                }
                glace = false;
            }
            
            //PAS BESOIN DE MODIF JE PENSE (ce sera pas gardé de toute façon)
            //BAR XP
            if(atm.P.isDown && switchP == false)
            {
                frameP = (frameP+1)%19;
                atm.anim_xp.setFrame(frameP);
                //targetXP.setFrame(framePlus);
                switchP = true;
            }
            else if(atm.P.isUp && switchP == true)
            {
                switchP = false;
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


