import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View, Image } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { useEffect, useState } from "react";
import * as Font from "expo-font";
import Apploading from "expo-app-loading";

const getFonts = () =>
  Font.loadAsync({
    Techno: require("./assets/fonts/ShareTechMono-Regular.ttf"),
    Orbitron: require("./assets/fonts/Orbitron-VariableFont_wght.ttf"),
    Digital: require("./assets/fonts/digital.ttf"),
    SCode: require("./assets/fonts/SourceCodePro-BoldItalic.ttf"),
    Glitch: require("./assets/fonts/RubikGlitch-Regular.ttf"),
    HotPizza: require("./assets/fonts/hotpizza.ttf"),
  });

//Screens
import MainScreen from "./screens/MainScreen";
import FoodScreen from "./screens/FoodScreen";
import BMIScreen from "./screens/BMIScreen";

const Stack = createNativeStackNavigator();
export default function App() {
  const [fontsloaded, setFontsLoaded] = useState(false);
  if (fontsloaded) {
  return (
    <NavigationContainer>
      <Stack.Navigator>
      <Stack.Group
    screenOptions={{ 
              headerStyle: {
                backgroundColor: "#ffbd03",
              },
              title: "Calorie Counter",
              headerTitleStyle: {
                color: "#6495ED",
                fontFamily: "Digital",
                flex: 1,
                flexdirection: "row",
                fontSize: 30,
              },
              statusBarColor: "#FFFFF",
              presentation: "modal",
              headerLeft: () => (
                <Image
                  style={{
        width: 30,
        height: 30,
                    marginRight: 10,
      }}
                  source={require("./assets/logo.png")}
                />
              ),
     }}
  >
            <Stack.Screen name="Home" component={MainScreen} />
            <Stack.Screen name="FoodScreen" component={FoodScreen} />
            <Stack.Screen name="BMIScreen" component={BMIScreen} />
        </Stack.Group>
        </Stack.Navigator>
    </NavigationContainer>
    );
  } else {
    return (
      <Apploading
        startAsync={getFonts}
        onFinish={() => {
          setFontsLoaded(true);
        }}
        onError={console.warn}
      />
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
