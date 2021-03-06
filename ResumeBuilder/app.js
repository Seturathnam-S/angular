require('./config/config');
require('./models/db');
require('./config/passportConfig');
var formController = require('./controllers/formController.js');
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const passport = require('passport');

const rtsIndex = require('./routes/index.router');

var app = express();

// middleware
app.use(bodyParser.json());
app.use(cors({ origin: 'http://localhost:4200' }));
app.use(passport.initialize());
app.use('/api', rtsIndex);
app.use('/form', formController);

// error handler
app.use((err, req, res, next) => {
    if (err.name === 'ValidationError') {
        var valErrors = [];
        Object.keys(err.errors).forEach(key => valErrors.push(err.errors[key].message));
        res.status(422).send(valErrors)
    }
});
app.use(express.static(__dirname + '/angular-app'));

app.get('/*', function(req,res) {

res.sendFile(path.join(__dirname+'/angular-app/index.html'));
});
// start server
app.listen(process.env.PORT, () => console.log(`Server started at port : ${process.env.PORT}`));
