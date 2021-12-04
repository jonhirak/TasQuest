import React, { useState } from 'react';
import { View, Animated, Text, StyleSheet, TouchableOpacity } from 'react-native';

const TaskList = ({ task, completeTaskHandler }) => {



  return (
    <View style = {styles.list}>
      <Text style = {styles.taskTitle}>{task.title}</Text>
      <TouchableOpacity onPress = {completeTaskHandler.bind(null, task.size)}>
        <View style = {styles.complete}>
          <Text>
            Complete
          </Text>
        </View>
      </TouchableOpacity>
    </View>
  )
};

const styles = StyleSheet.create({
  list: {
    // alignSelf: 'center'
    borderWidth: 1,
  },
  complete: {
    borderWidth: 1,
    backgroundColor: 'ivory',
    width: '20%'
  },
})

export default TaskList;