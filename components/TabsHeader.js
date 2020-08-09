import React, { useRef, useState } from "react";
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

export default function Header(props) {
  const {
    navigationState,
    navigation,
    headerStyle, //Style applied to the nav header
    tabStyle, //Style applied to all tabs
    activeTabStyle, //Style applied only to the currently active tab
  } = props;
  const activeTabIndex = navigation.state.index;
  const scroller = useRef();
  return (
    <View style={{ ...styles.tabContainer, ...headerStyle }}>
      <ScrollView
        ref={scroller}
        contentContainerStyle={styles.scroll}
        horizontal={true}
        showsHorizontalScrollIndicator={false}
      >
        {navigationState.routes.map((route, index) => {
          const isRouteActive = index === activeTabIndex;
          const currentStyle = isRouteActive 
            ? {...tabStyle, color:"#1BA1F3", ...activeTabStyle}
            : { color: "#000",...tabStyle };
          const [x, setX] = useState(0);
          if (isRouteActive && scroller.current) {
            scroller.current.scrollTo({ x: x });
          }

          return (
            <TouchableWithoutFeedback
              onPress={() => navigation.navigate(route.routeName)}
              key={route.routeName}
            >
              <View
                style={styles.tab}
                onLayout={(event) => {
                  const layout = event.nativeEvent.layout;
                  setX(layout.x + layout.width / 2 - screenWidth / 2);
                }}
              >
                <Text
                  style={{
                    ...styles.tabText,
                    ...currentStyle,
                  }}
                >
                  {route.routeName}
                </Text>
              </View>
            </TouchableWithoutFeedback>
          );
        })}
      </ScrollView>
    </View>
  );
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
    //textTransform: "uppercase",
  },
});
