import React, { useState, useEffect } from 'react';
import { View, Text, Modal, Image, StyleSheet, ScrollView, ImageBackground, Button, Animated, TouchableOpacity } from 'react-native';
import HealthBar from '../components/healthBar';
import Tasks from '../components/tasks'
import Logs from '../components/logs';
import Players from '../components/players';
import LevelBar from '../components/levelBar';
import AddTaskModal from '../components/addTaskModal'
import { gifs, images } from '../images';
import { randomId } from '../randomId'
import { conversion } from '../conversion'

const Quest = ({ navigation }) => {
  const [ tasks, setTasks ] = useState([]);
  const [ logs, setLogs ] = useState([
    {
      id: 3,
      time: '2021-11-2 08:54:04',
      text: 'toolpanda completed task "implement a modal in the Q&A widget" and dealt 500 damage!'
    },
    {
      id: 2,
      time: '2021-11-2 08:02:45',
      text: 'summyking completed "achieved 100% test coverage in Overview widget" and dealt 250 damage!'
    },
    {
      id: 1,
      time: '2021-10-30 11:54:37',
      text: 'mediocrekick completed task "implement photo uploads feature" and dealt 1000 damage!'
    }
  ]);
  const [ players, setPlayers ] = useState([
    {
      id: 1,
      name: 'mediocrekick',
      level: 3,
      photo: 'fake-person-1.jpg',
      quests: [],
      damage: 56500,
    },
    {
      id: 2,
      name: 'sunnyking',
      level: 3,
      photo: 'fake-person-2.jpg',
      quests: [],
      damage: 46300,
    },
    {
      id: 3,
      name: 'toolpanda',
      level: 3,
      photo: 'fake-person-3.jpg',
      quests: [],
      damage: 42900,
    }
  ])
  const [ modalOpen, setModalOpen ] = useState(false);
  const [ taskModalOpen, setTaskModalOpen ] = useState(false);
  const [ leaderBoardsModalOpen, setLeaderBoardsModalOpen ] = useState(false);
  const [ selectedPlayer, setSelectedPlayer ] = useState({});
  const [ quest, setQuest ] = useState({});
  const [ leftValue,] = useState(new Animated.Value(10));
  const [ topValue,] = useState(new Animated.Value(0));
  const [ bossOpacityValue,] = useState(new Animated.Value(1));
  const [ textOpacityValue,] = useState(new Animated.Value(0));
  const [ heightValue, ] = useState(new Animated.Value(60));
  const [ widthValue, ] = useState(new Animated.Value(60));
  const [ victoryHeightValue, ] = useState(new Animated.Value(0));

  let treasureClicked = false;

  const animateTreasure = () => {
    if (!treasureClicked) {
      Animated.timing(leftValue, {
        toValue: 70,
        duration: 1000,
        useNativeDriver: false
      }).start()
      Animated.timing(topValue, {
        toValue: 50,
        duration: 1000,
        useNativeDriver: false
      }).start()
      Animated.timing(heightValue, {
        toValue: 200,
        duration: 1000,
        useNativeDriver: false
      }).start()
      Animated.timing(widthValue, {
        toValue: 200,
        duration: 1000,
        useNativeDriver: false
      }).start()

      treasureClicked = true;
    } else {
      if (quest.currentHealth > 0) {
        Animated.timing(leftValue, {
          toValue: 10,
          duration: 1000,
          useNativeDriver: false
        }).start()
        Animated.timing(topValue, {
          toValue: 0,
          duration: 1000,
          useNativeDriver: false
        }).start()
        Animated.timing(heightValue, {
          toValue: 60,
          duration: 1000,
          useNativeDriver: false
        }).start()
        Animated.timing(widthValue, {
          toValue: 60,
          duration: 1000,
          useNativeDriver: false
        }).start()

        treasureClicked = false;
      }
    }
  };

  const fadeOutBoss = () => {
    Animated.timing(bossOpacityValue, {
      toValue: 0,
      duration: 1000,
      useNativeDriver: false
    }).start()
  };

  const animateBossDamage = () => {

    Animated.loop(
      Animated.sequence([
        Animated.timing(bossOpacityValue, {
          toValue: 0,
          duration: 50,
          useNativeDriver: false,
        }),
        Animated.timing(bossOpacityValue, {
          toValue: 1,
          duration: 50,
          useNativeDriver: false,
        })
      ]), {
        iterations: 3,
      }
    ).start()
  }

  const animateVictoryMessage = () => {
    setTimeout(fadeInText ,1000);

    Animated.timing(victoryHeightValue, {
      toValue: 250,
      duration: 1000,
      useNativeDriver: false
    }).start()
  };

  const fadeInText = () => {
    Animated.timing(textOpacityValue, {
      toValue: 1,
      duration: 2000,
      useNativeDriver: false
    }).start()
  };

  const completeTaskHandler = (task) => {

    function getFormattedDate(){
      var d = new Date();

      d = d.getFullYear() + "-" + ('0' + (d.getMonth() + 1)).slice(-2) + "-" + ('0' + d.getDate()).slice(-2) + " " + ('0' + d.getHours()).slice(-2) + ":" + ('0' + d.getMinutes()).slice(-2) + ":" + ('0' + d.getSeconds()).slice(-2);

      return d;
  }

    let copy = quest;

    copy.currentHealth = copy.currentHealth - conversion[task.size]

    if (copy.currentHealth < 1) {
      fadeOutBoss();
      animateTreasure();
      setTimeout(animateVictoryMessage, 3800);
    } else {
      animateBossDamage();
    }

    setQuest({...copy});

    const log = {
      id: randomId(),
      time: getFormattedDate(),
      text: `User completed task "${task.title}" and dealt ${conversion[task.size]} damage!`
    }

    setLogs([log, ...logs])

    let newTasks = [];

    tasks.forEach( item => {
      if (item.id !== task.id) {
        newTasks.push(item);
      }
    });

    setTasks(newTasks)
  };

  const pressPlayerIconHandler = (player) => {
    setSelectedPlayer(player);
    setModalOpen(true);
  };

  const createTaskHandler = () => {
    setTaskModalOpen(true);
  };

  const addTaskHandler = (taskForm, value) => {
    taskForm.size = value;
    taskForm.id = randomId();

    let copy = quest;
    copy.currentHealth += conversion[value];
    copy.health += conversion[value];

    let taskFormCopy = {...taskForm};

    tasks.push(taskFormCopy);

    setTasks(tasks);
    setQuest({...copy});
    setTaskModalOpen(false);
  };

  const closeTaskModalHandler = () => {
    setTaskModalOpen(false);
  };

  const renderAwards = (i) => {
    if (i === 0) {
      return  <Image style={styles.awards} source={images.gold}/>
    } else if (i === 1) {
      return <Image style={styles.awards} source={images.silver}/>
    } else {
      return <Image style={styles.awards} source={images.bronze}/>
    }
  };

  useEffect(() => {
    const quest = navigation.getParam('item');
    console.log(quest)
    console.log('PLAYERS ' + quest.players)
    setQuest(quest)
    setPlayers(quest.players)
    setTasks(quest.tasks)
  }, []);

  const healthPercent = quest.currentHealth/quest.health * 100;

  return (
    <View style = {styles.view}>
      <ImageBackground
          style = {styles.stage}
          source = {images.grassBackground2}
      >
        <Modal visible={modalOpen} animationType='slide'>
          <View style = {styles.modalContent}>
            <Text style = {styles.name} >{selectedPlayer.name}</Text>
            <Image style = {styles.portrait} source = {{uri: `/Users/jonhi1/Desktop/MVP/mvp/images/portraits/${selectedPlayer.photo}`}} />
            <Text style = {styles.level} >Level {selectedPlayer.level}</Text>
            <View style = {styles.expBar}>
              <LevelBar currentHealth = {2025} health = {2900} height = {15} healthPercent = {70}/>
            </View>
            <Button onPress={()=> setModalOpen(false)} title='Close' style={styles.Close}/>
          </View>
        </Modal>

        <Modal visible={leaderBoardsModalOpen} animationType='slide'>
          <ImageBackground style = {styles.leaderBoardsContent} source={images.towerBackground}>
          <View style = {styles.header}>
            <Text style = {styles.leaderboardsTitle}>Leaderboard</Text>
          </View>
          <View style = {styles.divider}></View>
          <View style={styles.leaderBoardsList}>
            {players.map((player, i) => {
              return (
                <View key={player.id} style={styles.playerCard}>
                  <ImageBackground style = {styles.leaderbordPortrait} source = {{uri: `/Users/jonhi1/Desktop/MVP/mvp/images/portraits/${player.photo}`}}>
                    {/* {renderAwards(i)} */}
                  </ImageBackground>
                  <View style={styles.playerData}>
                    {/* <Text>{player.name}</Text> */}
                    <Text style={styles.nameLevelText}>Lv{player.level} | {player.name}</Text>
                    <Text style={styles.damageText}>Dmg Dealt: {player.damage}</Text>
                  </View>
                </View>
              );
            })}
          </View>


            <TouchableOpacity onPress={()=> setLeaderBoardsModalOpen(false)} style={styles.closeBtn}>
              <Text style={styles.closeBtnText}>Close</Text>
            </TouchableOpacity>
          </ImageBackground>
        </Modal>

        <AddTaskModal modalOpen = {taskModalOpen} addTaskHandler = {addTaskHandler} closeTaskModalHandler = {closeTaskModalHandler}/>

        <View style = {styles.screen}>
          <ImageBackground
            style = {styles.stage}
            source = {images[quest.stage]}
          >
            <ImageBackground
            style = {styles.stage}
            source = {images[quest.overlay]}
            >
              <TouchableOpacity
                  style={{
                    alignSelf: 'center',
                    height: '100%',
                    width: '100%',
                    aspectRatio: 1,
                    marginLeft: '3%',
                    position: 'absolute'
                 }}
                 onPress={() => {
                   setLeaderBoardsModalOpen(true);
                 }}
              >
                <View style={styles.leaderBoardsIconContainer}>
                  <Image style={styles.leaderBoardsIcon}source={images.crown}/>
                </View>
              </TouchableOpacity>
              <Animated.View
                style={
                  {
                    width: widthValue,
                    height: heightValue,
                    marginLeft: leftValue,
                    marginTop: topValue,
                    borderRadius: 100/2,
                    position: 'absolute',
                    flex: 1,
                    zIndex: 1
                  }
                }
              >
                <TouchableOpacity
                  style={{
                    alignSelf: 'center',
                    height: '100%',
                    width: '100%',
                    aspectRatio: 1,
                    marginLeft: '3%',
                    position: 'absolute'
                 }}
                 onPress={animateTreasure}
                >
                  {quest.currentHealth > 0 ?
                    <Image
                      style = {styles.treasureIcon}
                      source={images.treasure}
                      resizeMode= {'cover'}
                    />
                    :<Image
                      style = {styles.treasureGif}
                      source={gifs.treasure}
                      resizeMode= {'cover'}
                      />
                    }
                </TouchableOpacity>
              </Animated.View>
              <Animated.View
                style={
                  {
                    width: 200,
                    height: victoryHeightValue,
                    alignSelf: 'center',
                    alignItems: 'center',
                    justifyContent: 'center',
                    borderRadius: 2,
                    position: 'absolute',
                    flex: 1,
                    zIndex: 1,
                  }
                }
              >
                <ImageBackground
                  style = {styles.scroll}
                  source={images.scroll}
                  resizeMode= {'cover'}
                >
                  <Animated.View
                  style = {{
                    alignItems: 'center',
                    maxHeight: 180,
                    maxWidth: 180,
                    opacity: textOpacityValue,
                    marginTop: '15%'
                  }}>
                    <Text style={styles.scrollText1}>Quest Complete!</Text>
                    <Text style={styles.scrollText2}>You have earned... </Text>
                    <Text style={styles.scrollReward}>{quest.reward}!!</Text>
                  </Animated.View>
                </ImageBackground>
              </Animated.View>
              <View style = {styles.healthBar}>
                <HealthBar currentHealth = {quest.currentHealth} health = {quest.health} height = {15} healthPercent = {healthPercent} />
              </View>
              <Animated.View
                style = {{
                  alignSelf: 'center',
                  maxHeight: 180,
                  maxWidth: 180,
                  opacity: bossOpacityValue
                }}
              >
                <Image
                  style = {styles.bossSprite}
                  source = {gifs[quest.boss]}
                />
              </Animated.View>
              <View>
                <View style = {styles.playersBackground}>
                </View>
                <Players players = { players } pressPlayerIconHandler={pressPlayerIconHandler}/>
              </View>
            </ImageBackground>
          </ImageBackground>
        </View>
        <ScrollView showsVerticalScrollIndicator={false}>
          <Tasks tasks = {tasks} completeTaskHandler = {completeTaskHandler} createTaskHandler={createTaskHandler}/>
          <Logs logs = {logs}/>
        </ScrollView>
      </ImageBackground>
    </View>
  )
}

