import { dataHandler } from './data_handler.js';

function selectionEventHandler() {
    const dropDownMenu = document.querySelectorAll("option");
    for (let option of dropDownMenu) {
        option.addEventListener("click", async (e) => {
            clearTable()
            const selection = e.target.value;
            let response = await dataHandler.getActorsByGenre(selection);
            buildTableFromResponse(response);
        })
    }
}

function clearTable() {
    let tBody = document.querySelector("tbody");
    while (tBody.hasChildNodes()) {
        tBody.removeChild(tBody.lastChild)
    }
}

function buildTableFromResponse(response) {
    let tBody = document.querySelector("tbody");
    for (let data of response) {
        let tableRow = document.createElement("tr");
        let tableCell = document.createElement("td");
        tableCell.innerText = data.name;
        tableRow.appendChild(tableCell);
        tBody.appendChild(tableRow)
    }
}


selectionEventHandler();
window.onload = async function(){
    let response = await dataHandler.getActorsByGenre(1)
    let tBody = document.querySelector("tbody");
    for (let data of response) {
        let tableRow = document.createElement("tr");
        let tableCell = document.createElement("td");
        tableCell.innerText = data.name;
        tableRow.appendChild(tableCell);
        tBody.appendChild(tableRow)
    }
}