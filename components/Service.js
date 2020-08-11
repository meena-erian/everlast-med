import React from "react";
import { withNavigation } from "@react-navigation/compat";
import {
  StyleSheet,
  Dimensions,
  TouchableWithoutFeedback,
  ActivityIndicator,
} from "react-native";
import { Image } from "react-native-elements";
import { Block, Text, theme } from "galio-framework";
import { Images } from "../constants";
import materialTheme from "../constants/Theme";

const { width } = Dimensions.get("screen");

class Service extends React.Component {
  render() {
    const {
      navigation,
      service,
    } = this.props;
   const imageStyles = [
     styles.wrappedImage,
     styles.horizontalImage,
   ];
    const imageWrapperStyle = [styles.imageContainer];

    return (
      <Block
        row
        //card
        //flex
        style={[styles.service]}
      >
        <TouchableWithoutFeedback
          onPress={() => navigation.navigate("Service", service)}
        >
          <Block flex style={imageWrapperStyle}>
            <Image
              source={{ uri: service.image ? service.image : Images.Profile }}
              style={{
                flex: 1,
                resizeMode: "cover",
                height: "100%",
                borderRadius: 0,
              }}
              containerStyle={imageStyles}
              placeholderStyle={{ flex: 1 }}
              PlaceholderContent={<ActivityIndicator />}
            />
          </Block>
        </TouchableWithoutFeedback>
        <TouchableWithoutFeedback
          onPress={() => navigation.navigate("Service", service)}
        >
          <Block flex space="between" style={styles.serviceDescription}>
            <Text size={14} style={styles.serviceTitle}>
              {service.title}
            </Text>
            <Text size={12} muted={true}>
              {service.category}
            </Text>
          </Block>
        </TouchableWithoutFeedback>
      </Block>
    );
  }
}

export default withNavigation(Service);

const styles = StyleSheet.create({
  wrappedImage: {
    marginHorizontal: theme.SIZES.BASE / 2,
    marginVertical: theme.SIZES.BASE / 2,
    //marginTop: 0,
    borderRadius: 0,
  },
  service: {
    backgroundColor: theme.COLORS.WHITE,
    marginVertical: theme.SIZES.BASE,
    borderWidth: 0,
    minHeight: 114,
  },
  serviceTitle: {
    flex: 1,
    flexWrap: "wrap",
    paddingBottom: 6,
    color: materialTheme.COLORS.EVERLAST_BLUE,
  },
  serviceDescription: {
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
    width: "auto",
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
