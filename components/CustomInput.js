import React from 'react';
import { useState } from 'react';
import { View, TextInput, Text, StyleSheet } from 'react-native';
import * as Font from "expo-font";
import Apploading from "expo-app-loading";

const getFonts = () =>
  Font.loadAsync({
    Orbitron: require("../assets/fonts/Orbitron-VariableFont_wght.ttf"),
    Techno: require("../assets/fonts/ShareTechMono-Regular.ttf"),
    Digital: require("../assets/fonts/digital.ttf")
  });
  
const CustomInput = ({
  paddingLeft,
  title,
  onChangeText,
  onBlur,
  value,
  unit,
  width,height
}) => {
  const [fontsloaded, setFontsLoaded] = useState(false);
  if (fontsloaded) {
    return (
      <View >
          <Text style={[styles.topText,{paddingLeft:paddingLeft}]}>{title}</Text>
      <View style={[styles.inputContainer,{width:width,height:height}]}>
        <TextInput 
        textAlign='center'
        onChangeText={onChangeText}
        onBlur={onBlur}
        value={value}
        style={styles.input} />
        <Text style={styles.poundSymbol}>{unit}</Text>
      </View>
      </View>
    );
  }else {
    return (
      <Apploading
        startAsync={getFonts}
        onFinish={() => {
          setFontsLoaded(true);
        }}
        onError={console.warn}
      />
    );
  }
  }
  

const styles = StyleSheet.create({
  topText: {
    fontFamily: 'Orbitron',
    padding:10,
    fontSize:20,
  },  
  inputContainer: {
    backgroundColor:"#ffff99",
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#000',
    borderRadius: 10,
    overflow: 'hidden',
  },
  input: {
    flex: 1,
    fontSize:25,
    padding: 10,
    fontFamily:"Digital",
  },
  poundSymbol: {
    fontFamily:"Techno",
    padding: 10,
    borderLeftWidth: 1,
    borderLeftColor: '#000',
  },
});

export default CustomInput;