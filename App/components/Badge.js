var React = require('react-native');
var Dimensions = require('Dimensions');
var windowSize = Dimensions.get('window');

var {
  Text,
  View,
  Image,
  MapView,
  StyleSheet
} = React;

var styles = StyleSheet.create({
  container: {
    backgroundColor: '#48BBEC',
    // paddingBottom: 10
  },
  name: {
    alignSelf: 'center',
    fontSize: 21,
    marginTop: 10,
    marginBottom: 5,
    color: 'white'
  },
  handle: {
    alignSelf: 'center',
    fontSize: 16,
    color: 'white'
  },
  image: {
    height: 125,
    width: 125,
    borderRadius: 65,
    left: windowSize.width / 2 - 65,
    top: 80,
    position: 'absolute'
  },
  map: {
    height: 250,
    borderWidth: 1,
    borderColor: '#000000'
  },
});

class Badge extends React.Component{
  render(){
    var markers = [
      {
        latitude: this.props.lat,
        longitude: this.props.lng,
        title: 'Location',
        subtitle: this.props.userInfo.name
      }
    ];
    return (
      <View style={styles.container}>
        <MapView
          style={styles.map}
          region={{
            latitude: this.props.lat,
            longitude: this.props.lng,
            latitudeDelta: 0.7,
            longitudeDelta: 0.7
          }}
          annotations={markers}
        />
        <Image style={styles.image} source={{uri: this.props.userInfo.avatar_url}}/>
        <Text style={styles.name}> {this.props.userInfo.name} </Text>
        <Text style={styles.handle}> {this.props.userInfo.login} </Text>
      </View>
    )
  }
};

Badge.propTypes = {
  userInfo: React.PropTypes.object.isRequired
}

module.exports = Badge;
