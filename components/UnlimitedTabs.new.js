import React, { useRef, useState, PureComponent } from "react";
import { createAppContainer } from "react-navigation";
import { createMaterialTopTabNavigator } from "react-navigation-tabs";
import {
  View,
  Text,
  StyleSheet,
  TouchableWithoutFeedback,
  ScrollView,
  Dimensions,
} from "react-native";
const screenWidth = Math.round(Dimensions.get("window").width);



class Tab extends PureComponent{
  constructor(props){
    super(props);

    this.state= {x: 0};
  }
  render(){
  //console.log("ReRendering Tab");
  const isRouteActive = this.props.index === this.props.activeTabIndex;
  const currentStyle = isRouteActive 
    ? {...this.props.tabStyle, color:"#1BA1F3", ...this.props.activeTabStyle}
    : { color: "#000",...this.props.tabStyle };
  if (isRouteActive && this.props.scroller.current) {
    this.props.scroller.current.scrollTo({ x: this.state.x });
  }

  return (
    <TouchableWithoutFeedback
      onPress={() => this.props.navigation.navigate(this.props.route.routeName)}
    >
      <View
        style={styles.tab}
        onLayout={(event) => {
          const layout = event.nativeEvent.layout;
          //this.setState({x: layout.x - screenWidth / 2});
        }}
      >
        <Text
          style={{
            ...styles.tabText,
            ...currentStyle,
          }}
        >
          {this.props.route.routeName}
        </Text>
      </View>
    </TouchableWithoutFeedback>
  );
  }
}


class Header extends React.Component {
  componentDidMount(){
    console.log("Mounting header");
  }
  componentDidUpdate(){
    console.log("Updating header");
  }
  shouldComponentUpdate(props, state){
    return false;
  }
  render(){
    console.log("ReRendering header");
  const {
    navigationState,
    navigation,
    headerStyle, //Style applied to the nav header
    tabStyle, //Style applied to all tabs
    activeTabStyle, //Style applied only to the currently active tab
  } = this.props;
  const activeTabIndex = navigation.state.index;
  const scroller = React.createRef();
  return (
    <View style={{ ...styles.tabContainer, ...headerStyle }}>
      <ScrollView
        ref={scroller}
        contentContainerStyle={styles.scroll}
        horizontal={true}
      >
        {navigationState.routes.map((route, index) => 
          <Tab 
            tabStyle = {tabStyle}
            activeTabStyle = {activeTabStyle}
            activeTabIndex = {activeTabIndex}
            index = {index}
            scroller = {scroller}
            navigation = {navigation}
            route = {route}
            key={route.routeName}
          />
        )}
      </ScrollView>
    </View>
  );
  }
};

const styles = StyleSheet.create({
  tabContainer: {
    backgroundColor: "white",
    width: "100%",
  },
  scroll: {
    minWidth: "100%",
    flexDirection: "row",
    justifyContent: "space-evenly",
    alignItems: "center",
  },
  tab: {
    padding: 10,
  },
  tabText: {
    fontSize: 17,
    textTransform: "uppercase",
  },
});


const tabx = (props) => <Text>This is tab1</Text>;

const testTabs = {
  tab1 : tabx,
  tab2 : tabx,
  tab3 : tabx,
}

export default class UnlimitedTabs extends PureComponent{
  constructor(props){
    super(props);
    console.log("Mounting UnlimitedTabs...", this.props.tabs);
    this.TabNavigator = createMaterialTopTabNavigator(testTabs, {
      tabBarComponent: Header,
      tabBarOptions: {
        //headerStyle: this.props.headerStyle, //Style applied to the nav header
        //tabStyle: this.props.tabStyle, //Style applied to all tabs
        //activeTabStyle: this.props.activeTabStyle, //Style applied only to the currently active tab
      },
      initialRouteName: this.props.initialRouteName,
    });
    this.NavigationContainer = createAppContainer(this.TabNavigator);
    this.NavigationContainer.componentDidUpdate = () => {
      console.log("Updating container");
    }
    this.NavigationContainer.shouldComponentUpdate = (props, state) => {
      return false;
    }
  }

  render() {
    console.log("Rendering UnlimitedTabs");

    return <this.NavigationContainer onNavigationStateChange={(e) => console.log("Navigation state changed")} />;
  }
}
