import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import Task from './task';

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
          <Text style = {styles.tasksHeader}>Add</Text>
        </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  tasks: {
    margin: 20,
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
})

export default Tasks;

