const apiKey = '337ddeb9751222710ad6dd2bf5794684'
const postersUrlBase = 'https://image.tmdb.org/t/p/original'



async function getPosterUrl(show) {
    const allMatches = await findShow(show);
    for (let match of allMatches.results) {
        if (show === match.name) {
            let jpegPath = match.poster_path;
            return postersUrlBase + jpegPath
        }
    }
    console.log("poster not found");
}

async function findShow(show) {
    const showObject = await fetch(`https://api.themoviedb.org/3/search/tv?api_key=337ddeb9751222710ad6dd2bf5794684&query=${show}&language=en-US&page=1`);
    return await showObject.json();
}
function createImageTag() {
    const image = document.createElement("img");
    image.className = "poster col col-third";
    return image;
}

async function displayShowPoster() {
    const posterPlace = await document.querySelector(".poster");
    const container = await document.querySelector(".detailed-view .row")
    const show = posterPlace.dataset.showTitle;
    const imageTag = createImageTag();
    imageTag.src = await getPosterUrl(show);
    container.replaceChild(imageTag, posterPlace);
}

