import React from "react";
import { TouchableOpacity, StyleSheet } from "react-native";
import { Block, Text, theme } from "galio-framework";

import Icon from "./Icon";
import materialTheme from "../constants/Theme";

const proScreens = [
  //"Explore Treatments",
  "My Appointments",
  "Offers",
  //"Doctors",
  "Account Settings",
  //"About Us",
  "Contact Us",
  "Terms of Service",
  "Sign In",
  "Sign Up",
];

class DrawerItem extends React.Component {
  renderIcon = () => {
    const { title, focused } = this.props;

    switch (title) {
      case "Explore Treatments":
        return (
          <Icon
            size={16}
            name="md-medkit"
            family="ionicon"
            color={focused ? "white" : materialTheme.COLORS.MUTED}
          />
        );
      case "My Appointments":
        return (
          <Icon
            size={16}
            name="md-checkbox"
            family="ionicon"
            color={focused ? "white" : materialTheme.COLORS.MUTED}
          />
        );
      case "Offers":
        return (
          <Icon
            size={16}
            name="md-ribbon"
            family="ionicon"
            color={focused ? "white" : materialTheme.COLORS.MUTED}
          />
        );
      case "Doctors":
        return (
          <Icon
            size={16}
            name="md-people"
            family="ionicon"
            color={focused ? "white" : materialTheme.COLORS.MUTED}
          />
        );
      case "Account Settings":
        return (
          <Icon
            size={16}
            name="gears"
            family="font-awesome"
            color={focused ? "white" : materialTheme.COLORS.MUTED}
          />
        );
      case "About Us":
        return (
          <Icon
            size={16}
            name="md-information-circle-outline"
            family="ionicon"
            color={focused ? "white" : materialTheme.COLORS.MUTED}
          />
        );
      case "Contact Us":
        return (
          <Icon
            size={16}
            name="md-mail"
            family="ionicon"
            color={focused ? "white" : materialTheme.COLORS.MUTED}
          />
        );
      case "Terms of Service":
        return (
          <Icon
            size={16}
            name="md-paper"
            family="ionicon"
            color={focused ? "white" : materialTheme.COLORS.MUTED}
          />
        );
      /*
      case "Woman":
        return (
          <Icon
            size={16}
            name="md-woman"
            family="ionicon"
            color={focused ? "white" : materialTheme.COLORS.MUTED}
          />
        );
      case "Man":
        return (
          <Icon
            size={16}
            name="man"
            family="entypo"
            color={focused ? "white" : materialTheme.COLORS.MUTED}
          />
        );
      case "Kids":
        return (
          <Icon
            size={16}
            name="baby"
            family="GalioExtra"
            color={focused ? "white" : materialTheme.COLORS.MUTED}
          />
        );
      case "Pro":
        return (
          <Icon
            size={16}
            name="md-lock"
            family="ionicon"
            color={focused ? "white" : materialTheme.COLORS.MUTED}
          />
        );
      case "New Collection":
        return (
          <Icon
            size={16}
            name="grid-on"
            family="material"
            color={focused ? "white" : materialTheme.COLORS.MUTED}
          />
        );
      case "Profile":
        return (
          <Icon
            size={16}
            name="circle-10"
            family="GalioExtra"
            color={focused ? "white" : materialTheme.COLORS.MUTED}
          />
        );
*/
      case "Components":
        return (
          <Icon
            size={16}
            name="md-switch"
            family="ionicon"
            color={focused ? "white" : materialTheme.COLORS.MUTED}
          />
        );
      case "Sign In":
        return (
          <Icon
            size={16}
            name="ios-log-in"
            family="ionicon"
            color={focused ? "white" : materialTheme.COLORS.MUTED}
          />
        );
      case "Sign Up":
        return (
          <Icon
            size={16}
            name="md-person-add"
            family="ionicon"
            color={focused ? "white" : materialTheme.COLORS.MUTED}
          />
        );
      default:
        return null;
    }
  };

  renderLabel = () => {
    const { title } = this.props;

    if (false && proScreens.includes(title)) {
      return (
        <Block middle style={styles.pro}>
          <Text size={12} color="white">
            NUL
          </Text>
        </Block>
      );
    }

    return null;
  };

  render() {
    const { focused, title, navigation } = this.props;
    const proScreen = proScreens.includes(title);
    //if(focused) console.log(title, "is focused");
    return (
      <TouchableOpacity
        style={{ height: 55 }}
        onPress={() => {
          navigation.navigate(proScreen ? "Pro" : title);
        }}
      >
        <Block
          flex
          row
          style={[
            styles.defaultStyle,
            focused ? [styles.activeStyle, styles.shadow] : null,
          ]}
        >
          <Block middle flex={0.1} style={{ marginRight: 28 }}>
            {this.renderIcon()}
          </Block>
          <Block row center flex={0.9}>
            <Text
              size={18}
              color={
                focused
                  ? "white"
                  : proScreen
                  ? materialTheme.COLORS.MUTED
                  : "black"
              }
            >
              {title}
            </Text>
            {this.renderLabel()}
          </Block>
        </Block>
      </TouchableOpacity>
    );
  }
}

export default DrawerItem;

const styles = StyleSheet.create({
  defaultStyle: {
    paddingVertical: 16,
    paddingHorizontal: 16,
  },
  activeStyle: {
    backgroundColor: materialTheme.COLORS.EVERLAST_GREEN,
    borderRadius: 4,
  },
  shadow: {
    shadowColor: theme.COLORS.BLACK,
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowRadius: 8,
    shadowOpacity: 0.2,
  },
  pro: {
    backgroundColor: materialTheme.COLORS.LABEL,
    paddingHorizontal: 6,
    marginLeft: 8,
    borderRadius: 2,
    height: 16,
    width: 36,
  },
});
