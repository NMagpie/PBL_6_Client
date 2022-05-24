import React from 'react';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, Pressable, } from 'react-native';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { solid, regular, brands } from '@fortawesome/fontawesome-svg-core/import.macro';
import { faBars } from '@fortawesome/free-solid-svg-icons';

import Body from './BodyComponent';

export default function Main(props) {

    return(
        <View style={styles.container}>
        <Pressable style={styles.button}>
          <FontAwesomeIcon icon={faBars} size={25}/>
        </Pressable>
        <Body/>
        <StatusBar style="auto" />
      </View>
    );

}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#fff',
      alignItems: 'center',
      justifyContent: 'center',
    },

    button: {
      position: 'absolute',
      right: 15,
      top: 50,
      width: 40,
      height: 40,
      backgroundColor: "#e3e3e3",
      borderRadius: 20,
      justifyContent: 'center',
      alignItems: 'center',
      zIndex: 1,
    },
  });
