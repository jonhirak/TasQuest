import React, { useState } from 'react';
import { View, Text, Button, FlatList } from 'react-native';
import Quest from '../components/quest';

const StartQuest = ({ navigation }) => {
  const [ quests, setQuests ] = useState([
    {title: 'quest1'},
    {title: 'quest2'},
    {title: 'quest3'}
  ]);

  const pressHandler = () => {
    navigation.navigate('NewQuest')
  };

  return (
    <View>
      <Text>Start Quest</Text>
      <FlatList
        data = {quests}
        renderItem={( {item} ) =>
        <Quest title={item.title} navigation={navigation}/>
      }
      />
      <Button title='New Quest' onPress={pressHandler}/>
    </View>
  )
}

export default StartQuest;