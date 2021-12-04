import React from 'react';
import { View, Text, Button } from 'react-native';

const Home = ({ navigation }) => {

  const pressHandler = () => {
    navigation.navigate('StartQuest')
  };

  return (
    <View>
      <Text>Home</Text>
      <Button title='Login' onPress={pressHandler}/>
    </View>
  )
}

export default Home;