import { StatusBar } from 'expo-status-bar';
import { TextInput,StyleSheet, Text, View, Dimensions } from 'react-native';
import CustomButton from '../components/CustomButton';
import { useState } from 'react';
import { Formik } from 'formik';
import CustomInput from '../components/CustomInput';
import AppSingleDropdown from '../components/CustomDropdown';

const MainScreen=({navigation})=>{
  const windowWidth = Dimensions.get('window').width;
    return(
        <View style={styles.container}>
          <Formik
            initialValues={{ weight: '',heightFt:'',heightIn:'' }}
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
            flexDirection:"row",
            alignContent:"center",
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
          <View >
          <AppSingleDropdown
          placeholder="Select your daily activity"
          options={[
            { value: "1", label: "Very Low Activity"},
            { value: "2", label: "Low Activity" },
            { value: "3", label: "Moderate Activity" },
            { value: "4", label: "High Activity" },
            { value: "5", label: "Very High Activity" }
          ]}
          value={values["Activity"]}
          name="Activity"
          onChange={handleChange("Activity")}
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