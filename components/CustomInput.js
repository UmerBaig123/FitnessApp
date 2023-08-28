import React from "react";
import { useState } from "react";
import Icon from "react-native-vector-icons/EvilIcons";
import {
  View,
  TextInput,
  Text,
  StyleSheet,
  TouchableOpacity,
} from "react-native";

const CustomInput = ({
  placeHolder,
  paddingLeft,
  inputmode,
  title,
  onChangeText,
  onBlur,
  value,
  unit,
  width,
  height,
  multipleUnits, //if multipleUnits is true then unit must be an array otherwise a string
  setUnit,
  unitOnPress,
  isUnitBox,
}) => {
  if (multipleUnits) {
    const [unitBool, setUnitBool] = useState("true");
    const [text, setText] = useState("10");
    return (
      <View>
        <Text style={[styles.topText, { paddingLeft: paddingLeft }]}>
          {title}
        </Text>
        <View style={[styles.inputContainer, { width: width, height: height }]}>
          <TextInput
            placeholder={placeHolder}
            inputMode={inputmode}
            textAlign="center"
            onChangeText={onChangeText}
            onBlur={onBlur}
            value={value}
            style={styles.input}
          />
          <TouchableOpacity
            onPress={() => {
              if (unitBool) {
                setUnit("KG");
              } else {
                setUnit("LBS");
              }
              unitOnPress();
              setUnitBool(!unitBool);
            }}
          >
            <View
              style={{
                flexDirection: "row",
                padding: 10,
                borderLeftWidth: 1,
                height: 47,
                alignItems: "center",
                borderLeftColor: "#000",
                borderRadius: isUnitBox ? 11 : 0,
              }}
            >
              {unitBool ? (
                <Text style={styles.poundSymbol}>{unit[0]} </Text>
              ) : (
                <Text style={styles.poundSymbol}>{unit[1]} </Text>
              )}
            </View>
          </TouchableOpacity>
        </View>
      </View>
    );
  } else {
    return (
      <View>
        <Text style={[styles.topText, { paddingLeft: paddingLeft }]}>
          {title}
        </Text>
        <View style={[styles.inputContainer, { width: width, height: height }]}>
          <TextInput
            placeholder={placeHolder}
            inputMode={inputmode}
            textAlign="center"
            onChangeText={onChangeText}
            onBlur={onBlur}
            value={value}
            style={[
              styles.input,
              {
                fontFamily: isUnitBox ? "Techno" : "Digital",
              },
            ]}
          />
          <TouchableOpacity onPress={unitOnPress}>
            <View
              style={{
                flexDirection: "row",
                padding: 10,
                borderWidth: 1,
                backgroundColor: "#ffcc00",
                height: 47,
                alignItems: "center",
                borderLeftColor: "#000",
                borderRightColor: "#000",
                borderRadius: isUnitBox ? 20 : 0,
              }}
            >
              <Text style={styles.poundSymbol}>{unit} </Text>
              {isUnitBox ? (
                <Icon name="search" size={20} color={"#000000"} />
              ) : (
                <Text></Text>
              )}
            </View>
          </TouchableOpacity>
        </View>
      </View>
    );
  }
};

const styles = StyleSheet.create({
  topText: {
    fontFamily: "Orbitron",
    padding: 10,
    fontSize: 20,
  },
  inputContainer: {
    backgroundColor: "#ffff99",
    flexDirection: "row",
    alignItems: "center",
    borderWidth: 1,
    borderColor: "#000",
    borderRadius: 10,
    overflow: "hidden",
  },
  input: {
    flex: 1,
    fontSize: 25,
    padding: 10,
  },
  poundSymbol: {
    fontFamily: "Techno",
  },
});

export default CustomInput;
