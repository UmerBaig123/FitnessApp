import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View ,Image} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';



import MainScreen from './screens/MainScreen';

const Stack = createNativeStackNavigator()
export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
      <Stack.Group
    screenOptions={{ 
      presentation: 'modal',
      headerLeft: () => <Image style={{
        width: 30,
        height: 30,
        marginRight:10,
        
      }}
      source={require('./assets/logo.png')}/>
     }}
  >
        <Stack.Screen
          name="Home"
          component={MainScreen}
          options={{
            title: 'Calorie Counter',
             headerTitleStyle:{
              color:"#6495ED",
              fontWeight:"900",
              flex:1,
              flexdirection:"row",
              fontSize:25,
               fontFamily:"sans-serif",
          },statusBarColor:"#000000",}}
        />
        </Stack.Group>
        </Stack.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
