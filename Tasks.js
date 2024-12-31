import React, {useState, useCallback, useEffect} from 'react';
import { View, Text, StyleSheet, TextInput, TouchableOpacity, FlatList } from 'react-native';
import Slider from '@react-native-community/slider';
import _ from 'lodash';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useGlobalContext } from './GlobalContext'; // Import the global context hook

export default function Tasks({ navigation }) {
  global.cooltasks = tasks
  const { tasks, setTasks } = useGlobalContext();
  const [newTask, setNewTask] = useState("");
  const [sliderValue1, setSliderValue1] = useState(0);
  const saveTasksToStorage = async (tasks) => {
    try {
      const jsonValue = JSON.stringify(tasks); // Convert tasks array to JSON string
      await AsyncStorage.setItem('tasks', jsonValue); // Store it in AsyncStorage
    } catch (error) {
      console.error("Error saving tasks:", error);
    }
  };
  const loadTasksFromStorage = async () => {
    try {
      const jsonValue = await AsyncStorage.getItem('tasks');
      return jsonValue != null ? JSON.parse(jsonValue) : [];
    } catch (error) {
      console.error("Error loading tasks:", error);
      return [];
    }
  };
    const handleValueChange1 = useCallback(
      _.throttle((value) => {
        setSliderValue1(Number(value.toFixed(1)))
      }, 1000), // Limit calls to once every 100ms
      []
    );
  function showAllTasks(){
    navigation.navigate('Alltasks')
  }
  function showRecs(){
    navigation.navigate('Rectasks')
  }
  const addTask = () => {
    if (newTask.trim() === "") {
      alert("task cannot be empty!!!");
      return;
    }
  
    const updatedTasks = [
      ...tasks,
      { id: Date.now().toString(), text: newTask, diff: sliderValue1 * 10 }
    ];
  
    setTasks(updatedTasks); // Update state
    saveTasksToStorage(updatedTasks); // Save to AsyncStorage
    setNewTask(""); // Clear input field
    console.log(updatedTasks);
  };
  useEffect(() => {
    const initializeTasks = async () => {
      const storedTasks = await loadTasksFromStorage();
      setTasks(storedTasks);
    };

    initializeTasks();
  }, []);
  useEffect(() => {
    saveTasksToStorage(tasks);
  }, [tasks]);

  return (
    <View style={styles.container}>
      <Text  style={styles.title}>tasks</Text>
      <Text style = {styles.subtitle}>energy value: {global.energyVal * 10}</Text>
      <Text style = {styles.subtitle}>mood value: {global.moodVal * 10}</Text>
      <View style = {styles.creation}>
      <Text  style={styles.secondTitle}>create a task</Text>
        <View style={styles.inputContainer}>
       
          <TextInput
            style={styles.input}
            placeholder="Enter text"
            onChangeText={setNewTask}
            value={newTask}
          />
          <TouchableOpacity
                  style={{
                    backgroundColor: 'red',
                    padding: 10,
                    borderRadius: 5,
                    top: 100
                  }}
                  onPress={addTask}
                >
                  <Text style={{ color: 'black', fontFamily: 'coolfont', fontSize: 20 }}>create</Text>
          </TouchableOpacity>
          
        </View>
        <Text style={styles.diffText}>difficulty: {sliderValue1 * 10}/10</Text>
              <Slider
              style={{width: 300, height: 40, margin: 0, top: 100}}
              lowerlimit = {0}
              minimumValue={0.1}
              maximumValue={1}
              step = {0.1}
              value={sliderValue1}
              onValueChange={handleValueChange1}
              minimumTrackTintColor="#FFFFFF"
              maximumTrackTintColor="#000000"
              />
    
    </View>
    <TouchableOpacity
                  style={{
                    backgroundColor: 'red',
                    padding: 10,
                    borderRadius: 5,
                    top: 100,
                    margin: 10
                  }}
                  onPress={showAllTasks}
                >
                  <Text style={{ color: 'black', fontFamily: 'coolfont', fontSize: 20 }}>all tasks</Text>
                  
          </TouchableOpacity>

    </View>
    
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: 'black'
  },
  secondTitle:{
    fontSize: 30,
    margin: - 20,
    justifyContent: 'center',
    alignContent: 'center',
    left: 60,
    top: 40,
    color: 'white',
    fontFamily: 'coolfont'
  },
  title:{
    top: 60,
    fontSize: 40,
    color: 'white',
    fontFamily: 'coolfont'
  },
  subtitle:{
    top: 60,
    fontSize: 20,
    color: 'yellow',
    fontFamily: 'coolfont'
  },
  input: {
    color: 'white',
    height: 60,
    top: 100,
    borderColor: '#ccc',
    borderWidth: 5,
    paddingHorizontal: 5,
    borderRadius: 5,
    width: '60%',
    marginRight: 20,
    fontFamily: 'coolfont'
  },
  task: {
    top: 150,
    color: 'white',
    
  },
  inputContainer:{
    flexDirection: 'row',
    alignItems: 'center'
  },
  diffText:{
    color: 'white',
    fontFamily: 'coolfont',
    fontSize: 20,
    top: 100,
    margin: 10,
    alignItems: 'center',
    justifyContent: 'center',
   
  },
  creation:{
    top: 80,
    padding: 20,
    height: 300,
    borderWidth: 5,
    borderColor: 'white',
    borderRadius: 10
  }


});