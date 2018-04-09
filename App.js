import React, { Component } from 'react';
import { Alert, StyleSheet, Button, Keyboard, TextInput, TouchableWithoutFeedback, View } from 'react-native';
import PropTypes from 'react-props';
import SearchBox from './components/SearchBox';
import SearchResultsView from './components/SearchResultsView'
import MovieDatabaseNetworkManager from './utils/MovieDatabaseNetworkManager';
import { StackNavigator } from 'react-navigation';
import MovieDetailScreen from './components/MovieDetailScreen'

class SearchScreen extends Component {

  state = {
    movieData: [],
    resultCount: 0,
    showResults: false,
    searchText: "",
    enableSearch: false,
    loading: false,
  }

  updateMovieData = (data) => {

    const searchResults = data.Search

    if (searchResults === undefined) {
      Alert.alert(`No results for:\r'${this.state.searchText}'\rPlease try again.`)
      this.setState({
        searchText: "",
        showResults: false,
      })
      return
    }

    this.setState({
      movieData: searchResults,
      showResults: true,
      resultCount: searchResults.length,
      resultsToDisplay: true,
    })
  }

  handleChangeText = (text) => {
    const shouldEnableSearch = (text.length > 0)
    this.setState({
      enableSearch: shouldEnableSearch,
      searchText: text,
    })
  }

  handleSearchSubmit = (text) => {
    Keyboard.dismiss()
    MovieDatabaseNetworkManager.searchByTitle(text, this.updateMovieData)
  }

  handleOnItemPress = (item) => {
    this.props.navigation.navigate('MovieDetail', item);
    this.resetSearch()
  }

  resetSearch = () => {
    this.setState({
      resultCount: 0,
      showResults: false,
      movieData: [],
      searchText: "",
      enableSearch: false,
    })
  }

  render() {
    return (

        <View style={styles.container}>
          <SearchBox
            onSearchSubmit={this.handleSearchSubmit}
            onTextChange={this.handleChangeText}
            searchText={this.state.searchText}
            enableSearch={this.state.enableSearch}
          />

          {(this.state.showResults)
            ? <SearchResultsView data={this.state.movieData} onItemPress={this.handleOnItemPress} resultCount={this.state.resultCount}/>
            : null}

        </View>

    );
  }
}

const RootStack = StackNavigator({
    Home: {
      screen: SearchScreen,
      navigationOptions: {
        title: 'Movie Search',
      },
    },
    MovieDetail: {
      screen: MovieDetailScreen,
    },
  },
    {
      initialRouteName: 'Home',
    }
)

export default class App extends Component {
  render() {
    return (
      <RootStack />
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'flex-start',
    marginTop: 20,
  },
  curvedBorder: {
    borderRadius: 5
  },
});
