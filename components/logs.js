import React from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import Log from './log';

const Logs = ({ logs }) => {
  return (
    <View style = {styles.logsContainer}>
      <Text style = {styles.logsHeader}>Action Log:</Text>
      <View style = {styles.divider}></View>
      <ScrollView style = {styles.logs}>
        {logs.map( item => {
          return <Log log = {item} key = {item.id} />
        })}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  logsContainer: {
    alignItems: 'center'
  },
  logsHeader: {
    marginLeft: 20,
    marginRight: 20,
    alignSelf: 'flex-start',
    fontFamily: 'Menlo',
    fontWeight: 'bold',
    fontSize: 20,
    width: '80%'
  },
  logs: {
    marginLeft: 20,
    marginRight: 20,
    maxHeight: 500
  },
  divider: {
    borderBottomWidth: 1,
    width: '90%'
  },
})

export default Logs;