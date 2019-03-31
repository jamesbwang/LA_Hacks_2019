/*
 * Garb - reader.js
 * =============================================
 * Takes an image encoded in base64 and parses it
 * with the Google OCR image regconition AI and
 * API. Then santizies the output.
 */

import React from 'react';
import {
    Text,
    View,
    StyleSheet
} from 'react-native';
import * as Progress from 'react-native-progress';

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#fff',
        paddingVertical: 20,
      },
    circles: {
      flexDirection: 'row',
      alignItems: 'center',
    },
    progress: {
      margin: 10,
    },
  });

export default class ReaderScreen extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            api_key: "AIzaSyDWpKpc7yzTcrO3qGoL2OQCdaldG3uTqaA",
            b64str: this.props.navigation.state.params.base64,
            photo_uri: this.props.navigation.state.params.uri,
            progress: 1,
            indeterminate: true,
        };
    }
    componentDidMount() {
        console.log("[LOG] Picture processing has begun.");
        this.findText();
    }

    findText() {
        api_uri = "https://vision.googleapis.com/v1/images:annotate"
            + "?key=" + this.state.api_key;
        
        params = {
            method: 'POST',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                'requests': [{
                    'image': {
                        "content": this.state.b64str
                    },
                    'features': [{
                        "type": "TEXT_DETECTION"
                    }]
                }]
            })
        };

        return fetch(api_uri, params)
            .then((response) => response.json())
            .then((responseJson) => {
                this.state.array = {};
                console.log("[LOG] Response created from Google server.")
                for(var key in responseJson.responses[0].textAnnotations) {
                    this.state.array[key] = responseJson.responses[0].textAnnotations[key].description;
                }
                console.log(this.state.array);  
                this.props.navigation.navigate('Database');
                this.state.text = responseJson.responses[0].textAnnotations;
                return responseJson.responses[0].textAnnotations;
            })
            .catch((error) => {
                console.error(error);
            });
    }
    
    render() {
        return (
            <View style = {styles.container}>
                <Text>{ this.state.array }</Text>
                <View style={styles.circles}>
                    <Progress.CircleSnail
                        size= {200}
                        style={styles.progress}
                        progress={this.state.progress}
                        indeterminate={this.state.indeterminate}
                    />
                </View> 
            </View> 
        );
    }
}