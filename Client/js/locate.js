'use strict'

let map, marker

const locateMeBtn = document.getElementById("findLocation")

locateMeBtn.addEventListener("click", this.locateMe)

function locateMe(update = 0) {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(location => locationSuccess(location, update), err => locationFail(err))
    } else {
        console.log("This Browser doesn't support geolocation feature")
    }
}

function locationSuccess(location, update) {
    const latitude = location.coords.latitude
    const longitude = location.coords.longitude

    const position = {
        lat: latitude,
        lng: longitude
    }
    showMap(position)
    getCityName(position, update)
}

function locationFail(err) {
    alert(err.message)
}

function showMap(pos) {

    $(locateMeBtn).hide()
    map = new google.maps.Map(document.getElementById("map"), {
        center: {lat: pos.lat, lng: pos.lng},
        zoom: 17,
    });
    marker = new google.maps.Marker({
        position: pos,
        map,
    });
}

function getCityName(pos, update) {
    $.ajax({
        url: "https://geocode.xyz/" + pos.lat + "," + pos.lng + "?geoit=json",
    })
        .done(function (data) {
            if (data.city) {
                document.getElementById('currentLocation').innerText = "Latitude: " + pos.lat + ", Longitude: " + pos.lng + " City: " + data.city

                if (update != 1) {
                    createUpdateBtn()
                    console.log(update)
                    saveToDB(pos.lat, pos.lng, data.city);
                } else {
                    updateDb(pos.lat, pos.lng, data.city, getCookie())
                }
            }
        });
}

function saveToDB(lat, lang, city) {
    $.ajax({

        url: `http://localhost:3002/newData?latitude=${lat}&longitude=${lang}&city=${city}`,
    })
        .done(function (data) {
            if (data.result != 0) {
                setCookie(data.result.insertId)
            } else {
                console.log("data save error")
            }
        });
}

function updateDb(lat, lang, city, id) {
    $.ajax({

        url: `http://localhost:3002/updateData?id=${id}&latitude=${lat}&longitude=${lang}&city=${city}`,
    })
        .done(function (data) {
            if (data.result != 0) {
                console.log("data save success")
            } else {
                console.log("data save error")
            }
        });
}

function getSavedLocation(locationId) {

    $.ajax({
        url: "http://localhost:3002/getLocation?id=" + locationId
    }).done((data) => {
        let latitude = data.result[0].latitude
        let longitude = data.result[0].longitude
        let city = data.result[0].city

        const position = {
            lat: latitude,
            lng: longitude
        }

        showMap(position)
        document.getElementById('currentLocation').innerText = "Latitude: " + latitude + ", Longitude: " + longitude + " City: " + city

        createUpdateBtn()

    })
}

function createUpdateBtn() {
    let updateBtn = document.createElement("button")
    updateBtn.setAttribute("id", "updateLocation")
    updateBtn.setAttribute("class", "btn btn-warning btn-lg")

    let btnText = document.createTextNode("Update Location")
    updateBtn.appendChild(btnText)

    updateBtn.addEventListener("click", (e)=>{locateMe(1)})
    document.getElementById("results").appendChild(updateBtn)
}
