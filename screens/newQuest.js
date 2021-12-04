import React, { useState } from 'react';
import { View, Text, Button, TextInput, StyleSheet } from 'react-native';

const NewQuest = ({ navigation }) => {
  const [ form, setForm ] = useState({
    quest_name: '',
    players: [],
  });
  const pressHandler = () => {
    navigation.navigate('StartQuest')
  };

  return (
    <View>
      <Text>New Quest</Text>
      <TextInput
        placeholder="Enter Quest Name"
        style = {styles.input}
        onChangeText={(text) => {
          this.setForm({quest_name: text})
        }}
      />
      <Button title='Add Quest' onPress={pressHandler} />
    </View>
  )
}

const styles = StyleSheet.create({
  input: {
    borderWidth: 2,
    margin: 10,
    width: '80%',
    alignSelf: 'center'
  }
})

export default NewQuest;