import React from "react";
import {
  View,
  StyleSheet,
  ImageBackground,
  Dimensions,
  Text,
  Image,
  TouchableOpacity,
  Modal,
} from "react-native";
import { useState, useEffect } from "react";
import { retrieveData } from "../functions/asyncStore";
import CustomButton from "../components/CustomButton";

const screenWidth = Dimensions.get("window").width;
const screenHeight = Dimensions.get("window").height;

const BMIScreen = ({ navigation }) => {
  const [data, SetData] = useState({});
  const [bmiMessage, setMessage] = useState("");
  const [messageColor, setMessageColor] = useState("#b30000");
  const [BMIcondPic, setBMICond] = useState(require("../assets/BMILow.png"));
  const [isModalVisible, setModalVisible] = useState(false);
  const [isCalModalVisible, setCalModalVisible] = useState(false);
  const [isCarbModalVisible, setCarbModalVisible] = useState(false);
  const [isProModalVisible, setProModalVisible] = useState(false);
  const [isFatModalVisible, setFatModalVisible] = useState(false);

  const toggleModal = () => {
    setModalVisible(!isModalVisible);
  };
  const toggleCalModal = () => {
    setCalModalVisible(!isCalModalVisible);
  };
  const toggleCarbModal = () => {
    setCarbModalVisible(!isCarbModalVisible);
  };
  const toggleProModal = () => {
    setProModalVisible(!isProModalVisible);
  };
  const toggleFatModal = () => {
    setFatModalVisible(!isFatModalVisible);
  };
  useEffect(() => {
    const checkCache = async () => {
      let data = await retrieveData("userData");
      SetData(data);
      if (data.bmi <= 18) {
        setMessage("You are Underweight");
        setBMICond(require("../assets/BMILow.png"));
      } else {
        if (data.bmi >= 25) {
          setMessage("You are overWeight");
          setBMICond(require("../assets/BMIHigh.png"));
        } else {
          setMessage("You are in a healthy  BMI range");
          setMessageColor("#00cc00");
          setBMICond(require("../assets/BMINormal.png"));
        }
      }
    };
    checkCache();
  }, []);
  return (
    <View style={styles.container}>
      <ImageBackground
        source={require("../assets/bg.jpg")} // Replace with your image path
        style={styles.imageBackground}
        resizeMode="cover"
      >
        <View
          style={{
            flexDirection: "row",
            paddingRight: screenWidth * 0.04,
            justifyContent: "center",
            paddingTop: screenHeight * 0.15,
          }}
        >
          <Image
            style={{
              width: screenWidth * 0.16,
              height: screenHeight * 0.04,
              marginRight: 10,
            }}
            source={BMIcondPic}
          />
          <TouchableOpacity onPress={toggleModal}>
            <Text
              style={{
                fontSize: 30,
                fontFamily: "HotPizza",
              }}
            >
              Your BMI is {data.bmi}
            </Text>
          </TouchableOpacity>
        </View>
        <Text
          style={{
            color: messageColor,
            fontFamily: "HotPizza",
            textAlign: "center",
            fontSize: 20,
          }}
        >
          {bmiMessage}
        </Text>
        <TouchableOpacity onPress={toggleCalModal}>
          <Text
            style={{
              color: "#002800",
              fontFamily: "HotPizza",
              textAlign: "center",
              fontSize: 28,
              paddingTop: screenHeight * 0.23,
            }}
          >
            {data.calorieIn} KCal
          </Text>
        </TouchableOpacity>

        <View
          style={{
            alignItems: "center",
            paddingTop: screenHeight * 0.23,
          }}
        >
          <View
            style={{
              justifyContent: "space-between",
              flexDirection: "row",
              width: screenWidth * 0.85,
            }}
          >
            <TouchableOpacity onPress={toggleCarbModal}>
              <Text
                style={{
                  fontSize: 28,
                  color: "#33cc33",
                  fontFamily: "HotPizza",
                }}
              >
                {data.carbs} g
              </Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={toggleProModal}>
              <Text
                style={{
                  fontSize: 28,
                  color: "#cccc00",
                  fontFamily: "HotPizza",
                }}
              >
                {data.protien} g
              </Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={toggleFatModal}>
              <Text
                style={{
                  fontSize: 28,
                  color: "#0047b3",
                  fontFamily: "HotPizza",
                }}
              >
                {data.fat} g
              </Text>
            </TouchableOpacity>
          </View>
        </View>
        <View
          style={{
            paddingTop: screenWidth * 0.07,
            paddingLeft: screenWidth * 0.07,
            width: screenWidth * 0.93,
          }}
        >
          <CustomButton
            onPress={() => {
              navigation.navigate("FoodScreen");
            }}
            title="OK"
          />
        </View>
      </ImageBackground>
      <Modal
        animationType="slide"
        visible={isModalVisible}
        transparent={true}
        onRequestClose={toggleModal}
      >
        <View style={styles.modalContainer}>
          <Text style={styles.modalText}>This is a description popup!</Text>
          <TouchableOpacity onPress={toggleModal} style={styles.closeButton}>
            <Text style={styles.closeButtonText}>Close</Text>
          </TouchableOpacity>
        </View>
      </Modal>
      <Modal
        animationType="slide"
        visible={isModalVisible}
        transparent={true}
        onRequestClose={toggleModal}
      >
        <View style={styles.modalContainer}>
          <Text style={styles.modalText}>This is a description popup!</Text>
          <TouchableOpacity onPress={toggleModal} style={styles.closeButton}>
            <Text style={styles.closeButtonText}>Close</Text>
          </TouchableOpacity>
        </View>
      </Modal>
      <Modal
        animationType="slide"
        visible={isCalModalVisible}
        transparent={true}
        onRequestClose={toggleCalModal}
      >
        <View style={styles.modalContainer}>
          <Text style={styles.modalText}>This is a description popup!</Text>
          <TouchableOpacity onPress={toggleCalModal} style={styles.closeButton}>
            <Text style={styles.closeButtonText}>Close</Text>
          </TouchableOpacity>
        </View>
      </Modal>
      <Modal
        animationType="slide"
        visible={isCarbModalVisible}
        transparent={true}
        onRequestClose={toggleCarbModal}
      >
        <View style={styles.modalContainer}>
          <Text style={styles.modalText}>This is a description popup!</Text>
          <TouchableOpacity
            onPress={toggleCarbModal}
            style={styles.closeButton}
          >
            <Text style={styles.closeButtonText}>Close</Text>
          </TouchableOpacity>
        </View>
      </Modal>
      <Modal
        animationType="slide"
        visible={isProModalVisible}
        transparent={true}
        onRequestClose={toggleProModal}
      >
        <View style={styles.modalContainer}>
          <Text style={styles.modalText}>This is a description popup!</Text>
          <TouchableOpacity onPress={toggleProModal} style={styles.closeButton}>
            <Text style={styles.closeButtonText}>Close</Text>
          </TouchableOpacity>
        </View>
      </Modal>
      <Modal
        animationType="slide"
        visible={isFatModalVisible}
        transparent={true}
        onRequestClose={toggleFatModal}
      >
        <View style={styles.modalContainer}>
          <Text style={styles.modalText}>This is a description popup!</Text>
          <TouchableOpacity onPress={toggleFatModal} style={styles.closeButton}>
            <Text style={styles.closeButtonText}>Close</Text>
          </TouchableOpacity>
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  modalContainer: {
    backgroundColor: "rgba(0, 102, 255,0.5)",
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  modalText: {
    fontSize: 30,
    color: "#FFFFFF",
    marginBottom: 20,
  },
  closeButton: {
    backgroundColor: "#ffbd03",
    padding: 10,
    borderRadius: 5,
  },
  closeButtonText: {
    color: "green",
    fontSize: 16,
  },
  container: {
    flex: 1,
  },
  imageBackground: {
    width: screenWidth * 0.999,
    height: screenHeight * 0.9299,
  },
});

export default BMIScreen;
