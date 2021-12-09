import React, { useState } from 'react';
import { View, Text, Button, TextInput, StyleSheet, Image, TouchableOpacity, Pressable, Dimensions } from 'react-native';
import Tasks from '../components/tasks.js';
import AddTaskModal from '../components/addTaskModal.js';
import DropDownPicker from 'react-native-dropdown-picker';
import { randomId } from '../randomId.js';
import { conversion } from '../conversion.js';
import Carousel from 'react-native-anchor-carousel';
const {width: windowWidth} = Dimensions.get('window');
import { images } from '../images.js';


const NewQuest = ({ navigation }) => {
  const [ questForm, setQuestForm ] = useState({
    id: null,
    title: '',
    boss: '',
    stage: '',
    health: 0,
    currentHealth: 0,
    tasks: [],
    players: [],
  });

  const carouselRef = React.useRef(null);

  const [ stages, setStages ] = useState([
    {
      id: 1,
      name: 'bricksStage',
    },
    {
      id: 2,
      name: 'crystalStage',
    },
    {
      id: 3,
      name: 'patternedStage',
    },
    {
      id: 4,
      name: 'blueSkyStage'
    },
    {
      id: 4,
      name: 'rocksStage'
    }
  ])

  const [ bosses, setBosses ] = useState([
    {
      id: 1,
      name: 'alien',
      image: 'alien.jpg'
    },
    {
      id: 2,
      name: 'slime',
      image: 'slime.jpg'
    },
    {
      id: 3,
      name: 'dragon',
      image: 'dragon.jpg'
    },
  ]);
  const [ modalOpen, setModalOpen ] = useState(false);
  const [ selectedBoss, setSelectedBoss ] = useState({});
  const [selectedStage, setSelectedStage ] = useState({});
  const [ selectedPlayers, setSelectedPlayers ] = useState([]);

  const [open, setOpen] = useState(false);
  // const [value, setValue] = useState(null);
  const [items, setItems] = useState([
    {label: 'mediocrekick', value: {
      id: 1,
      name: 'mediocrekick',
      level: 58,
      photo: 'fake-person-1.jpg',
      quests: [],
    }},
    {label: 'sunnyking', value: {
      id: 2,
      name: 'sunnyking',
      level: 23,
      photo: 'fake-person-2.jpg',
      quests: [],
    }},
    {label: 'toolpanda', value: {
      id: 3,
      name: 'toolpanda',
      level: 62,
      photo: 'fake-person-3.jpg',
      quests: [],
    }},
  ]);

  const setQuests = navigation.getParam('setQuests');
  const quests = navigation.getParam('quests');

  const calculateBossHealth = () => {
    let health = 0;

    questForm.tasks.forEach( item => {
      health += conversion[item.size];
    })

    return health;
  };

  const createQuestHandler = () => {
    // console.log('SELECTED PLAYERS ' + JSON.stringify(selectedPlayers))
    let newQuest = {...questForm};
    newQuest.id = randomId();
    newQuest.boss = selectedBoss.name;
    newQuest.stage = selectedStage.name;
    newQuest.players = selectedPlayers;
    newQuest.health = calculateBossHealth();
    newQuest.currentHealth = calculateBossHealth();

    let questsCopy = quests.slice();
    questsCopy.push(newQuest);
    setQuests(questsCopy);

    navigation.navigate('StartQuest')
  };

  const createTaskHandler = () => {
    setModalOpen(true);
  };

  const closeModalHandler = (taskForm, value) => {
    taskForm.size = value;
    taskForm.id = randomId();

    let taskFormCopy = {...taskForm};

    questForm.tasks.push(taskFormCopy);

    setQuestForm(questForm);

    setModalOpen(false);
  };

  const pickBossHandler = (boss) => {
    setSelectedBoss(boss)
  };

  // const formValidator = () => {

  // };

  const renderItem = ({item, index}) => {
    return (
      <TouchableOpacity
              style={styles.item}
              onPress={() => {
                carouselRef.current.scrollToIndex(index);
                setSelectedStage(item);
              }}>
        {/* Data Here */}
        <View style = {styles.carouselItem}>
          <Image
            style = {styles.stage}
            key = {item.id}
            source = {images[item.name]}
          />
        </View>
      </TouchableOpacity>
    );
  }

  return (
    <View style = {styles.container}>
      <AddTaskModal modalOpen = {modalOpen} closeModalHandler = {closeModalHandler}/>

      <Text style = {styles.inputTitle}>Quest Name:</Text>
      <TextInput
        // placeholder="Enter Quest Name"
        style = {styles.input}
        onChangeText={(text) => {
          questForm.title = text;
          setQuestForm(questForm);
        }}
      />
      <DropDownPicker
        open={open}
        value={selectedPlayers}
        items={items}
        setOpen={setOpen}
        setValue={setSelectedPlayers}
        setItems={setItems}
        // listmode="SCROLLVIEW"
        searchable = {true}
        multiple={true}
        placeholder="Add Players"
        searchPlaceholder="Search..."
        placeholderStyle={{
          color: "black",
          fontWeight: "bold",
          fontFamily: 'Menlo'
        }}
        style = {styles.addPlayers}
        containerStyle={{
          // alignSelf: 'center',
          width: '50%',
          marginTop: '5%',
          marginLeft: '5%'
        }}
      />
      <Text style = {styles.bossesHeader}>Slect Boss:</Text>
      <View style = {styles.divider}></View>
      <View style = {styles.bosses}>
        {bosses.map( item => {
          return (
            <TouchableOpacity key={item.id} onPress = {pickBossHandler.bind(null, item)}>
              <Image
                style = {styles.boss}
                key = {item.id}
                source = {{uri: `/Users/jonhi1/Desktop/MVP/mvp/images/boss_stills/${item.image}`}}
              />
            </TouchableOpacity>
          )
        })}
      </View>
      <Text style = {styles.stagesHeader}>Slect Stage:</Text>
      <View style = {styles.divider}></View>
      <Carousel
        ref={carouselRef}
        data={stages}
        renderItem={renderItem}
        style={styles.carousel}
        itemWidth={windowWidth * 0.8}
        containerWidth={windowWidth}
        separatorWidth={-30}
      />
      <View style = {styles.divider}></View>
      <Tasks tasks = {questForm.tasks} createTaskHandler = {createTaskHandler}/>
      <TouchableOpacity style = {styles.button}onPress={createQuestHandler}>
        <Text style = {styles.buttonText} >Create Quest</Text>
      </TouchableOpacity>
    </View>
  )
}

