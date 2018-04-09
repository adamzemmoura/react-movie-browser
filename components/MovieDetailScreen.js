import React, { Component } from 'react'
import { View, Text, Button, Image, StyleSheet, ScrollView } from 'react-native'
import MovieDatabaseNetworkManager from '../utils/MovieDatabaseNetworkManager'

const DataView = (props) => {
  return (
    <View style={styles.dataView}>
      <Text style={{ color: 'gray', width: '20%' }}>{props.label}</Text>
      <Text style={{ fontSize: 20, fontWeight: 'bold', color: 'darkgray', width: '75%' }}>{props.data} </Text>
    </View>
  )
}

export default class MovieDetailScreen extends Component {

  state = {
    title: "",
    year: "",
    imageURL: "N/A",
    actors: "",
    runtime: "",
    plot: "",
    awards: "N/A",
    rottenTomatoRating: "N/A",
  }

  updateMovieData = (json) => {

    const rottenTomatoRating = json.Ratings.filter(rating => rating.Source === "Rotten Tomatoes")

    this.setState({
      title: json.Title,
      year: json.Year,
      imageURL: json.Poster,
      runtime: json.Runtime,
      plot: json.Plot,
      actors: json.Actors,
      awards: json.Awards,
      rottenTomatoRating: rottenTomatoRating[0].Value,
    })

  }

  componentWillMount() {

    const { imdbID } = this.props.navigation.state.params

    if (imdbID !== null) {
      MovieDatabaseNetworkManager.searchById(imdbID, this.updateMovieData)
    }

  }

  render() {

    const hasImage = this.state.image !== "N/A"

    return(
      <View style={styles.container}>
        <Image
          style={{width: '100%', height: '50%', backgroundColor: 'lightgray'}}
          source={{uri: `${this.state.imageURL}`}}
        />
        <ScrollView style={styles.movieDetailContainer}>
          <DataView label={"Title : "} data={this.state.title}/>
          <DataView label={"Year : "} data={this.state.year}/>
          <DataView label={"Runtime : "} data={this.state.runtime}/>
          <DataView label={"Plot : "} data={this.state.plot}/>
          <DataView label={"Actors : "} data={this.state.actors}/>
          {(this.state.awards) !== "N/A"
          ? <DataView label={"Awards : "} data={this.state.awards}/>
          : null
          }
          <DataView label={"Rotten 🍅 Rating : "} data={this.state.rottenTomatoRating}/>
        </ScrollView>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginBottom: 30,
  },
  movieDetailContainer: {
    padding: 20,
  },
  dataView: {
    width: '100%',
    justifyContent: 'space-between',
    flexDirection: 'row',
    alignItems: 'center',
    flexWrap: 'wrap',
    marginBottom: 20,
  }
})
