import React, { useState } from 'react';
import { View, Animated, Text, StyleSheet, TouchableOpacity, Image } from 'react-native';
import Player from './player';

const Players = ({ players, pressPlayerIconHandler }) => {
  return (
    <View style = {styles.players}>
      {players.map( item => {
        return <Player player = {item} key = {item.id} pressPlayerIconHandler={pressPlayerIconHandler} />
      })}
    </View>
  );
};

const styles = StyleSheet.create({
  players: {
    flexDirection: 'row',
    justifyContent: 'center',
  }
})

export default Players;