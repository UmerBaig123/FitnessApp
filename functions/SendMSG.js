import AsyncStorage from '@react-native-async-storage/async-storage';

const fetchGpt3Response = async (prompt) => {
    try {
      // Make an API request to GPT-3 to get the response
      const response = await fetch('https://api.openai.com/v1/engines/davinci-codex/completions', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: 'Bearer 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',
        },
        body: JSON.stringify({
          prompt: prompt,
          max_tokens: 100,
        }),
      });

      const data = await response.json();
      const gpt3Response = data.choices[0].text;

      // Set the GPT-3 response in the state
      AsyncStorage.setItem("response",gpt3Response);
    } catch (error) {
      console.error('Error fetching GPT-3 response:', error);
    }
  };


export default fetchGpt3Response;
