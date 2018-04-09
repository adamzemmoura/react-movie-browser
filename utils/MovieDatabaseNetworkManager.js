const movieDatabaseApiKey = "6345095c"
const movieDatabaseBaseURL = `http://www.omdbapi.com/?apikey=${movieDatabaseApiKey}&`
const moviePosterBaseURL = `http://img.omdbapi.com/?apikey=${movieDatabaseApiKey}&`

export default class MovieDatabaseNetworkManager {

  static searchByTitle(title, callback) {
    if (title.length === 0) {
      console.log("title was not provided to searchByTitle")
      return
    }
    const searchTitleParam = title.replace(/\s+/g, '+').concat('&');

    const searchByTitleURL = movieDatabaseBaseURL.concat('s='+searchTitleParam)
    console.log(`Search title param : ${searchByTitleURL}`)

    this.fetchData(searchByTitleURL)
    .then(json => callback(json))
  }

  static fetchData = async (url) => {
    const response = await fetch(url)
    return await response.json()
  }

  static searchById(imdbID, callback) {
    const searchByIdURL = movieDatabaseBaseURL.concat('i='+imdbID)
    console.log(`The URL to search by ID: ${searchByIdURL}`)
    this.fetchData(searchByIdURL)
    .then(json => callback(json))
  }
}
