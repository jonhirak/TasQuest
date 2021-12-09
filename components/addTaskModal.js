import React, { useState } from 'react';
import { View, Text, Pressable, TextInput, StyleSheet, Image, TouchableOpacity, Modal } from 'react-native';
import { randomId } from '../randomId.js';
import DropDownPicker from 'react-native-dropdown-picker';

const AddTaskModal = ({ modalOpen, closeModalHandler }) => {
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
          </View>
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
            <Pressable style = {styles.button}onPress={closeModalHandler.bind(null, taskForm, value)}>
        <Text style = {styles.buttonText} >Add</Text>
      </Pressable>
          </View>
        </View>
      </Modal>
  )
};

const styles = StyleSheet.create({
  modalHeader: {
    backgroundColor: 'rgba(155, 203, 229, 1)',
    borderTopWidth: 1,
    borderBottomWidth: 1,
  },
  modalHeaderText: {
    alignSelf: 'center',
    fontFamily: 'Menlo',
    fontWeight: 'bold',
    fontSize: 20,
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
    marginTop: '5%'
  },
  input: {
    borderWidth: 2,
    marginTop: 2,
    width: '50%',
  },
  inputArea: {
    borderWidth: 2,
    marginTop: 2,
    width: '100%',
    height: 100,
    maxHeight: 100,
    alignSelf: 'center'
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