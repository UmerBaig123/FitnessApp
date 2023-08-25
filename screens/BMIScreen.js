import React from "react";
import {
  ScrollView,
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
  const [isWarningVisible, setWarningVisible] = useState(false);
  const [warning, setWarning] = useState("");

  const toggleModal = () => {
    setModalVisible(!isModalVisible);
  };
  const toggleWarning = () => {
    setWarningVisible(!isWarningVisible);
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
        if (data.Goal < 3) {
          toggleWarning();
          setWarning("It is not Advisable to lose weight at your current BMI");
        }
        setMessage("You are Underweight");
        setBMICond(require("../assets/BMILow.png"));
      } else {
        if (data.bmi >= 25) {
          if (data.Goal > 3) {
            toggleWarning();
            setWarning(
              "It is not Advisable to gain weight at your current BMI"
            );
          }
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
                {data.protein} g
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
        visible={isWarningVisible}
        transparent={true}
        onRequestClose={toggleWarning}
      >
        <View
          style={{
            backgroundColor: "rgba(200, 0, 0,0.8)",
            flex: 1,
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Text style={[styles.modalText, { textAlign: "center" }]}>
            <Text
              style={{
                fontSize: 30,
                color: "#ffb84d",
                fontFamily: "Glitch",
              }}
            >
              Warning:{"\n"}
            </Text>
            {warning}
          </Text>
          <TouchableOpacity onPress={toggleWarning} style={styles.closeButton}>
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
          <ScrollView
            style={{
              width: screenWidth * 0.95,
            }}
          >
            <Image source={require("../assets/BMI.png")} />
            <Text style={styles.modalText}>
              <Text
                style={{
                  fontFamily: "Orbitron",
                  fontSize: 25,
                  color: "#b1afb6",
                }}
              >
                &ensp;&ensp;&ensp;&ensp;&ensp;BMI&ensp;
              </Text>
              (Body Mass Index) is a numerical value calculated based on weight
              and height. It estimates body fat.{"\n"}
              {"\n"}
              <Text style={{ color: "#ffbb99" }}>
                BMI = {"\n"}&ensp;&ensp;weight (kg) / (height (m))^2{"\n"}
              </Text>
              {"\n"}
              <Text style={{ fontSize: 30 }}>Interpretations:{"\n"}</Text>
              {"\n"}
              <Text style={{ color: "#ff99ff" }}>
                Underweight:{"\n"}&ensp;&ensp;BMI ≤ 18.5{"\n"}
                {"\n"}
              </Text>
              <Text style={{ color: "#99ff99" }}>
                Normal weight:{"\n"}&ensp;&ensp;BMI 18.6 - 24.9{"\n"}
                {"\n"}
              </Text>
              <Text style={{ color: "#ffbf80" }}>
                Overweight:{"\n"}&ensp;&ensp;BMI 25 - 29.9{"\n"}
                {"\n"}
              </Text>
              <Text style={{ color: "#ff8080" }}>
                Obese:{"\n"}&ensp;&ensp;BMI ≥ 30{"\n"}
                {"\n"}
              </Text>
              {"\n"}
              Note: BMI doesn't consider muscle, bone density. It's a general
              indicator. Consult a healthcare professional for accurate health
              assessment.
            </Text>
          </ScrollView>
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
          <ScrollView
            style={{
              width: screenWidth * 0.95,
            }}
          >
            <Image
              style={{
                marginTop: screenWidth * 0.1,
                marginBottom: screenWidth * 0.05,
                marginHorizontal: screenWidth * 0.2,
                height: screenHeight * 0.3,
                width: screenHeight * 0.27,
              }}
              source={require("../assets/Calories.png")}
            />
            <Text style={styles.modalText}>
              <Text
                style={{
                  fontFamily: "Orbitron",
                  fontSize: 25,
                  color: "#b1aFFF",
                }}
              >
                &ensp;&ensp;Calories
              </Text>{" "}
              are units of energy in food. They fuel our body's activities.
              {"\n"}
              {"\n"}
              {"\n"}
              {"\u2B24"}&ensp;Our body uses calories for functions like
              breathing, moving, and cell repair.{"\n"}
              {"\n"}
              {"\u2B24"}&ensp;Consuming more calories than needed can lead to
              weight gain.{"\n"}
              {"\n"}
              {"\u2B24"}&ensp;Consuming fewer calories can lead to weight loss.
              {"\n"}
              {"\n"}
              {"\u2B24"}&ensp;Balancing calorie intake with activity is
              important for weight management.{"\n"}
              {"\n"}
              {"\n"}
              Remember, the quality of calories (nutrients) also matters for
              overall health.
            </Text>
          </ScrollView>
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
          <ScrollView
            style={{
              width: screenWidth * 0.95,
            }}
          >
            <Image
              style={{
                margin: screenWidth * 0.04,
              }}
              source={require("../assets/Carbs.png")}
            />
            <Text style={styles.modalText}>
              <Text
                style={{
                  fontSize: 25,
                  fontFamily: "Orbitron",
                  color: "#b1aFFF",
                }}
              >
                &ensp;&ensp;Carbohydrates
              </Text>
              , or carbs, are a type of nutrient found in foods like bread, rice
              and potatoes.{"\n"}
              {"\n"}
              {"\n"}
              {"\u2B24"}&ensp;They are our body's main energy source.{"\n"}
              {"\n"}
              {"\u2B24"}&ensp;Carbs include sugars, fiber, and starches.{"\n"}
              {"\n"}
              {"\u2B24"}&ensp;Simple carbs (sugars) are in foods like fruits and
              sweets.{"\n"}
              {"\n"}
              {"\u2B24"}&ensp;Complex carbs (fiber, starches) are in grains,
              veggies.{"\n"}
              {"\n"}
              {"\u2B24"}&ensp;The body breaks carbs into glucose for energy.
              {"\n"}
              {"\n"}
              {"\n"}
              Choosing healthier carbs and managing intake is vital for balanced
              eating.
            </Text>
          </ScrollView>
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
          <ScrollView
            style={{
              width: screenWidth * 0.95,
            }}
          >
            <Image
              style={{
                margin: screenWidth * 0.02,
              }}
              source={require("../assets/Protein.png")}
            />
            <Text style={styles.modalText}>
              <Text
                style={{
                  fontSize: 25,
                  fontFamily: "Orbitron",
                  color: "#b1aFFF",
                }}
              >
                &ensp;&ensp;Protiens
              </Text>{" "}
              are essential nutrients crucial for many functions. They are found
              in foods like meats, dairy, soy and tofu{"\n"}
              {"\n"}
              {"\n"}
              {"\u2B24"}&ensp;They're made up of amino acids, building blocks of
              life.{"\n"}
              {"\n"}
              {"\u2B24"}&ensp;Proteins repair tissues, enzymes and more.{"\n"}
              {"\n"}
              {"\u2B24"}&ensp;Proteins are essential for building muscle and for
              its recovery.{"\n"}
              {"\n"}
              {"\u2B24"}&ensp;Body uses dietary protein to replenish its own
              proteins.
              {"\n"}
              {"\n"}
              {"\n"}
              Balancing protein intake supports body's growth and maintenance.
            </Text>
          </ScrollView>
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
          <ScrollView
            style={{
              width: screenWidth * 0.95,
            }}
          >
            <Image
              style={{
                marginTop: screenHeight * 0.031,
                marginHorizontal: screenWidth * 0.03,
              }}
              source={require("../assets/Fat.png")}
            />
            <Text style={styles.modalText}>
              <Text
                style={{
                  fontSize: 25,
                  fontFamily: "Orbitron",
                  color: "#b1aFFF",
                }}
              >
                &ensp;&ensp;Fats
              </Text>{" "}
              are a type of nutrient important for health. They are found in
              foods like butter, fatty fish, egg yolks and more{"\n"}
              {"\n"}
              {"\n"}
              {"\u2B24"}&ensp;They provide energy and support cell growth.{"\n"}
              {"\n"}
              {"\u2B24"}&ensp;There are different types: saturated, unsaturated,
              trans.{"\n"}
              {"\n"}
              {"\u2B24"}&ensp;Healthy fats from foods like avocados, nuts, fish.
              {"\n"}
              {"\n"}
              {"\u2B24"}&ensp;Saturated and trans fats should be limited.{"\n"}
              {"\n"}
              {"\u2B24"}&ensp;Fats help absorb certain vitamins in the body.
              {"\n"}
              {"\n"}
              {"\n"}
              Choosing good fats and moderating intake is key for well-being.
            </Text>
          </ScrollView>
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
    backgroundColor: "rgba(0, 102, 255,0.8)",
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  modalText: {
    fontSize: 20,
    fontFamily: "Techno",
    color: "#FFFFFF",
    marginBottom: 20,
  },
  closeButton: {
    margin: screenWidth * 0.03,
    backgroundColor: "#ffbd03",
    padding: 10,
    borderRadius: 5,
  },
  closeButtonText: {
    paddingHorizontal: screenWidth * 0.1,
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
