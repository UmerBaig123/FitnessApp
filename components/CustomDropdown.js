import React from "react";
import { useState } from "react";
import { StyleSheet, Text, View,Dimensions } from "react-native";
import { useFormikContext } from "formik";
import { Dropdown } from "sharingan-rn-modal-dropdown";
import * as Font from "expo-font";
import Apploading from "expo-app-loading";

const getFonts = () =>
  Font.loadAsync({
    Techno: require("../assets/fonts/ShareTechMono-Regular.ttf"),
    Orbitron: require("../assets/fonts/Orbitron-VariableFont_wght.ttf"),
    Digital: require("../assets/fonts/digital.ttf")
  });

const AppSingleDropdown = ({
    title,
    placeholder,
    options,
    value,
    name,
    isTablet,
    color,
   
    onChange,
    custom,
    //error,
    textStyle={},
    ...otherProps
  }) => {
    const [fontsloaded, setFontsLoaded] = useState(false);
    const { 
        errors,
        handleChange,
        setFieldValue,
        touched, 
        values } = useFormikContext();
    //const validationColor = error ? "#FF5A5F" : "#223e4b";
    //const { isTablet } = useSnapshot(state);
  
    const windowHeight = Dimensions.get('window').height;
    const windowWidth = Dimensions.get('window').width;
    if (fontsloaded) {
    return (
      <View
        style={{
          marginBottom: 16,
          width: "100%",
          flexDirection: isTablet ? "row" : "column",
          alignItems: isTablet ? "center" : null,
        }}
      >
        <Text
          style={{
            marginBottom: isTablet ? 0 : 5,
            minWidth: isTablet ? 200 : null,
            fontSize:17,
            color:"#737373",
          }}
        >
          {title}
        </Text>
        <View
          style={{
            height:windowHeight*0.09,
            width:windowWidth*0.999,
            
          }}
        >
          {custom ? (
             <Dropdown
             textInputPlaceholderColor="#737373"
             textInputPlaceholder={placeholder}
             data={options}
             value={value}
             onChange={(value)=>{
              onChange(value)
             }}
             rippleColor="#00000"
             mode="outlined"
             itemTextStyle={textStyle}
             {...otherProps}
             
           />
           ):
          (
          <Dropdown
          disableSort
            textInputPlaceholderColor="#000000"
            textInputPlaceholder={placeholder}
            itemContainerStyle = {{
                
                borderRadius:13,
            }}
            textInputStyle={{
                backgroundColor:color,
                fontSize:20,
                fontWeight:"bold"
            }}
            data={options}
            borderRadius={20}
            value={values[name]}
            onChange={onChange}
            // onChange={value => {
            //   setFieldValue(name, value)
            //   //onGeTValue(value)
            // }}
            mode="outlined"
            itemTextStyle={{textStyle}}
            {...otherProps}
            
          />
          )}
        </View>
      </View>
    )}else{ 
        return (
        <Apploading
          startAsync={getFonts}
          onFinish={() => {
            setFontsLoaded(true);
          }}
          onError={console.warn}
        />
      );}
  };

export default AppSingleDropdown;  