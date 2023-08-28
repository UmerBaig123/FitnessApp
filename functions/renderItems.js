import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";

const FoodList = ({ foods }) => {
  const [visibleBlocks, setVisibleBlocks] = useState(foods.map(() => true));
  return (
    <View style={styles.container}>
      {foods.map((food, index) => (
        <TouchableOpacity
          onPress={() => {
            console.log([
              food.Name,
              food.Calories,
              food.Carbs,
              food.Proteins,
              food.Fats,
            ]);
          }}
        >
          <View key={index} style={styles.foodBlock}>
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