const styles = StyleSheet.create({
  container:{

  },
  inputTitle: {
    marginTop: '5%',
    fontFamily: 'Menlo',
    fontWeight: 'bold',
    marginLeft: '5%'
  },
  input: {
    borderWidth: 1,
    width: '50%',
    height: '5%',
    marginLeft: '5%'
    // alignSelf: 'center'
  },
  bossesHeader: {
    fontFamily: 'Menlo',
    fontSize: 20,
    fontWeight: 'bold',
    marginTop: '5%',
    marginLeft: '5%'
  },
  bosses: {
    flexDirection: 'row',
    justifyContent: 'center'
  },
  boss: {
    width: 80,
    height: 80,
    borderRadius: 100/2,
    margin: 10,
    backgroundColor: 'rgba(0,0,0,5)',
    borderWidth: 2,
  },
  addPlayers: {
    height: 30,
  },
  carousel: {
    flexGrow: 0,
    height: 150,
    marginTop: '5%'
  },
  carouselItem: {
    height: 200,
    width: 'auto',
  },
  stagesHeader: {
    fontFamily: 'Menlo',
    fontSize: 20,
    fontWeight: 'bold',
    marginTop: '5%',
    marginLeft: '5%'
  },
  stage: {
    flex: 1,
    width: null,
    height: null,
    resizeMode: 'contain',
  },
  divider: {
    borderBottomWidth: 1,
    width: '90%',
    // marginTop: '5%',
    alignSelf: 'center'
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
    width: '70%'
  },
  buttonText: {
    fontSize: 16,
    lineHeight: 21,
    fontWeight: 'bold',
    letterSpacing: 0.25,
    color: 'white',
    fontFamily: 'Menlo'
  },
  modalHeader: {
    backgroundColor: 'skyblue',
    borderTopWidth: 1,
    borderBottomWidth: 1,
  },
  modalContent:{
    marginTop: 'auto',
    height: '50%',
    backgroundColor: 'ivory'
  }
})

export default NewQuest;