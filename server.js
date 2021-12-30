//* Imports
const apiRoutes = require('./routes/apiRoutes');
const htmlRoutes = require('./routes/htmlRoutes');
const express = require("express");
// const fs = require('fs');
// const path = require('path');
// const {animals} = require('./data/animals.json');


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
// Allows us to use non-specified static files
app.use(express.static('public'));
// Tells the server that any time a client navigates to <ourhost>/api, the app will use the 
// router we set up in apiRoutes. If '/' is the endpoint, then the router will serve back our HTML routes.
app.use('/api', apiRoutes);
app.use('/', htmlRoutes);

//* Tell server to listen for requests
app.listen(PORT, function(){
    console.log(`API server now on port 3001!`);
});