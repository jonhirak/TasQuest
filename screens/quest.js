import React, { useState, useEffect } from 'react';
import { View, Text, Image, StyleSheet, ScrollView, ImageBackground } from 'react-native';
import HealthBar from '../components/healthBar';
import Tasks from '../components/tasks'
import Logs from '../components/logs';
import Players from '../components/players';

const Quest = ({ navigation }) => {
  const [ tasks, setTasks ] = useState([
    {
      id: 1,
      title: 'task1',
      size: 'S'
    },
    {
      id: 2,
      title: 'task2',
      size: 'XL',
    },
    {
      id: 3,
      title: 'task3',
      size: 'M',
    }
  ]);
  const [ logs, setLogs ] = useState([
    {
      id: 1,
      time: 'Nov 2, 2021 08:54 PM',
      text: 'toolpanda completed task "implement a modal in the Q&A widget" and dealt 25 damage!'
    },
    {
      id: 2,
      time: 'Nov 2, 2021 08:02 PM',
      text: 'summyking completed "achieved 100% test coverage in Overview widget" and dealt 100 damage!'
    },
    {
      id: 3,
      time: 'Nov 2, 2021 11:54 AM',
      text: 'mediocrekick completed task "implement photo uploads feature" and dealt 50 damage!'
    }
  ]);
  const [ players, setPlayers ] = useState([
    {
      id: 1,
      name: 'mediocrekick',
      level: 3,
      photo: 'fake-person-1.jpg',
      quests: [],
    },
    {
      id: 2,
      name: 'sunnyking',
      level: 3,
      photo: 'fake-person-2.jpg',
      quests: [],
    },
    {
      id: 3,
      name: 'toolpanda',
      level: 3,
      photo: 'fake-person-3.jpg',
      quests: [],
    }
  ])
  const [ quest, setQuest ] = useState({});

  const completeTaskHandler = (taskSize) => {
    const conversion = {
      S: 10,
      M: 25,
      L: 50,
      XL: 100,
    }

    let copy = quest;

    copy.currentHealth = copy.currentHealth - conversion[taskSize]

    setQuest({...copy});
  };

  useEffect(() => {
    const quest = navigation.getParam('item');
    console.log(quest)
    setQuest(quest)
  }, []);

  const healthPercent = quest.currentHealth/quest.health * 100;

  return (
    <ScrollView style = {styles.view}>
      <ImageBackground style={{width: '100%', height: '100%'}} imageStyle={{resizeMode: 'repeat'}}>
      <View style = {styles.boss}>
        <View style = {styles.healthBar}>
          <HealthBar currentHealth = {quest.currentHealth} health = {quest.health} height = {20} healthPercent = {healthPercent} />
        </View>
        <Image style = {styles.bossSprite} source = {require('../images/d8uw910-2308db5c-22ae-44bd-b19f-600fc38dbf9e.gif')}/>
        <Players players = { players }/>
      </View>
      <Tasks tasks = {tasks} completeTaskHandler = {completeTaskHandler}/>
      <Logs logs = {logs}/>
      </ImageBackground>
    </ScrollView>
  )
}

const styles = StyleSheet.create({
  view: {
    flex: 2,
    backgroundColor: "rgb(180, 216, 74)"
  },
  bossSprite: {
    alignSelf: 'center'
  },
  healthBar: {
    paddingTop: 50,
    paddingLeft: 30,
    paddingRight: 30,
  },
  tasksHeader: {
    fontFamily: 'Menlo',
    fontSize: 20,
    fontWeight: 'bold',
    alignSelf: 'center'
  },
})

export default Quest;