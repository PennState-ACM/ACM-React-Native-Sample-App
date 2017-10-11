/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  View,
  Image,
  Dimensions,
} from 'react-native';
import Swiper from 'react-native-swiper';

let {width, height} = Dimensions.get('window'); //gets screen dimensions

export default class Wallpaper extends Component { //class
  constructor(props) { //constructor
    super(props); //properties of class
    this.state = { //state
      images: [], //all images
      isLoading: true, //loading status
    };
  }

  //Invoked when component is mounted
  componentDidMount() {
    this.fetchWallpapers();
  }

  //Renders physical elements onto screen
  render() {
    if(!this.state.isLoading) { //checks if done loading
      return this.renderResults(); //if done, load results
    } else {
      return this.renderLoadingView(); //if not done, show loading screen
    }
  }

  renderLoadingView() { //loading view
    return (
      <View style={styles.loading}>
        <Text>Loading...</Text>
      </View>
    );
  }

  renderResults() { //results view
    let images = this.state.images;
    return (
      <Swiper>
        {
          images.map( (image, index) => {
            return (
              <View key={index}>
                <Image
                  source={{uri: `https://unsplash.it/${image.width}/${image.height}?image=${image.id}`}}
                  style={styles.wallpaperImage}
                />
              </View>
            );
          })
        }
      </Swiper>
    );

  }

  fetchWallpapers() { //api call
    let url = 'https://unsplash.it/list';
    fetch(url)
      .then( response => response.json())
      .then( jsonData => {
        let tempImages = [];
        for(i = 0; i < 100; i+=20) {
          tempImages.push(jsonData[i]);
        }
        console.log(tempImages);
        this.setState({
          images: [].concat(tempImages),
          isLoading: false,
        });

      })
      .catch( error => { console.log(error); });
  }
}

// Style sheet
const styles = StyleSheet.create({
  loading: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  wallpaperImage: {
    flex: 1,
    width: width,
    height: height,
    backgroundColor: '#000',
  }
});

AppRegistry.registerComponent('Wallpaper', () => Wallpaper);
