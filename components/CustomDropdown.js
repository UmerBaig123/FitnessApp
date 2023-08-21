import React from "react";
import { useState } from "react";
import { StyleSheet, Text, View,Dimensions } from "react-native";
import { useFormikContext } from "formik";
import { Dropdown } from "sharingan-rn-modal-dropdown";
import * as Font from "expo-font";
import Apploading from "expo-app-loading";

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
    return (
      <View
        style={{
          width: '100%',
          flexDirection: isTablet ? "row" : "column",
          alignItems: isTablet ? "center" : null,
        }}
      >
        <Text style={styles.topText}>{title}</Text>
        <View
          style={{
            height:windowHeight*0.09,
            width:windowWidth*.999,
            
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
            
            dropdownIcon="menu-down"
            textInputPlaceholderColor="#000000"
            textInputPlaceholder={placeholder}
            textInputStyle={{
                backgroundColor:color,
                fontSize:20,
                alignItems:"center",
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
    )
  };
  const styles = StyleSheet.create({
    topText: {
      fontFamily: 'Orbitron',
      paddingTop:10,
      paddingLeft:10,
      paddingBottom:5,
      fontSize:20,
    }, 
  })

export default AppSingleDropdown;  