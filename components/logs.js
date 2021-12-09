import React, { useState } from 'react';
import { View, Animated, Text, StyleSheet, TouchableOpacity, ImageBackground, ScrollView } from 'react-native';
import Log from './log';

const Logs = ({ logs }) => {
  return (
    <View>
      <Text style = {styles.logsHeader}>Log</Text>
    <ScrollView style = {styles.logs}>
      {/* Add Task button here */}
      {logs.map( item => {
        return <Log log = {item} key = {item.id} />
      })}
    </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  logsHeader: {
    marginLeft: 20,
    marginRight: 20,
    borderWidth: 1,
  },
  logs: {
    marginLeft: 20,
    marginRight: 20,
    borderWidth: 1,
    maxHeight: 500
  },
})

export default Logs;