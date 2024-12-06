// Setup express and ejs
var express = require ('express')
var ejs = require('ejs')
var mysql = require('mysql2');

// Define the database connection
const db = mysql.createConnection ({
    host: 'localhost',
    user: 'app_user',
    password: 'qwertyuiop',
    database: 'music_theory_app'
});
// Connect to the database
db.connect((err) => {
    if (err) {
        throw err;
    }
    console.log('Connected to database');
});
global.db = db;

// Create the express application object
const app = express()
const port = 8000

// Tell Express that we want to use EJS as the templating engine
app.set('view engine', 'ejs');

// Set up the body parser 
app.use(express.urlencoded({ extended: true })); 

// Set up css
app.use(express.static(__dirname + '/public'));

// Load the route handlers
const mainRoutes = require("./routes/main");  
app.use('/', mainRoutes);

// Start the web app listening
app.listen(port, () => console.log(`Example app listening on port ${port}!`))