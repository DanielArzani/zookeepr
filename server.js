//* Imports
const { json } = require("express");
const express = require("express");
const {animals} = require('./data/animals.json');


//* Variables
// instantiate the server
const app = express();
// Assign port number
const PORT = process.env.PORT || 3001;



//* Functions

//^ Gets query params
function filterByQuery(query, animalsArray){
    let personalityTraitsArray = [];
    let filteredResults = animalsArray;

    // Checks to see if personalityTraits is a single trait or an array
    if(query.personalityTraits){
        if(typeof query.personalityTraits === "string"){
            personalityTraitsArray = [query.personalityTraits];
        }else {
            personalityTraitsArray = query.personalityTraits;
        }
    }

    // Loop through personalityTraitsArray and returns the filtered result that has each trait
    personalityTraitsArray.forEach((trait)=>{
        filteredResults = filteredResults.filter(animal => animal.personalityTraits.indexOf(trait) !== -1);
    })

    // Checks to see if the param entered is the same as the object property then returns a new array with only those values
    if(query.diet){
        filteredResults = filteredResults.filter((animal)=>animal.diet === query.diet);
    }
    if(query.species){
        filteredResults = filteredResults.filter((animal)=>animal.species === query.species);
    }
    if(query.name){
        filteredResults = filteredResults.filter((animal)=>animal.name === query.name);
    }
    return filteredResults;
}

//* Routes

//^ All animals route
app.get("/api/animals", function(req,res){
    let results = animals;
    if(req.query){
        results = filterByQuery(req.query, results);
    }
    res.json(results);
});


// Tell server to listen for requests
app.listen(PORT, function(){
    console.log(`API server now on port 3001!`);
});