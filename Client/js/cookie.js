function setCookie(value) {
    var d = new Date();
    d.setTime(d.getTime() + (60 * 60 * 1000));
    var expires = "expires=" + d.toUTCString();
    document.cookie = "id=" + value + ";SameSite=Lax;" + expires + ";path=/";
}

function getCookie() {
    var name = "id=";
    var ca = document.cookie.split(';');
    for (var i = 0; i < ca.length; i++) {
        var c = ca[i];
        while (c.charAt(0) == ' ') {
            c = c.substring(1);
        }
        if (c.indexOf(name) == 0) {
            return c.substring(name.length, c.length);
        }
    }
    return "";
}

function checkCookie() {
    var locationId = getCookie();
    if (locationId != "") {
        getSavedLocation(locationId)
    }
}

window.onload = (e) => {
    checkCookie();

}
