const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const mongoose = require('mongoose');

/** Connect MongoDB */
const mongodb = 'mongodb://kornthebkk:x34udwe34bv@ds023425.mlab.com:23105/property';
//const mongodb = 'mongodb://localhost:27017/property'
mongoose.connect(mongodb);

const PORT = process.env.PORT || 5000;

const app = express();

app.use(cors());

app.use(bodyParser.json()); 

/** routes */
app.use('/api/properties', require('./route/properties'));

app.get('/', (req, res) => {
    res.send('nodejs server works!');
});

app.listen(PORT, () => console.log('Server is running on localhost:' + PORT));
