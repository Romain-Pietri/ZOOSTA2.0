//se connecte a la bdd et creer les tables si elles n'existent pas
const mysql = require('mysql2');//sudo systemctl restart mysqld
const connection = mysql.createConnection({//passwd root
    host: 'localhost',
    user: 'root',
    password : 'root',
    database: 'ZOOSTA'
  });


/*##################################################*/
/*#                                                #*/
/*#                Connection DB                   #*/
/*#                                                #*/
/*##################################################*/
function config_db(){

    connection.query('CREATE TABLE IF NOT EXISTS animaux( id INT NOT NULL AUTO_INCREMENT, nom VARCHAR(255), enclos INT, alimentation VARCHAR(255), niveau INT, popularite INT ,prix INT, depense INT, description VARCHAR(255), primary key(id))', function(err, results, fields) {
        if (err) throw err;
        console.log('Table created Animaux');
        }
    );
    

    connection.query('CREATE TABLE IF NOT EXISTS hashtag (  id INT NOT NULL AUTO_INCREMENT, number INT NOT NULL ,hashtag varchar(255), primary key(id))', function(err, results, fields) {
        if (err) throw err;
        console.log('Table created Hashtag');
        });


    connection.query('DROP TABLE IF EXISTS visiteur', function(err, results, fields) {
        if (err) throw err;
        console.log('Table dropped Visiteur');
        }
    );


    connection.query('CREATE TABLE IF NOT EXISTS visiteur ( id INT NOT NULL AUTO_INCREMENT, nom varchar(255), prenom varchar(255), primary key(id))', function(err, results, fields) {
        if (err) throw err;
        console.log('Table created Visiteur');
        }
    );

    

    //creer la table save qui a pour id_user l'id de l'user et qui a ec_n pour l'enclo numero n débloqué (BOOL) et ec_na en varchar et ec_nm en varchar. Il en faut 14
    const query_save = 'CREATE TABLE IF NOT EXISTS SAVE (id INT NOT NULL AUTO_INCREMENT,argent INT DEFAULT 10000, cumul_argent INT DEFAULT 10000, niveau INT DEFAULT 1,ec_1 BOOL DEFAULT FALSE,ec_2 BOOL DEFAULT FALSE,ec_3 BOOL DEFAULT FALSE,    ec_4 BOOL DEFAULT FALSE,ec_5 BOOL DEFAULT FALSE,    ec_6 BOOL DEFAULT FALSE,ec_7 BOOL DEFAULT FALSE,    ec_8 BOOL DEFAULT FALSE,ec_9 BOOL DEFAULT FALSE,    ec_10 BOOL DEFAULT FALSE,ec_11 BOOL DEFAULT FALSE,    ec_12 BOOL DEFAULT FALSE,ec_13 BOOL DEFAULT FALSE,    ec_14 BOOL DEFAULT FALSE,ec_na_1 VARCHAR(255) DEFAULT NULL,    ec_na_2 VARCHAR(255) DEFAULT NULL,ec_na_3 VARCHAR(255) DEFAULT NULL,    ec_na_4 VARCHAR(255) DEFAULT NULL,ec_na_5 VARCHAR(255) DEFAULT NULL,    ec_na_6 VARCHAR(255) DEFAULT NULL,ec_na_7 VARCHAR(255) DEFAULT NULL,   ec_na_8 VARCHAR(255) DEFAULT NULL,ec_na_9 VARCHAR(255) DEFAULT NULL,    ec_na_10 VARCHAR(255) DEFAULT NULL,ec_na_11 VARCHAR(255) DEFAULT NULL,    ec_na_12 VARCHAR(255) DEFAULT NULL,ec_na_13 VARCHAR(255) DEFAULT NULL,    ec_na_14 VARCHAR(255) DEFAULT NULL,ec_nm_1 VARCHAR(255) DEFAULT NULL,    ec_nm_2 VARCHAR(255) DEFAULT NULL,ec_nm_3 VARCHAR(255) DEFAULT NULL,    ec_nm_4 VARCHAR(255) DEFAULT NULL,ec_nm_5 VARCHAR(255) DEFAULT NULL,    ec_nm_6 VARCHAR(255) DEFAULT NULL,ec_nm_7 VARCHAR(255) DEFAULT NULL,    ec_nm_8 VARCHAR(255) DEFAULT NULL,ec_nm_9 VARCHAR(255) DEFAULT NULL,    ec_nm_10 VARCHAR(255) DEFAULT NULL,ec_nm_11 VARCHAR(255) DEFAULT NULL,    ec_nm_12 VARCHAR(255) DEFAULT NULL,ec_nm_13 VARCHAR(255) DEFAULT NULL,ec_nm_14 VARCHAR(255) DEFAULT NULL,primary key(id))';
    connection.query(query_save, function(err, results, fields) {
        if (err) throw err;
        console.log('Table created Save');
        }
    );


}

//export la fonction config_db
module.exports.config_db = config_db;
module.exports.connection = connection;
