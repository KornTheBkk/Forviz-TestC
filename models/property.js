
class Property {

    search(db, params) {

        let filter = '';
        let sql_params = [];
        // console.log(params);

        if (params.uniq_id) {
            filter = ' AND uniq_id = ?';
            sql_params.push(params.uniq_id);
        }

        if (params.property_type) {
            filter = filter + ' AND property_type = ?';
            sql_params.push(params.property_type);
        }

        if (params.city) {
            filter = filter + ' AND city = ?';
            sql_params.push(params.city);
        }

        if (params.amenities) {
            filter = filter + ' AND amenities = ?';
            sql_params.push(params.amenities);
        }

        if (params.min_price && params.max_price) {
            filter = filter + ' AND (room_price BETWEEN ? AND ?)';
            sql_params.push(params.min_price);
            sql_params.push(params.max_price);
        }

        if (params.latitude && params.longitude) {
            filter = filter + ' AND latitude = ? AND longitude = ?';
            sql_params.push(params.latitude);
            sql_params.push(params.longtitude);
        }

        const sql = 'SELECT * FROM properties WHERE 1 = 1' + filter;
        // console.log(sql);

        return new Promise((resolve, reject) => {
            db.getConnection((error, connection) => {
                if (error) return reject(error);

                connection.query(sql, sql_params, (error, results) => {
                    if (error) return reject(error);
                    resolve(results);
                });
            });
        })
    }

}

module.exports = Property;