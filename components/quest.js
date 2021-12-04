import React from 'react';
import { View, Text, Button, StyleSheet, TouchableOpacity  } from 'react-native';

const Quest = ({ title, navigation }) => {
  const pressHandler = () => {
    navigation.navigate('Quest');
  };

  return (
    <TouchableOpacity style = {styles.quest} onPress={pressHandler}>
      <View style = {styles.questView}>
        <Text>{title}</Text>
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  quest: {
    padding: 15,
    backgroundColor: '#f8f8f8',
    borderBottomWidth: 1,
    borderColor: '#eee'
  },
  questView: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  }
})

export default Quest;