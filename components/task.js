import React, { useState } from 'react';
import { View, Animated, Text, StyleSheet, TouchableOpacity } from 'react-native';

const Task = ({ task, completeTaskHandler }) => {



  return (
    <View style = {styles.list}>
      <Text style = {styles.taskTitle}>{task.title}</Text>
      <Text style = {styles.taskSize}>{task.size}</Text>
      <View style = {styles.complete}>
        <TouchableOpacity onPress = {completeTaskHandler.bind(null, task)}>
          <Text>
            Complete
          </Text>
        </TouchableOpacity>
      </View>
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

export default Task;