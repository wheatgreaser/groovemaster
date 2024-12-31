import React, { useState, useEffect,  useCallback } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, FlatList } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Icon from 'react-native-vector-icons/FontAwesome';
import { useFocusEffect } from '@react-navigation/native';
import { useGlobalContext } from './GlobalContext'; // Import the global context hook

export default function Alltasks() {
   var diffVal = (global.energyVal + global.moodVal)/2
    const { tasks, setTasks } = useGlobalContext();

  // Function to delete a task
  const deleteTasks = async (id) => {
    const updatedTasks = tasks.filter((task) => task.id !== id); // Remove task by ID
    setTasks(updatedTasks); // Update state
    await saveTasksToStorage(updatedTasks); // Save updated tasks to AsyncStorage
    console.log(updatedTasks);
    AsyncStorage.clear();
  };
 

  useFocusEffect(
    useCallback(() => {
      const loadTasks = async () => {
        try {
          const storedTasks = await AsyncStorage.getItem('tasks');
          setTasks(storedTasks ? JSON.parse(storedTasks) : []);
        } catch (error) {
          console.error('Error loading tasks:', error);
        }
      };
  
      loadTasks();
    }, []) // Reload tasks every time the screen is focused
  );

  // Save tasks to AsyncStorage
  const saveTasksToStorage = async (tasks) => {
    try {
      const jsonValue = JSON.stringify(tasks); // Convert tasks array to JSON
      await AsyncStorage.setItem('tasks', jsonValue); // Save in AsyncStorage
    } catch (error) {
      console.error('Error saving tasks:', error);
    }
  };

  // Load tasks from AsyncStorage
  const loadTasksFromStorage = async () => {
    try {
      const jsonValue = await AsyncStorage.getItem('tasks');
      const storedTasks = jsonValue != null ? JSON.parse(jsonValue) : []; // Parse stored JSON or return empty array
      setTasks(storedTasks); // Initialize state with stored tasks
    } catch (error) {
      console.error('Error loading tasks:', error);
    }
  };

  // Load tasks on component mount
  useEffect(() => {
    loadTasksFromStorage();
  }, []); // Runs only once when the component mounts

  const [showComponent, setShowComponent] = useState(false);
  const toggleComponent = () => setShowComponent(prevState => !prevState);
  

  return (
    <View style={styles.container}>
      <Text style={styles.text}>all tasks</Text>
      <FlatList
        data={tasks}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => {const shouldShowRecommendation = item.diff < (diffVal * 10);
        return(
          <View style={styles.taskStyle}>
            <Text style={styles.secondTitle}>task: {item.text}</Text>
            <Text style={styles.secondTitle}>difficulty: {item.diff}</Text>
            
            <TouchableOpacity
              style={styles.deleteButton}
              onPress={() => deleteTasks(item.id)} // Call deleteTasks with the task ID
            >
            
              <Icon name="trash" size={30} color="white" />
            </TouchableOpacity>
            {shouldShowRecommendation && (
            <View >
            <Text style={{ marginTop: 20, color: 'green', fontFamily: 'coolfont', fontSize: 20 }}>recommended</Text>
            </View>
      )}
          </View>
        )}}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: 'black',
  },
  text: {
    marginTop: 50,
    marginBottom: 30,
    fontSize: 30,
    color: 'red',
    fontFamily: 'coolfont',
  },
  secondTitle: {
    fontSize: 20,
    margin: 10,
    color: 'white',
    fontFamily: 'coolfont',
  },
  taskStyle: {
    borderWidth: 5,
    borderColor: 'white',
    borderRadius: 10,
    margin: 10,
    padding: 10,
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  deleteButton: {
    backgroundColor: 'red',
    padding: 10,
    width: 45,
    borderRadius: 5,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
