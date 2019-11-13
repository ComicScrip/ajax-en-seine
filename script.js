(function() {
    ///////////////// UTILS /////////////////////////////

    /**
     * Returns true if str is considered a valid zip code, false otherwise
     */
    function isValidZipCode(str) {
        return !!str.match(/[0-9]{5}/);
    }

    /**
     * Returns true if str is considered a valid city name, false otherwise
     */
    function isValidcitycode(str) {
        return !!str.match(/[a-z]+/i);
    }

    ///////////////// NETWORK ///////////////////////////

    /**
     * Returns a Promise resolved with an array of cities with a name that begins with 'name'
     */
    function getCitiesByName(name) {
        return fetch('https://geo.api.gouv.fr/communes?nom=' +  name + '&limit=10').then(handleFetchResponse);
    }

    /**
     * Returns a Promise resolved with an array of cities with a given zip code
     */
    function getCitiesByZipCode(zipCode) {
        return fetch('https://geo.api.gouv.fr/communes?codePostal=' +  zipCode).then(handleFetchResponse);
    }

    /**
     * Returns a promise resolved with an object representing the city with the code
     * given in parameters, or undefined if none is found
     */
    function getCityByCode(citycode) {
        return fetch('https://geo.api.gouv.fr/communes?code=' +  citycode +
            '&fields=code,nom,surface,departement,population,contour,centre,codesPostaux')
            .then(handleFetchResponse).then(cities => cities[0])
    }

    ///////////////// DOM MANIPULATIONS /////////////////

    /**
     * Removes all the children of a given html element
     */
    function removeChildren(container) {
        container.querySelectorAll('*').forEach(child => child.remove());
    }

    /**
     * Returns the autocomplete list html element
     */
    function getAutocompleteListContainer() {
        return document.getElementById('autocomplete-list');
    }

    /**
     * Returns the city details html element
     */
    function getCityDetailsContainer() {
        return document.getElementById('city-details');
    }

    /**
     * Returns the autocomplete input html element
     */
    function getUserInput() {
        return document.getElementById('user-input');
    }

    /**
     * Returns an html element that represent a list item in the autocomplete input
     * @param city : an object of this shape : {nom, codeDepartement}
     */
    function getListItemHtmlElement(city) {
        const listItem = document.createElement('li');
        listItem.appendChild(
            document.createTextNode(city.nom + (city.codeDepartement ? (' - ' + city.codeDepartement) : ''))
        );
        listItem.setAttribute('data-citycode', city.code);
        listItem.setAttribute('data-cityname', city.nom);
        listItem.addEventListener('click', handleListItemSelection);
        return listItem;
    }

    /**
     * Remove all of the suggestions (html elements) of the autocomplete input
     */
    function clearAutoCompleteList() {
        removeChildren(getAutocompleteListContainer());
    }

    /**
     * Destroys and recreates the suggestions of the autocomplete input
     * @param cities : an array of object with this shape : {nom, codeDepartement}
     */
    function recreateAutocompleteList(cities) {
        clearAutoCompleteList();
        const autoCompleteList = getAutocompleteListContainer();
        cities.forEach(city => autoCompleteList.appendChild(getListItemHtmlElement(city)));
    }

    /**
     * Creates the elements for city detailed info
     * @param city : object of this shape :
     * {nom, departement: {nom}, code, population, superficie, contour, centre, codesPostaux }
     */
    function createCityDetailsElements(city) {
        const container = getCityDetailsContainer();

        if (city.centre && city.contour) {
            const cityMapElement = document.createElement('div');
            cityMapElement.setAttribute('id', 'map');
            container.appendChild(cityMapElement);
            showCityOnMap(city);
        }

        const table = document.createElement('table');
        table.setAttribute('class', 'table')

        const innerTableString = `
            <table class="table">
                 <tr>
                    <td>Code INSEE</td>
                    <td>${city.code || 'NC'}</td>
                 </tr>
                 <tr>
                    <td>Population</td>
                    <td>${city.population || 'NC'} habitants</td>
                 </tr>
                 <tr>
                    <td>Superficie</td>
                    <td>${city.surface || 'NC'} ha</td>
                 </tr>
                 <tr>
                    <td>Département</td>
                    <td>${(city.departement && city.departement.nom) || 'NC'}</td>
                 </tr>
                 <tr>
                    <td>Codes posteaux</td>
                    <td>${(city.codesPostaux && city.codesPostaux.length !== 0) ? city.codesPostaux.join(', ') : 'NC'}</td>
                 </tr>
            <table>
        `;
        table.innerHTML = innerTableString;
        container.appendChild(table);
    }

    /**
     * Removes the elements in the city-details bloc
     */
    function removeCityDetails() {
        removeChildren(getCityDetailsContainer());
    }

    function showCityOnMap(city) {
        const map = L.map('map');
        const osmLayer = L.tileLayer('http://{s}.tile.osm.org/{z}/{x}/{y}.png', {
            attribution: '© OpenStreetMap contributors',
            maxZoom: 19
        });
        map.addLayer(osmLayer);
        L.geoJSON(city.contour, {style: {"color": "#060eff", "weight": 2, "opacity": 0.3}}).addTo(map);
        map.setView([city.centre.coordinates[1], city.centre.coordinates[0]], 10);
    }

    ////////////////// EVENT HANDLERS ////////////////

    /**
     * Handles fetch response.
     * If the response is ok (status 20x), returns the JSON parsed body of the response
     * Otherwise, it returns a rejected Promise with the response payload
     */
    function handleFetchResponse(response) {
        if(response.ok) {
            return response.json();
        } else {
            return Promise.reject(response);
        }
    }

    /**
     * Handles fetch execution errors (network-relation issues)
     */
    function handleFetchError(error) {
        alert('Une erreur est survenue lors de la communication avec le service de données');
        console.error(error);
    }

    /**
     * Handle the event of the user typing in the autocomplete input
     */
    function handleUserInput() {
        const input = this.value;
        if (isValidZipCode(input)) {
            getCitiesByZipCode(input).then(recreateAutocompleteList).catch(handleFetchError);
        } else if (isValidcitycode(input)) {
            getCitiesByName(input).then(recreateAutocompleteList).catch(handleFetchError);
        } else {
            clearAutoCompleteList();
            removeCityDetails();
        }
    }

    /**
     * Handle the event of the user selecting a city from the suggestions
     */
    function handleListItemSelection() {
        const citycode = this.dataset.citycode
        const cityname = this.dataset.cityname
        getUserInput().value = cityname;
        removeCityDetails();
        getCityByCode(citycode).then(createCityDetailsElements).catch(handleFetchError);
    }

    /////////////////// EVENT BINDING /////////////////

    // give suggestions when the user searches for a city by name or zip code
    document.getElementById('user-input').addEventListener('input', handleUserInput);
    // remove the suggestion list when the user clicks anywhere
    document.addEventListener("click", clearAutoCompleteList);
})();