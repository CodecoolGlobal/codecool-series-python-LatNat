import {dataHandler} from "./data_handler.js";

const searchInput = document.getElementById("character-search");
searchInput.addEventListener("change", async () => {
    let name = searchInput.value.toUpperCase();
    let data = await dataHandler.getFuzzySearchResults(name)
    console.log(data)
})