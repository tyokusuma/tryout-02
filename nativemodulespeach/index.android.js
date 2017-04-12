/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, {Component} from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  View,
  NativeModules,
  TouchableOpacity,
} from 'react-native';
const Module = NativeModules.nativemodulespeach;

export default class nativemodulespeach extends Component {
  constructor(props) {
    super(props);
    this.state = {
      text: 'helo',
    };
  }
  functionspeach() {
    Module.start()
      .then(resp => {
        this.setState({text: resp});
      })
      .catch(err => console.log('err', err));
  }
  render() {
    return (
      <View style={styles.container}>
        <TouchableOpacity onPress={() => this.functionspeach()}>
          <Text> PRESS IF U WANNA SPEECH </Text>
        </TouchableOpacity>
        <Text style={styles.welcome} />
        <Text style={styles.instructions}>
          To get started, edit index.android.js
        </Text>
        <Text style={styles.instructions}>
          Double tap R on your keyboard to reload,{'\n'}
          Shake or press menu button for dev menu
        </Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
  instructions: {
    textAlign: 'center',
    color: '#333333',
    marginBottom: 5,
  },
});

AppRegistry.registerComponent('nativemodulespeach', () => nativemodulespeach);
