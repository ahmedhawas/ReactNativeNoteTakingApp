import React from 'react-native';
import Login from './App/components/Login'

var {
  AppRegistry,
  StyleSheet,
  Text,
  NavigatorIOS,
  View,
} = React;

var styles = StyleSheet.create({
  container:{
    flex: 1,
    backgroundColor: '#111111'
  },
});

class githubNotetaker extends React.Component{
  render() {
    return (
      <NavigatorIOS
      style={styles.container}
        initialRoute={{
          title: 'Github Notetaker',
          component: Login
        }} />
    );
  }
};


AppRegistry.registerComponent('ReactNativeApp', () => githubNotetaker);
