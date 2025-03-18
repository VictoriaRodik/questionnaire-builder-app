import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";


const API_URL = import.meta.env.VITE_API_URL + "/questionnaires";

export const useQuestionnaires = () => {
  const queryClient = useQueryClient();

  const { data, isLoading, error } = useQuery({
    queryKey: ["questionnaires"],
    queryFn: async () => {
      const response = await axios.get(API_URL);
      return response.data;
    },
  });

  const createQuestionnaire = useMutation({
    mutationFn: async (questionnaire) => {
      await axios.post(API_URL, questionnaire);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["questionnaires"] });
    },
  });

  const updateQuestionnaire = useMutation({
    mutationFn: async (questionnaire) => {
      await axios.put(`${API_URL}/${questionnaire.id}`, questionnaire);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["questionnaires"] });
    },
  });

  const deleteQuestionnaire = useMutation({
    mutationFn: async (id) => {
      await axios.delete(`${API_URL}/${id}`);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["questionnaires"] });
    },
  });

  return {
    data,
    isLoading,
    error,
    createQuestionnaire,
    updateQuestionnaire,
    deleteQuestionnaire,
  };
};
