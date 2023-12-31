import { StyleSheet, Text, View, Dimensions } from "react-native";
import CustomButton from "../components/CustomButton";
import { useState } from "react";
import { Formik } from "formik";
import CustomInput from "../components/CustomInput";
import AppSingleDropdown from "../components/CustomDropdown";
import GenderSelector from "../components/GenderSelector";
import calculateBMI from "../functions/CalculateBMI";

const MainScreen = ({ navigation }) => {
  const colors = [
    "#ffff99",
    "#cc9900",
    "#99cc00",
    "#66ff33",
    "#00ffff",
    "#0066cc",
  ];
  const placeholders = [
    "Select your daily activity ",
    "Very Low Activity ",
    "Low Activity ",
    "Moderate Activity ",
    "High Activity ",
    "Very High Activity ",
  ];
  const placeholdersG = [
    "Select your Goal ",
    "Lose Weight Fast ",
    "Lose Weight Slowly ",
    "Maintain Weight ",
    "Gain Weight Slowly ",
    "Gain Weight Fast ",
  ];
  const [placeholder, setPlaceholder] = useState(placeholders[0]);
  const [placeholderG, setPlaceholderG] = useState(placeholdersG[0]);
  const [ColorG, setColorG] = useState(colors[0]);
  const [color, setColor] = useState(colors[0]);
  const [wUnit, setWUnit] = useState("Weight (LBS)");
  const [hUnit, setHUnit] = useState("Height (Ft/In)");
  const [Ft, setFt] = useState(true);
  const windowWidth = Dimensions.get("window").width;
  const windowheight = Dimensions.get("window").height;
  const [error, setError] = useState("");

  return (
    <View style={styles.container}>
      <Formik
        initialValues={{
          weight: "",
          heightFt: "",
          heightIn: "",
          Activity: 0,
          Gender: "",
          Goal: "",
          weightUnit: "LBS",
          heightUnit: Ft,
        }}
        onSubmit={(values) => {
          if (Ft) {
            values.heightIn == "00";
          }
          if (
            values.Activity == "" ||
            values.Gender == "" ||
            values.Goal == "" ||
            values.heightFt == "" ||
            values.heightIn == "" ||
            values.weight == ""
          ) {
            let error = "";

            for (let key in values) {
              if (values[key] === "") {
                error = error ? error + ", " + key : error + key;
              }
            }
            setError(error + " cannot be empty");
          } else {
            calculateBMI(values);
            navigation.navigate("BMIScreen");
          }
        }}
      >
        {({ handleChange, handleBlur, handleSubmit, values }) => (
          <View>
            <CustomInput
              inputmode={"numeric"}
              title={wUnit}
              multipleUnits={true}
              onChangeText={handleChange("weight")}
              onBlur={handleBlur("weight")}
              setUnit={(val) => {
                values.weightUnit = val;
                setWUnit("Weight (" + val + ")");
              }}
              unitOnPress={() => {
                console.log("hi");
              }}
              value={values.weight}
              unit={["LBS", "KG"]}
            />

            {Ft ? (
              <View
                style={{
                  paddingBottom: windowheight * 0.009,
                  flexDirection: "row",
                  alignContent: "center",
                }}
              >
                <CustomInput
                  inputmode={"numeric"}
                  title={hUnit}
                  titleAlign={"flex-end"}
                  width={windowWidth * 0.499}
                  onChangeText={handleChange("heightFt")}
                  onBlur={handleBlur("heightFt")}
                  value={values.heightFt}
                  unit="Ft"
                  unitOnPress={() => {
                    setHUnit("Height (Meters)");
                    values.heightUnit = false;
                    setFt(false);
                  }}
                />

                <CustomInput
                  inputmode={"numeric"}
                  title="."
                  paddingLeft={windowWidth * 0.7}
                  onChangeText={handleChange("heightIn")}
                  onBlur={handleBlur("heightIn")}
                  value={values.heightIn}
                  width={windowWidth * 0.499}
                  unit="In"
                  unitOnPress={() => {
                    setHUnit("Height (Meters)");
                    values.heightUnit = false;
                    setFt(false);
                  }}
                />
              </View>
            ) : (
              <CustomInput
                inputmode={"numeric"}
                title={hUnit}
                onChangeText={handleChange("heightFt")}
                onBlur={handleBlur("heightFt")}
                value={values.heightFt}
                unit="Meters"
                unitOnPress={() => {
                  setHUnit("Height (Ft/In)");
                  values.heightUnit = true;
                  setFt(true);
                }}
              />
            )}

            <View
              style={{
                height: windowheight * 0.1,
                flexDirection: "column",
              }}
            >
              <GenderSelector
                setFieldValue={(val) => {
                  values.Gender = val;
                }}
              />
            </View>
            <View
              style={{
                paddingTop: windowheight * 0.009,
              }}
            >
              <AppSingleDropdown
                title={"Activity"}
                color={color}
                placeholder={placeholder}
                options={[
                  {
                    value: 1,
                    label: (
                      <Text
                        style={{
                          fontSize: 16,
                          color: "#cc9900",
                          fontFamily: "SCode",
                        }}
                      >
                        Very Low Activity
                      </Text>
                    ),
                  },
                  {
                    value: 2,
                    label: (
                      <Text
                        style={{
                          fontSize: 16,
                          color: "#99cc00",
                          fontFamily: "SCode",
                        }}
                      >
                        Low Activity
                      </Text>
                    ),
                  },
                  {
                    value: 3,
                    label: (
                      <Text
                        style={{
                          fontSize: 16,
                          color: "#66ff33",
                          fontFamily: "SCode",
                        }}
                      >
                        Moderate Activity
                      </Text>
                    ),
                  },
                  {
                    value: 4,
                    label: (
                      <Text
                        style={{
                          fontSize: 16,
                          color: "#00ffff",
                          fontFamily: "SCode",
                        }}
                      >
                        High Activity
                      </Text>
                    ),
                  },
                  {
                    value: 5,
                    label: (
                      <Text
                        style={{
                          fontSize: 16,
                          color: "#0066cc",
                          fontFamily: "SCode",
                        }}
                      >
                        Very High Activity
                      </Text>
                    ),
                  },
                ]}
                value={values["Activity"]}
                name="Activity"
                onChange={(val) => {
                  setColor(colors[val]);
                  setPlaceholder(placeholders[val]);
                  values.Activity = val;
                }}
              />
              <AppSingleDropdown
                title={"Goal"}
                color={ColorG}
                placeholder={placeholderG}
                options={[
                  {
                    value: 1,
                    label: (
                      <Text
                        style={{
                          fontSize: 16,
                          color: "#cc9900",
                          fontFamily: "SCode",
                        }}
                      >
                        Lose Weight Fast
                      </Text>
                    ),
                  },
                  {
                    value: 2,
                    label: (
                      <Text
                        style={{
                          fontSize: 16,
                          color: "#99cc00",
                          fontFamily: "SCode",
                        }}
                      >
                        Lose Weight Slowly
                      </Text>
                    ),
                  },
                  {
                    value: 3,
                    label: (
                      <Text
                        style={{
                          fontSize: 16,
                          color: "#66ff33",
                          fontFamily: "SCode",
                        }}
                      >
                        Maintain Weight
                      </Text>
                    ),
                  },
                  {
                    value: 4,
                    label: (
                      <Text
                        style={{
                          fontSize: 16,
                          color: "#00ffff",
                          fontFamily: "SCode",
                        }}
                      >
                        Gain Weight Slowly
                      </Text>
                    ),
                  },
                  {
                    value: 5,
                    label: (
                      <Text
                        style={{
                          fontSize: 16,
                          color: "#0066cc",
                          fontFamily: "SCode",
                        }}
                      >
                        Gain Weight Fast
                      </Text>
                    ),
                  },
                ]}
                value={values["Goal"]}
                name="Goal"
                onChange={(val) => {
                  setColorG(colors[val]);
                  setPlaceholderG(placeholdersG[val]);
                  values.Goal = val;
                }}
              />
              <Text style={styles.errText}>{error}</Text>
            </View>
            <View
              style={{
                paddingTop: windowWidth * 0.428,
              }}
            >
              <CustomButton
                onPress={handleSubmit}
                title="Submit"
                icon={"check-all"}
              />
            </View>
          </View>
        )}
      </Formik>
    </View>
  );
};

const styles = StyleSheet.create({
  errText: {
    textAlign: "center",
    color: "#FF0000",
    fontFamily: "Glitch",
    fontSize: 12,
  },
  input: {
    height: 50,
    textAlign: "center",
    backgroundColor: "#e6ffff",
    borderColor: "#808080",
    borderWidth: 1,
    color: "#6495ED",
    fontWeight: "700",
    margin: 15,
    fontSize: 1,
    fontFamily: "sans-serif",
  },
  container: {
    flex: 1,
    backgroundColor: "#a4c0f4",
  },
});
export default MainScreen;
