import Icon from "react-native-vector-icons/FontAwesome5";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";

import { Marker } from "react-native-maps";

export function PinComponent(props) {
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
}

export const apiKey = process.env["REACT_APP_MAP"];

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

function coords() {
  var array = [];

  for (let i = 0; i < 11; i++) {
    array.push({
      latitude: rndCoord(cMinMax.lat.min, cMinMax.lat.max),
      longitude: rndCoord(cMinMax.lng.min, cMinMax.lng.max),
    });
  }

  return array;
}

export const markers = coords().map((point, index) => {
  return (
    <Marker
      key={index}
      coordinate={{ latitude: point.latitude, longitude: point.longitude }}
    >
      <PinComponent />
    </Marker>
  );
});

export const initialRegion = {
  latitude: 47.02559,
  longitude: 28.83033,
  latitudeDelta: 0.0922,
  longitudeDelta: 0.0421,
};
