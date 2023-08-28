import axios from "axios";

export const getFoods = async (query) => {
  const apiKey = "Your_api_key";
  try {
    const response = await axios.get(
      `https://api.nal.usda.gov/fdc/v1/foods/search?api_key=${apiKey}&query=${query}`
    );
    return response.data;
  } catch (error) {
    console.error("Error fetching food details:", error.message);
    return "Not Found";
  }
};
