import React, { useState, useEffect } from 'react';
import { View, Text, Modal, Image, StyleSheet, ScrollView, ImageBackground, Button } from 'react-native';
import HealthBar from '../components/healthBar';
import Tasks from '../components/tasks'
import Logs from '../components/logs';
import Players from '../components/players';
import FastImage from 'react-native-fast-image';
import { gifs, images } from '../images.js';

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
      id: 3,
      time: '2021-11-2, 08:54:04',
      text: 'toolpanda completed task "implement a modal in the Q&A widget" and dealt 25 damage!'
    },
    {
      id: 2,
      time: '2021-11-2 08:02:45',
      text: 'summyking completed "achieved 100% test coverage in Overview widget" and dealt 100 damage!'
    },
    {
      id: 1,
      time: '2021-10-30 11:54:37',
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
  const [ modalOpen, setModalOpen ] = useState(false);
  const [ selectedPlayer, setSelectedPlayer ] = useState({});
  const [ quest, setQuest ] = useState({});

  const randomId = () => {
    return Math.floor(Math.random() * 99999);
  }

  const completeTaskHandler = (task) => {
    const conversion = {
      S: 10,
      M: 25,
      L: 50,
      XL: 100,
    }

    function getFormattedDate(){
      var d = new Date();

      d = d.getFullYear() + "-" + ('0' + (d.getMonth() + 1)).slice(-2) + "-" + ('0' + d.getDate()).slice(-2) + " " + ('0' + d.getHours()).slice(-2) + ":" + ('0' + d.getMinutes()).slice(-2) + ":" + ('0' + d.getSeconds()).slice(-2);

      return d;
  }

    let copy = quest;

    copy.currentHealth = copy.currentHealth - conversion[task.size]
    setQuest({...copy});

    const log = {
      id: randomId(),
      time: getFormattedDate(),
      text: `User completed task "${task.title}" and dealt ${conversion[task.size]} damage!`
    }

    setLogs([log, ...logs])

    let newTasks = [];

    tasks.forEach( item => {
      if (item.id !== task.id) {
        newTasks.push(item);
      }
    });

    setTasks(newTasks)
  };

  const pressPlayerIconHandler = (player) => {
    setSelectedPlayer(player);
    setModalOpen(true);
  };

  useEffect(() => {
    const quest = navigation.getParam('item');
    console.log(quest)
    setQuest(quest)
  }, []);

  const healthPercent = quest.currentHealth/quest.health * 100;

  return (
    <ScrollView style = {styles.view}>

      <Modal visible={modalOpen} animationType='slide'>
        <View style = {styles.modalContent}>
          <Image style = {styles.portrait} source = {{uri: `/Users/jonhi1/Desktop/MVP/mvp/images/portraits/${selectedPlayer.photo}`}} />
        <Text style = {styles.name} >{selectedPlayer.name}</Text>
          <Button onPress={()=> setModalOpen(false)} title='Close' style={styles.Close}/>
        </View>
      </Modal>

      <View style = {styles.screen}>
        <View style = {styles.healthBar}>
          <HealthBar currentHealth = {quest.currentHealth} health = {quest.health} height = {15} healthPercent = {healthPercent} />
        </View>
        <Image
          style = {styles.bossSprite}
          source = {gifs[quest.boss]}
        />
        <Players players = { players } pressPlayerIconHandler={pressPlayerIconHandler}/>
      </View>
      <Tasks tasks = {tasks} completeTaskHandler = {completeTaskHandler}/>
      <Logs logs = {logs}/>
    </ScrollView>
  )
}

const styles = StyleSheet.create({
  view: {
    flex: 1,
    backgroundColor: "rgb(180, 216, 74)",
    // width: '100%',
  },
  screen: {
    marginTop: '3%',
    alignSelf: 'center',
    borderWidth: 5,
    width: '96%',
    maxHeight: '40%'
  },
  bossSprite: {
    alignSelf: 'center',
    maxHeight: 180,
    maxWidth: 180
  },
  healthBar: {
    alignSelf: 'center',
    paddingTop: '2%',
    width: 200,
  },
  tasksHeader: {
    fontFamily: 'Menlo',
    fontSize: 20,
    fontWeight: 'bold',
    alignSelf: 'center'
  },
  modalContent:{
    marginTop: '25%'
  },
  portrait: {
    width: 150,
    height: 150,
    // borderRadius: 1,
    marginLeft: 10,
    marginRight: 10,
    alignSelf: 'center'
  },
  name: {
    fontFamily: 'Menlo',
    fontSize: 30,
    fontWeight: 'bold',
    alignSelf: 'center'
  }
})

export default Quest;