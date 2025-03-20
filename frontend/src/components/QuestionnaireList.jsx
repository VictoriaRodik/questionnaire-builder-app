import React, { useState, useCallback, useMemo } from "react";
import { Grid2 as Grid, Typography } from "@mui/material";
import QuestionnaireCard from "./QuestionnaireCard";
import { useQuestionnaires } from "../hooks/useQuestionnaires";
import Sort from "./Sort";

const QuestionnaireList = () => {
  const {
    data: questionnaires,
    isLoading,
    error,
    deleteQuestionnaire,
  } = useQuestionnaires();

  const [sort, setSort] = useState("name");

  const handleDelete = useCallback(
    (id) => {
      if (
        window.confirm("Are you sure you want to delete this questionnaire?")
      ) {
        deleteQuestionnaire.mutate(id);
      }
    },
    [deleteQuestionnaire]
  );

  const handleSort = useCallback((e) => {
    setSort(e.target.value);
  }, []);

  const sortedQuestionnaires = useMemo(() => {
    if (!questionnaires) return [];

    return [...questionnaires].sort((a, b) => {
      if (sort === "name") {
        return a.name.localeCompare(b.name);
      } else if (sort === "questions") {
        return (b.questions.length || 0) - (a.questions.length || 0);
      } else if (sort === "completions") {
        return (b.completions || 0) - (a.completions || 0);
      }
      return 0;
    });
  }, [questionnaires, sort]);

  if (isLoading) {
    return <Typography>Loading...</Typography>;
  }

  if (error) {
    return <Typography>Error loading questionnaires</Typography>;
  }

  if (!sortedQuestionnaires || sortedQuestionnaires.length === 0) {
    return <Typography>No questionnaires available.</Typography>;
  }

  return (
    <>
      <Sort
        value={sort}
        onChange={handleSort}
        options={[
          { value: "name", label: "name" },
          { value: "questions", label: "amount of questions" },
          { value: "completions", label: "amount of completions" },
        ]}
      />
      <Grid container spacing={3} sx={{ mt: 4 }}>
        {sortedQuestionnaires.map((questionnaire) => (
          <Grid key={questionnaire.id} size={{ xs: 12, sm: 6, md: 4 }}>
            <QuestionnaireCard
              questionnaire={questionnaire}
              onDelete={handleDelete}
            />
          </Grid>
        ))}
      </Grid>
    </>
  );
};

export default QuestionnaireList;
