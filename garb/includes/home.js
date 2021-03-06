/*
 * Garb - home.js
 * ==============
 * This is the homescreen containing the code for the camera and photo-creation utility. After
 * taking a photo, the data containing the URI and base64 encoding of the image is passed
 * to reader.js
 */

import {
  Camera,
  Permissions
} from 'expo';
import {
  Text,
  View,
  TouchableOpacity
} from 'react-native';
import React from 'react';

export default class HomeScreen extends React.Component {
    state = {
      hasCameraPermission: null,
      type: Camera.Constants.Type.back,
      takeImageText: null,
      photo: null,
    };
  
    async componentDidMount() {
      const { status } = await Permissions.askAsync(Permissions.CAMERA);
      this.setState({ hasCameraPermission: status === 'granted' });
    }
  
    takePicture() {
      console.log("[LOG] Camera opened.");
      this.camera.takePictureAsync({ skipProcessing: true, base64: true, onPictureSaved: this.onPictureSaved }).then((data) => {
        this.setState({
          photo: data.base64,
          photoURI: data.uri
      }, console.log("[LOG] Picture has been taken."))
      });    }

    onPictureSaved = async data => {
      console.log("[LOG] Picture has been saved.");
      this.props.navigation.navigate('Reader', data);
    }
  
    async getCameraPermissions() {
      const { Permissions } = Expo;
      const { status } = await Permissions.askAsync(Permissions.CAMERA);
      if (status === 'granted') {
      } else {
        throw new Error('Camera permission not granted!');
      }
    }
  
    render() {
      const { hasCameraPermission } = this.state;
      if (hasCameraPermission === null) {
        return <View/>;
      } else if (hasCameraPermission === false) {
        return <Text>No access to camera</Text>;
      } else {
        return (
          <View style={{ flex: 1 }}>
            <Camera style={{ flex: 1 }} 
            type={this.state.type}
            ref={ref => { this.camera = ref; }}
            autoFocus= {Camera.Constants.AutoFocus.on}>
            
              <View
              style={{
                flex: 1,
                justifyContent: 'flex-end',
                marginBottom: 10
              }}>
                <TouchableOpacity
                style={{
                  flex: 0.1,
                  alignItems: 'center',
                }}
                onPress={this.takePicture.bind(this)} >
                 <View style={{
                  borderWidth: 1, 
                  borderRadius: 10,
                  borderColor: 'white',
                  width: '50%',
                  padding: 5,
                  }}>
                      <Text
                    style={{ 
                      fontSize: 24,
                      marginBottom: 10,
                      color: 'white',
                      padding:10,
                      textAlign: 'center'
                       }}>
                    {' '}Take photo{' '}
                    </Text>
                  </View>
                </TouchableOpacity>
              </View>
            </Camera>
          </View>
        );
      }
    }
  }