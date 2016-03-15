var React = require('react-native');
var Profile = require('./Profile');
import Repository from './Repository';
import api from '../utils/api';

var {
  Text,
  View,
  Image,
  TouchableHighlight,
  StyleSheet
} = React;

var styles = StyleSheet.create({
  container: {
    marginTop: 65,
    flex: 1
  },
  image: {
    height: 350,
  },
  buttonText: {
    fontSize: 24,
    color: 'white',
    alignSelf: 'center'
  }
});

class Dashboard extends React.Component{
  _makeBackground(btn) {
    var obj = {
      flexDirection: 'row',
      alignSelf: 'stretch',
      justifyContent: 'center',
      flex: 1
    }

    if(btn === 0) {
      obj.backgroundColor = '#48BBEC';
    }else if (btn === 1) {
      obj.backgroundColor = '#E77AAE';
    } else{
      obj.backgroundColor = '#7588F4';
    }
    return obj;
  }

  _goToProfile(){
    this.props.navigator.push({
      component: Profile,
      title: 'Profile Page',
      passProps: {userInfo: this.props.userInfo},
      backButtonTitle: 'back'
    })
  }

  _goToRepos(){
    var repos = [];
    api.getRepos(this.props.userInfo.login)
      .then((res) => {
        this.props.navigator.push({
          component: Repository,
          title: 'Repositories',
          passProps: {
            userInfo: this.props.userInfo,
            repos: res
          },
          backButtonTitle: 'back'
        });
      });
  }

  _goToNotes(){
  }

  render(){
    return (
        <View style={styles.container}>
          <Image source={{uri: this.props.userInfo.avatar_url}} style={styles.image}/>
          <TouchableHighlight
            style={this._makeBackground(0)}
            onPress={this._goToProfile.bind(this)}
            underlayColor="#88D4F5">
            <Text style={styles.buttonText}> View Profile</Text>
          </TouchableHighlight>
          <TouchableHighlight
            style={this._makeBackground(1)}
            onPress={this._goToRepos.bind(this)}
            underlayColor="#88D4F5">
            <Text style={styles.buttonText}> View Repos</Text>
          </TouchableHighlight>
          <TouchableHighlight
            style={this._makeBackground(2)}
            onPress={this._goToNotes.bind(this)}
            underlayColor="#88D4F5">
            <Text style={styles.buttonText}> View Notes</Text>
          </TouchableHighlight>
        </View>
      )
  }
};

module.exports = Dashboard;
