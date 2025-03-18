import React from "react";
import { Grid2 as Grid, Typography } from "@mui/material";
import QuestionnaireCard from "./QuestionnaireCard";

const QuestionnaireList = ({ questionnaires, onDelete }) => {
  if (!questionnaires || questionnaires.length === 0) {
    return <Typography>No questionnaires available.</Typography>;
  }

  return (
    <Grid container spacing={3} sx={{ mt: 2 }}>
      {questionnaires.map((questionnaire) => (
        <Grid key={questionnaire.id}>
          <QuestionnaireCard
            questionnaire={questionnaire}
            onDelete={onDelete}
          />
        </Grid>
      ))}
    </Grid>
  );
};

export default QuestionnaireList;
