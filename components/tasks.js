import React, { useState } from 'react';
import { View, Animated, Text, StyleSheet, TouchableOpacity, Image } from 'react-native';
import Task from './task';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faFeatherAlt } from '@fortawesome/free-solid-svg-icons'

const Tasks = ({ tasks, completeTaskHandler, createTaskHandler }) => {
  return (
    <View style = {styles.tasks}>
      <View style = {styles.header}>
        <Text style = {styles.tasksTitle}>Tasks:</Text>
      </View>
      <View style = {styles.divider}></View>
      {tasks.map( item => {
        return <Task task = {item} completeTaskHandler = {completeTaskHandler} key = {item.id} />
      })}
       <TouchableOpacity style = {styles.addButton} onPress = {createTaskHandler}>
          {/* <FontAwesomeIcon icon={faFeatherAlt} style = {styles.addIcon}/> */}
          <Text style = {styles.tasksHeader}>Add</Text>
        </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  tasks: {
    margin: 20,
    // borderWidth: 1
  },
  tasksTitle: {
    fontFamily: 'Menlo',
    fontSize: 20,
    fontWeight: 'bold',
    alignSelf: 'center'
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between'
  },
  tasksHeader: {
    fontFamily: 'Menlo',
    fontWeight: 'bold',
    // marginLeft: '5%',
    fontSize: 15,
    color: 'white'
  },
  divider: {
    borderBottomWidth: 1,
  },
  addButton:{
    borderWidth: 1,
    borderRadius: 5,
    padding: 5,
    flexDirection: 'row',
    width: 70,
    backgroundColor: 'black',
    alignSelf: 'center',
    justifyContent: 'center',
    marginTop: 10
  },
  // addButton: {
  //   borderWidth: 1,
  //   borderRadius: 15,
  //   padding: 10,
  //   flexDirection: 'row',
  //   // width: 70,
  //   backgroundColor: 'black',
  //   alignSelf: 'center',
  //   justifyContent: 'center',
  //   marginTop: 10
  // },
  // addIcon: {
  //   alignSelf: 'center',
  //   color: 'white'
  // }
})

export default Tasks;

