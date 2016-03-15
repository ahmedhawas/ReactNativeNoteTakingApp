
var React = require('react-native');
var Badge = require('./Badge');
import Seperator from '../helpers/Seperator';
var RNGeocoder = require('react-native-geocoder');


var {
  Text,
  View,
  StyleSheet,
  ScrollView
} = React;

var styles = StyleSheet.create({
  container: {
    flex: 1
  },
  buttonText: {
    fontSize: 18,
    color: 'white',
    alignSelf: 'center'
  },
  rowContainer: {
    padding: 10
  },
  rowTitle: {
    color: '#48BBEC',
    fontSize: 16
  },
  rowContent: {
    fontSize: 19
  }
});

class Profile extends React.Component {
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
      this.setState({lat: data[0].position.lat , lng: data[0].position.lng});
    });
  }

  getRowTitle(user, item){
    item = (item === 'public_repos') ? item.replace('_', ' ') : item;
    return item[0] ? item[0].toUpperCase() + item.slice(1) : item;
  }
  render(){
    console.log('parseFloat(this.state.lat)', parseFloat(this.state.lat));
    let latitude = 42.3;
    let longitude = -72.3;

    if (this.state.lat !== '' && this.state.lng !== '') {
      latitude = parseFloat(this.state.lat);
      longitude = parseFloat(this.state.lng);
    }
    var userInfo = this.props.userInfo;
    var topicArr = ['company', 'location', 'followers', 'following', 'email', 'bio', 'public_repos'];
    var list = topicArr.map((item, index) => {
      if(!userInfo[item]){
        return <View key={index}/>
      } else {
        return (
          <View key={index}>
            <View style={styles.rowContainer}>
              <Text style={styles.rowTitle}> {this.getRowTitle(userInfo, item)} </Text>
              <Text style={styles.rowContent}> {userInfo[item]} </Text>
            </View>
            <Seperator />
          </View>
        )
      }
    });
    return (
      <ScrollView style={styles.container}>
        <Badge userInfo={this.props.userInfo} lat={latitude} lng={longitude}/>
        {list}
      </ScrollView>
    )
  }
};

Profile.propTypes = {
  userInfo: React.PropTypes.object.isRequired
}

module.exports = Profile;
