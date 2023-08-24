import React from "react";
import { useState } from "react";
import {
  View,
  TextInput,
  Text,
  StyleSheet,
  TouchableOpacity,
} from "react-native";

const CustomInput = ({
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
            {unitBool ? (
              <Text style={styles.poundSymbol}>{unit[0]}</Text>
            ) : (
              <Text style={styles.poundSymbol}>{unit[1]}</Text>
            )}
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
            inputMode={inputmode}
            textAlign="center"
            onChangeText={onChangeText}
            onBlur={onBlur}
            value={value}
            style={styles.input}
          />
          <TouchableOpacity onPress={unitOnPress}>
            <Text style={styles.poundSymbol}>{unit}</Text>
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
    fontFamily: "Digital",
  },
  poundSymbol: {
    fontFamily: "Techno",
    padding: 10,
    borderLeftWidth: 1,
    borderLeftColor: "#000",
  },
});

export default CustomInput;
