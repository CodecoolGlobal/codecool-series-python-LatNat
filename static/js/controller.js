import { dataHandler } from './data_handler.js';

function selectionEventHandler() {
    const dropDownMenu = document.querySelectorAll("option");
    for (let option of dropDownMenu) {
        option.addEventListener("click", (e) => {
            const selection = e.target.value;
            dataHandler.getActorsByGenre(selection).then(response => console.log(response))
        })
    }
}


selectionEventHandler();