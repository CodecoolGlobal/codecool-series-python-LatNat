import {databaseQuery} from "./query-handler.js";
import {createTable} from "./html-factory.js";

function getGenreNodes() {
    const genreNodes = document.querySelectorAll('.genre');
    genreNodes.forEach(item => item.addEventListener("click", e => getShowsByGenre(e)))
}

async function getShowsByGenre(e) {
    const genre_id = e.target.dataset.genreId;
    await databaseQuery.getShowsByGenreWithActorLimit(genre_id)
        .then(data => {
            const tableContainer = document.getElementById("table-container");
            const tableHeaderList = ["title", "year", "genre", "actors_count", "rating"];
            tableContainer.innerHTML = createTable(data, tableHeaderList);
        });
}

getGenreNodes()

