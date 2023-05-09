/*var XLSX = require('xlsx');
const fs = require('fs');
const finalObject = {};
const data = XLSX.read("Animaux.xlxs", { type: 'buffer' });*/
/*data.SheetNames.forEach(sheetName => {
    let rowObject = XLSX.utils.sheet_to_json(data.Sheets[sheetName]);
    finalObject[sheetName] = rowObject;
    console.log(rowObject);
});*/
/*finalObject["page"] = XLSX.utils.sheet_to_json(data.Sheets["page"]);
console.log(finalObject);
console.log(JSON.stringify(finalObject));
fs.writeFileSync('./target.json', JSON.stringify(finalObject));*/

xlsxj = require("xlsx-to-json");
xlsxj({
    input: "Animaux.xlsx",
    output: "Animaux.json"
}, function (err, result) {
    if (err) {
        console.error(err);
    } else {
        console.log(result);
    }
});

/*var workbook = XLSX.readFile('test.xlsx');
var sheet_name_list = workbook.SheetNames;

sheet_name_list.forEach(function (y) {
    var worksheet = workbook.Sheets[y];
    var headers = {};
    var data = [];
    for (z in worksheet) {
        if (z[0] === '!') continue;
        //parse out the column, row, and value
        var tt = 0;
        for (var i = 0; i < z.length; i++) {
            if (!isNaN(z[i])) {
                tt = i;
                break;
            }
        };
        var col = z.substring(0, tt);
        var row = parseInt(z.substring(tt));
        var value = worksheet[z].v;

        //store header names
        if (row == 1 && value) {
            headers[col] = value;
            continue;
        }

        if (!data[row]) data[row] = {};
        data[row][headers[col]] = value;
    }
    //drop those first two rows which are empty
    data.shift();
    data.shift();
    console.log(data);

    // Write data in 'Output.txt' .
    fs.writeFile('Output.txt', stringify(data), (err) => {

        // In case of a error throw err.
        if (err) throw err;
    })
});
*/

