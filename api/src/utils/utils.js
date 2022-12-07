const axios = require('axios');
const fetch = require('node-fetch');

// var options = {
//   "method": 'GET',
//   "Accept": "application/vnd.api+json",
//   "Content-Type": "application/vnd.api+json"
// };

exports.getAllAnime = async () => {  
  try {
    const numberOfRequests = 10;
    let offset = 0;
    let allAnimes = [];
    
    for(let i = 0; i < numberOfRequests; i++) {

      const info = await fetch(`https://kitsu.io/api/edge/anime?page[limit]=20&page[offset]=$${offset}`).then(response => response.json()).then(data => data.data);
      const animesPerRequest = [];

      info.map((animeApi) => {
        let anime = {}
        anime.name = animeApi.attributes.titles.en ? animeApi.attributes.titles.en : animeApi.attributes.titles.en_jp;
        anime.userCount = animeApi.attributes.userCount;
        anime.synopsis = animeApi.attributes.synopsis;
        anime.averageRating = animeApi.attributes.averageRating;
        anime.favoritesCount = animeApi.attributes.favoritesCount;
        anime.startDate = animeApi.attributes.startDate;
        anime.endDate = animeApi.attributes.endDate;
        anime.popularityRank = animeApi.attributes.popularityRank;
        anime.ratingRank = animeApi.attributes.ratingRank;
        anime.status = animeApi.attributes.status;
        anime.posterImage = animeApi.attributes.posterImage.original; // va original
        anime.coverImage = animeApi.attributes.coverImage? animeApi.attributes.coverImage.original : null; // va original
        anime.episodeCount = animeApi.attributes.episodeCount;
        anime.episodeLength = animeApi.attributes.episodeLength;
        anime.youtubeVideoId = animeApi.attributes.youtubeVideoId;
        anime.showType = animeApi.attributes.showType;
        anime.ageRatingGuide = animeApi.attributes.ageRatingGuide;

        animesPerRequest.push(anime);
      });
      allAnimes = [...allAnimes, ...animesPerRequest];
      offset += 20;
    }

    return allAnimes;

  } catch (error) {
    return "ESTO ES ERROR UTILS " + error.message;
  }
}

exports.getAllGenres = async (limitOfGenres = 62) => {
  try {
    let genres = [];
  
    let apiData = await fetch(`https://kitsu.io/api/edge/genres?page[limit]=${limitOfGenres}&page[offset]=0`)
    .then(res => res.json())
    .then(resJSON => resJSON.data);
  
    genres = apiData.map(genre => {
        return {id: genre.id, name: genre.attributes.name}
    })
  
    return genres
  } catch (error) {
    return error.message;
  }
}

exports.getAllReviews = async () => {
  return ['Reviews'];
}

exports.getAllEpisodes = async () => {
  return ['Reviews'];
}
// getApiData().then(info => console.log(info));