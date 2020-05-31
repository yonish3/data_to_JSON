const csvAndArray = require("csv-and-array");
const fs = require('fs');

const dataCSV = new csvAndArray.csvFileAsArray("./data_from_google.csv");
let dataArray = null
let jsonArrayTrain = []
let jsonArrayTest = []
let totalLables = [0,0]

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

            if (i < dataArray.length*0.5) {
                jsonArrayTrain.push({
                    "text":fileText.replace(/\s+/g,' ').trim(),
                    "label": dataArray[i][z]
                })
                totalLables[0]++
            }else{
                jsonArrayTest.push({
                    "text":fileText.replace(/\s+/g,' ').trim(),
                    "label": dataArray[i][z]
                })
                totalLables[1]++

            }
        }        
    }

    console.log('totalLables:',totalLables[0], totalLables[1])

    var jsonTrain = JSON.stringify(jsonArrayTrain);
    var jsonTest = JSON.stringify(jsonArrayTest);

    fs.writeFile('training_data.json', jsonTrain, 'utf8', function (err) {
        if (err) throw err;
        console.log('Saved!');
    });

    fs.writeFile('testing_data.json', jsonTest, 'utf8', function (err) {
        if (err) throw err;
        console.log('Saved!');
    });
}

dataArray = convert(dataCSV)
