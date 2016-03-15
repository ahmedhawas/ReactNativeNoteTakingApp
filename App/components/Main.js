
var React = require('react-native');
import api from '../utils/api';
import Dashboard from './Dashboard';
import Seperator from '../helpers/Seperator';

var {
  View,
  Text,
  TextInput,
  TouchableHighlight,
  ActivityIndicatorIOS,
  StyleSheet,
  ScrollView,
  MapView,
  RefreshControl
} = React;

var styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    padding: 30,
    marginTop: 65,
    flexDirection: 'column',
    justifyContent: 'center',
    backgroundColor: '#48BBEC'
  },
  title: {
    marginBottom: 20,
    fontSize: 25,
    textAlign: 'center',
    color: '#fff'
  },
  searchInput: {
    height: 50,
    padding: 4,
    marginRight: 5,
    fontSize: 23,
    borderWidth: 1,
    borderColor: 'white',
    borderRadius: 8,
    color: 'white'
  },
  buttonText: {
    fontSize: 18,
    color: '#111',
    alignSelf: 'center'
  },
  button: {
    height: 45,
    flexDirection: 'row',
    backgroundColor: 'white',
    borderColor: 'white',
    borderWidth: 1,
    borderRadius: 8,
    marginBottom: 10,
    marginTop: 10,
    alignSelf: 'stretch',
    justifyContent: 'center'
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
  },
  container: {
    marginTop: 0,
    flex: 1
  }
});

var PULLDOWN_DISTANCE = 40

class Main extends React.Component{
  constructor(props) {
    super(props);
    this.state = {
      username: '',
      isLoading: false,
      error: false,
      isRefreshing: false,
      users: []
    };
  }

  componentDidMount() {
    this._loadData();
  }

  _onRefresh() {
    this.setState({isRefreshing: true});
    this._loadData();
  }

  _loadData() {
    api.getPopularUsers()
    .then((res) => {
      this.setState({users: res, isRefreshing: false});
      console.log('users', res);
    });
  }

  _handleChange(event) {
    this.setState({
      username: event.nativeEvent.text
    });
  }

  _handleScroll(e) {
    if (e.nativeEvent.contentOffset.y < -PULLDOWN_DISTANCE) {
      this.reloadData()
    }
    this.props.onScroll && this.props.onScroll(e)
  }

  _handleUserClick(username) {
    this.setState({isLoading: true});
    api.getBio(username)
    .then((res) => {
      if(res.message === 'Not Found'){
        this.setState({
          error: 'User not found',
          isLoading: false
        })
      } else {
        this.props.navigator.push({
          title: res.name || "Select an Option",
          component: Dashboard,
          passProps: {userInfo: res},
          backButtonTitle: 'back'
        });
        this.setState({
          isLoading: false,
          error: false,
          username: ''
        });
      }
    });
  }

  _handleSubmit() {
    this.setState({isLoading: true});
    api.getBio(this.state.username)
      .then((res) => {
        if(res.message === 'Not Found'){
          this.setState({
            error: 'User not found',
            isLoading: false
          })
        } else {
          this.props.navigator.push({
            title: res.name || "Select an Option",
            component: Dashboard,
            passProps: {userInfo: res},
            backButtonTitle: 'back'
          });
          this.setState({
            isLoading: false,
            error: false,
            username: ''
          });
        }
    });
  }

  render() {
    var showError = (
       this.state.error ? <Text> {this.state.error} </Text> : <View></View>
     );
     var list = this.state.users.map((item, index) => {
       return (
         <View key={index}>
           <View style={styles.rowContainer}>
             <TouchableHighlight
               onPress={this._handleUserClick.bind(this, item.login)}
               underlayColor="#88D4F5">
               <Text style={styles.rowContent}> {item.login} </Text>
             </TouchableHighlight>
           </View>
           <Seperator />
         </View>
       );
     });
    return(
      <View style={styles.mainContainer}>
      <Text style={styles.title}> Search for a Github User</Text>
      <TextInput
        style={styles.searchInput}
        value={this.state.username}
        onChange={this._handleChange.bind(this)} />
        <TouchableHighlight
          style={styles.button}
          onPress={this._handleSubmit.bind(this)}
          underlayColor="white">
          <Text style={styles.buttonText}> SEARCH </Text>
        </TouchableHighlight>
        <ActivityIndicatorIOS
         animating={this.state.isLoading}
         color="#111"
         size="large"></ActivityIndicatorIOS>
        {showError}
        <Text style={styles.title}>Random Github Users</Text>
        <ScrollView
          style={styles.container}
          refreshControl={
          <RefreshControl
           refreshing={this.state.isRefreshing}
           onRefresh={this._onRefresh.bind(this)}
           tintColor="#ff0000"
           title="Loading..."
           colors={['#ff0000', '#00ff00', '#0000ff']}
           progressBackgroundColor="#ffff00"
         />}
        >
          {list}
        </ScrollView>
      </View>
      )
  }
};

module.exports = Main;
