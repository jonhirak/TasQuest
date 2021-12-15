import React, { useState } from 'react';
import { View, Animated, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faFeatherAlt } from '@fortawesome/free-solid-svg-icons'

const Task = ({ task, completeTaskHandler }) => {



  return (
    <View style = {styles.list}>
      <View style = {styles.taskInfo}>
        <View style = {styles.sizeContainer}>
          <Text style = {styles.taskSize}>{task.size}</Text>
        </View>
        <Text style = {styles.taskTitle}>{task.title}</Text>
      </View>
      {completeTaskHandler &&
        <View style = {styles.complete}>
          <TouchableOpacity onPress = {completeTaskHandler.bind(null, task)}>
          {/* <FontAwesomeIcon icon={faFeatherAlt} style = {styles.attackIcon}/> */}
            <Text style = {styles.completeButton}>
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
    justifyContent: 'space-between',
    backgroundColor: 'rgba(255, 255, 255, 0.6)',
  },
  taskInfo: {
    flexDirection: 'row',
    height: '100%',
    alignItems: 'center',
    flex: 4
  },
  taskTitle:{
    fontFamily: 'Menlo',
    fontWeight: 'bold',
    maxWidth: '80%',
    marginLeft: 5,
  },
  sizeContainer: {
    width: 30,
    height: '100%',
    // borderRadius: 20,
    backgroundColor: 'black',
    padding: 5,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 5,
    borderTopLeftRadius: 5,
    borderBottomLeftRadius: 5
  },
  taskSize: {
    fontFamily: 'Menlo',
    fontSize: 15,
    color: 'white'
  },
  complete: {
    borderWidth: 1,
    borderRadius: 5,
    padding: 5,
    flexDirection: 'row',
    width: 80,
    backgroundColor: 'black',
    justifyContent: 'center',
    marginBottom: 3,
    marginRight: 3,
    flex: 1
  },
  completeButton: {
    color: 'white'
  }
})

export default Task;