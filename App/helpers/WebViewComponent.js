import React from 'react-native';

var {
  View,
  WebView,
  StyleSheet
} = React;

var styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F6F6EF',
    flexDirection: 'column'
  }
});

class WebViewComponent extends React.Component {
  render() {
    return (
      <View style={styles.container}>
        <WebView url={this.props.url} />
      </View>
    );
  }
}

WebViewComponent.propTypes = {
  url: React.PropTypes.string.isRequired
}

module.exports = WebViewComponent;
