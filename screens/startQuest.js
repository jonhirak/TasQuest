import React, { useState } from 'react';
import { View, Text, Button, FlatList, StyleSheet, TouchableOpacity } from 'react-native';
// import Quest from '../components/quest';

const StartQuest = ({ navigation }) => {
  const [ quests, setQuests ] = useState([
    {
      id: 1,
      title: 'quest1',
      boss:`slime`,
      health: 2000,
      currentHealth: 450,
      members: []
    },
    {
      id: 2,
      title: 'quest2',
      boss:'dragon',
      health: 3500,
      currentHealth: 50,
      members: []},
    {
      id: 3,
      title: 'quest3',
      boss:'alien',
      health: 7000,
      currentHealth: 6400,
      members: []
    }
  ]);

  const pressNewQuestHandler = () => {
    navigation.navigate('NewQuest');
  };

  const pressQuestHandler = (item) => {
    navigation.navigate('Quest', { item });
  };

  // const completeTaskHandler = (taskSize, quest_id) => {
  //   const conversion = {
  //     S: 10,
  //     M: 25,
  //     L: 50,
  //     XL: 100,
  //   }

  //   let questsCopy = quests.slice();

  //   questsCopy.forEach( quest => {
  //     if (quest.id === quest_id) {
  //       quest.currentHealth = quest.currentHealth - conversion[taskSize]
  //     }
  //   })

  //   setQuests(questsCopy);
  // };

  return (
    <View>
      <Text>Start Quest</Text>
      <FlatList
        data = {quests}
        style = {styles.quests}
        renderItem={( {item} ) =>
        <TouchableOpacity style = {styles.quest} onPress={pressQuestHandler.bind(null, item)}>
        <View style = {styles.questView}>
          <Text>{item.title}</Text>
        </View>
      </TouchableOpacity>
      }
      />
      <View style = {styles.newQuestButton}>
        <TouchableOpacity onPress = {pressNewQuestHandler}>
          <Text>
            New Quest
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  quests: {
    margin: 30
  },
  quest: {
    borderWidth: 1,
    marginLeft: 30,
    marginRight: 30,
    alignItems: 'center'
  },
  newQuestButton: {
    borderWidth: 1,
    backgroundColor: 'ivory',
    width: '20%',
    alignSelf: 'center'
  }
})

export default StartQuest;