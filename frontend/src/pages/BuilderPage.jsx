import React from "react";
import { Box } from "@mui/material";
import { useParams } from "react-router-dom";
import { useQuestionnaireBuilder } from "../hooks/useQuestionnaireBuilder";
import QuestionnaireForm from "../components/QuestionnaireForm";
import QuestionList from "../components/QuestionList";
import QuestionTypeSelector from "../components/QuestionTypeSelector";

const BuilderPage = () => {
  const { id } = useParams();
  const {
    form,
    questions,
    addQuestion,
    updateQuestion,
    deleteQuestion,
    moveQuestion,
  } = useQuestionnaireBuilder();

  return (
    <Box p={3}>
      <QuestionnaireForm form={form} isEditing={!!id} />
      <QuestionList
        questions={questions}
        updateQuestion={updateQuestion}
        deleteQuestion={deleteQuestion}
        moveQuestion={moveQuestion}
      />
      <QuestionTypeSelector onAddQuestion={addQuestion} />
    </Box>
  );
};

export default BuilderPage;
