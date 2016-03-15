var React = require('react-native');
var Profile = require('./Profile');
import Repository from './Repository';
var Notes = require('./Notes');
import api from '../utils/api';
var RNGeocoder = require('react-native-geocoder');

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

class Dashboard extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      lat: '',
      lng: ''
    };
  }

  componentDidMount() {
    RNGeocoder.geocodeAddress(this.props.userInfo.location, (err, data) => {
      if (err) {
        return;
      }
      let latitude = 42.3;
      let longitude = -72.3;

      if (data[0].position.lat !== '' && data[0].position.lng !== '') {
        latitude = parseFloat(data[0].position.lat);
        longitude = parseFloat(data[0].position.lng);
      }
      this.setState({lat: latitude , lng: longitude});
    });
  }

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
      passProps: {userInfo: this.props.userInfo, lat: this.state.lat, lng: this.state.lng},
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
            repos: res,
            lat: this.state.lat,
            lng: this.state.lng
          },
          backButtonTitle: 'back'
        });
      });
  }

  _goToNotes(){
   api.getNotes(this.props.userInfo.login)
     .then((jsonRes) => {
       jsonRes = jsonRes || {};
       this.props.navigator.push({
         component: Notes,
         title: 'Notes',
         passProps: {
           notes: jsonRes,
           userInfo: this.props.userInfo,
           lat: this.state.lat,
           lng: this.state.lng
         }
       });
     });
  }

  render(){
    return (
        <View style={styles.container}>
          <Image source={{uri: this.props.userInfo.avatar_url}} style={styles.image}/>
          <TouchableHighlight
            style={this._makeBackground(0)}
            onPress={this._goToProfile.bind(this)}
            underlayColor="#88D4F5">
            <Text style={styles.buttonText}>Profile</Text>
          </TouchableHighlight>
          <TouchableHighlight
            style={this._makeBackground(1)}
            onPress={this._goToRepos.bind(this)}
            underlayColor="#88D4F5">
            <Text style={styles.buttonText}>Repos</Text>
          </TouchableHighlight>
          <TouchableHighlight
            style={this._makeBackground(2)}
            onPress={this._goToNotes.bind(this)}
            underlayColor="#88D4F5">
            <Text style={styles.buttonText}>Notes</Text>
          </TouchableHighlight>
        </View>
      )
  }
};

module.exports = Dashboard;
