
var config = {
    type: Phaser.AUTO,
    scale: {
        mode: Phaser.Scale.FIT,
        parent: 'phaser-example',
        autoCenter: Phaser.Scale.CENTER_BOTH,
        width: 2438,
        height: 1080
    },
    scene: {
        preload: preload,
        create: create,
        update: update
    },
    physics : {
        default : "arcade",
        arcade : {
            debug: false,
            gravity : {y : 0},
        }
    },
    parent : 'big-head'
};

// ==== VARIABLES ==== VARIABLES ==== VARIABLES ==== VARIABLES ==== VARIABLES ==== VARIABLES ====
var game = new Phaser.Game(config);
var compteurtick = 0;
var random = 0;
let posXTest = "";
let posYTest = "";
let stepCam = 1;
let coinText = "";
let xpText = "";
let nbvisitText = "";
let coins = 1000;
let xps = 80;
let nbvisit = 0;
let switchEchap = false;
let switchSpace = false;
let switchP = false;
let switchM = false;
let frameP = 0;
let cocos = false;
let gogos = false;
let poul = false;
let ice = false;


function preload(){
    this.load.image('player','../img/Prof_Tilleul.png', { frameWidth: 32, frameHeight: 48 });
    this.load.image('background','../img/map_v2.png', { frameWidth: 32, frameHeight: 48 });

    this.load.image('enclos_cochongs','../img/enclos_cochongs.png', { frameWidth: 32, frameHeight: 48 });
    this.load.image('enclos_goats','../img/enclos_goats.png', { frameWidth: 32, frameHeight: 48 });
    this.load.image('enclos_poulets','../img/enclos_poulets.png', { frameWidth: 32, frameHeight: 48 });
    this.load.image('enclos_fish','../img/enclos_fish.png', { frameWidth: 32, frameHeight: 48 });

    this.load.image('coin','../img/coin.png', { frameWidth: 32, frameHeight: 48 });
    this.load.spritesheet('xps','../img/sprite_bar_xp.png', { frameWidth: 700, frameHeight: 17 });
    this.load.image('green_but','../img/bouton_vert.png', { frameWidth: 32, frameHeight: 48 });
    this.load.image('menu0','../img/menu_bleu.png', { frameWidth: 32, frameHeight: 48 });
    this.load.image('resume','../img/resume.png', { frameWidth: 32, frameHeight: 48 });
    this.load.image('settings','../img/settings.png', { frameWidth: 32, frameHeight: 48 });
    this.load.image('quit','../img/quit.png', { frameWidth: 32, frameHeight: 48 });
    this.load.image('menu1','../img/menu_orange.png', { frameWidth: 32, frameHeight: 48 });

    this.load.image('perso1','../img/perso1.png', { frameWidth: 32, frameHeight: 48 });
    this.load.image('perso2','../img/perso2.png', { frameWidth: 32, frameHeight: 48 });
    this.load.image('perso3','../img/perso3.png', { frameWidth: 32, frameHeight: 48 });
    this.load.image('perso4','../img/perso4.png', { frameWidth: 32, frameHeight: 48 });

    this.load.image('myn1','../img/mynthos1.jpg', { frameWidth: 32, frameHeight: 48 });
    this.load.image('myn2','../img/mynthos2.jpg', { frameWidth: 32, frameHeight: 48 });
    this.load.image('myn3','../img/mynthos3.jpg', { frameWidth: 32, frameHeight: 48 });
    this.load.image('myn4','../img/mynthos4.jpg', { frameWidth: 32, frameHeight: 48 });

    this.load.image('koala','../img/koala.png', { frameWidth: 32, frameHeight: 48 });
    this.load.image('koala2','../img/koala2.png', { frameWidth: 32, frameHeight: 48 });
    this.load.image('panda','../img/panda.png', { frameWidth: 32, frameHeight: 48 });
    this.load.image('panda2','../img/panda2.png', { frameWidth: 32, frameHeight: 48 });
    this.load.image('panda_roux','../img/panda_roux.png', { frameWidth: 32, frameHeight: 48 });
    this.load.image('panda_roux2','../img/panda_roux2.png', { frameWidth: 32, frameHeight: 48 });
    this.load.image('renne','../img/renne.png', { frameWidth: 32, frameHeight: 48 });
    this.load.image('renne2','../img/renne2.png', { frameWidth: 32, frameHeight: 48 });
    this.load.image('fennec','../img/fennec.png', { frameWidth: 32, frameHeight: 48 });
    this.load.image('fennec2','../img/fennec2.png', { frameWidth: 32, frameHeight: 48 });
    this.load.image('girafe','../img/girafe.png', { frameWidth: 32, frameHeight: 48 });
    this.load.image('girafe2','../img/girafe2.png', { frameWidth: 32, frameHeight: 48 });
    this.load.image('manchot','../img/manchot.png', { frameWidth: 32, frameHeight: 48 });
    this.load.image('manchot2','../img/manchot2.png', { frameWidth: 32, frameHeight: 48 });
    this.load.image('paon','../img/paon.png', { frameWidth: 32, frameHeight: 48 });
    this.load.image('paon2','../img/paon2.png', { frameWidth: 32, frameHeight: 48 });

}

