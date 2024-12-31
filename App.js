// App.js
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import HomeScreen from './Homescreen'; // Import homeScreen
import Tasks from './Tasks'; // Import userProfile
import Alltasks from './Alltasks'; // Import userProfile
import { GlobalProvider } from './GlobalContext';

const Stack = createStackNavigator();

export default function App() {
  return (
    <GlobalProvider>
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Home"
      screenOptions={{ headerShown: false }}>
        <Stack.Screen name="Home" component={HomeScreen} />
        <Stack.Screen name="Tasks" component={Tasks} />
        <Stack.Screen name="Alltasks" component={Alltasks} />

      </Stack.Navigator>
    </NavigationContainer>
    </GlobalProvider>
  );
}
