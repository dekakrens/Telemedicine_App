import React, { Component } from "react";
import { FlatList, StyleSheet, Text, View } from "react-native";


export default class WiFiBTScreen extends Component {
  state = {
    data: []
  };
    
  componentWillMount() {
    this.fetchData();
  }

  fetchData = async () => {
    const response = await fetch("http://192.168.1.4:5000/info/suhu");
    const json = await response.json();
    this.setState({ data: json.results });
  };

  render() {
    return (
      <View style={styles.container}>
        <FlatList
          data={this.state.data}
          keyExtractor={(x, i) => i}
          renderItem={({ item }) =>
            <Text>
              {`${item.suhu.first}`}
            </Text>}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    marginTop: 15,
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#F5FCFF"
  }
});