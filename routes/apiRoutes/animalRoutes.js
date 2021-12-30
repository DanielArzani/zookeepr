const router = require('express').Router();
const { filterByQuery, findById, createNewAnimal, validateAnimal } = require('../../lib/animal');
const { animals } = require('../../data/animals.json');

//& GET all animals
router.get("/animals", function(req,res){
    let results = animals;
    if(req.query){
        results = filterByQuery(req.query, results);
    }
    res.json(results);
});

//& GET specific params
router.get("/animals/:id", function(req,res){
    const result = findById(req.params.id, animals);
    if(result) return res.json(result);
    else return res.send(404 + " Sorry, we can't seem to find what you're searching for ");
});


//& POST client data 
router.post("/animals", function(req,res){
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

module.exports = router;