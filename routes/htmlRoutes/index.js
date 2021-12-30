const path = require('path');
const router = require('express').Router();



//& GET home route
router.get("/", function(req,res){
    // I think using path will automatically fix the path thus we can use ./
    res.sendFile(path.join(__dirname, "../../public/index.html"));
});

//& GET animals route
router.get("/animals", function(req,res){
   res.sendFile(path.join(__dirname, '../../public/animals.html'));
});

//& GET zookeepers route
router.get("/zookeepers", function(req,res){
    res.sendFile(path.join(__dirname, '../../public/zookeepers.html'));
});

//& Wildcard Routes
// The * will act as a wildcard, meaning any route that wasn't previously 
// defined will fall under this request and will receive the homepage as the response. 
router.get("*", function(req,res){
    res.sendFile(path.join(__dirname, "../../public/index.html"));
});



module.exports = router;