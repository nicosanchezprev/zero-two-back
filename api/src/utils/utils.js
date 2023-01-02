const axios = require('axios');
// const fetch = require('node-fetch');


// var options = {
//   "method": 'GET',
//   "Accept": "application/vnd.api+json",
//   "Content-Type": "application/vnd.api+json"
// };
const createAnimeObject = (animeApi, genresApi) => {
  let anime = {}
        anime.id = animeApi.id;
        anime.name = animeApi.attributes.titles.en ? animeApi.attributes.titles.en : animeApi.attributes.titles.en_jp ? animeApi.attributes.titles.en_jp : "No hay nombre";
        anime.userCount = animeApi.attributes.userCount;
        anime.synopsis = animeApi.attributes.synopsis;
        anime.averageRating = animeApi.attributes.averageRating;
        anime.favoritesCount = animeApi.attributes.favoritesCount;
        anime.startDate = animeApi.attributes.startDate;
        anime.endDate = animeApi.attributes.endDate;
        anime.popularityRank = animeApi.attributes.popularityRank;
        anime.ratingRank = animeApi.attributes.ratingRank;
        anime.status = animeApi.attributes.status;
        anime.posterImage = animeApi.attributes.posterImage?.original; // va original
        anime.coverImage = animeApi.attributes.coverImage? animeApi.attributes.coverImage.original : null; // va original
        anime.episodeCount = animeApi.attributes.episodeCount;
        anime.episodeLength = animeApi.attributes.episodeLength;
        anime.youtubeVideoId = animeApi.attributes.youtubeVideoId;
        anime.nsfw = animeApi.attributes.nsfw;
        anime.subtype = animeApi.attributes.subtype;
        anime.showType = animeApi.attributes.showType;
        anime.ageRatingGuide = animeApi.attributes.ageRatingGuide;
        anime.genres = genresApi.data.data.map(genre => genre.id);
        
        return anime
}
exports.getAllAnime = async () => {  
  try {
  
    let allAnimes = [];
    const numberOfRequests = 12;

    let offset = 0;
    for(let i = 0; i < numberOfRequests; i++) {
      
      // const info = await fetch(`https://kitsu.io/api/edge/anime?page[limit]=20&page[offset]=${offset}`).then(response => response.json()).then(data => data.data);
      const info = await axios.get(`https://kitsu.io/api/edge/anime?page[limit]=20&page[offset]=${offset}
      ${i >4  && i <=9 ? '&sort=-userCount': i > 9 ? '': '&filter[status]=current&sort=-averageRating'}`,{headers: {
    "accept-encoding": "*",
  }});


      info.data.data.map(async (animeApi) => {
        const genresApi = await axios.get(animeApi.relationships.genres.links.related, {headers: {
          "accept-encoding": "*",
        }});
        
        let anime = createAnimeObject(animeApi, genresApi)
        allAnimes.push(anime);
        
      });
      
      offset+= 20;
    }
    
    return allAnimes;

  } catch (error) {
    throw new Error(error.message);
  }
}

exports.getAllGenres = async (limitOfGenres = 62) => {
  try {
    let genres = [];
  
    // let apiData = await fetch(`https://kitsu.io/api/edge/genres?page[limit]=${limitOfGenres}&page[offset]=0`)
    // .then(res => res.json())
    // .then(resJSON => resJSON.data);
    let apiData = await axios.get(`https://kitsu.io/api/edge/genres?page[limit]=${limitOfGenres}&page[offset]=0`, {headers: {
      "accept-encoding": "*",
    }})
  
    genres = apiData.data.data.map(genre => {
        return {id: genre.id, name: genre.attributes.name}
    })
  
    return genres
  } catch (error) {
    throw new Error(error.message);
  }
}

