const db = require('../database/database');

function insertLocation(request, response) {
    db.insertData(request.query, response)
}

function updateData(request, response) {
    db.updateData(request.query, response)
}

function getData(request, response) {
    db.getData(response)
}

function getLocation(request, response) {
    db.getLocation(request.query.id, response)
}


module.exports = {
    insertLocation,
    getData,
    getLocation,
    updateData
};
