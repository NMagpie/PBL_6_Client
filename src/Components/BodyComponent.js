import React, { useState, useEffect } from "react";

import MapView, { Marker, PROVIDER_GOOGLE } from "react-native-maps";
import { View, StyleSheet } from "react-native";
import mapStyle from "./darkMapStyle.json";

import Icon from "react-native-vector-icons/FontAwesome5";

// import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
// import { faLocationPin, faCircleNotch, } from "@fortawesome/free-solid-svg-icons";
// import MapView from "react-native-map-clustering";

const apiKey = process.env["REACT_APP_MAP"];

const PinComponent = () => {
  return (
    <Icon
      name="map-marker"
      size={25}
      color={
        "#" +
        Math.floor(Math.random() * (0xffffff + 1))
          .toString(16)
          .padStart(6, "0")
      }
    />
  );
  //return <FontAwesomeIcon icon={faLocationPin} size={25} color={'#' + Math.floor(Math.random() * (0xffffff + 1)).toString(16).padStart(6, '0')} />;
};

const cMinMax = {
  lat: {
    max: 47.067922,
    min: 46.951888,
  },
  lng: {
    max: 28.915586,
    min: 28.748907,
  },
};

function rndCoord(min, max) {
  return Math.random() * (max - min) + min;
}

const coords = () => {
  var array = [];

  for (let i = 0; i < 11; i++) {
    array.push({
      latitude: rndCoord(cMinMax.lat.min, cMinMax.lat.max),
      longitude: rndCoord(cMinMax.lng.min, cMinMax.lng.max),
    });
  }

  return array;
};

function Body(props) {

  const markers = coords().map((point, index) => {
    return (
      <Marker
        key={index}
        coordinate={{ latitude: point.latitude, longitude: point.longitude }}
      >
        <PinComponent />
      </Marker>
    );
  });

  return (
    <View style={styles.container}>
      <MapView
        customMapStyle={[]}
        provider={PROVIDER_GOOGLE}
        style={styles.map}
        showsUserLocation={true}
        initialRegion={{
          latitude: 47.02559,
          longitude: 28.83033,
          latitudeDelta: 0.0922,
          longitudeDelta: 0.0421,
        }}
      >
        <Marker coordinate={{ latitude: 47.02559, longitude: 28.83033 }}>
          <PinComponent />
        </Marker>
        {markers}
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

export default Body;
