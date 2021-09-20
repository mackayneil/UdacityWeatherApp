// Express, used to run server and routes
const express = require('express');

// An instance of app
const app = express();

// Dependencies
const bodyParser = require('body-parser');

// Middleware
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

// Cors for cross origin allowance 
const cors = require('cors');
app.use(cors());

// Defines the port number 
const port = 8000;

// Spin up the server
const server = app.listen(port, listening)

// Callback to debug
function listening() {
    console.log('Server is running');
    console.log(`Server is running on ${port}`);
}

// Initialise the main project folder
app.use(express.static('App'));


// Empty object to act as an endpoint for all routes
let appData = {};

// Routes

// GET request
app.get('/all', function (request, response) {
    response.send(appData);  
  });


app.post('/add', function ( request ,response ) {
    response.send('POST received');
  });

// POST request
const data = [];
app.post('/addData', function (request, response) {
    data.push(request.body);
    appData["answer"]= request.body.answer;
    console.log(`this is body`);
    console.log(request.body);
    console.log(`this is appData`);
    console.log(appData);
    console.log(`this is data`);
    console.log(data);
})

