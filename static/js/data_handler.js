async function apiGet(url) {
  let response = await fetch(url, {
    method: "GET",
  });
  if (response.status === 200) {
    let data = response.json();
    return data;
  }
}

export let dataHandler = {
  getGenres: async function () {
    let data = await apiGet("/api/genres");
    console.log(data)
    return data
  },
  getActorsByGenre: async function (genre) {
    console.log(`/api/actors/${genre}`)
    let data = await apiGet(`/api/actors/${genre}`)
    console.log(data)
    return data
  }
}
