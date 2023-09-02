import React, { useState, useEffect } from "react";
import { getFoods } from "../functions/getFoods";
import FoodList from "../components/renderItems";
import CustomButton from "../components/CustomButton";
import {
  ActivityIndicator,
  ScrollView,
  Modal,
  View,
  Text,
  StyleSheet,
  Dimensions,
  TouchableOpacity,
} from "react-native";
import { retrieveData, storeData } from "../functions/asyncStore";
import CustomInput from "../components/CustomInput";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import ProgressBar from "../components/ProgressBar";
import FoodListMain from "../components/renderItemMain";

const screenWidth = Dimensions.get("window").width;
const screenHeight = Dimensions.get("window").height;

const FoodScreen = ({ navigation }) => {
  const [data, setData] = useState({
    calorieIn: 3000,
    protein: 200,
    carbs: 200,
    fat: 200,
  });
  const [foodResult, setFoodResult] = useState([]);
  const [selectedFood, setSelectedFood] = useState([{}]);
  const [CalorieTaken, setCalorieTaken] = useState(0);
  const [isFatModalVisible, setFatModalVisible] = useState(false);
  const [isFoodModalVisible, setFoodModalVisible] = useState(false);
  const [CarbsTaken, setCarbsTaken] = useState(0);
  const [ProteinsTaken, setProteinsTaken] = useState(0);
  const [FatsTaken, setFatsTaken] = useState(0);
  const [searchVal, setSearchVal] = useState();
  const [isLoading, setIsLoading] = useState(false);
  const [nutrientMultiplier, setNutrientMultiplier] = useState(100);
  const [foodsEaten, setFoodsEaten] = useState([{}]);
  const storeFood = async (food) => {
    const prevData = await retrieveData("foods");
    if (prevData != null) {
      storeData("foods", [...prevData, food]);
      setFoodsEaten([...prevData, food]);
    } else {
      storeData("foods", [food]);
      setFoodsEaten([food]);
    }
  };
  const setFood = async () => {
    const foods = await retrieveData("foods");
    setFoodsEaten(foods);
    let totalCalories = 0;
    let totalCarbs = 0;
    let totalProteins = 0;
    let totalFats = 0;
    foods.forEach((element) => {
      totalCalories += parseInt(element.Calories);
      totalCarbs += parseInt(element.Carbs);
      totalProteins += parseInt(element.Proteins);
      totalFats += parseInt(element.Fats);
    });
    setCalorieTaken(parseInt(totalCalories));
    setCarbsTaken(parseInt(totalCarbs));
    setProteinsTaken(parseInt(totalProteins));
    setFatsTaken(parseInt(totalFats));
  };
  useEffect(() => {
    setFood();
  }, []);
  const getFoodsFromApi = async () => {
    setFoodResult([]);
    setIsLoading(true);
    let data = await getFoods(searchVal);
    for (i in data.foods) {
      let nutrients = data.foods[i].foodNutrients;
      var ProteinObj = nutrients.filter((obj) => {
        return obj.nutrientId === 1003;
      });
      var CarbsObj = nutrients.filter((obj) => {
        return obj.nutrientId === 1005;
      });
      var FatObj = nutrients.filter((obj) => {
        return obj.nutrientId === 1004;
      });
      var CalObj = nutrients.filter((obj) => {
        return obj.nutrientId === 1008;
      });
      setFoodResult((prevstate) => [
        ...prevstate,
        {
          Name: data.foods[i].description,
          Calories: CalObj[0].value,
          Carbs: CarbsObj[0].value,
          Proteins: ProteinObj[0].value,
          Fats: FatObj[0].value,
        },
      ]);
    }
    setIsLoading(false);
  };
  const toggleFatModal = () => {
    setFatModalVisible(!isFatModalVisible);
    setFoodResult([]);
  };
  const toggleFoodModal = () => {
    setFoodModalVisible(!isFoodModalVisible);
  };
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
      <ScrollView>
        <FoodListMain
          foods={foodsEaten}
          onPress={(index) => {
            let foodsAte = foodsEaten;
            foodsAte.splice(index, 1);
            storeData("foods", foodsAte);
            setFood();
          }}
        />
      </ScrollView>
      <View style={styles.floating}>
        <TouchableOpacity style={styles.button} onPress={toggleFatModal}>
          <Text style={styles.buttonText}>+</Text>
        </TouchableOpacity>
      </View>
      <Modal
        animationType="slide"
        visible={isFatModalVisible}
        transparent={true}
        onRequestClose={toggleFatModal}
      >
        <View style={styles.modalContainer}>
          <TouchableOpacity onPress={toggleFatModal} style={styles.closeButton}>
            <View
              style={{
                paddingHorizontal: screenWidth * 0.03,
                paddingVertical: screenHeight * 0.015,
              }}
            >
              <Icon name="close" size={30} color={"#000000"} />
            </View>
            <View style={{ paddingLeft: screenWidth * 0.02 }}></View>
          </TouchableOpacity>
          <CustomInput
            placeHolder={"search Food..."}
            titleAlign={"flex-end"}
            width={screenWidth * 0.9}
            onChangeText={(val) => {
              let searchVal = val.replaceAll(" ", "%20");
              setSearchVal(searchVal);
            }}
            onBlur={() => {}}
            unit="Search"
            isUnitBox={true}
            unitOnPress={getFoodsFromApi}
          />

          <ScrollView
            style={{
              width: screenWidth * 0.95,
            }}
          >
            <FoodList
              foods={foodResult}
              setFood={setSelectedFood}
              setThisMod={toggleFatModal}
              setFoodMod={toggleFoodModal}
            />
            <View>
              <ActivityIndicator
                animating={isLoading}
                size={50}
                color="#00ff00"
              />
            </View>
          </ScrollView>
        </View>
      </Modal>
      <Modal
        animationType="slide"
        visible={isFoodModalVisible}
        transparent={true}
        onRequestClose={toggleFoodModal}
      >
        <View
          style={{
            height: screenHeight,
            width: screenWidth,
            paddingLeft: screenWidth * 0.03,
            justifyContent: "center",
            alignContent: "center",
          }}
        >
          <TouchableOpacity
            onPress={toggleFoodModal}
            style={styles.closeButton}
          >
            <View
              style={{
                paddingHorizontal: screenWidth * 0.03,
                paddingVertical: screenHeight * 0.015,
              }}
            >
              <Icon name="close" size={30} color={"#e60000"} />
            </View>
          </TouchableOpacity>
          <View
            style={{
              backgroundColor: "#a4c0f4",
              borderWidth: 1,
              width: screenWidth * 0.9,
              marginLeft: screenWidth * 0.02,
              borderRadius: 11,
            }}
          >
            <Text style={styles.FoodModText}>{selectedFood.Name}</Text>
            <Text style={[styles.FoodModText, { fontSize: 15 }]}>
              Calories:&emsp;&emsp;&emsp;{" "}
              <Text style={{ fontSize: 20 }}>
                {nutrientMultiplier != 0
                  ? (
                      (selectedFood.Calories / 100) *
                      nutrientMultiplier
                    ).toFixed(1)
                  : selectedFood.Calories}{" "}
                KCal
              </Text>
            </Text>
            <Text style={[styles.FoodModText, { fontSize: 15 }]}>
              Carbs:&emsp;&emsp;&emsp;&nbsp;&nbsp;&nbsp;&nbsp;{" "}
              <Text style={{ fontSize: 20 }}>
                {nutrientMultiplier != 0
                  ? ((selectedFood.Carbs / 100) * nutrientMultiplier).toFixed(1)
                  : selectedFood.Carbs}{" "}
                G
              </Text>
            </Text>
            <Text style={[styles.FoodModText, { fontSize: 15 }]}>
              Proteins:&emsp;&emsp;&nbsp;&nbsp;&nbsp;{" "}
              <Text style={{ fontSize: 20 }}>
                {nutrientMultiplier != 0
                  ? (
                      (selectedFood.Proteins / 100) *
                      nutrientMultiplier
                    ).toFixed(1)
                  : selectedFood.Proteins}{" "}
                G
              </Text>
            </Text>
            <Text style={[styles.FoodModText, { fontSize: 15 }]}>
              Fats:&emsp;&emsp;&emsp;&emsp;&nbsp;&nbsp;&nbsp;{" "}
              <Text style={{ fontSize: 20 }}>
                {nutrientMultiplier != 0
                  ? ((selectedFood.Fats / 100) * nutrientMultiplier).toFixed(1)
                  : selectedFood.Fats}{" "}
                G
              </Text>
            </Text>
            <View
              style={{
                alignItems: "center",
              }}
            >
              <CustomInput
                placeHolder={"100"}
                titleAlign={"flex-end"}
                inputmode={"numeric"}
                width={screenWidth * 0.8}
                onChangeText={(val) => {
                  setNutrientMultiplier(val);
                }}
                onBlur={() => {}}
                unit="G"
                unitOnPress={() => {}}
              />
              <View style={{ paddingTop: screenHeight * 0.1 }}>
                <CustomButton
                  title={"Add"}
                  icon={"plus"}
                  onPress={async () => {
                    const food = {
                      Name: selectedFood.Name,
                      Calories:
                        nutrientMultiplier != 0
                          ? (
                              (selectedFood.Calories / 100) *
                              nutrientMultiplier
                            ).toFixed(1)
                          : selectedFood.Calories,
                      Carbs:
                        nutrientMultiplier != 0
                          ? (
                              (selectedFood.Carbs / 100) *
                              nutrientMultiplier
                            ).toFixed(1)
                          : selectedFood.Carbs,
                      Proteins:
                        nutrientMultiplier != 0
                          ? (
                              (selectedFood.Proteins / 100) *
                              nutrientMultiplier
                            ).toFixed(1)
                          : selectedFood.Proteins,
                      Fats:
                        nutrientMultiplier != 0
                          ? (
                              (selectedFood.Fats / 100) *
                              nutrientMultiplier
                            ).toFixed(1)
                          : selectedFood.Fats,
                    };
                    storeFood(food);
                    setCalorieTaken(
                      parseInt(CalorieTaken) + parseInt(food.Calories)
                    );
                    setCarbsTaken(parseInt(CarbsTaken) + parseInt(food.Carbs));
                    setProteinsTaken(
                      parseInt(ProteinsTaken) + parseInt(food.Proteins)
                    );
                    setFatsTaken(parseInt(FatsTaken) + parseInt(food.Fats));
                    toggleFatModal();
                    toggleFoodModal();
                  }}
                />
              </View>
            </View>
          </View>
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  FoodModText: {
    paddingLeft: screenWidth * 0.07,
    paddingTop: screenWidth * 0.04,
    fontSize: 40,
    fontFamily: "HotPizza",
  },
  modalContainer: {
    borderWidth: 2,
    borderColor: "#8c8c8c",
    borderRadius: 30,
    alignSelf: "center",
    justifyContent: "center",
    backgroundColor: "#FFFFFF",
    width: screenWidth * 0.95,
    height: screenHeight * 0.8,
    flex: 1,
    alignItems: "center",
    elevation: 5, // for shadow on Android
    shadowColor: "#000", // for shadow on iOS
  },
  modalText: {
    fontSize: 20,
    fontFamily: "Techno",
    color: "#FFFFFF",
    marginBottom: 20,
  },
  closeButton: {
    alignSelf: "flex-start",
    borderRadius: 5,
  },
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
  floating: {
    position: "absolute",
    bottom: 20,
    right: 20,
  },
  button: {
    backgroundColor: "white",
    borderRadius: 40,
    paddingVertical: 5,
    paddingHorizontal: 20,
    elevation: 5, // for shadow on Android
    shadowColor: "#000", // for shadow on iOS
    shadowOpacity: 0.3,
    shadowRadius: 5,
    shadowOffset: { width: 0, height: 2 },
  },
  buttonText: {
    fontSize: 38,
    color: "black",
    fontFamily: "Orbitron",
  },
});

export default FoodScreen;
