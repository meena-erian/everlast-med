import React from "react";
import { StyleSheet, Dimensions, ScrollView } from "react-native";
import { Button, Block, Text, Input, theme } from "galio-framework";
import TabsHeader from "../components/TabsHeader";
import { Icon, Product } from "../components/";
import { createAppContainer } from "react-navigation";
import { createMaterialTopTabNavigator } from "react-navigation-tabs";
const { width } = Dimensions.get("screen");
import services, { categories } from "../constants/services";
import materialTheme from "../constants/Theme";


class ProductsList extends React.Component {
  render() {
    const { navigation } = this.props;
    const currentCategory = navigation.state.routeName;
    const includedServices = services.filter(service => service.category === currentCategory);
    return (
      <Block flex center style={styles.home}>
        <ScrollView
          showsVerticalScrollIndicator={false}
          contentContainerStyle={styles.services}
        >
          <Block flex>
            {includedServices.map((product, index) => (
              <Product
                key={`product-${index}`}
                product={product}
                horizontal={true} //{product.horizontal}
                full={product.full}
              />
            ))}
          </Block>
        </ScrollView>
      </Block>
    );
  }
}

let tabs = {};
Object.keys(categories).forEach((cat) => (tabs[cat] = ProductsList));

const shadowStyle = {
  shadowColor: 'black',
  shadowOffset: { width: 0, height: 2 },
  shadowRadius: 6,
  shadowOpacity: 0.2,
  elevation: 3,
};

const TabNavigator = createMaterialTopTabNavigator(tabs, {
  tabBarComponent: TabsHeader,
  lazy: true,
  //initialRouteName: props.initialRouteName,
  tabBarOptions: {
    headerStyle: shadowStyle, //Style applied to the nav header
    tabStyle: {color: materialTheme.COLORS.EVERLAST_BLUE}, //Style applied to all tabs
    activeTabStyle: {color: materialTheme.COLORS.EVERLAST_GREEN}, //Style applied only to the currently active tab
  },
});

const UnlimitedTabs = createAppContainer(TabNavigator);

export default function Home(props){
  return <UnlimitedTabs />
}

const styles = StyleSheet.create({
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
  shadow: {
    backgroundColor: theme.COLORS.WHITE,
    shadowColor: 'black',
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 6,
    shadowOpacity: 0.2,
    elevation: 3,
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
