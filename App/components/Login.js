'use strict';
var React = require('react-native');
var Dimensions = require('Dimensions');
var windowSize = Dimensions.get('window');
import Main from './Main';

var {
  AppRegistry,
  StyleSheet,
  View,
  Text,
  TextInput,
  TouchableHighlight,
  Image
} = React;

class Login extends React.Component{
  _goToMainView(){
    this.props.navigator.push({
      component: Main,
      backButtonTitle: 'back'
    })
  }

  render() {
    return (
        <View style={styles.container}>
            <Image style={styles.bg} source={{uri: 'http://i.imgur.com/xlQ56UK.jpg'}} />
            <View style={styles.header}>
                <Image style={styles.mark} source={{uri: 'http://i.imgur.com/da4G0Io.png'}} />
            </View>
            <TouchableHighlight
              onPress={this._goToMainView.bind(this)}
              underlayColor="#88D4F5">
              <View style={styles.signin}>
                  <Image style={styles.loginImage} source={{uri: 'http://i.imgur.com/da4G0Io.png'}} />
                  <Text style={styles.whiteFont}>Sign In With Github</Text>
              </View>
            </TouchableHighlight>
        </View>
    );
  }
}

var styles = StyleSheet.create({
    container: {
      flexDirection: 'column',
      flex: 1,
      backgroundColor: 'transparent'
    },
    bg: {
        position: 'absolute',
        left: 0,
        top: 0,
        width: windowSize.width,
        height: windowSize.height
    },
    header: {
        justifyContent: 'center',
        alignItems: 'center',
        flex: .5,
        backgroundColor: 'transparent'
    },
    mark: {
        width: 150,
        height: 150
    },
    loginImage: {
      width: 50,
      height: 50,
      marginBottom: 20
    },
    signin: {
        backgroundColor: '#FF3366',
        padding: 20,
        alignItems: 'center'
    },
    signup: {
      justifyContent: 'center',
      alignItems: 'center',
      flex: .15
    },
    inputs: {
        marginTop: 10,
        marginBottom: 10,
        flex: .25
    },
    inputPassword: {
        marginLeft: 15,
        width: 20,
        height: 21
    },
    inputUsername: {
      marginLeft: 15,
      width: 20,
      height: 20
    },
    inputContainer: {
        padding: 10,
        borderWidth: 1,
        borderBottomColor: '#CCC',
        borderColor: 'transparent'
    },
    input: {
        position: 'absolute',
        left: 61,
        top: 12,
        right: 0,
        height: 20,
        fontSize: 14
    },
    forgotContainer: {
      alignItems: 'flex-end',
      padding: 15,
    },
    greyFont: {
      color: '#D8D8D8'
    },
    whiteFont: {
      color: '#FFF'
    }
})
module.exports = Login;
