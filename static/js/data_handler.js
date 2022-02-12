async function apiGet(url) {
  let response = await fetch(url, {
    method: "GET",
  });
  if (response.status === 200) {
    return response.json();
  }
}

export let dataHandler = {
  getGenres: async function () {
    return await apiGet("/api/genres");
  },
  getActorsByGenre: async function (genre) {
    console.log(`/api/actors/${genre}`)
    return await apiGet(`/api/actors/${genre}`)
  },
  getFuzzySearchResults: async function (name) {
    return await apiGet(`api/fuzzy-search/%${name}%`);
  }
}
