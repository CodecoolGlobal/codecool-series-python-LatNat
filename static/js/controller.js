import { dataHandler } from './data_handler.js';

function selectionEventHandler() {
    const dropDownMenu = document.querySelectorAll("option");
    for (let option of dropDownMenu) {
        option.addEventListener("click", async (e) => {
            clearTable();
            const selection = e.target.value;
            let response = await dataHandler.getActorsByGenre(selection);
            buildTableFromResponse(response);
        })
    }
}

function clearTable() {
    let tBody = document.querySelector("tbody");
    while (tBody.hasChildNodes()) {
        tBody.removeChild(tBody.lastChild);
    }
}

function buildTableFromResponse(response) {
    let tBody = document.querySelector("tbody");
    for (let data of response) {
        let tableRow = document.createElement("tr");
        let tableCell = document.createElement("td");
        tableCell.innerText = data.name;
        tableRow.appendChild(tableCell);
        tBody.appendChild(tableRow);
    }
}


function filterByName() {
    console.log('hi')
    let nameInput = document.getElementById("name");
    let actors = document.querySelectorAll("tbody td");
    for (let actor of actors) {
        if (actor.innerText.toUpperCase().search(nameInput.value.toUpperCase()) === -1) {
            actor.style.display = 'none';
        } else {
            actor.style.display = '';
        }
    }
}


function inputEventHandler() {
    const input = document.getElementById("name");
    input.addEventListener("keyup", filterByName)
}


inputEventHandler();
selectionEventHandler();
window.onload = async function(){
    clearTable();
    const selection = await document.querySelector("select");
    console.log(selection)
    let response = await dataHandler.getActorsByGenre(selection.value)
    let tBody = document.querySelector("tbody");
    for (let data of response) {
        let tableRow = document.createElement("tr");
        let tableCell = document.createElement("td");
        tableCell.innerText = data.name;
        tableRow.appendChild(tableCell);
        tBody.appendChild(tableRow);
    }
}
