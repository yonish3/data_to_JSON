const csvAndArray = require("csv-and-array");
const clean  = require('lodash-clean')

const dataCSV = new csvAndArray.csvFileAsArray("./data_from_google.csv");
 
var dataArray = dataCSV.getValues();
dataArray.then(function(){
    console.log(dataArray)
    for (let index = 0; index < dataArray.length-1; index++) {
        // clean(array[index])
        console.log(array[index])
        
    }
});

   
// dataArray.forEach(element => {
    //     clean(element)  
    //     console.log(element)   
    // })