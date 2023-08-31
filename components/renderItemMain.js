import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Dimensions,
} from "react-native";

const screenWidth = Dimensions.get("screen").width;
const FoodListMain = ({ foods, onPress }) => {
  return (
    <View style={styles.container}>
      {foods.map((food, index) => (
        <TouchableOpacity
          key={index}
          onPress={() => {
            onPress(index);
          }}
        >
          <View style={styles.foodBlock}>
            <Text style={styles.foodName}>{food.Name}</Text>
            <Text style={{ fontSize: 16 }}>Calories: {food.Calories} Kcal</Text>
            <View
              style={{
                flexDirection: "row",
                justifyContent: "space-between",
              }}
            >
              <Text>Carbs: {food.Carbs} G</Text>
              <Text>Proteins: {food.Proteins} G</Text>
              <Text>Fats: {food.Fats} G</Text>
            </View>
          </View>
        </TouchableOpacity>
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: screenWidth,
    flex: 1,
    padding: 10,
  },
  foodBlock: {
    marginBottom: 10,
    padding: 10,
    backgroundColor: "#f0f0f0",
    borderRadius: 5,
  },
  foodName: {
    fontSize: 18,
    fontWeight: "bold",
  },
});

export default FoodListMain;
