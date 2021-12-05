import React, { useState } from 'react';
import { View, Text, Button, TextInput, StyleSheet, Image, TouchableOpacity } from 'react-native';
// import DropDownPicker from 'react-native-dropdown-picker';

const NewQuest = ({ navigation }) => {
  const [ form, setForm ] = useState({
    quest_name: '',
    players: [],
  });

  const [ bosses, setBosses ] = useState([
    {
      id: 1,
      image: 'alien.jpg'
    },
    {
      id: 2,
      image: 'slime.jpg'
    },
    {
      id: 3,
      image: 'dragon.jpg'
    },
  ]);

  const [ selectedBoss, setSelectedBoss ] = useState({});

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
          setForm({quest_name: text})
        }}
      />
      <View style = {styles.bosses}>
        {bosses.map( item => {
          return (
            <TouchableOpacity key={item.id}>
              <Image
                style = {styles.boss}
                key = {item.id}
                source = {{uri: `/Users/jonhi1/Desktop/MVP/mvp/images/boss_stills/${item.image}`}}
              />
            </TouchableOpacity>
          )
        })}
      </View>
      {/* Add members */}
      {/* Add tasks and calculate boss health */}
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
  },
  bosses: {
    flexDirection: 'row',
    justifyContent: 'center'
  },
  boss: {
    width: 80,
    height: 80,
    borderRadius: 100/2,
    marginLeft: 10,
    marginRight: 10,
    backgroundColor: 'rgba(0,0,0,5)',
    borderWidth: 1,
  }
})

export default NewQuest;