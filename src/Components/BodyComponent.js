import React, { useState, useEffect } from "react";

import { StatusBar } from "expo-status-bar";

import { NavigationContainer } from "@react-navigation/native";

import {
  createDrawerNavigator,
  DrawerContentScrollView,
  DrawerItemList,
  DrawerItem,
} from "@react-navigation/drawer";

import { StyleSheet, Pressable } from "react-native";

import Icon from "react-native-vector-icons/FontAwesome5";

import MapComponent from "./MapComponent";

import SelectTransport from "./SelectTransportComponent";

import { resetTrolleys } from "../Util/Network";

const Drawer = createDrawerNavigator();

function CustomDrawerContent(props) {
  return (
    <DrawerContentScrollView {...props}>
      <DrawerItemList {...props} />
    </DrawerContentScrollView>
  );
}

const emptyRoute = {
  number: null,
  type: null,
  route: null,
};

const emptyTrolleys = {
  number: null,
  id: null,
  flow: null,
  position: {
    latitude: null,
    longitude: null,
  },
};

export default function Body(props) {

  const [selectedRoute, selectRoute] = useState(emptyRoute);

  const headerTitle =
    selectedRoute.number == null ? "Map" : "Route " + selectedRoute.number;

  return (
    <NavigationContainer>
      <Drawer.Navigator
        drawerContent={(props) => (
          <CustomDrawerContent {...props} selectRoute={selectRoute} />
        )}
        initialRouteName="Map"
        screenOptions={({ navigation }) => ({
          drawerType: "front",
          drawerPosition: "right",
          swipeEnabled: false,
          headerLeft: (props) => {
            if (selectedRoute.number == null) return null;
            else
              return (
                <Pressable
                  style={styles["close-btn"]}
                  onPress={() => {
                    resetTrolleys();
                    selectRoute(emptyRoute);
                  }}
                >
                  <Icon name="times" size={25} />
                </Pressable>
              );
          },
          headerTitle: headerTitle,
          headerTitleStyle: styles["header-text"],
          headerRight: (props) => {
            return (
              <Pressable
                style={styles["menu-btn"]}
                onPress={navigation.toggleDrawer}
              >
                <Icon name="bars" size={25} />
              </Pressable>
            );
          },
        })}
      >
        <Drawer.Screen
          name="Map"
          children={() => <MapComponent selectedRoute={selectedRoute}/>}
        />

        <Drawer.Screen
          name="Select Route"
          options={{
            headerTitle: "Select Route",
          }}
          children={({ route, navigation }) => (
            <SelectTransport
              selectRoute={selectRoute}
              navigate={navigation.navigate}
            />
          )}
        />
      </Drawer.Navigator>
      <StatusBar style="dark-content" />
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  header: {
    marginTop: 50,
    marginBottom: 15,
    width: "100%",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
  },
  "menu-btn": {
    marginRight: 15,
  },
  "close-btn": {
    marginLeft: 15,
  },
  "header-text": {},
});
