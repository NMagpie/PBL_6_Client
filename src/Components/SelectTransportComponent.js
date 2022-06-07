import React, { useState } from "react";

import {
  View,
  StyleSheet,
  Text,
  Linking,
  Pressable,
  FlatList,
} from "react-native";

import { trolleyRoutes } from "../Util/trolleyRoutes";

import { sendMessage } from "../Util/Network";

export default function SelectTransport(props) {
  return (
    <View>
      <FlatList
        contentContainerStyle={styles.list}
        numColumns={5}
        data={trolleyRoutes}
        keyExtractor={(item, index) => index.toString()}
        renderItem={(item) => {
          return (
            <Pressable
              onPress={() => {
                props.selectRoute({
                  number: item.item.number,
                  type: item.item.type,
                  route: item.item.route,
                });
                sendMessage(JSON.stringify({ type: "Get", number: item.item.number, }));
                props.navigate("Map");
              }}
            >
              <Text style={styles.item}>{item.item.number}</Text>
            </Pressable>
          );
        }}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  list: {
    backgroundColor: "#fefefe",
    height: "100%",
    paddingTop: 20,
    alignItems: "center",
  },
  item: {
    backgroundColor: "#80A1D4",
    margin: 8,
    width: 50,
    padding: 10,
    color: "white",
    fontSize: 20,
    textAlign: "center",
  },
});
