import { StatusBar } from 'expo-status-bar';
import { TextInput,StyleSheet, Text, View, Dimensions } from 'react-native';
import CustomButton from '../components/CustomButton';
import { useState } from 'react';
import { Formik } from 'formik';
import CustomInput from '../components/CustomInput';
import AppSingleDropdown from '../components/CustomDropdown';
import GenderSelector from '../components/GenderSelector';
import calculateBMI from '../functions/CalculateBMI';


const MainScreen=({navigation})=>{
  const colors = ["#ffff99","#cc9900","#99cc00","#66ff33","#00ffff","#0066cc"]
  const placeholders = [
    "Select your daily activity ",
    "Very Low Activity ",
    "Low Activity ",
    "Moderate Activity ",
    "High Activity ",
    "Very High Activity "
  ]
  const [placeholder,setPlaceholder] = useState(placeholders[0])
  const [color,setColor] = useState(colors[0])
  const windowWidth = Dimensions.get('window').width;
  const windowheight = Dimensions.get("window").height;

    return(
        <View style={styles.container}>

          <Formik
            initialValues={{ 
              weight: '',
              heightFt:'',
              heightIn:'',
              Activity:0,
              Gender:"male"
             }}
            onSubmit={values => console.log(values)}
          >

          {({ handleChange, handleBlur, handleSubmit, values }) => (
          <View>

          <CustomInput
          title="Weight"
          onChangeText={handleChange('weight')}
          onBlur={handleBlur('weight')}
          value={values.weight}
          unit="LBS"
          />



          <View style = {{
            paddingBottom: windowheight*0.009,
            flexDirection: "row",
            alignContent:  "center",
          }}>

          <CustomInput
          title="Height"
          titleAlign={"flex-end"}
          onChangeText={handleChange('heightFt')}
          onBlur={handleBlur('heightFt')}
          value={values.heightFt}
          width={windowWidth*0.499}
          unit="Ft"
          />

          <CustomInput
          title="."
          paddingLeft={windowWidth*0.7}
          onChangeText={handleChange('heightIn')}
          onBlur={handleBlur('heightIn')}
          value={values.heightIn}
          width={windowWidth*0.499}
          unit="In"
          />

          </View>
          <View style={{
            height:windowheight*0.1,
            flexDirection:"column",
          }}>
          <GenderSelector setFieldValue={(val)=>{
            values.Gender=val
          }}/>
          </View>
          <View style={{
            paddingTop: windowheight*0.009,
          }}>

          <AppSingleDropdown
          title={"Activity"}
          color={color}
          placeholder= {placeholder}
          options={[
            { value: 1, label: (
             <Text
             style={{
              fontSize:16,
              color:"#cc9900",
              fontFamily:"SCode",
             }}
             >Very Low Activity</Text> 
            )},
            { value: 2, label: (
              <Text
              style={{
                fontSize:16,
               color:"#99cc00",
               fontFamily:"SCode",
              }}
              >Low Activity</Text> 
             ) },
            { value: 3, label:(
              <Text
              style={{
                fontSize:16,
               color:"#66ff33",
               fontFamily:"SCode",
              }}
              >Moderate Activity</Text> 
             ) },
            { value: 4, label: (
              <Text
              style={{
                fontSize:16,
               color:"#00ffff",
               fontFamily:"SCode",
              }}
              >High Activity</Text> 
             ) },
            { value: 5, label: (
              <Text
              style={{
                fontSize:16,
               color:"#0066cc",
               fontFamily:"SCode",
              }}
              >Very High Activity</Text> 
             ) }
          ]}
          value={values["Activity"]}
          name="Activity"
          onChange={(val)=>{
            setColor(colors[val])
            setPlaceholder(placeholders[val])
            handleChange("Activity")}}
        />

        </View>

         <CustomButton onPress={handleSubmit} title="Submit" />

       </View>
     )}
   </Formik>
          
        </View>
    )
}

const styles = StyleSheet.create({
    input:{
      height:50,
     textAlign: 'center',
     backgroundColor: "#e6ffff",
     borderColor: '#808080',
     borderWidth: 1,
     color:"#6495ED",
     fontWeight:"700",
     margin:15,
     fontSize:1,
     fontFamily:"sans-serif",
    },
    container: {
      
      flex: 1,
      backgroundColor: '#ccffff',
    },
  });  
export default MainScreen;