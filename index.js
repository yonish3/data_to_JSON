const csvAndArray = require("csv-and-array");
const fs = require('fs');

const dataCSV = new csvAndArray.csvFileAsArray("./data_from_google.csv");
let dataArray = null
let jsonArray = []

const convert = async function (dataCSV){

    dataArray = await dataCSV.getValues();

    for (let i = 0; i < dataArray.length; i++) {
        for (let z = 0; z < dataArray[i].length; z++) {
            if(dataArray[i][z] === ''){
                dataArray[i].splice(z,1)
                z--
            }
        }
    }
   
    for (let i = 0; i < dataArray.length; i++) {
        for (let z = 1; z < dataArray[i].length; z++) {

            let fileName = dataArray[i][0].substr(99)
            let fileText = fs.readFileSync(`./${fileName}`, {encoding:'utf8', flag:'r'}, function (err) {
                if (err) throw err;
                console.log('Read!');
            });

            jsonArray.push({
                "text":fileText.replace(/\s+/g,' ').trim(),
                "label": dataArray[i][z]
            })
        }        
    }

    var json = JSON.stringify(jsonArray);
    fs.writeFile('training_data.json', json, 'utf8', function (err) {
        if (err) throw err;
        console.log('Saved!');
    });
}

dataArray = convert(dataCSV)