exports.getAllReviews = async (animeId) => {
  try {
    animeId = Number(animeId);
    if(typeof animeId === 'number') {
    
        let reviews = [];
        let offset = 0;
        let apiData = await axios.get(`https://kitsu.io/api/edge/anime/${animeId}/reviews?page%5Blimit%5D=20&page%5Boffset%5D=${offset}`, {headers: {
            "accept-encoding": "*",
          }});
        
        apiData.data.data.map(async apiReview => {
           
            let review = {};
            review.id = apiReview.id;
            review.content = apiReview.attributes.content;
            review.rating = apiReview.attributes.rating;
            review.spoiler = apiReview.attributes.spoiler;
            review.likesCount = apiReview.attributes.likesCount;
            review.user = apiReview.relationships.user.links.related
            reviews.push(review)
        })
        return reviews;
    }
    else {
        throw new Error('Invalid anime id. Id must be a number.');
    }

  } catch (err) {
    throw new Error(err.message);
  }
}

exports.getAllEpisodes = async (id) => {
	try {
		let infoApi = await axios.get(`https://kitsu.io/api/edge/anime/${id}/episodes?page%5Blimit%5D=20&page%5Boffset%5D=0`, {headers: {
			"accept-encoding": "*",
    	}});

		let allEpisodesAnime = [];

		if(infoApi.data.data) {
			// First: it would push the first 20 episodes to allEpisodesAnime.
			await infoApi.data.data.map(ep => {
				let episode = {};
				episode.id = ep.id;
				episode.title = ep.attributes.titles.en_us? ep.attributes.titles.en_us : ep.attributes.titles.en_jp;
				episode.synopsis = ep.attributes.synopsis;
				episode.number = ep.attributes.number;
				episode.seasonNumber = ep.attributes.seasonNumber;
				episode.airdate = ep.attributes.airdate;
				episode["length"] = ep.attributes["length"];
				episode.thumbnail = ep.attributes.thumbnail? ep.attributes.thumbnail : null;
				allEpisodesAnime.push(episode);
			});
			// Second: While infoApi.data.links.next exists it would do axios.get to that link
			// anda we gonna repeat the procces.
			while (infoApi.data.links.next) {
				// here we re asign the variable infoApi to the next link. And because of that it would be escalable.
				infoApi = await axios.get( infoApi.data.links.next, {headers: {
					"accept-encoding": "*",
				}});
				await infoApi.data.data.map(ep => {
					let episode = {};
					episode.id = ep.id;
					episode.title = ep.attributes.titles.en_us? ep.attributes.titles.en_us : ep.attributes.titles.en_jp;
					episode.synopsis = ep.attributes.synopsis;
					episode.number = ep.attributes.number;
					episode.seasonNumber = ep.attributes.seasonNumber;
					episode.airdate = ep.attributes.airdate;
					episode["length"] = ep.attributes["length"];
					episode.thumbnail = ep.attributes.thumbnail? ep.attributes.thumbnail : null; 
					//here it would push the episode 21 and forward
					allEpisodesAnime.push(episode);
				});
			}	
		};
		return allEpisodesAnime;

  	} catch (error) {
    	throw new Error(error.message);
  	}
}

exports.getEpisode= async (idAnime, idEpisode) => {
  try {
    let apiAnime = await axios.get(`https://kitsu.io/api/edge/anime/${idAnime}`, {headers: {
			"accept-encoding": "*",
    	}});
    let apiEpisode = await axios.get(`https://kitsu.io/api/edge/episodes/${idEpisode}`, {headers: {
			"accept-encoding": "*",
    	}});
      let ep = apiEpisode.data.data;
      let anime = apiAnime.data.data;
      let episode = {};
      episode.id = ep.id;
      episode.title = ep.attributes.titles.en_us? ep.attributes.titles.en_us : ep.attributes.titles.en_jp;
      episode.synopsis = ep.attributes.synopsis;
      episode.number = ep.attributes.number;
      episode.seasonNumber = ep.attributes.seasonNumber;
      episode.airdate = ep.attributes.airdate;
      episode["length"] = ep.attributes["length"];
      episode.thumbnail = ep.attributes.thumbnail? ep.attributes.thumbnail : null; 
      episode.coverImage = anime.attributes.coverImage? anime.attributes.coverImage.original : null;
    return episode

  } catch (err) {
    throw new Error(err.message);
  }
}