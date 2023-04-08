// Setup empty JS object to act as endpoint for all routes
projectData = {};

// Require Express to run server and routes
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
// Start up an instance of app
const app = express();
/* Middleware*/
//Here we are configuring express to use body-parser as middle-ware.
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Cors for cross origin allowance
app.use(cors());
// Initialize the main project folder
app.use(express.static('website'));

app.get('/', (req,res) => {
    res.sendFile( __dirname + '/website/index.html' );
});

// Get Route EndPoint
app.get('/getData', (req,res) => {
    res.send(projectData);
//    res.status(200).json({
//        message: 'data sent'
//    });
});

//keep the browser console clear
app.get('/favicon.ico', (req,res) => {
    res.send('_');
});

app.post('/storeData', (req,res) => {
    let newData = req.body;
    let newElement = { 
        temperature : newData.temperature,
        date:         newData.date,
        usertext:     newData.usertext, 
        location:     newData.location,
    }
    //console.log(JSON.stringify(newElement));
    projectData.entry = newElement;
    res.status(201).json({
        message: 'data received',
        data: projectData,
    });
});

// Setup Server
const port = 3000;
app.listen(port, () => {
    console.log(`server startup port: ${port}`);
});
