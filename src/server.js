const express = require('express');
const morgan = require("morgan");
const bodyParser = require('body-parser')
const request = require('request');
const cors = require("cors");
const path = __dirname + '/app/views/';

const app = express();

// Configuration
const PORT = 5000;
const HOST = "localhost";
const API_SERVICE_URL = "https://api.duckduckgo.com/";
const corsOptions = {
    origin: "http://localhost:3000"
};

// Logging
app.use(morgan('dev'));
app.use(express.static(path));
app.use(cors(corsOptions));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

////////  start routes  /////////
app.get("/", (req, res) => {
    res.sendFile(path.join(__dirname, "public", "index.html"));
});

app.get('/api/', function (req, res) {
    res.json({data: 'api is up', err: null});
});

app.get('/api/search', function(req,res) {
    const {q} = req.query;
    const newUrl = (`${API_SERVICE_URL}?q=${q}&format=json`);
    const data = request(newUrl).pipe(res);
    return data;
});
////////  end routes  /////////

// Start the Proxy
app.listen(PORT, HOST, () => {
    console.log(`Starting Proxy at ${HOST}:${PORT}`);
});
