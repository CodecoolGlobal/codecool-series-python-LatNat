const apiKey = '337ddeb9751222710ad6dd2bf5794684'
const postersUrlBase = 'https://image.tmdb.org/t/p/original'



async function getPosterUrl(show) {
    const firstMatch = 0;
    const jpegPath = await findShow(show);
    return postersUrlBase + jpegPath.results[firstMatch].poster_path;
}

async function findShow(show) {
    const showObject = await fetch(`https://api.themoviedb.org/3/search/movie?api_key=337ddeb9751222710ad6dd2bf5794684&query=${show}`);
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