// Setup empty JS object to act as endpoint for all routes
projectData = {};

// Require Express to run server and routes
const express = require('express');
// Start up an instance of app
const app = express();
/* Middleware*/
//Here we are configuring express to use body-parser as middle-ware.
const bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Cors for cross origin allowance
const cors = require('cors');
app.use(cors());
// Initialize the main project folder
app.use(express.static('website'));


// Setup Server
const port = 8880;
const server = app.listen(port, listening);
function listening() {
    console.log(`server start on port:  ${port}`);
}

// Create Get routes
app.get('/weatherData', function (request, response) {
    response.send(projectData);
});

// Create post route to make new entry in the apps endpoint consisting of the data received from the client side POST.
app.post('/postWeatherData', function (req, res) {
    
    projectData.date = req.body.date;
    projectData.temp = req.body.temp;
    projectData.content = req.body.content;    
    res.end();
});