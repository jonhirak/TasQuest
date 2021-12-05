import React, { useState } from 'react';
import { View, Animated, Text, StyleSheet, TouchableOpacity, ImageBackground } from 'react-native';
import Log from './log';

const Logs = ({ logs }) => {
  return (
    <View style = {styles.logs}>
      {/* Add Task button here */}
      <Text style = {styles.logsHeader}>Log</Text>
      {logs.map( item => {
        return <Log log = {item} key = {item.id} />
      })}
    </View>
  );
};

const styles = StyleSheet.create({
  logs: {
    margin: 20,
    borderWidth: 1,
  },
})

export default Logs;