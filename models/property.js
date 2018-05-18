const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const propertySchema = new Schema({
    uniq_id: String,
    property_type: String,
    city: String,
    amenities: String,
    room_price: String,
    latitude: Number,
    longitude: Number
}, { strict: false });

module.exports = mongoose.model('property', propertySchema, 'properties');
