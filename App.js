import 'react-native-gesture-handler';

import { StyleSheet } from 'react-native';

import Body from './src/Components/BodyComponent';

export default function App() {
  return (
      <Body/>
  );
}

const styles = StyleSheet.create({
  "button": {
    position: 'absolute',
    backgroundColor: "#e3e3e3",
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 1,
  },

  "menu-btn": {
    right: 15,
    top: 50,
    width: 40,
    height: 40,
  },
});