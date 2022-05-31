import React from "react";

import MapView, { Marker, PROVIDER_GOOGLE, Polyline } from "react-native-maps";
import { View, StyleSheet, Pressable, Text } from "react-native";

import Icon from "react-native-vector-icons/FontAwesome5";

import {PinComponent, initialRegion } from "../Util/mapUtil";

import simpleMapStyle from "../Util/simplifiedMapStyle.json"

export default function MapComponent(props) {
  const mapRouteForward =
    props.selectedRoute.route == null ? null : 
    props.selectedRoute.route.forward == null ? null : (
      <Polyline
        coordinates={props.selectedRoute.route.forward}
        strokeColor="#80A1D4"
        strokeColors={["#80A1D4"]}
        strokeWidth={3}
      />
    );

  const pinForward =
    props.selectedRoute.route == null ? null : 
    props.selectedRoute.route.forward == null ? null : (
      <Marker
      key={props.selectedRoute.number.toString()+"A"}
      coordinate={props.selectedRoute.route.forward[0]}>
        <Icon name="map-marker" size={30} color="#80A1D4" />
        <Text style={{ position: "absolute", right: 7, top: 3, color: "#fff" }}>
          A
        </Text>
      </Marker>
    );

  const mapRouteBackward =
    props.selectedRoute.route == null ? null : 
    props.selectedRoute.route.backward == null ? null : (
      <Polyline
        coordinates={props.selectedRoute.route.backward}
        strokeColor="#75C9C8"
        strokeColors={["#75C9C8"]}
        strokeWidth={3}
      />
    );

  const pinBackWard =
    props.selectedRoute.route == null ? null : 
    props.selectedRoute.route.backward == null ? null : (
      <Marker
      key={props.selectedRoute.number.toString()+"B"}
      coordinate={props.selectedRoute.route.backward[0]}>
        <View>
          <Icon name="map-marker" size={30} color="#75C9C8" />
          <Text
            style={{ position: "absolute", right: 7, top: 3, color: "#fff" }}
          >
            B
          </Text>
        </View>
      </Marker>
    );



  return (
    <View style={styles.container}>
      <MapView
        liteMode
        customMapStyle={simpleMapStyle}
        provider={PROVIDER_GOOGLE}
        style={styles.map}
        showsUserLocation
        showsMyLocationButton
        initialRegion={initialRegion}
      >
        <Marker coordinate={{ latitude: 47.02559, longitude: 28.83033 }}>
          <PinComponent />
        </Marker>
        {/* {markers} */}
        {mapRouteForward}
        {pinForward}
        {mapRouteBackward}
        {pinBackWard}
      </MapView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    ...StyleSheet.absoluteFillObject,
    flex: 1,
    justifyContent: "flex-end",
    alignItems: "center",
  },
  map: {
    ...StyleSheet.absoluteFillObject,
  },
});
