
function displayMap() {
    let output = "";

    countries.forEach(function(country) {
        output += `
            <button
                class="map-marker"
                title="${country.name}"
                style="left:${country.x}%; top:${country.y}%"
                onclick="openCountry('${country.name}')">
                ●
            </button>
        `;
    });

    document.getElementById("mapMarkers").innerHTML = output;
}
