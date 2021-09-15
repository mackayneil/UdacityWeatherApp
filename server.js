// Empty object to act as an endpoint for all routes
let projectData = {};

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
const { ppid } = require('process');
app.use(cors());

// Initialise the main project folder
app.use(express.static('App'));

const port = 8000;

// Spin up the server
const server = app.listen(port, listening)

// Callback to debug
function listening() {
    console.log('Server is running');
    console.log(`Server is running on ${port}`);
}

// Routes
// GET route
app.get('/all', sendData);

function sendData (req, resp) {   
    resp.send(projectData)
} 

// POST route
app.post('/add', callBack);

function callBack (req, resp) {
    resp.send('POST recieved')
}

// Post an animal
const data = [];
app.post('/addMovie', addMovie);

function addMovie (req, resp) {
    console.log(data);
    data.push(req.body)
}