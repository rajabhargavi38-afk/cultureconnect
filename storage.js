
function getFavourites() {
    return JSON.parse(localStorage.getItem("favourites")) || [];
}

function addFavourite(name) {
    let list = getFavourites();

    if (!list.includes(name)) {
        list.push(name);
        localStorage.setItem("favourites", JSON.stringify(list));
        alert("Added to favourites!");
    } else {
        alert("Already added!");
    }

    displayFavourites();
}

function removeFavourite(name) {
    let list = getFavourites();

    list = list.filter(function(item) {
        return item !== name;
    });

    localStorage.setItem("favourites", JSON.stringify(list));
    displayFavourites();
}

function saveProfile(profile) {
    localStorage.setItem("profile", JSON.stringify(profile));
}

function getProfile() {
    return JSON.parse(localStorage.getItem("profile")) || null;
}
