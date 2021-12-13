import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';

const Log = ({ log }) => {
  return (
    <View style = {styles.logContainer}>
      <Text style = {styles.logTime}>{log.time}</Text>
      <Text style = {styles.logText}>{log.text}</Text>
    </View>
  )
};

const styles = StyleSheet.create({
  logContainer: {
    // borderWidth: 1,
    padding: 10,
    backgroundColor: 'rgba(0,0,0,0.3)',
    borderWidth: 1,
    borderRadius: 10,
    marginTop: 10,
  },
  logTime: {
    fontFamily: 'Menlo',
    fontSize: 16,
    marginBottom: 10
  },
  logText: {
    fontFamily: 'Menlo',
    fontSize: 16,
  }
})

export default Log;