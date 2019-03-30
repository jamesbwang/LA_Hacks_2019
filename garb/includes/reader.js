/*
 * LA_Hacks_2019 - reader.js
 * =============================================
 * Takes an image encoded in base64 and parses it
 * with the Google OCR image regconition AI and
 * API. Then santizies the output.
 */

import React from 'react';
import {
    Text
} from 'react-native';

export default class ReaderScreen extends React.Component {
    constructor(props) {
        super(props);
        const { navigation } = this.props;
        this.state = {
            api_key = "",
            b64str = navigation.photo,
            photo_uri = navigation.photoURI
        };
    }

    findText() {
        var content = "samp";

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
                        "content": b64str
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
                console.log(responseJson)
                return responseJson.responses.textAnnotations
            })
            .catch((error) => {
                console.error(error);
            });
    }
    
    render() {
        // Do something.
    }
}