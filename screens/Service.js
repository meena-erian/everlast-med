import React from "react";
import {
  StyleSheet,
  Dimensions,
  ScrollView,
  ActivityIndicator,
} from "react-native";
import { Image } from "react-native-elements";
import { Button, Block, Text, Input, theme } from "galio-framework";
import { Icon, Product } from "../components/";
import { Images, materialTheme } from "../constants";
import { HeaderHeight } from "../constants/utils";
import services from "../constants/services";
const { height, width } = Dimensions.get("screen");

export default class Service extends React.Component {
  componentDidUpdate() {
    this.listView.scrollTo({ x: 0, y: 0, animated: false });
  }
  render() {
    const { navigation, route } = this.props;
    let relatedServices = services.filter(
      (product) =>
        product.category == route.params.category &&
        product.title !== route.params.title
    );
    return (
      <Block flex center style={styles.home}>
        <ScrollView
          showsVerticalScrollIndicator={false}
          contentContainerStyle={styles.services}
          ref={(view) => (this.listView = view)}
        >
          <Block style={styles.mainBlock} autoFocus={true}>
            <Image
              source={{
                uri: route.params.image ? route.params.image : Images.Profile,
              }}
              style={styles.mainImage}
              PlaceholderContent={<ActivityIndicator />}
            />
            <Text h3 style={styles.mainTitle}>
              {route.params.title}
            </Text>
            <Text style={styles.mainContent}>
              {route.params.description.split("{", 1)[0]}
            </Text>
            <Button
              onPress={() => navigation.navigate("Pro", route.params)}
              color={materialTheme.COLORS.EVERLAST_GREEN}
              style={{
                borderTopLeftRadius: 0,
                borderTopRightRadius: 0,
                marginHorizontal: 0,
                width: "100%",
              }}
            >
              Reserve Now
            </Button>
          </Block>
          <Text h4 style={styles.related}>
            Related Services
          </Text>
          <Block flex>
            {relatedServices.map((product, index) => (
              <Product
                key={`product-${index}`}
                product={product}
                horizontal={product.horizontal}
                full={product.full}
              />
            ))}
          </Block>
        </ScrollView>
      </Block>
    );
  }
}

const styles = StyleSheet.create({
  related: {
    color: materialTheme.COLORS.EVERLAST_BLUE,
    marginBottom: 10,
  },
  mainBlock: {
    backgroundColor: "white",
    borderRadius: 10,
    shadowColor: theme.COLORS.BLACK,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 4,
    shadowOpacity: 0.1,
    elevation: 2,
    marginBottom: 50,
  },
  mainTitle: {
    color: materialTheme.COLORS.EVERLAST_BLUE,
    marginHorizontal: theme.SIZES.BASE,
    marginBottom: theme.SIZES.BASE,
    marginTop: theme.SIZES.BASE,
  },
  mainContent: {
    fontSize: 18,
    marginHorizontal: theme.SIZES.BASE,
    marginBottom: theme.SIZES.BASE,
  },
  mainImage: {
    borderTopRightRadius: 10,
    borderTopLeftRadius: 10,
    marginHorizontal: 0,
    height: (width * 4) / 6,
  },
  home: {
    width: width,
  },
  search: {
    height: 48,
    width: width - 32,
    marginHorizontal: 16,
    borderWidth: 1,
    borderRadius: 3,
  },
  header: {
    backgroundColor: theme.COLORS.WHITE,
    shadowColor: theme.COLORS.BLACK,
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowRadius: 8,
    shadowOpacity: 0.2,
    elevation: 4,
    zIndex: 2,
  },
  tabs: {
    marginBottom: 24,
    marginTop: 10,
    elevation: 4,
  },
  tab: {
    backgroundColor: theme.COLORS.TRANSPARENT,
    width: width * 0.5,
    borderRadius: 0,
    borderWidth: 0,
    height: 24,
    elevation: 0,
  },
  tabTitle: {
    lineHeight: 19,
    fontWeight: "300",
  },
  divider: {
    borderRightWidth: 0.3,
    borderRightColor: theme.COLORS.MUTED,
  },
  services: {
    width: width - theme.SIZES.BASE * 2,
    paddingVertical: theme.SIZES.BASE * 2,
  },
});
