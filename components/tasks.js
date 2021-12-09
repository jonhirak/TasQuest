import React, { useState } from 'react';
import { View, Animated, Text, StyleSheet, TouchableOpacity, Image } from 'react-native';
import Task from './task';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faFeatherAlt } from '@fortawesome/free-solid-svg-icons'

const Tasks = ({ tasks, completeTaskHandler, createTaskHandler }) => {
  return (
    <View style = {styles.tasks}>
      <View style = {styles.header}>
        <Text style = {styles.tasksHeader}>Tasks:</Text>
        {/* <View style = {styles.addButton}>
          <Text style = {styles.tasksHeader}>Add</Text>
          <FontAwesomeIcon icon={faFeatherAlt} style = {styles.addIcon} onPress = {createTaskHandler}/>
        </View> */}
      </View>
      <View style = {styles.divider}></View>
      {tasks.map( item => {
        return <Task task = {item} completeTaskHandler = {completeTaskHandler} key = {item.id} />
      })}
       <TouchableOpacity style = {styles.addButton} onPress = {createTaskHandler}>
          <Text style = {styles.tasksHeader}>Add</Text>
          <FontAwesomeIcon icon={faFeatherAlt} style = {styles.addIcon}/>
        </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  tasks: {
    margin: 20,
    // borderWidth: 1
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between'
  },
  tasksHeader: {
    fontFamily: 'Menlo',
    fontWeight: 'bold',
    // marginLeft: '5%',
    fontSize: 20
  },
  divider: {
    borderBottomWidth: 1,
    width: '80%'
  },
  addButton:{
    borderWidth: 1,
    borderRadius: 5,
    padding: 5,
    flexDirection: 'row',
    width: '20%'
  },
  addIcon: {
    alignSelf: 'center',
  }
})

export default Tasks;

