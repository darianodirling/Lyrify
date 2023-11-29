// Function to search for a song title and gets the song id so that we can extract the lyrics in a function
function getGeniusSongId(songTitle) {
  var searchUrl = 'https://genius-song-lyrics1.p.rapidapi.com/search/?q=' + encodeURIComponent(songTitle) + '&per_page=1&page=1';
  var options = {
    method: 'GET',
    headers: {
      'X-RapidAPI-Key': 'dc1418057emshf1660ab467d012dp1f82c6jsn6e61fa28d9a2',
		  'X-RapidAPI-Host': 'genius-song-lyrics1.p.rapidapi.com'
    }
  };

  try {
    var response = UrlFetchApp.fetch(searchUrl, options);
    var result = JSON.parse(response.getContentText());

    // Check if there are search results
    if (result && result.hits && result.hits.length > 0) {
      var geniusSongId = result.hits[0].result.id;
      Logger.log('Genius ID for the song "' + songTitle + '": ' + geniusSongId);
      return geniusSongId;
    } else {
      Logger.log('No search results found for the song "' + songTitle + '".');
      return null;
    }
  } catch (error) {
    Logger.log(error);
    return null;
  }
}

//this gets the lyrics for the song using the song id that we get from the getGeniusSongId function
//rapid API has a GET Song recommendations api request so the logic would be when a user puts in a song to generate it will also call the song recommendation
// it refreshes the song recommendation table to the api!! this is super simple.
function getLyricsForSong(geniusSongId) {
  var lyricsUrl = 'https://genius.com/songs/' + geniusSongId + '/lyrics';
  var options = {
    method: 'GET',
    headers: {
      'X-RapidAPI-Key': 'dc1418057emshf1660ab467d012dp1f82c6jsn6e61fa28d9a2',
		  'X-RapidAPI-Host': 'genius-song-lyrics1.p.rapidapi.com',
      'Accept' : 'application/json'
    }
  };
  try {
    var response = UrlFetchApp.fetch(lyricsUrl, options);
    var result = response.getContentText();
    
    // Parse the HTML response to extract the lyrics
    var lyrics = parseLyricsFromHTML(result);
    return lyrics;
  } catch (error) {
    Logger.log(error);
  }
}
// parse the lyrics from the html
function parseLyricsFromHTML(html) {
  
  var $ = Cheerio.load(html);
  const page = $('#main').text();
  return page;
}

// parse the lyrics from the html
function parseArtistFromHTML(html){
  var $ = Cheerio.load(html);
  const page = $('title').text();
  return page;
}

// returns a array of title and song id. The title is for the recommended song and the song id is for actually getting the lyrics. 
function songRecommendation(id){
  var url = 'https://genius-song-lyrics1.p.rapidapi.com/song/recommendations/?id=' + id;
  var options = {
    method: 'GET',
    headers: {
      'X-RapidAPI-Key': 'dc1418057emshf1660ab467d012dp1f82c6jsn6e61fa28d9a2',
		  'X-RapidAPI-Host': 'genius-song-lyrics1.p.rapidapi.com',
      'Accept' : 'application/json'
    }
  };
  try{
    var response = UrlFetchApp.fetch(url,options);
    var data = JSON.parse(response.getContentText());
    // Logger.log(data);
    var recommendations = data.song_recommendations.recommendations.slice(0,4);
    Logger.log(recommendations)
    const result = recommendations.map(recommendation => {
      // instead of just title can we get the full_title???
      const title = recommendation.recommended_song.full_title;
      const songid = recommendation.recommended_song.id;
      return {songid, title}
    });
    return result;
  }
  catch(error){
    console.log(error);
  }
  

}

