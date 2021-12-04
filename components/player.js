import React, { useState } from 'react';
import { View, Animated, Text, StyleSheet, TouchableOpacity, Image } from 'react-native';

const Player = ({ player }) => {
  return (
    <View>
      <Image style = {styles.portrait} source = {{uri: `/Users/jonhi1/Desktop/MVP/mvp/images/portraits/${player.photo}`}} />
      <Text style = {styles.name} >{player.name}</Text>
    </View>
  )
};

const styles = StyleSheet.create({
  portrait: {
    width: 80,
    height: 80,
    borderRadius: 100/2,
    marginLeft: 10,
    marginRight: 10,
  },
  name: {
    fontFamily: 'Menlo',
    fontSize: 10,
    fontWeight: 'bold',
    alignSelf: 'center'
  }

})
export default Player;