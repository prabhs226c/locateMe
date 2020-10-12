let mysql = require('mysql');
let con = mysql.createConnection({
    host: "127.0.0.1",
    user: "root",
    port: 3306,
    password: "prabhs226",
    database: "test_location"
});

function insertData(data, response) {
    let sql = "INSERT INTO location(latitude,longitude,city) VALUES (" + data.latitude + ", " + data.longitude + ",'" + data.city + "')";

    return con.query(sql, function (err, _result) {
        if (err) {
            console.log(err);

            response.json({result: 0})
        } else {

            response.json({result: _result})
        }
    });
}

function updateData(data, response) {
    let sql = "UPDATE location SET latitude = " + data.latitude + ", longitude = " + data.longitude + ",city='" + data.city + "' WHERE id = " + data.id;
    return con.query(sql, function (err, _result) {
        if (err) {
            console.log(err);
            response.json({result: 0})
        } else {
            response.json({result: _result})
        }
    });
}

function getData(response) {
    con.query("SELECT  * FROM location  Order By id DESC limit 10 ", function (err, _result, fields) {
        if (err) {
            throw err;
        } else {
            response.json({result: _result})
        }
    });
}

function getLocation(id, response) {
    con.query("select * from location where id=" + id, function (err, _result, fields) {
        if (err) {
            throw err;
        } else {
            response.json({result: _result})
        }
    })
}

module.exports = {
    insertData,
    getData,
    getLocation,
    updateData
}
