import axios from "axios";

const API_URL = import.meta.env.VITE_API_URL;

export const fetchQuestionnaires = async () => {
  try {
    const { data } = await axios.get(`${API_URL}/questionnaires`);
    return data;
  } catch (error) {
    console.error("Error fetching questionnaires:", error);
    throw error;
  }
};

export const addQuestionnaire = async (questionnaire) => {
  try {
    const { data } = await axios.post(`${API_URL}/questionnaires`, questionnaire);
    return data;
  } catch (error) {
    console.error("Error adding questionnaire:", error);
    throw error;
  }
};

export const updateQuestionnaire = async (updatedQuestionnaire) => {
  try {
    const { data } = await axios.put(`${API_URL}/questionnaires/${updatedQuestionnaire.id}`, updatedQuestionnaire);
    return data;
  } catch (error) {
    console.error("Error updating questionnaire:", error);
    throw error;
  }
};

export const deleteQuestionnaire = async (id) => {
  try {
    await axios.delete(`${API_URL}/questionnaires/${id}`);
  } catch (error) {
    console.error("Error deleting questionnaire:", error);
    throw error;
  }
};
