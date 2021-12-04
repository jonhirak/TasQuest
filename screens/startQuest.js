import React, { useState } from 'react';
import { View, Text, Button, FlatList, StyleSheet, TouchableOpacity } from 'react-native';
// import Quest from '../components/quest';

const StartQuest = ({ navigation }) => {
  const [ quests, setQuests ] = useState([
    {
      id: 1,
      title: 'quest1', boss:'d8uw910-2308db5c-22ae-44bd-b19f-600fc38dbf9e.gif',
      health: 2000,
      currentHealth: 450,
      members: []
    },
    {
      id: 2,
      title: 'quest2',
      boss:'d8uw910-2308db5c-22ae-44bd-b19f-600fc38dbf9e.gif',
      health: 3500,
      currentHealth: 50,
      members: []},
    {
      id: 3,
      title: 'quest3',
      boss:'d8uw910-2308db5c-22ae-44bd-b19f-600fc38dbf9e.gif',
      health: 11000,
      currentHealth: 9990,
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
        renderItem={( {item} ) =>
        <TouchableOpacity style = {styles.quest} onPress={pressQuestHandler.bind(null, item)}>
        <View style = {styles.questView}>
          <Text>{item.title}</Text>
        </View>
      </TouchableOpacity>
      }
      />
      <Button title='New Quest' onPress={pressNewQuestHandler}/>
    </View>
  )
}

const styles = StyleSheet.create({

})

export default StartQuest;