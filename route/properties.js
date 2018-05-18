const router = require('express').Router();
const PropertyModel = require('../models/property');
const Property = new PropertyModel();

router.get('/', (req, res) => {
    res.send('api properties works!');
})

router.get('/search', (req, res) => {

    const db = req.dbPool;

    /** filter */
    const uniq_id = req.query.uniq_id;
    const property_type = req.query.property_type;
    const city = req.query.city;
    const amenities = req.query.amenities;
    const room_price = req.query.room_price; // price range: min_price-max_price
    const location = req.query.location; // location: latitude,longitude
    
    let latitude, longitude, min_price, max_price;

    if (room_price) {
        [min_price, max_price] = room_price.split('-');
    }

    if (location) {
        [latitude, longitude] = location.split(',');
    }

    const params = { uniq_id, property_type, city, amenities, latitude, longitude, min_price, max_price };
    //console.log(params);

    Property.search(db, params)
        .then(results => {
            res.send({ total: results.length, data: results });
        })
        .catch(error => {
            res.send(error);
        })
})

module.exports = router;