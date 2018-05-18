const router = require('express').Router();
const Video = require('../models/property');


router.get('/', (req, res) => {
    res.send('properties api works!');
})

router.get('/search', (req, res) => {

    // receive parammeters for filter
    const uniq_id = req.query.uniq_id;
    const property_type = req.query.property_type;
    const city = req.query.city;
    const amenities = req.query.amenities;
    const room_price = req.query.room_price; // price range: min_price-max_price
    const location = req.query.location; // location: latitude,longitude

    let latitude, longitude, min_price, max_price;

    let criteria = '';

    // prepare room price range min & max
    if (room_price) {
        [min_price, max_price] = room_price.split('-');
    }

    // prepare latitude and longitude
    if (location) {
        [latitude, longitude] = location.split(',');
    }

    // combine criterias
    if (uniq_id) {
        if (criteria) criteria += ', ';
        criteria += `"uniq_id": "${uniq_id}"`;
    }

    if (property_type) {
        if (criteria) criteria += ', ';
        criteria += `"property_type": "${property_type}"`;
    }

    if (city) {
        if (criteria) criteria += ', ';
        criteria += `"city": "${city}"`;
    }

    if (amenities) {
        if (criteria) criteria += ', ';
        criteria += `"amenities": "${amenities}"`;
    }

    if (latitude && longitude) {
        if (criteria) criteria += ', ';
        criteria += `"latitude": "${latitude}", longitude": "${longitude}"`;
    }
 
    // convert to json object
    criteria = JSON.parse(`{${criteria}}`);
    console.log(criteria);

    Video.find(criteria)
        .then(results => {
            res.status(200).send({ total: results.length, data: results });
        })
        .catch(error => {
            res.status(400).send(error);
        });
});

module.exports = router;
