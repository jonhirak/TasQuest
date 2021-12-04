import React, { useState } from 'react';
import { View, Animated, Text, StyleSheet, TouchableOpacity, Image } from 'react-native';
import Player from './player';

const Players = ({ players }) => {
  return (
    <View style = {styles.players}>
      {players.map( item => {
        return <Player player = {item} key = {item.id}/>
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