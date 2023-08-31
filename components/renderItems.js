import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";

const FoodList = ({ foods, setFood, setThisMod, setFoodMod }) => {
  return (
    <View style={styles.container}>
      {foods.map((food, index) => (
        <TouchableOpacity
          key={index}
          onPress={() => {
            setFood({
              Name: food.Name,
              Calories: food.Calories,
              Carbs: food.Carbs,
              Proteins: food.Proteins,
              Fats: food.Fats,
            });
            setFoodMod();
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

export default FoodList;
