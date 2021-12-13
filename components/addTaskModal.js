import React, { useState } from 'react';
import { View, Text, Pressable, TextInput, StyleSheet, Image, TouchableOpacity, Modal, ImageBackground } from 'react-native';
import { randomId } from '../randomId.js';
import DropDownPicker from 'react-native-dropdown-picker';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faTimesCircle } from '@fortawesome/free-solid-svg-icons';
import { images } from '../images';

const AddTaskModal = ({ modalOpen, addTaskHandler, closeTaskModalHandler }) => {
  const [ taskForm, setTaskForm ] = useState({
    id: null,
    title: '',
    description: '',
    size: '',
    checkList: [],
    asigned: [],
  })

  const [open, setOpen] = useState(false);
  const [value, setValue] = useState(null);
  const [items, setItems] = useState([
    {label: 'Small', value: 'S'},
    {label: 'Medium', value: 'M'},
    {label: 'Large', value: 'L'},
    {label: 'Extra Large', value: 'XL'},
  ]);

  return (
    <Modal
        visible={modalOpen}
        animationType='slide'
        transparent={true}
      >
        <View style = {styles.modalContent}>
          <View style = {styles.modalHeader}>
            <Text style = {styles.modalHeaderText} >Create a New Task</ Text>
            {/* <Pressable style = {styles.close}> */}
              <FontAwesomeIcon icon={faTimesCircle} style = {styles.closeIcon} onPress={closeTaskModalHandler}/>
            {/* </Pressable> */}
          </View>
          <ImageBackground
            source={images.woodTiles}
            style={styles.background}
            imageStyle={{ resizeMode: 'repeat' }}
          >
            <View style = {styles.form}>
              <Text style = {styles.inputHeader}>Title:</Text>
              <TextInput
                placeholder="Enter title"
                style = {styles.input}
                onChangeText={(text) => {
                  taskForm.title = text;
                  setTaskForm(taskForm);
                }}
              />
              <Text style = {styles.inputHeader}>Description:</Text>
              <TextInput
                placeholder="Enter description"
                style = {styles.inputArea}
                multiline = {true}
                onChangeText={(text) => {
                  taskForm.description = text;
                  setTaskForm(taskForm);
                }}
              />
              <Text style = {styles.inputHeader}>Task Size:</Text>
              <DropDownPicker
                open={open}
                value={value}
                items={items}
                setOpen={setOpen}
                setValue={setValue}
                setItems={setItems}
              />
              {/* <Button onPress={()=> closeModalHandler(taskForm, value)} title='Add' style={styles.close}/> */}
              <Pressable style = {styles.button} onPress={addTaskHandler.bind(null, taskForm, value)}>
                <Text style = {styles.buttonText} >Add</Text>
              </Pressable>
            </View>
          </ImageBackground>
        </View>
      </Modal>
  )
};

const styles = StyleSheet.create({
  background: {
    height: '100%'
  },
  modalHeader: {
    backgroundColor: 'rgba(0,0,0, 1)',
    borderTopWidth: 2,
    borderBottomWidth: 2,
    paddingTop: '3%',
    paddingBottom: '3%',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  modalHeaderText: {
    // alignSelf: 'center',
    marginLeft: '3%',
    fontFamily: 'Menlo',
    fontWeight: 'bold',
    fontSize: 20,
    color: 'white'
  },
  close: {
    // height: '100%',
    // width: '100%'
  },
  closeIcon: {
    height: '100%',
    width: '100%',
    alignSelf: 'center',
    marginRight: '5%',
    color: 'white'
  },
  modalContent:{
    marginTop: 'auto',
    height: '50%',
    backgroundColor: 'white',

  },
  form: {
    padding: 10
  },
  inputHeader: {
    fontFamily: 'Menlo',
    fontWeight: 'bold',
    marginTop: '2%'
  },
  input: {
    borderWidth: 2,
    marginTop: 2,
    width: '60%',
    height: '10%',
    backgroundColor: 'white'
  },
  inputArea: {
    borderWidth: 2,
    marginTop: 2,
    width: '100%',
    height: 100,
    maxHeight: 100,
    alignSelf: 'center',
    backgroundColor: 'white'
  },
  button: {
    marginTop: '10%',
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
})

export default AddTaskModal;