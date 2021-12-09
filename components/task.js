import React, { useState } from 'react';
import { View, Animated, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faFeatherAlt } from '@fortawesome/free-solid-svg-icons'

const Task = ({ task, completeTaskHandler }) => {



  return (
    <View style = {styles.list}>
      <Text style = {styles.taskTitle}>{task.title}</Text>
      <View style = {styles.sizeContainer}>
        <Text style = {styles.taskSize}>{task.size}</Text>
      </View>
      {completeTaskHandler &&
        <View style = {styles.complete}>
          <TouchableOpacity onPress = {completeTaskHandler.bind(null, task)}>
          <FontAwesomeIcon icon={faFeatherAlt} style = {styles.attackIcon}/>
            <Text>
              Complete
            </Text>
          </TouchableOpacity>
        </View>
      }
    </View>
  )
};

const styles = StyleSheet.create({
  list: {
    borderWidth: 1,
    alignItems: 'center',
    flexDirection: 'row',
    height: 50,
    borderRadius: 10,
    marginTop: 10,
    justifyContent: 'space-between'
  },
  taskTitle:{
    fontFamily: 'Menlo',
    fontWeight: 'bold',
    marginLeft: 5
  },
  sizeContainer: {
    width: 30,
    height: 30,
    borderRadius: 20,
    backgroundColor: 'black',
    padding: 5,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 5
  },
  taskSize: {
    fontFamily: 'Menlo',
    fontSize: 15,
    color: 'white'
  },
  complete: {
    borderWidth: 1,
    backgroundColor: 'ivory',
    width: '20%'
  },
})

export default Task;