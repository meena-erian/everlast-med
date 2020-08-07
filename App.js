
/**
 =============================================================
 * @summary Everlast Wellness Medical Center Android & IOS APP
 =============================================================
 * @author Menas Erian
 * @version 1.6.0
 * @package 
 * @private
 =============================================================
 */

import React from 'react';
import { Platform, StatusBar, Image } from 'react-native';
import { AppLoading } from 'expo';
import { Asset } from 'expo-asset';
import { Block, GalioProvider } from 'galio-framework';

import { Images, services, doctors, materialTheme } from './constants/';

import { NavigationContainer } from '@react-navigation/native';
import Screens from './navigation/Screens';

// Before rendering any navigation stack
import { enableScreens } from 'react-native-screens';
enableScreens();

// cache app images
const assetImages = [
  Images.Pro,
  Images.Profile,
  Images.Avatar,
  Images.Onboarding,
];

//services.map(service => assetImages.push(service.image));
//doctors.map(doctor => assetImages.push(doctor.image));

function cacheImages(images) {
  //console.log("Caching ", images);
  return images.map(image => {
    if (typeof image === 'string') {
      console.log("Caching image: ", image);
      return Image.prefetch(image);
    } else if (image){
      console.log(`ERrrrr: Image link is provided in type "${typeof image}"`);
      return Asset.fromModule(image).downloadAsync();
    }
  });
}

export default class App extends React.Component {
  state = {
    isLoadingComplete: false,
  };

  render() {
    if (!this.state.isLoadingComplete && !this.props.skipLoadingScreen) {
      return (
        <AppLoading
          startAsync={this._loadResourcesAsync}
          onError={this._handleLoadingError}
          onFinish={this._handleFinishLoading}
        />
      );
    } else {
      return (
        <NavigationContainer>
          <GalioProvider theme={materialTheme}>
            <Block flex>
              {/*Platform.OS === 'ios' && <StatusBar barStyle="default" />*/}
              <StatusBar hidden={false} backgroundColor={materialTheme.COLORS.EVERLAST_GREEN} />
              <Screens />
            </Block>
          </GalioProvider>
        </NavigationContainer>
      );
    }
  }

  _loadResourcesAsync = async () => {
    return Promise.all([
      ...cacheImages(assetImages),
    ]);
  };

  _handleLoadingError = error => {
    console.warn(error);
  };

  _handleFinishLoading = () => {
    this.setState({ isLoadingComplete: true });
  };
}
