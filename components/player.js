import React, { useState } from 'react';
import { View, Animated, Text, StyleSheet, TouchableOpacity, Image } from 'react-native';

const Player = ({ player, pressPlayerIconHandler }) => {

  return (
    <View>
       <TouchableOpacity onPress = {pressPlayerIconHandler.bind(null, player)}>
        <Image style = {styles.portrait} source = {{uri: `/Users/jonhi1/Desktop/MVP/mvp/images/portraits/${player.photo}`}} />
        <Text style = {styles.name} >{player.name}</Text>
      </TouchableOpacity>
    </View>
  )
};

const styles = StyleSheet.create({
  portrait: {
    width: 60,
    height: 60,
    borderRadius: 10,
    marginTop: 2,
    marginLeft: 10,
    marginRight: 10,
    borderWidth: 1
  },
  name: {
    fontFamily: 'Menlo',
    fontSize: 10,
    fontWeight: 'bold',
    alignSelf: 'center'
  }

})
export default Player;