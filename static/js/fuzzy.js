import {dataHandler} from "./data_handler.js";



function clearElement(element) {
    while (element.hasChildNodes()) {
        element.lastChild.remove();
    }
}


function showResultsForFuzzySearch(results) {
    const resultsCard = document.getElementById("fuzzy-results");
    clearElement(resultsCard)
    for (let result of results) {
        let resultRow = document.createElement("p");
        resultRow.innerHTML = `${result.name} played <b>${result.character_name}</b> in ${result.title}`;
        resultsCard.appendChild(resultRow)
    }
}


window.onload = async function() {
    const searchButton = document.getElementById("search-button");
    searchButton.addEventListener("click", async () => {
        let searchInput = document.getElementById("character-search");
        let name = searchInput.value.toUpperCase();
        let response = await dataHandler.getFuzzySearchResults(name)
        showResultsForFuzzySearch(response);
    })
}