import React from 'react';
import {Text, View, Image} from 'react-native';

export default class SettingsScreen extends React.Component {

    constructor(props) {
      super(props);
      const { navigation } = this.props;
      this.state = {
        b64str: navigation.photo,
        uri: navigation.photoURI,
      };
    }
    render() {
      return (
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
          <Text>Display information from db</Text>
          <Image source={{uri: this.photoURI}} style={{width: 40, height: 40}} />
        </View>
      );
    }
  }
  