import AsyncStorage from "@react-native-async-storage/async-storage";

const performStorageOperation = async (operation, key, data) => {
  try {
    if (operation === "store") {
      // Store data
      await AsyncStorage.setItem(key, JSON.stringify(data));
    } else if (operation === "retrieve") {
      // Retrieve data
      const retrievedData = await AsyncStorage.getItem(key);
      if (retrievedData !== null) {
        const parsedData = JSON.parse(retrievedData);
        return parsedData;
      } else {
        console.log(`No data found for key '${key}'`);
        return null;
      }
    } else {
      console.log(`Invalid operation '${operation}'`);
    }
  } catch (error) {
    console.error("Error performing storage operation:", error);
  }
};

// Usage examples
export const storeData = async (key, data) => {
  await performStorageOperation("store", key, data);
};

export const retrieveData = async (key) => {
  const retrievedData = await performStorageOperation("retrieve", key);
  if (retrievedData) {
    return retrievedData;
  }
};
