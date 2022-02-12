import {dataHandler} from "./data_handler.js";



window.onload = async function() {
    const searchInput = document.getElementById("character-search");
    searchInput.addEventListener("change", async () => {
    let name = searchInput.value.toUpperCase();
    return await dataHandler.getFuzzySearchResults(name)
})

}