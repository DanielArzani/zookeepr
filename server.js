//* Imports
const express = require("express");
const fs = require('fs');
const path = require('path');
const {animals} = require('./data/animals.json');


//* Variables
// instantiate the server
const app = express();
// Assign port number
const PORT = process.env.PORT || 3001;

//* Methods
// parse incoming string or array data
app.use(express.urlencoded({ extended: true }));
// parse incoming JSON data
app.use(express.json());



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

//^ Gets ID params
function findById(id, animalsArray){
    const result = animalsArray.filter(animal => animal.id === id)[0];
    return result;
} 

//^ Posts new animal data
function createNewAnimal(body, animalsArray){
    const animal = body;
    animalsArray.push(animal);

    // The null argument means we don't want to edit any of our existing data; if we did, we could pass something in there. The 2 indicates we want to create white space between our values to make it more readable.
    fs.writeFileSync(
        path.join(__dirname, './data/animals.json'), 
        JSON.stringify({animals: animalsArray}, null, 2)
        );

    return body;
}

//^ Validate animal data
function validateAnimal(animal){
    if(!animal.name || typeof animal.name !== 'string') return false;
    if(!animal.species || typeof animal.species !== 'string') return false;
    if(!animal.diet || typeof animal.diet !== 'string') return false;
    if(!animal.personalityTraits || !Array.isArray(animal.personalityTraits)) return false;

    return true;
}

//* GET Routes

//^ GET all animals
app.get("/api/animals", function(req,res){
    let results = animals;
    if(req.query){
        results = filterByQuery(req.query, results);
    }
    res.json(results);
});

//^ GET specific params
app.get("/api/animals/:id", function(req,res){
    const result = findById(req.params.id, animals);
    if(result) return res.json(result);
    else return res.send(404 + " Sorry, we can't seem to find what you're searching for ");
});


//* POST Routes

//& POST client data 
app.post("/api/animals", function(req,res){
    // set id based on what the next index of the array will be
    req.body.id = animals.length.toString();

    // if any data in req.body is incorrect, send 400 error back
    if(!validateAnimal(req.body)){
        res.status(400).send("The animal is not properly formatted");
    }else{
        // set id based on what the next index of the array will be
        const animal = createNewAnimal(req.body, animals);
    
        res.json(animal);
    }
});



// Tell server to listen for requests
app.listen(PORT, function(){
    console.log(`API server now on port 3001!`);
});