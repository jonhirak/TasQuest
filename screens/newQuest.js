import React, { useState } from 'react';
import { View, Text, TextInput, StyleSheet, Image, TouchableOpacity, Dimensions, ImageBackground, ScrollView } from 'react-native';
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
    reward: '',
  });

  const carouselRef = React.useRef(null);
  const overlayCarouselRef = React.useRef(null);

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
      id: 5,
      name: 'rocksStage'
    },
    {
      id: 6,
      name: 'grassStage'
    },
    {
      id: 7,
      name: 'lavaStage'
    },
    {
      id: 8,
      name: 'swampStage'
    }
  ])

  const [ overlays, setOverlays ] = useState([
    {
      id: 1,
      name: 'caveOverlay',
    },
    {
      id: 2,
      name: 'crystalOverlay',
    },
    {
      id: 3,
      name: 'hillsOverlay',
    },
    {
      id: 4,
      name: 'lightForestOverlay',
    },
    {
      id: 5,
      name: 'skyOverlay',
    },
    {
      id: 6,
      name: 'desertOverlay',
    },
    {
      id: 7,
      name: 'volcanoOverlay',
    },
    {
      id: 8,
      name: 'iceCaveOverlay',
    },
  ]);

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
  const [ selectedStage, setSelectedStage ] = useState({});
  const [ selectedOverlay, setSelectedOverlay] = useState({});
  const [ selectedPlayers, setSelectedPlayers ] = useState([]);

  const [open, setOpen] = useState(false);
  const [items, setItems] = useState([
    {label: 'mediocrekick', value: {
      id: 1,
      name: 'mediocrekick',
      level: 58,
      photo: 'fake-person-1.jpg',
      quests: [],
      damage: 59400,
    }},
    {label: 'sunnyking', value: {
      id: 2,
      name: 'sunnyking',
      level: 23,
      photo: 'fake-person-2.jpg',
      quests: [],
      damage: 46350,
    }},
    {label: 'toolpanda', value: {
      id: 3,
      name: 'toolpanda',
      level: 62,
      photo: 'fake-person-3.jpg',
      quests: [],
      damage: 42000,
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
    let newQuest = {...questForm};
    newQuest.id = randomId();
    newQuest.boss = selectedBoss.name;
    newQuest.stage = selectedStage.name;
    newQuest.overlay = selectedOverlay.name;
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

  const addTaskHandler = (taskForm, value) => {
    taskForm.size = value;
    taskForm.id = randomId();

    let taskFormCopy = {...taskForm};

    questForm.tasks.push(taskFormCopy);

    setQuestForm(questForm);

    setModalOpen(false);
  };

  const closeTaskModalHandler = () => {
    setModalOpen(false);
  };

  const pickBossHandler = (boss) => {
    setSelectedBoss(boss)
  };

  const renderItem = ({item, index}) => {
    return (
      <TouchableOpacity
              style={styles.item}
              onPress={() => {
                carouselRef.current.scrollToIndex(index);
                setSelectedStage(item);
              }}>
        <View style = {styles.carouselItem}>
        {item.id === selectedStage.id?
          <Image
            style = {styles.stage}
            key = {item.id}
            source = {images[item.name]}
          />:
          <Image
            style = {styles.tintedStage}
            key = {item.id}
            source = {images[item.name]}
          />}
        </View>
      </TouchableOpacity>
    );
  }

  const renderOverlay = ({item, index}) => {
    return (
      <TouchableOpacity
              style={styles.item}
              onPress={() => {
                overlayCarouselRef.current.scrollToIndex(index);
                setSelectedOverlay(item);
              }}>
        <View style = {styles.carouselItem}>
        {item.id === selectedOverlay.id?
          <Image
            style = {styles.stage}
            key = {item.id}
            source = {images[item.name]}
          />:
          <Image
            style = {styles.tintedStage}
            key = {item.id}
            source = {images[item.name]}
          />}
        </View>
      </TouchableOpacity>
    );
  }

  return (
    <ImageBackground style = {styles.container} source = {images.grassBackground2}>
      <ScrollView style = {styles.backgroundColor}>
        <View>
          <AddTaskModal modalOpen = {modalOpen} addTaskHandler = {addTaskHandler} closeTaskModalHandler = {closeTaskModalHandler}/>

          <Text style = {styles.inputTitle}>Quest Name:</Text>
          <TextInput
            style = {styles.input}
            onChangeText={(text) => {
              questForm.title = text;
              setQuestForm(questForm);
            }}
          />
          <DropDownPicker
            open={open}
            listMode="SCROLLVIEW"
            value={selectedPlayers}
            items={items}
            setOpen={setOpen}
            setValue={setSelectedPlayers}
            setItems={setItems}
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
              width: '50%',
              marginTop: '5%',
              marginLeft: '5%'
            }}
          />
          <Text style = {styles.bossesHeader}>Select Boss:</Text>
          <View style = {styles.divider}></View>
          <View style = {[styles.bosses, styles.shadowProp]}>
            {bosses.map( item => {
              return (
                <TouchableOpacity key={item.id} onPress = {pickBossHandler.bind(null, item)}>
                  {item.id === selectedBoss.id?
                    <Image
                      style = {styles.boss}
                      key = {item.id}
                      source = {{uri: `/Users/jonhi1/Desktop/MVP/mvp/images/boss_stills/${item.image}`}}
                    />:
                    <Image
                      style = {styles.tintedBoss}
                      key = {item.id}
                      source = {{uri: `/Users/jonhi1/Desktop/MVP/mvp/images/boss_stills/${item.image}`}}
                    />}
                </TouchableOpacity>
              )
            })}
          </View>
          <Text style = {styles.stagesHeader}>Select Overlay:</Text>
          <View style = {styles.divider}></View>
          <Carousel
            ref={overlayCarouselRef}
            data={overlays}
            renderItem={renderOverlay}
            style={[styles.carousel, styles.shadowProp]}
            itemWidth={windowWidth * 0.7}
            containerWidth={windowWidth}
            separatorWidth={20}
          />
          <Text style = {styles.stagesHeader}>Select Stage:</Text>
          <View style = {styles.divider}></View>
          <Carousel
            ref={carouselRef}
            data={stages}
            renderItem={renderItem}
            style={[styles.carousel, styles.shadowProp]}
            itemWidth={windowWidth * 0.8}
            containerWidth={windowWidth}
            separatorWidth={-30}
          />
          <Tasks tasks = {questForm.tasks} createTaskHandler = {createTaskHandler}/>
          <Text style = {styles.inputTitle}>Reward(s):</Text>
          <TextInput
            style = {styles.input}
            onChangeText={(text) => {
              questForm.reward = text;
              setQuestForm(questForm);
            }}
          />
          <TouchableOpacity style = {styles.button}onPress={createQuestHandler}>
            <Text style = {styles.buttonText} >Create Quest</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </ImageBackground>
  )
}

const styles = StyleSheet.create({
  container:{
    height: '100%',
    justifyContent: 'center',
  },
  backgroundColor: {
    backgroundColor: 'rgba(255, 255, 255, 0.3)',
    height: '100%',
    width: '100%',
  },
  inputTitle: {
    fontFamily: 'Menlo',
    fontSize: 20,
    fontWeight: 'bold',
    marginTop: '5%',
    marginLeft: '5%'
  },
  input: {
    borderWidth: 1,
    width: '90%',
    height: '3%',
    marginLeft: '5%',
    backgroundColor: 'white'
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
    borderRadius: 20,
    margin: 10,
    backgroundColor: 'rgba(0,0,0,5)',
    borderWidth: 2,
  },
  tintedBoss: {
    width: 80,
    height: 80,
    borderRadius: 20,
    margin: 10,
    backgroundColor: 'rgba(0,0,0,5)',
    borderWidth: 2,
    opacity: 0.3,
  },
  shadowProp: {
    shadowColor: '#171717',
    shadowOffset: {width: -5, height: 4},
    shadowOpacity: 0.8,
    shadowRadius: 8,
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
  tintedStage: {
    flex: 1,
    width: null,
    height: null,
    resizeMode: 'contain',
    opacity: 0.4,
  },
  divider: {
    borderBottomWidth: 1,
    width: '90%',
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
    width: '70%',
    marginTop: '5%',
    marginBottom: '25%'
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