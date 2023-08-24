import React from "react";
import { useState } from "react";
import {
  TouchableOpacity,
  Text,
  StyleSheet,
  View,
  Dimensions,
  TextComponent,
} from "react-native";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";

const GenderSelector = ({ setFieldValue }) => {
  const windowWidth = Dimensions.get("window").width;
  const windowheight = Dimensions.get("window").height;
  const [fontsloaded, setFontsLoaded] = useState(false);
  const [colorM, setColorM] = useState("#FFFFFF");
  const [colorF, setColorF] = useState("#FFFFFF");
  const [iColorM, setIColorM] = useState("#80b3ff");
  const [iColorF, setIColorF] = useState("#fe81c8");
  return (
    <View
      style={{
        height: windowheight * 0.1,
      }}
    >
      <Text style={styles.topText}>Gender</Text>
      <View
        style={{
          flex: 1,
          flexDirection: "row",
          justifyContent: "space-between",
        }}
      >
        <TouchableOpacity
          style={[
            styles.buttonContainer,
            {
              width: windowWidth * 0.499,
              backgroundColor: colorM,
            },
          ]}
          onPress={() => {
            setColorM("#0066ff");
            setColorF("#80b3ff");
            setIColorF("#80b3ff");
            setIColorM("#80b3ff");
            setFieldValue("male");
          }}
        >
          <Text style={styles.buttonText}>
            <Text
              style={{
                fontFamily: "Orbitron",
              }}
            >
              Male
            </Text>

            <View
              style={{
                paddingLeft: 16,
              }}
            >
              <Icon name="gender-male" size={16} color={iColorM} />
            </View>
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[
            styles.buttonContainer,
            {
              width: windowWidth * 0.49,
              backgroundColor: colorF,
            },
          ]}
          onPress={() => {
            setColorM("#fe81c8");
            setColorF("#fc0390");
            setIColorM("#fe81c8");
            setIColorF("#fe81c8");
            setFieldValue("female");
          }}
        >
          <Text style={styles.buttonText}>
            <Text
              style={{
                fontFamily: "Orbitron",
              }}
            >
              Female
            </Text>

            <View
              style={{
                paddingLeft: 16,
              }}
            >
              <Icon name="gender-female" size={22} color={iColorF} />
            </View>
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  buttonContainer: {
    borderRadius: 8,
    alignItems: "center",
    justifyContent: "center",
    shadowColor: "#000",
    shadowOpacity: 0.3,
    shadowOffset: {
      width: 0,
      height: 2,
    },
    elevation: 3,
  },
  topText: {
    fontFamily: "Orbitron",
    padding: 10,
    fontSize: 20,
  },
  buttonText: {
    color: "#000000",
    fontSize: 16,
    fontWeight: "bold",
  },
});

export default GenderSelector;
