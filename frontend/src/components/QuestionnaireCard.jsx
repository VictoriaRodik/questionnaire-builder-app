import React from "react";
import {
  Card,
  CardContent,
  Typography,
  Button,
  CardActions,
} from "@mui/material";
import { useNavigate } from "react-router-dom";

const QuestionnaireCard = ({ questionnaire, onDelete }) => {
  const navigate = useNavigate();

  const handleDelete = () => {
    if (window.confirm("Are you sure you want to delete this questionnaire?")) {
      onDelete(questionnaire.id);
    }
  };

  const questions =
    typeof questionnaire.questions === "string"
      ? JSON.parse(questionnaire.questions)
      : questionnaire.questions;

  return (
    <Card>
      <CardContent>
        <Typography variant="h6">{questionnaire.name}</Typography>
        <Typography>{questionnaire.description}</Typography>
        <Typography>Questions: {questions.length}</Typography>
        <Typography>Completions: {questionnaire.completions}</Typography>
      </CardContent>
      <CardActions>
        <Button onClick={() => navigate(`/edit/${questionnaire.id}`)}>
          Edit
        </Button>
        <Button onClick={() => navigate(`/run/${questionnaire.id}`)}>
          Run
        </Button>
        <Button color="error" onClick={handleDelete}>
          Delete
        </Button>
      </CardActions>
    </Card>
  );
};
export default QuestionnaireCard;
