import React from 'react';
import { View, Text, Button } from 'react-native';

const NewQuest = ({ navigation }) => {
  const pressHandler = () => {
    navigation.navigate('StartQuest')
  };

  return (
    <View>
      <Text>New Quest</Text>
      <Button title='Add Quest' onPress={pressHandler} />
    </View>
  )
}

export default NewQuest;