function create(){

    /*************************************/
    /*                                   */
    /* --  Création de la caméra     --  */
    /*                                   */
    /*************************************/
    this.cameras.main.setZoom(1);
    var zoom = this.cameras.main.zoom;

    //Ajout des contrôles de la caméra
    
    
    this.input.on("wheel", function (pointer, gameObjects, deltaX, deltaY, deltaZ) {
        if(stepCam > 1  && stepCam <= 16 && deltaY > 0) {
            stepCam = stepCam / 2;
            this.cameras.main.setZoom(stepCam);
            console.log(stepCam);
        }
        if(stepCam >= 1  && stepCam < 16 && deltaY < 0){
            stepCam = stepCam * 2;
            this.cameras.main.setZoom(stepCam);
            console.log(stepCam);
        }
    }, this);

    this.input.on("pointerdown", function (pointer) {
        this.input.on("pointermove", function (pointer) {
            if (pointer.isDown) {
                if(stepCam == 1){
                    this.cameras.main.scrollX -= pointer.velocity.x * (this.cameras.main.zoom /50);
                    this.cameras.main.scrollY -= pointer.velocity.y * (this.cameras.main.zoom /50);
                }
                else if(stepCam == 2){
                    this.cameras.main.scrollX -= pointer.velocity.x * (this.cameras.main.zoom /90);
                    this.cameras.main.scrollY -= pointer.velocity.y * (this.cameras.main.zoom /90);
                }
                else if(stepCam == 4){
                    this.cameras.main.scrollX -= pointer.velocity.x * (this.cameras.main.zoom /110);
                    this.cameras.main.scrollY -= pointer.velocity.y * (this.cameras.main.zoom /110);
                }
                else if(stepCam == 8){
                    this.cameras.main.scrollX -= pointer.velocity.x * (this.cameras.main.zoom /180);
                    this.cameras.main.scrollY -= pointer.velocity.y * (this.cameras.main.zoom /180);
                }
                else if(stepCam == 16){
                    this.cameras.main.scrollX -= pointer.velocity.x * (this.cameras.main.zoom /270);
                    this.cameras.main.scrollY -= pointer.velocity.y * (this.cameras.main.zoom /270);
                }
            }
        }, this);
    }, this);
    this.input.on("pointerup", function (pointer) {
        this.input.off("pointermove");
    }, this);

    /*
    var config = {
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
    //this.anims.create(config);
    //this.add.sprite(960, 50, "xps").play("bar_xp_anim");
    this.anim_xp = this.add.image(960, 50, 'xps'); //peut-être à garder

    coinText = this.add.text(340, 32, '1000', {font: '40px', fill: '#fff'});
    xpText = this.add.text(1360, 32, '0/1000', {font: '40px', fill: '#fff'});
    nbvisitText = this.add.text(60, 1000, '0', {font: '40px', fill: '#fff'});
    posXTest = this.add.text(2140, 50, '-', {font: '18px', fill: '#fff'});
    posYTest = this.add.text(2140, 80, '-', {font: '18px', fill: '#fff'});

    this.background = this.add.image(1220, 580, 'background');
    this.background.setScale(0.15);
    this.background.depth = 1;

//===== ENCLOS CREATION ===== ENCLOS CREATION ===== ENCLOS CREATION ===== ENCLOS CREATION =====
    this.enclos_goats = this.add.image(1420, 530, 'enclos_goats')
    .setInteractive({ useHandCursor: false }) //à mettre en true pour un curseur main
    .on('pointerdown', () => { gogos = true; });
    this.enclos_goats.setScale(0.36);
    this.enclos_goats.depth = 4;
    this.enclos_cochongs = this.add.image(1560, 600, 'enclos_cochongs')
    .setInteractive({ useHandCursor: false })
    .on('pointerdown', () => { cocos = true; });
    this.enclos_cochongs.setScale(0.36);
    this.enclos_cochongs.depth = 4;
    this.enclos_poulets = this.add.image(1740, 684, 'enclos_poulets')
    .setInteractive({ useHandCursor: false })
    .on('pointerdown', () => { poul = true; });
    this.enclos_poulets.setScale(0.36);
    this.enclos_poulets.depth = 4;
    this.enclos_fish = this.add.image(1500, 820, 'enclos_fish')
    .setInteractive({ useHandCursor: false })
    .on('pointerdown', () => { ice = true; });
    this.enclos_fish.setScale(0.36);
    this.enclos_fish.depth = 4;

    this.menu0 = this.add.image(1214, 560, 'menu0');
    this.menu0.setScale(2);
    this.menu0.depth = 10;
    this.menu0.visible = false;
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


    this.menu1 = this.add.image(1220, 572, 'menu1');
    this.menu1.setScale(2.14);
    this.menu1.depth = 10;
    this.menu1.visible = false;

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

//===== TABLEAUX ANIMALS ET ANIMALS2 ===== TABLEAUX ANIMALS ET ANIMALS2 ===== TABLEAUX ANIMALS ET ANIMALS2 =====
    this.animals = [];
    this.animals2 = [];
    //animal 0
    this.animals[0] = this.add.image(750, 400, 'koala')
    .setInteractive({ useHandCursor: true })
    .on('pointerover', () => { this.animals[0].visible = false, this.animals2[0].visible = true; });
    this.animals[0].setScale(0.5);
    this.animals[0].depth = 11;
    this.animals[0].visible = false;
    this.animals2[0] = this.add.image(750, 400, 'koala2')
    .setInteractive({ useHandCursor: true })
    .on('pointerout', () => { this.animals2[0].visible = false, this.animals[0].visible = true; });
    this.animals2[0].setScale(0.54);
    this.animals2[0].depth = 11;
    this.animals2[0].visible = false;
    //animal 1
    this.animals[1] = this.add.image(1400, 400, 'panda')
    .setInteractive({ useHandCursor: true })
    .on('pointerover', () => { this.animals[1].visible = false, this.animals2[1].visible = true; });
    this.animals[1].setScale(0.5);
    this.animals[1].depth = 11;
    this.animals[1].visible = false;
    this.animals2[1] = this.add.image(1400, 400, 'panda2')
    .setInteractive({ useHandCursor: true })
    .on('pointerout', () => { this.animals2[1].visible = false, this.animals[1].visible = true; });
    this.animals2[1].setScale(0.54);
    this.animals2[1].depth = 11;
    this.animals2[1].visible = false;
    //animal 2
    this.animals[2] = this.add.image(750, 760, 'panda_roux')
    .setInteractive({ useHandCursor: true })
    .on('pointerover', () => { this.animals[2].visible = false, this.animals2[2].visible = true; });
    this.animals[2].setScale(0.5);
    this.animals[2].depth = 11;
    this.animals[2].visible = false;
    this.animals2[2] = this.add.image(750, 760, 'panda_roux2')
    .setInteractive({ useHandCursor: true })
    .on('pointerout', () => { this.animals2[2].visible = false, this.animals[2].visible = true; });
    this.animals2[2].setScale(0.54);
    this.animals2[2].depth = 11;
    this.animals2[2].visible = false;
    //animal 3
    this.animals[3] = this.add.image(1400, 760, 'renne')
    .setInteractive({ useHandCursor: true })
    .on('pointerover', () => { this.animals[3].visible = false, this.animals2[3].visible = true; });
    this.animals[3].setScale(0.5);
    this.animals[3].depth = 11;
    this.animals[3].visible = false;
    this.animals2[3] = this.add.image(1400, 760, 'renne2')
    .setInteractive({ useHandCursor: true })
    .on('pointerout', () => { this.animals2[3].visible = false, this.animals[3].visible = true; });
    this.animals2[3].setScale(0.54);
    this.animals2[3].depth = 11;
    this.animals2[3].visible = false;
    //animal 4
    this.animals[4] = this.add.image(750, 400, 'fennec')
    .setInteractive({ useHandCursor: true })
    .on('pointerover', () => { this.animals[4].visible = false, this.animals2[4].visible = true; });
    this.animals[4].setScale(0.5);
    this.animals[4].depth = 11;
    this.animals[4].visible = false;
    this.animals2[4] = this.add.image(750, 400, 'fennec2')
    .setInteractive({ useHandCursor: true })
    .on('pointerout', () => { this.animals2[4].visible = false, this.animals[4].visible = true; });
    this.animals2[4].setScale(0.54);
    this.animals2[4].depth = 11;
    this.animals2[4].visible = false;
    //animal 5
    this.animals[5] = this.add.image(750, 760, 'girafe')
    .setInteractive({ useHandCursor: true })
    .on('pointerover', () => { this.animals[5].visible = false, this.animals2[5].visible = true; });
    this.animals[5].setScale(0.5);
    this.animals[5].depth = 11;
    this.animals[5].visible = false;
    this.animals2[5] = this.add.image(750, 760, 'girafe2')
    .setInteractive({ useHandCursor: true })
    .on('pointerout', () => { this.animals2[5].visible = false, this.animals[5].visible = true; });
    this.animals2[5].setScale(0.54);
    this.animals2[5].depth = 11;
    this.animals2[5].visible = false;
    //animal 6
    this.animals[6] = this.add.image(750, 400, 'manchot')
    .setInteractive({ useHandCursor: true })
    .on('pointerover', () => { this.animals[6].visible = false, this.animals2[6].visible = true; });
    this.animals[6].setScale(0.5);
    this.animals[6].depth = 11;
    this.animals[6].visible = false;
    this.animals2[6] = this.add.image(750, 400, 'manchot2')
    .setInteractive({ useHandCursor: true })
    .on('pointerout', () => { this.animals2[6].visible = false, this.animals[6].visible = true; });
    this.animals2[6].setScale(0.54);
    this.animals2[6].depth = 11;
    this.animals2[6].visible = false;
    //animal 7
    this.animals[7] = this.add.image(750, 760, 'paon')
    .setInteractive({ useHandCursor: true })
    .on('pointerover', () => { this.animals[7].visible = false, this.animals2[7].visible = true; });
    this.animals[7].setScale(0.5);
    this.animals[7].depth = 11;
    this.animals[7].visible = false;
    this.animals2[7] = this.add.image(750, 760, 'paon2')
    .setInteractive({ useHandCursor: true })
    .on('pointerout', () => { this.animals2[7].visible = false, this.animals[7].visible = true; });
    this.animals2[7].setScale(0.54);
    this.animals2[7].depth = 11;
    this.animals2[7].visible = false;

    
    this.player = this.physics.add.sprite(780, 810, 'player');
    this.player.setCollideWorldBounds(true);
    this.player.setScale(0.4);
    this.player.depth = 4;

    this.coin = this.add.image(260, 50, 'coin');
    this.coin.setScale(0.025);
    this.coin.state = 1000;

    // this.xp = this.add.image(1000, 50, 'xp');
    // this.xp.setScale(0.4);

    //this.greenbut = this.add.image(2340, 980, 'green_but');
        // .setInteractive()
        // .on('pointerdown', () => menu());
    //this.greenbut.setScale(0.4);

    this.cursors = this.input.keyboard.createCursorKeys();
    this.echap = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.ESC);
    this.spacebar = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE);
    this.P = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.P);
    this.M = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.M);

    this.scale.startFullscreen();
}


function update(){

    //console.log(time);
    
    if(compteurtick == 0){
        random = Math.floor(Math.random() * 4); //inutile
        coins += 1;
        nbvisit += random*random;
        xps = (xps+40)%1000;
        coinText.setText(coins);
        nbvisitText.setText(nbvisit);
        xpText.setText(xps + ' / 1000');
    }
    compteurtick = (compteurtick + 1)%20;

    posXTest.setText(game.input.mousePointer.x);
    posYTest.setText(game.input.mousePointer.y);

    if(this.menu1.visible == false){
        for(let i = 0; i < 8; i++){
            this.animals[i].visible = false;
        }
        for(let i = 0; i < 8; i++){
            this.animals2[i].visible = false;
        }
    }

//######## GESTION TOUCHES/CLICKS AVEC VARIABLES ######## GESTION TOUCHES/CLICKS AVEC VARIABLES ########

    // ====== AFFICHAGE FENETRES avec switch ====== AFFICHAGE FENETRES avec switch ======
    //MENU ECHAP
    if(this.echap.isDown && switchEchap == false)
    {
        if(this.menu1.visible == true){
            this.menu1.visible = false;
            for(let i = 0; i < 4; i++){
                this.myntab[i].visible = false;
            }
            for(let i = 0; i < 4; i++){
                this.persotab[i].visible = false;
            }
            for(let i = 0; i < 8; i++){
                this.animals[i].visible = false;
            }
            for(let i = 0; i < 8; i++){
                this.animals2[i].visible = false;
            }
            switchEchap = true;
        }
        else if(this.menu0.visible == false)
        {
            this.menu0.visible = true;
            this.resume.visible = true;
            this.settings.visible = true;
            this.quit.visible = true;
            switchEchap = true;
        }
        else
        {
            this.menu0.visible = false;
            this.resume.visible = false;
            this.settings.visible = false;
            this.quit.visible = false;
            switchEchap = true;
        }
    }
    else if(this.echap.isUp && switchEchap == true)
    {
        switchEchap = false;
    }

    //MENU PERSONNEL
    if(this.M.isDown && switchM == false)
    {
        if(this.menu1.visible == false)
        {
            this.menu1.visible = true;
            for(let i = 0; i < 4; i++){
                this.persotab[i].visible = true;
            }
            switchM = true;
        }
        else
        {
            this.menu1.visible = false;
            for(let i = 0; i < 4; i++){
                this.persotab[i].visible = false;
            }
            switchM = true;
        }
    }
    else if(this.M.isUp && switchM == true)
    {
        switchM = false;
    }
    //MENU ENCLOS COCHONGS
    if(cocos == true)
    {
        this.menu1.visible = true;
        for(let i = 0; i < 4; i++){
            this.myntab[i].visible = true;
        }
        
        cocos = false;
    }
    //MENU ENCLOS GOATS
    if(gogos == true)
    {
        this.menu1.visible = true;
        for(let i = 0; i < 4; i++){
            this.animals[i].visible = true;
        }

        gogos = false;
    }
    //MENU ENCLOS POULETS
    if(poul == true)
    {
        this.menu1.visible = true;
        for(let i = 4; i < 6; i++){
            this.animals[i].visible = true;
        }

        poul = false;
    }
    //MENU ENCLOS POULETS
    if(ice == true)
    {
        this.menu1.visible = true;
        for(let i = 6; i < 8; i++){
            this.animals[i].visible = true;
        }

        ice = false;
    }




//PAS BESOIN DE MODIF JE PENSE (ce sera pas gardé de toute façon)
    //LOL BAR XP
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

    if(this.spacebar.isDown && switchSpace == false)
    {
        this.player.setPosition(Phaser.Math.Between(600, 1800), Phaser.Math.Between(400, 800));
        switchSpace = true;
    }
    else if(this.spacebar.isUp && switchSpace == true)
    {
        switchSpace = false;
    }
    

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
}


