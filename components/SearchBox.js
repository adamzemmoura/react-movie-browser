import React, { Component } from 'react';
import { StyleSheet, Button, TextInput, View, Alert } from 'react-native';
import { PropTypes } from 'prop-types'

export default class SearchBox extends Component {

  static propTypes = {
    onSearchSubmit: PropTypes.func.isRequired,
    onTextChange: PropTypes.func.isRequired,
    enableSearch: PropTypes.bool.isRequired,
    searchText: PropTypes.string.isRequired,
  }

  render() {
    return (
      <View style={styles.searchContainer}>
        <TextInput
          style = {[styles.searchText, styles.curvedBorder]}
          placeholder = "Enter Movie Title"
          onChangeText = {this.props.onTextChange}
          value = {this.props.searchText}
          onSubmitEditing = {() => {
            this.setState({ searchText: ""})
            this.props.onSearchSubmit(this.props.searchText)
          }}
        />
        <View
        style = {[styles.searchButton, styles.curvedBorder]}
        >
          <Button
            title = "Search"
            accessibiltyLabel = "Click this button to start movie search"
            onPress = { () => this.props.onSearchSubmit(this.props.searchText) }
            disabled = {!this.props.enableSearch}
          />
        </View>
      </View>
    )
  }
}

const styles = StyleSheet.create({

  searchContainer: {
    height: 60,
    flexDirection: 'row',
    marginLeft: 20,
    marginRight: 20,
  },
  searchText: {
    flex: 1,
    backgroundColor: '#E9F7FD',
    borderColor: 'grey',
    color: 'black',
    textAlign: 'center',
    borderWidth: 3,
    height: 60,
  },
  searchButton: {
    alignItems: 'center',
    justifyContent: 'center',
    marginLeft: 10,
  },
  curvedBorder: {
    borderRadius: 5
  },
});
