(function() {
    ///////////////// UTILS /////////////////////////////

    /**
     * Returns true if str is considered a valid zip code, false otherwise
     */
    function isValidZipCode(str) {

    }

    /**
     * Returns true if str is considered a valid city name, false otherwise
     */
    function isValidcitycode(str) {

    }

    ///////////////// NETWORK ///////////////////////////

    /**
     * Returns a Promise resolved with an array of cities with a name that begins with 'name'
     */
    function getCitiesByName(name) {

    }

    /**
     * Returns a Promise resolved with an array of cities with a given zip code
     */
    function getCitiesByZipCode(zipCode) {

    }

    /**
     * Returns a promise resolved with an object representing the city with the code
     * given in parameters, or undefined if none is found
     */
    function getCityByCode(citycode) {

    }

    ///////////////// DOM MANIPULATIONS /////////////////

    /**
     * Removes all the children of a given html element
     */
    function removeChildren(container) {

    }

    /**
     * Returns the autocomplete list html element
     */
    function getAutocompleteListContainer() {
        r
    }

    /**
     * Returns the city details html element
     */
    function getCityDetailsContainer() {

    }

    /**
     * Returns the autocomplete input html element
     */
    function getUserInput() {

    }

    /**
     * Returns an html element that represent a list item in the autocomplete input
     * @param city : an object of this shape : {nom, codeDepartement}
     */
    function getListItemHtmlElement(city) {

    }

    /**
     * Remove all of the suggestions (html elements) of the autocomplete input
     */
    function clearAutoCompleteList() {

    }

    /**
     * Destroys and recreates the suggestions of the autocomplete input
     * @param cities : an array of object with this shape : {nom, codeDepartement}
     */
    function recreateAutocompleteList(cities) {

    }

    /**
     * Creates the elements for city detailed info
     * @param city : object of this shape :
     * {nom, departement: {nom}, code, population, superficie, contour, centre, codesPostaux }
     */
    function createCityDetailsElements(city) {

    }

    /**
     * Removes the elements in the city-details bloc
     */
    function removeCityDetails() {

    }

    function showCityOnMap(city) {

    }

    ////////////////// EVENT HANDLERS ////////////////

    /**
     * Handles fetch response.
     * If the response is ok (status 20x), returns the JSON parsed body of the response
     * Otherwise, it returns a rejected Promise with the response payload
     */
    function handleFetchResponse(response) {

    }

    /**
     * Handles fetch execution errors (network-relation issues)
     */
    function handleFetchError(error) {

    }

    /**
     * Handle the event of the user typing in the autocomplete input
     */
    function handleUserInput() {

    }

     /**
     * Handle the event of the user selecting a city from the suggestions
     */
    function handleListItemSelection() {

    }

    /////////////////// EVENT BINDING /////////////////

    // give suggestions when the user searches for a city by name or zip code
    document.getElementById('user-input').addEventListener('input', handleUserInput);
})();