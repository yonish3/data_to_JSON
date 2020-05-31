const csvAndArray = require("csv-and-array");

const dataCSV = new csvAndArray.csvFileAsArray("./data_from_google.csv");
let dataArray = null

const convert = async function (dataCSV){

    dataArray = await dataCSV.getValues();
    console.log('1111111111111111111111')

    for (let i = 0; i < dataArray.length; i++) {
        for (let z = 0; z < dataArray[i].length; z++) {
            if(dataArray[i][z] === ''){
                dataArray[i].splice(z,1)
                z--
            }
        }
    }
    

    console.log('22222222222222222')
    console.log(dataArray)

    return dataArray
}

dataArray = convert(dataCSV)
