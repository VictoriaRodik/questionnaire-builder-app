import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useForm } from "@tanstack/react-form";
import { useQuestionnaires } from "./useQuestionnaires";

export const useQuestionnaireBuilder = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { createQuestionnaire, updateQuestionnaire, data } =
    useQuestionnaires();
  const [questions, setQuestions] = useState([]);

  const form = useForm({
    defaultValues: { name: "", description: "" },
    onSubmit: async ({ value }) => {
      const questionnaire = { ...value, questions };
      if (id) {
        await updateQuestionnaire.mutateAsync({ id, ...questionnaire });
      } else {
        await createQuestionnaire.mutateAsync(questionnaire);
      }
      navigate("/");
    },
  });

  useEffect(() => {
    if (id && data) {
      const questionnaire = data.find((q) => q.id === Number(id));
      if (questionnaire) {
        form.setFieldValue("name", questionnaire.name);
        form.setFieldValue("description", questionnaire.description);
        try {
          setQuestions(
            typeof questionnaire.questions === "string"
              ? JSON.parse(questionnaire.questions)
              : questionnaire.questions || []
          );
        } catch (error) {
          console.error("Failed to parse questions:", error);
          setQuestions([]);
        }
      }
    }
  }, [id, data, form]);

  const addQuestion = (type) => {
    setQuestions((prev) => [
      ...prev,
      { type, text: "", options: type !== "text" ? [""] : [] },
    ]);
  };

  const updateQuestion = (index, updatedQuestion) => {
    setQuestions((prev) =>
      prev.map((q, i) => (i === index ? updatedQuestion : q))
    );
  };

  const deleteQuestion = (index) => {
    setQuestions((prev) => prev.filter((_, i) => i !== index));
  };

  const moveQuestion = (fromIndex, toIndex) => {
    setQuestions((prev) => {
      const updated = [...prev];
      const [movedItem] = updated.splice(fromIndex, 1);
      updated.splice(toIndex, 0, movedItem);
      return updated;
    });
  };

  return {
    form,
    questions,
    addQuestion,
    updateQuestion,
    deleteQuestion,
    moveQuestion,
  };
};
