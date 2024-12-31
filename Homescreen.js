import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import { useFonts } from 'expo-font';
import { useEffect, useState, memo, useCallback } from 'react';
import Slider from '@react-native-community/slider';
import _ from 'lodash';





export default function Homescreen({ navigation }) {
  const [loaded] = useFonts({
    'coolfont': require('./assets/fonts/coolfont.ttf'),
    });
  const [sliderValue1, setSliderValue1] = useState(0);
  const [sliderValue2, setSliderValue2] = useState(0);
  const [moodValue, moodValueSetter] = useState('');
  const [textColor1, setTextColor1] = useState('red');
  const [textColor2, setTextColor2] = useState('red');
  useEffect(() => {
    if (sliderValue1 >= 0.7) {
      setTextColor1('green');
    } else if (sliderValue1 > 0.3 && sliderValue1 < 0.7){
      setTextColor1('yellow');
    }else{
      setTextColor1('red')
    }
  }, [sliderValue1]);
  useEffect(() => {
    if (sliderValue2 >= 0.7) {
      setTextColor2('green');
      moodValueSetter('feelin good');
    } else if (sliderValue2 > 0.3 && sliderValue2 < 0.7){
      setTextColor2('yellow');
      moodValueSetter('decent');
    }else{
      setTextColor2('red');
      moodValueSetter('poor');
    }
  }, [sliderValue2]);
  function handlePress(){
    navigation.navigate('Tasks')
  }
  function handlePress2(){
    navigation.navigate('Alltasks')
  }
  const handleValueChange1 = useCallback(
    _.throttle((value) => {
      setSliderValue1(Number(value.toFixed(1)))
    }, 1000), // Limit calls to once every 100ms
    []
  );
  const handleValueChange2 = useCallback(
    _.throttle((value) => {
      setSliderValue2(Number(value.toFixed(1)))
    }, 1000), // Limit calls to once every 100ms
    []
  );
  global.energyVal = sliderValue1;
  global.moodVal = sliderValue2;

  return (
    <View style={styles.container}>
      
      <Text style={styles.mainTitle}>groovemaster</Text>
      <Text style={styles.subtitle}>energy meter</Text>
      <StatusBar style="auto" />
      <Slider
      style={{width: 200, height: 40, margin: 0}}
      lowerlimit = {0}
      minimumValue={0.1}
      maximumValue={1}
      step = {0.1}
      value={sliderValue1}
      onValueChange={handleValueChange1}
      minimumTrackTintColor="#FFFFFF"
      maximumTrackTintColor="#000000"
      />
      <Text style={[styles.motivationTitle, {color: textColor1}]}>energy level: {sliderValue1 * 10}</Text>

      <Text style={styles.subtitle}>mood meter</Text>
      <StatusBar style="auto" />
      <Slider
      style={{width: 200, height: 40, margin: 0}}
      lowerlimit = {0}
      minimumValue={0.1}
      maximumValue={1}
      step = {0.1}
      value={sliderValue2}
      onValueChange={handleValueChange2}
      minimumTrackTintColor="#FFFFFF"
      maximumTrackTintColor="#000000"
      />
      <Text style={[styles.moodthing, {color: textColor2}]}>mood: {moodValue}</Text>
      <TouchableOpacity
        style={{
          backgroundColor: 'red',
          padding: 10,
          borderRadius: 5,
          margin: 50,
          
        }}
        onPress={handlePress}
      >
        <Text style={{ color: 'black', fontFamily: 'coolfont', fontSize: 20 }}>create a task</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={{
          backgroundColor: 'red',
          padding: 10,
          borderRadius: 5,
          marginTop: -30,
          
        }}
        onPress={handlePress2}
      >
        <Text style={{ color: 'black', fontFamily: 'coolfont', fontSize: 20 }}>all tasks</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'black',
    alignItems: 'center',
    fontFamily: 'coolfont'
  },
  mainTitle: {
    color: 'red',
    fontSize: 40,
    fontFamily: 'coolfont',
    margin: 40,
    marginTop: 60
    
  },
  subtitle: {
    color: 'white',
    fontSize: 30,
    fontFamily: 'coolfont',
    margin: 20
    
  },
  motivationTitle: {
    fontSize: 30,
    fontFamily: 'coolfont',
    
  },
  moodthing: {
    fontSize: 30,
    fontFamily: 'coolfont',
  }
});
