import React, { Component } from 'react'
import { FlatList, Text, View, StyleSheet, TouchableHighlight } from 'react-native'
import { PropTypes } from 'prop-types'

export default class SearchResultsView extends Component {

  static propTypes = {
    data: PropTypes.array.isRequired,
    resultCount: PropTypes.number.isRequired,
    onItemPress: PropTypes.func.isRequired,
  }

  renderSeperator = () => {
    return (
      <View
        style={{
          height: 1,
          width: "100%",
          backgroundColor: "#CED0CE",
        }}
      />
    )
  }

  renderItem = ({item}) => (
    <TouchableHighlight
      onPress={() => this.props.onItemPress(item)}>
      <View style={styles.itemContainer}>
        <Text style={styles.item}>{item.Title} ({item.Year})</Text>
        <Text style={{fontSize: 20, color: 'gray'}}>❯</Text>
      </View>
    </TouchableHighlight>
  )

  keyExtractor = (item, index) => item.imdbID

  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.resultLabel}>
          There were {this.props.resultCount} results
        </Text>
        <FlatList
          alwaysBounceVertical = {true}
          style = {styles.listView}
          data = {this.props.data}
          keyExtractor = {this.keyExtractor}
          renderItem={this.renderItem}
          ItemSeparatorComponent={this.renderSeperator}
        >
        </FlatList>
      </View>

    )
  }
}

const styles = StyleSheet.create({
  container: {
    width: '100%',
    alignItems: 'center',
  },
  listView: {
    width: '100%',
  },
  itemContainer: {
    paddingLeft: 10,
    paddingRight: 10,
    height: 50,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  item: {
    fontSize: 15,
    color: 'black',
    marginTop: 5,
  },
  resultLabel: {
    paddingTop: 5,
    textAlign: 'center',
    fontWeight: 'bold',
    fontSize: 20,
    height: 30,
  },
})
