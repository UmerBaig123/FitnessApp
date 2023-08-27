import React, { useState, useEffect } from "react";
import { View, Text, StyleSheet, Dimensions } from "react-native";
import { retrieveData } from "../functions/asyncStore";
import ProgressBar from "../components/ProgressBar";

const screenWidth = Dimensions.get("window").width;
const screenHeight = Dimensions.get("window").height;

const FoodScreen = ({ navigation }) => {
  const [data, setData] = useState({
    calorieIn: 3000,
    protein: 200,
    carbs: 200,
    fat: 200,
  });
  const [CalorieTaken, setCalorieTaken] = useState(0);
  const [CarbsTaken, setCarbsTaken] = useState(0);
  const [ProteinsTaken, setProteinsTaken] = useState(0);
  const [FatsTaken, setFatsTaken] = useState(0);
  useEffect(() => {
    const checkCache = async () => {
      let data = await retrieveData("userData");
      setData(data);
    };
    checkCache();
  }, []);

  const progressCal = CalorieTaken / data.calorieIn;
  const progressCarbs = CarbsTaken / data.carbs;
  const progressProteins = ProteinsTaken / data.protein;
  const progressFats = FatsTaken / data.fat;
  return (
    <View style={styles.container}>
      <View style={styles.Box}>
        <View
          style={{
            width: screenWidth * 0.95,
          }}
        >
          <View
            style={{
              padding: screenHeight * 0.02,
              alignItems: "center",
            }}
          >
            <Text style={styles.text}>
              Calories{" "}
              <Text style={{ fontSize: 15 }}>
                {CalorieTaken}/{data.calorieIn}
              </Text>
            </Text>
            <ProgressBar
              color={"#ffbd03"}
              unfilledColor={"#ffebb3"}
              progress={progressCal}
              width={300}
            />
          </View>
          <View
            style={{
              paddingTop: screenHeight * 0.01,
              flexDirection: "row",
              justifyContent: "space-between",
            }}
          >
            <View style={{ flexDirection: "column", alignItems: "center" }}>
              <Text style={[styles.text, { fontSize: 20 }]}>
                Carbs{" "}
                <Text style={{ fontSize: 15 }}>
                  {CarbsTaken}/{data.carbs}
                </Text>
              </Text>
              <ProgressBar
                color={"#ffbd03"}
                unfilledColor={"#ffebb3"}
                progress={progressCarbs}
                width={90}
              />
            </View>
            <View style={{ flexDirection: "column", alignItems: "center" }}>
              <Text style={[styles.text, { fontSize: 20 }]}>
                Protein{" "}
                <Text style={{ fontSize: 15 }}>
                  {ProteinsTaken}/{data.protein}
                </Text>
              </Text>
              <ProgressBar
                color={"#ffbd03"}
                unfilledColor={"#ffebb3"}
                progress={progressProteins}
                width={90}
              />
            </View>
            <View style={{ flexDirection: "column", alignItems: "center" }}>
              <Text style={[styles.text, { fontSize: 20 }]}>
                Fat{" "}
                <Text style={{ fontSize: 15 }}>
                  {FatsTaken}/{data.fat}
                </Text>
              </Text>
              <ProgressBar
                color={"#ffbd03"}
                unfilledColor={"#ffebb3"}
                progress={progressFats}
                width={90}
              />
            </View>
          </View>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  text: {
    fontSize: 26,
    marginBottom: 10,
    fontFamily: "Techno",
  },
  Box: {
    borderWidth: 1,
    backgroundColor: "#a4c0f4",
    borderColor: "#6495ed",
    alignItems: "center",
    width: screenWidth * 0.99,
    height: screenHeight * 0.2,
    borderRadius: 11,
  },
  container: {
    flex: 1,
    alignItems: "center",
    backgroundColor: "#ffebb3",
  },
});

export default FoodScreen;
