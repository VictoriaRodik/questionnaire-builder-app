import React, { useCallback } from "react";
import { Grid2 as Grid, Typography } from "@mui/material";
import QuestionnaireCard from "./QuestionnaireCard";
import { useQuestionnaires } from "../hooks/useQuestionnaires";

const QuestionnaireList = () => {
  const { data: questionnaires, isLoading, error, deleteQuestionnaire } = useQuestionnaires();

  const handleDelete = useCallback((id) => {
    if (window.confirm("Are you sure you want to delete this questionnaire?")) {
      deleteQuestionnaire.mutate(id);
    }
    
  },[deleteQuestionnaire])

  if (isLoading) {
    return <Typography>Loading...</Typography>;
  }

  if (error) {
    return <Typography>Error loading questionnaires</Typography>;
  }

  if (!questionnaires || questionnaires.length === 0) {
    return <Typography>No questionnaires available.</Typography>;
  }

  return (
    <Grid container spacing={3} sx={{ mt: 2 }}>
      {questionnaires.map((questionnaire) => (
        <Grid key={questionnaire.id}>
          <QuestionnaireCard
            questionnaire={questionnaire}
            onDelete={handleDelete}
          />
        </Grid>
      ))}
    </Grid>
  );
};

export default QuestionnaireList;
