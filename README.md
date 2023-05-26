# Zoosta ! :koala:
## Description :pencil2:

Zoosta is a managing game where you have to take care of a zoo. You have to manage your animals to get the most money possible. Each animal has a different cost and a different income. The difference between Zoosta and other managing game is that the popularity of animals depend of lasts tweets of [ZooBeauval](https://twitter.com/zoobeauval) and our tweeter [Zoosta](https://twitter.com/Zoosta1)


---
## Installation :computer:

### Requirements :wrench:

- [Node.js](https://nodejs.org/en/)
- [Mysql](https://www.mysql.com/fr/)
- [Npm](https://www.npmjs.com/)

### Installation :inbox_tray:

1. Clone the repository 
```bash
git clone https://github.com/Romain-Pietri/ZOOSTA2.0
```
2. Install the dependencies
```bash
npm install
```
3. Get all our images and sound from this link and put them in the folder front

https://cdn.discordapp.com/attachments/1088099892976701541/1111604963899097198/audio.zip
https://cdn.discordapp.com/attachments/1088099892976701541/1111604964159131689/img.zip

4. Make sur you have the right password for your database in the file 'back/bdd_connect.js'
```javascript
const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password : 'root',
    database: 'ZOOSTA'
  });
```
5. Create the database
```bash
CREATE DATABASE ZOOSTA;
```
6. Run the script
```bash
node index.js
```
After few seconds, you're getting redirected to the website on your browser.

7. Enjoy !

---

## Main modules :books:

- [Puppeteer](https://pptr.dev/)
- [Phaser3](https://phaser.io/phaser3)
- [Express](https://expressjs.com/fr/)
- [Mysql](https://www.mysql.com/fr/)


---

## Authors :busts_in_silhouette:

- [Romain Pietri](https://github.com/Romain-Pietri)
- [Remy Ficheux](https://github.com/Remfich)
- [Esteban Delplanque](https://github.com/estebandsplq)
- [Auguste Buriez](https://github.com/AugusteBuriez)
- [Juliane Loridan](https://github.com/Juliane4101)
- [Matthieu Lacroix](https://github.com/Xarveyn)




