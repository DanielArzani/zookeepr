const fs = require('fs');
const path = require('path');


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
        path.join(__dirname, '../data/animals.json'), 
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


module.exports = {
    filterByQuery,
    findById,
    createNewAnimal,
    validateAnimal
}