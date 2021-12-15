import React, { useState } from 'react';
import { View, Text, Button, FlatList, StyleSheet, TouchableOpacity, Pressable, ImageBackground } from 'react-native';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faCaretRight } from '@fortawesome/free-solid-svg-icons';
import { images } from '../images';
// import Quest from '../components/quest';

const StartQuest = ({ navigation }) => {
  const [ quests, setQuests ] = useState([
    {
      id: 1,
      title: 'FEC',
      boss:`slime`,
      stage: 'patternedStage',
      health: 2000,
      currentHealth: 2000,
      reward: 'Pizza party',
      tasks: [
        {
          id: 1,
          title: 'task1',
          size: 'L'
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
        },
        {
          id: 4,
          title: 'task4',
          size: 'M',
        }
      ],
      players: [
        {
          id: 1,
          name: 'mediocrekick',
          level: 58,
          photo: 'fake-person-1.jpg',
          quests: [],
        },
        {
          id: 2,
          name: 'sunnyking',
          level: 29,
          photo: 'fake-person-2.jpg',
          quests: [],
        },
        {
          id: 3,
          name: 'toolpanda',
          level: 62,
          photo: 'fake-person-3.jpg',
          quests: [],
        }
      ]
    },
    {
      id: 2,
      title: 'SDC',
      boss:'dragon',
      stage: 'blueSkyStage',
      health: 10500,
      currentHealth: 1600,
      reward: 'Movie night',
      tasks: [
        {
          id: 1,
          title: 'task1',
          size: 'L'
        },
        {
          id: 2,
          title: 'task2',
          size: 'XL',
        },
        {
          id: 3,
          title: 'task3',
          size: 'S',
        }
      ],
      players: [
        {
          id: 1,
          name: 'mediocrekick',
          level: 58,
          photo: 'fake-person-1.jpg',
          quests: [],
        },
        {
          id: 2,
          name: 'sunnyking',
          level: 29,
          photo: 'fake-person-2.jpg',
          quests: [],
        },
        {
          id: 3,
          name: 'toolpanda',
          level: 62,
          photo: 'fake-person-3.jpg',
          quests: [],
        }
      ]},
    {
      id: 3,
      title: 'Blue Ocean',
      boss:'alien',
      stage: 'rocksStage',
      health: 7400,
      currentHealth: 2500,
      reward: 'Video games!',
      tasks: [
        {
          id: 1,
          title: 'task1',
          size: 'XL'
        },
        {
          id: 2,
          title: 'task2',
          size: 'XL',
        },
        {
          id: 3,
          title: 'task3',
          size: 'L',
        }
      ],
      players: [
        {
          id: 1,
          name: 'mediocrekick',
          level: 58,
          photo: 'fake-person-1.jpg',
          quests: [],
        },
        {
          id: 2,
          name: 'sunnyking',
          level: 29,
          photo: 'fake-person-2.jpg',
          quests: [],
        },
        {
          id: 3,
          name: 'toolpanda',
          level: 62,
          photo: 'fake-person-3.jpg',
          quests: [],
        }
      ]
    }
  ]);


  const pressNewQuestHandler = () => {
    navigation.navigate('NewQuest', {
      quests,
      setQuests
    });
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
    <ImageBackground
          style = {styles.container}
          source = {images.swordBackground}
      >
      <Text style = {styles.questsHeader}>
        Your Quests
      </Text>
      <View style = {styles.divider}></View>
      <FlatList
        data = {quests}
        style = {styles.quests}
        renderItem={( {item} ) =>
        <TouchableOpacity style = {styles.quest} onPress={pressQuestHandler.bind(null, item)}>
        <View style = {styles.questView}>
          <Text style = {styles.questName}>{item.title}</Text>
        </View>
        <FontAwesomeIcon icon={faCaretRight} style = {styles.arrowIcon}/>
      </TouchableOpacity>
      }
      />
      <TouchableOpacity style = {styles.button}onPress={pressNewQuestHandler}>
        <Text style = {styles.buttonText} >New Quest</Text>
      </TouchableOpacity>
    </ImageBackground>
  )
}

const styles = StyleSheet.create({
  container: {
    height: '100%',
    alignItems: 'center',
  },
  questsHeader: {
    fontFamily: 'Menlo',
    fontWeight: 'bold',
    fontSize: 30,
    width: '80%',
    marginTop: '10%'
  },
  divider: {
    borderBottomWidth: 1,
    width: '80%'
  },
  quests: {
    width: '80%',
    maxHeight: '100%'
  },
  quest: {
    borderWidth: 1,
    alignItems: 'center',
    flexDirection: 'row',
    height: 50,
    borderRadius: 10,
    marginTop: 10,
    justifyContent: 'space-between',
    backgroundColor: 'rgba(0,0,0,0.6)',
    // shadowColor: 'rgba(0,0,0,1)',
    // shadowOffset: {
    //   width: 2,
    //   height: ,
    // },
    // shadowOpacity: 1,
    // shadowRadius: 5
  },
  questName: {
    fontFamily: 'Menlo',
    fontWeight: 'bold',
    marginLeft: 5,
    color: 'white'
  },
  arrowIcon: {
    flex: 1,
    marginRight: 5
  },
  button: {
    alignSelf: 'center',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 12,
    paddingHorizontal: 32,
    borderRadius: 4,
    elevation: 3,
    backgroundColor: 'black',
    width: '70%',
    marginBottom: '10%'
  },
  buttonText: {
    fontSize: 16,
    lineHeight: 21,
    fontWeight: 'bold',
    letterSpacing: 0.25,
    color: 'white',
    fontFamily: 'Menlo'
  },
})

export default StartQuest;