const styles = StyleSheet.create({
  view: {
    flex: 1,
    width: '100%',
  },
  logContainer: {
    width: '100%',
    height: '66%',
    alignItems: 'center'
  },
  screen: {
    marginTop: '3%',
    alignSelf: 'center',
    borderWidth: 5,
    width: '96%',
    maxHeight: '42%',
  },
  leaderBoardsIconContainer: {
    width: 40,
    height: 40,
    alignSelf: 'flex-end',
    margin: 12
  },
  leaderBoardsIcon: {
    height: 40,
    width: 40,
    alignSelf: 'center',
  },
  leaderBoardsContent: {
    height: '100%',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'center',
  },
  leaderboardsTitle: {
    fontFamily: 'Menlo',
    fontSize: 30,
    fontWeight: 'bold',
    alignSelf: 'center',
    marginTop: '20%'
  },
  divider: {
    borderBottomWidth: 2,
    width: '90%',
    alignSelf: 'center'
  },
  leaderBoardsList: {
    alignItems: 'center'
  },
  playerCard: {
    borderWidth: 1,
    alignItems: 'center',
    flexDirection: 'row',
    width: '90%',
    borderRadius: 10,
    marginTop: '5%',
    justifyContent: 'space-between',
    backgroundColor: 'rgba(255, 255, 255, 0.6)',
  },
  playerData: {
    flex: 2
  },
  nameLevelText: {
    fontWeight: 'bold',
    fontSize: 20
  },
  damageText: {
    fontSize: 20,
  },
  leaderbordPortrait: {
    width: 100,
    height: 100,
    borderRadius: 5,
    margin: 10,
    marginLeft: 10,
    marginRight: 10,
    borderWidth: 1,
  },
  closeBtn: {
    alignSelf: 'center',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 12,
    paddingHorizontal: 32,
    borderRadius: 4,
    elevation: 3,
    backgroundColor: 'black',
    width: '70%',
    marginBottom: '10%',
    marginTop: '10%'
  },
  closeBtnText: {
    fontSize: 16,
    lineHeight: 21,
    fontWeight: 'bold',
    letterSpacing: 0.25,
    color: 'white',
    fontFamily: 'Menlo'
  },
  treasureIcon: {
    alignSelf: 'center',
    height: '80%',
    width: '80%',
    aspectRatio: 1,
    marginLeft: '3%',
    marginTop: '15%',
    position: 'absolute'
  },
  treasureGif: {
    alignSelf: 'center',
    height: '100%',
    width: '100%',
    aspectRatio: 1,
    marginLeft: '3%',
    position: 'absolute'
  },
  scroll: {
    alignItems:'center',
    height: '100%',
    width: '100%',
  },
  scrollText1: {
    marginTop: '15%',
    color: 'rgba(145, 10, 10, 0.8)',
    fontWeight: 'bold',
    fontFamily: 'HoeflerText-Italic',
    fontSize: 18
  },
  scrollText2: {
    marginTop: '15%',
    color: 'rgba(145, 10, 10, 0.8)',
    fontWeight: 'bold',
    fontFamily: 'HoeflerText-Italic',
  },
  scrollReward: {
    marginTop: '15%',
    color: 'rgba(145, 10, 10, 0.8)',
    fontWeight: 'bold',
    fontFamily: 'HoeflerText-Italic',
    fontSize: 18,
    maxWidth: '80%'
  },
  stage: {
    maxHeight: '100%'
  },
  bossSprite: {
    alignSelf: 'center',
    maxHeight: 180,
    maxWidth: 180
  },
  healthBar: {
    alignSelf: 'center',
    paddingTop: '2%',
    width: 200,
    backgroundColor: 'white',
    opacity: 0.7,
    borderRadius: 5,
    margin: 5,
    padding: 5
  },
  playersBackground: {
    backgroundColor: 'white',
    opacity: 0.7,
    borderRadius: 5,
    position: 'absolute',
    height: '100%',
    width: '70%',
    alignSelf: 'center'
  },
  tasksHeader: {
    fontFamily: 'Menlo',
    fontSize: 20,
    fontWeight: 'bold',
    alignSelf: 'center'
  },
  modalContent:{
    marginTop: '25%'
  },
  portrait: {
    width: 150,
    height: 150,
    marginLeft: 10,
    marginRight: 10,
    alignSelf: 'center'
  },
  name: {
    fontFamily: 'Menlo',
    fontSize: 30,
    fontWeight: 'bold',
    alignSelf: 'center'
  },
  level: {
    fontFamily: 'Menlo',
    fontWeight: 'bold',
    fontSize: 25,
    alignSelf: 'center'
  },
  expBar: {
    alignSelf: 'center',
    width: '80%',
  }
})

export default Quest;