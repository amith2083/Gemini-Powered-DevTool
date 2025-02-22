import { GoogleGenerativeAI } from "@google/generative-ai";

const getApiKey = () => {
    return localStorage.getItem("gemini_api_key");
};

export const initializeModel = () => {
    const apiKey = getApiKey();
  if (!apiKey) return null;

//   const genAI = new GoogleGenerativeAI(apiKey);
//   return genAI.getGenerativeModel({ model: "gemini-pro" });
try {
    const genAI = new GoogleGenerativeAI(apiKey);
    return genAI.getGenerativeModel({ model: "gemini-pro" });
  } catch (error) {
    if (error.message.includes("API key expired") || error.message.includes("API_KEY_INVALID")) {
        alert("Your API key has expired. Please enter a new API key.");
        localStorage.removeItem("gemini_api_key");
        window.location.reload();
      }
    return null;
  }
};

export const model = initializeModel();
