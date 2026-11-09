
function displayCountries(list) {
    let output = "";

    list.forEach(function(country) {
        output += `
            <div class="country-card">
                <h3>${country.name}</h3>
                <p>${country.continent}</p>
                <p>Capital: ${country.capital}</p>

                <button onclick="openCountry('${country.name}')">
                    View Details
                </button>

                <button onclick="addFavourite('${country.name}')">
                    ❤️
                </button>
            </div>
        `;
    });

    document.getElementById("countryGrid").innerHTML = output;
    document.getElementById("resultTotal").innerHTML =
        "Showing " + list.length + " countries";
}


// Open country details
function openCountry(name) {
    let country = countries.find(function(item) {
        return item.name === name;
    });

    if (!country) return;

    document.getElementById("mapInfo").innerHTML = `
        <h2>${country.name}</h2>
        <p>Continent: ${country.continent}</p>
        <p>Capital: ${country.capital}</p>
        <p>Food: ${country.food}</p>
        <p>Festival: ${country.festival}</p>
        <p>Language: ${country.language}</p>
        <p>Culture: ${country.culture}</p>
    `;

    document.getElementById("countryDetail").innerHTML = `
        <h2>${country.name}</h2>
        <p><b>Continent:</b> ${country.continent}</p>
        <p><b>Capital:</b> ${country.capital}</p>
        <p><b>Food:</b> ${country.food}</p>
        <p><b>Festival:</b> ${country.festival}</p>
        <p><b>Language:</b> ${country.language}</p>
        <p><b>Culture:</b> ${country.culture}</p>
        <button onclick="addFavourite('${country.name}')">
            ❤️ Add Favourite
        </button>
    `;

    document.getElementById("countryModal").style.display = "flex";
}


// Close details
document.getElementById("modalClose").onclick = function() {
    document.getElementById("countryModal").style.display = "none";
};

document.getElementById("countryModal").onclick = function(event) {
    if (event.target.id === "countryModal") {
        this.style.display = "none";
    }
};


// Search countries
document.getElementById("searchInput").addEventListener("input", filterCountries);


// Filter continent
document.getElementById("continentFilter").addEventListener("change", filterCountries);


// Sort countries
document.getElementById("sortSelect").addEventListener("change", filterCountries);


function filterCountries() {
    let search = document.getElementById("searchInput").value.toLowerCase();
    let continent = document.getElementById("continentFilter").value;
    let sort = document.getElementById("sortSelect").value;

    let result = countries.filter(function(country) {
        let matchesName = country.name.toLowerCase().includes(search);
        let matchesContinent = continent === "All" || country.continent === continent;

        return matchesName && matchesContinent;
    });

    result.sort(function(a, b) {
        return sort === "az"
            ? a.name.localeCompare(b.name)
            : b.name.localeCompare(a.name);
    });

    displayCountries(result);
}


// Display favourites
function displayFavourites() {
    let list = getFavourites();
    let output = "";

    list.forEach(function(name) {
        let country = countries.find(function(item) {
            return item.name === name;
        });

        if (country) {
            output += `
                <div class="country-card">
                    <h3>${country.name}</h3>
                    <button onclick="openCountry('${country.name}')">
                        View Details
                    </button>
                    <button onclick="removeFavourite('${country.name}')">
                        Remove
                    </button>
                </div>
            `;
        }
    });

    document.getElementById("favouriteGrid").innerHTML = output;

    document.getElementById("favouriteEmpty").style.display =
        list.length === 0 ? "block" : "none";
}


// Load comparison dropdowns
function loadCompareCountries() {
    let first = document.getElementById("compareOne");
    let second = document.getElementById("compareTwo");

    countries.forEach(function(country) {
        first.innerHTML += `<option value="${country.name}">${country.name}</option>`;
        second.innerHTML += `<option value="${country.name}">${country.name}</option>`;
    });

    second.selectedIndex = 1;
}


// Compare countries
document.getElementById("compareButton").onclick = function() {
    let name1 = document.getElementById("compareOne").value;
    let name2 = document.getElementById("compareTwo").value;

    if (name1 === name2) {
        alert("Select two different countries!");
        return;
    }

    let first = countries.find(c => c.name === name1);
    let second = countries.find(c => c.name === name2);

    document.getElementById("comparisonResult").innerHTML = `
        <div class="country-card">
            <h3>${first.name}</h3>
            <p>Capital: ${first.capital}</p>
            <p>Food: ${first.food}</p>
            <p>Festival: ${first.festival}</p>
            <p>Language: ${first.language}</p>
            <p>Culture: ${first.culture}</p>
        </div>

        <div class="country-card">
            <h3>${second.name}</h3>
            <p>Capital: ${second.capital}</p>
            <p>Food: ${second.food}</p>
            <p>Festival: ${second.festival}</p>
            <p>Language: ${second.language}</p>
            <p>Culture: ${second.culture}</p>
        </div>
    `;
};


// Profile save
document.getElementById("profileForm").onsubmit = function(event) {
    event.preventDefault();

    let profile = {
        name: document.getElementById("profileName").value,
        country: document.getElementById("homeCountry").value
    };

    saveProfile(profile);

    document.getElementById("profileMessage").innerHTML =
        "Profile saved successfully!";
};


// Load saved profile
let savedProfile = getProfile();

if (savedProfile) {
    document.getElementById("profileName").value = savedProfile.name;
    document.getElementById("homeCountry").value = savedProfile.country;
}


// Start the project
displayCountries(countries);
displayMap();
displayFavourites();
loadCompareCountries();
