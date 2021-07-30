const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors')
const config = require('config')
const morgan = require('morgan')

// configuring cors
const corsOptions = {
  origin: 'http://localhost:3001',
  optionsSuccessStatus: 200 // some legacy browsers (IE11, various SmartTVs) choke on 204
};

// create express app
const app = express();

app.use(cors(corsOptions));

// parse requests of content-type - application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }))

// parse requests of content-type - application/json
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.text());
app.use(bodyParser.json({ type: 'application/json'}));

// configuring the database
const dbConfig = require('./config/database.config.js');
const mongoose = require('mongoose');

mongoose.Promise = global.Promise;

const options = {
  useUnifiedTopology: true,
  useNewUrlParser: true
};

// Connecting to the database
mongoose.connect(dbConfig.url, options, {
    useNewUrlParser: true
}).then(() => {
    console.log("\x1b[35m%s\x1b[0m", "Successfully connected to the database!!!");    
}).catch(err => {
    console.log('Could not connect to the database. Exiting now...', err);
    process.exit();
});

//don't show the log when it is test
if(config.util.getEnv('NODE_ENV') !== 'test') {
  //use morgan to log at command line
  app.use(morgan('combined')); //'combined' outputs the Apache style LOGs
}

// define a simple route
app.get('/', (req, res) => {
    res.json({"message": "Welcome to TODO application. Create TODOs quickly. Organize and keep track of all your activities."});
});

// include require Todos routes
require('./app/routes/todo.routes.js')(app);

// listen for requests
module.exports = app.listen(3000, () => {
    console.log('\x1b[36m%s\x1b[0m', "Server is listening on port 3000 🚀 ");
});
