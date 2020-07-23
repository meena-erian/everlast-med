import React from 'react';
import { ImageBackground, StyleSheet, StatusBar, Dimensions, Platform } from 'react-native';
import { Block, Button, Text, theme } from 'galio-framework';

const { height, width } = Dimensions.get('screen');

import materialTheme from '../constants/Theme';
import Images from '../constants/Images';

export default class Onboarding extends React.Component {
  render() {
    const { navigation } = this.props;

    return (
      <Block flex style={styles.container}>
        <StatusBar barStyle="light-content" />
        <Block flex style={{}}>
          <ImageBackground
            source={{ uri : Images.Onboarding}}
            style={{ height: height, width: height * 3/2, zIndex: 1, top: 0, right: height * 1}}
          />
        </Block>
        <Block flex space="between" style={styles.padded}>
          <Block flex space="around" style={{ zIndex: 2 }}>
            <Block style={styles.shadow}>
              <Block style={styles.shadow}>
                <Text color="white" size={60} style={styles.shadow}>Everlast</Text>
              </Block>
              <Block row>
                <Text color="white" size={60}>Wellness</Text>
              </Block>
              <Text size={16} color="white">
                Welcome to Everlast Wellness Medical Center  in Abu Dhabi where beauty goes beyond… – Best Aesthetic Medical Center in Abu Dhabi
              </Text>
            </Block>
            <Block center>
              <Button
                shadowless
                style={styles.button}
                color={materialTheme.COLORS.EVERLAST_GREEN}
                onPress={() => navigation.navigate('App')}>
                GET STARTED
              </Button>
            </Block>
          </Block>
        </Block>
      </Block>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: theme.COLORS.BLACK,
  },
  padded: {
    paddingHorizontal: theme.SIZES.BASE * 2,
    position: 'relative',
    bottom: theme.SIZES.BASE,
  },
  button: {
    width: width - theme.SIZES.BASE * 4,
    height: theme.SIZES.BASE * 3,
    shadowRadius: 0,
    shadowOpacity: 0,
  },
  shadow: {
    shadowColor: "#000",
    shadowRadius: 1,
    shadowOpacity: 10,
  }
});
