import React from "react";
import { StyleSheet, Dimensions, ScrollView, View } from "react-native";
import { Button, Block, Text, Input, theme } from "galio-framework";

import { Icon, Service } from "../components";

const { width } = Dimensions.get("screen");
import services from "../constants/services";

export default class Search extends React.Component {
  state = { keyWord: "" };

  renderSearch = () => {
    const { navigation } = this.props;
    const iconCamera = (
      <Icon
        size={16}
        color={theme.COLORS.MUTED}
        name="zoom-in"
        family="material"
      />
    );

    return (
        <View style={styles.searchBox}>
          <Input
            ref={this.searchRef}
            right
            color="black"
            style={styles.search}
            iconContent={iconCamera}
            placeholder="What are you looking for?"
            autoFocus={true}
            onChange={(e) => this.setState({ keyWord: e.nativeEvent.text })}
          />
        </View>
    );
  };

  renderServices = () => {
    let filteredServices = services.filter((service) =>
      service.title.toLowerCase().includes(this.state.keyWord.toLowerCase())
    );
    return (
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.services}
      >
        <Block flex>
          {filteredServices.length ? (
            filteredServices.map((service, index) => (
              <Service
                key={`Service-${index}`}
                service={service}
              />
            ))
          ) : (
            <Text>No Results</Text>
          )}
        </Block>
      </ScrollView>
    );
  };

  render() {
    return (
      <Block flex center style={styles.home}>
        {this.renderSearch()}
        {this.renderServices()}
      </Block>
    );
  }
}

const styles = StyleSheet.create({
  home: {
    width: width,
    overflow: "hidden"
  },
  searchBox: {
    backgroundColor: "white",
    shadowColor: "black",
    shadowOffset: { width: 0, height: 4 },
    shadowRadius: 6,
    shadowOpacity: 0.2,
    elevation: 3,
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
