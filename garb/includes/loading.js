import React from 'react';
import {
  Text,
  ImageBackground,
} from 'react-native';

export default class LoadingScreen extends React.Component {
    componentDidMount(){
        // Start counting when the page is loaded
        this.timeoutHandle = setTimeout(()=>{
            // Add your logic for the transition
            this.props.navigation.navigate('Home')
        }, 2500);
    }
    componentWillUnmount(){
        clearTimeout(this.timeoutHandle); 
    }

    render() {
        return (
        <ImageBackground
            source={require("../assets/bg.jpeg")}
            style={{width: '100%', height: '100%', flex: 1, }} >
            <Text style={{fontSize: 60, textAlign: 'center', color: 'white', top: 130}}>Garb</Text>
        </ImageBackground>
        )
    }
}