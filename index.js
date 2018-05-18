const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const mysql = require('mysql');

const app = express();

app.use(cors());

app.use(bodyParser.json()); 

/** connect mysql db */
const dbPool = mysql.createPool({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'property',
})

dbPool.on('connection', connection => { 
    connection.query('SET NAMES utf8');
});

app.use((req, res, next) => { 
    //bind dbPool with req
    req.dbPool = dbPool;
    next();
});

/** routes */
app.use('/api/properties', require('./route/properties'));

app.get('/', (req, res) => {
    res.send('server works!');
});

app.listen(3000, () => console.log('Server is running on localhost:3000'));