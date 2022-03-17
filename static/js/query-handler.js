export const databaseQuery = {
    getShowsByGenreWithActorLimit: async function(genre_id) {
        let response = await getApiData(`/api/shows-by-genre-id/${genre_id}`);
        return response
    }
}

async function getApiData(url) {
    const response = await fetch(url,
        { method: 'GET' })
    if (!response.ok) {
        console.log(`Error. ${response.url} ${response.statusText}. Status: ${response.status}`)
    }
    return response.json()
}