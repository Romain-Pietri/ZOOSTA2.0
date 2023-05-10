

document.addEventListener("DOMContentLoaded", function() {
    hell=hello();

    hell.then(function(result){
        console.log(result);
    });
    
        
    //si le bouton nouveau est pressé on creer une nouvelle partie
    document.getElementById("newgame").addEventListener("click", function(){
        //fait un fetch qui creer une nouvelle partie
        fetch('/new_game', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({"coucou toi, t'es trop belle": "oui je sais"})
            
        })
        .then(response => response.json())
        .then(data => {
            console.log(data);
        }
        );
    });
    //si le bouton charger est pressé on charge une partie
    document.getElementById("charger").addEventListener("click", function(){
        fetch('/show_load', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({"coucou ma petite putte, t'es trop belle": "oui je sais"})
            
        })
        .then(response => response.json())
        .then(data => {
            console.log(data);
        }
        );
    });




    });
module.exports = { hello };