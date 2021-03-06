const express = require('express');
const morgan = require('morgan');
const cors = require('cors');

const app = express();

app.set('port', (3000));

app.use(express.json());
app.use(express.urlencoded({extended: false}));

// enable cors
app.use(cors());
app.options('*', cors());
app.use(function (req, res, next) {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
    next();
});

// logger layer
app.use(morgan('combined'));

// load controller
require('./controller/facebook-controller')(app);

// load route
require('./routes/facebook-routes')(app);

app.listen(app.get('port'), () => console.log(`Stack listening on port ${app.get('port')}`));
