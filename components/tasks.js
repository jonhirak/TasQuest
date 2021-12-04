import React, { useState } from 'react';
import { View, Animated, Text, StyleSheet, TouchableOpacity, Image } from 'react-native';
import Task from './task';

const Tasks = ({ tasks, completeTaskHandler }) => {
  return (
    <View style = {styles.tasks}>
        <Text style = {styles.tasksHeader}>Tasks</Text>
        {tasks.map( item => {
          return <Task task = {item} completeTaskHandler = {completeTaskHandler} key = {item.id} />
        })}
    </View>
  );
};

const styles = StyleSheet.create({
  tasks: {
    margin: 20,
    borderWidth: 1
  },
})

export default Tasks;

