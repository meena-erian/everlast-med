import React from 'react';
import { withNavigation } from '@react-navigation/compat';
import { StyleSheet, Dimensions, TouchableWithoutFeedback, ActivityIndicator } from 'react-native';
import { Image } from 'react-native-elements';
import { Block, Text, theme } from 'galio-framework';
import {Images} from "../constants";
import materialTheme from '../constants/Theme';

const { width } = Dimensions.get('screen');

class Doctor extends React.Component {
  render() {
    const { navigation, doctor, full, style, priceColor, imageStyle } = this.props;
    const imageStyles = [styles.image, full ? styles.fullImage : styles.horizontalImage, imageStyle];

    return (
      <Block row={true} card flex style={[styles.doctor, styles.shadow, style]}>
        <TouchableWithoutFeedback /*onPress={() => navigation.navigate('Service', doctor )}*/>
          <Block flex style={[styles.imageContainer, styles.shadow]}>
            <Image 
              source={{ uri: (doctor.image? doctor.image : Images.Profile) }}
              style={{flex: 1, resizeMode: "cover", height: "100%", borderRadius: 10}}
              containerStyle={imageStyles}
              placeholderStyle={{flex: 1}}
              PlaceholderContent={<ActivityIndicator/>}
            />
          </Block>
        </TouchableWithoutFeedback>
        <TouchableWithoutFeedback /*onPress={() => navigation.navigate('Service', doctor )}*/>
          <Block flex space="between" style={styles.doctorDescription}>
            <Text size={14} style={styles.doctorTitle}>{doctor.name}</Text>
            <Text size={12} muted={!priceColor} color={priceColor}>{doctor.title}</Text>
          </Block>
        </TouchableWithoutFeedback>
      </Block>
    );
  }
}

export default withNavigation(Doctor);

const styles = StyleSheet.create({
  doctor: {
    backgroundColor: theme.COLORS.WHITE,
    marginVertical: theme.SIZES.BASE,
    borderWidth: 0,
    minHeight: 114,
  },
  doctorTitle: {
    flex: 1,
    flexWrap: 'wrap',
    paddingBottom: 6,
    color: materialTheme.COLORS.EVERLAST_BLUE
  },
  doctorDescription: {
    padding: theme.SIZES.BASE / 2,
  },
  imageContainer: {
    elevation: 1,
  },
  image: {
    borderRadius: 3,
    marginHorizontal: theme.SIZES.BASE / 2,
    marginTop: -16,
  },
  horizontalImage: {
    height: 122,
    width: 'auto',
  },
  fullImage: {
    height: 215,
    width: width - theme.SIZES.BASE * 3,
  },
  shadow: {
    shadowColor: theme.COLORS.BLACK,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 4,
    shadowOpacity: 0.1,
    elevation: 2,
  },
});