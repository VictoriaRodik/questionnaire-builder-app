import React from "react";
import { Box } from "@mui/material";
import QuestionItem from "./QuestionItem";

const QuestionList = ({ questions, updateQuestion, deleteQuestion, moveQuestion }) => {
  const handleDragStart = (e, index) => {
    e.dataTransfer.setData("text/plain", index.toString());
  };

  const handleDragOver = (e) => e.preventDefault();

  const handleDrop = (e, dropIndex) => {
    e.preventDefault();
    const dragIndex = Number(e.dataTransfer.getData("text/plain"));
    if (dragIndex !== dropIndex) {
      moveQuestion(dragIndex, dropIndex);
    }
  };

  return (
    <Box mt={2} onDragOver={handleDragOver}>
      {questions.map((question, index) => (
        <QuestionItem
          key={index}
          question={question}
          index={index}
          updateQuestion={updateQuestion}
          deleteQuestion={deleteQuestion}
          onDragStart={handleDragStart}
          onDrop={handleDrop}
        />
      ))}
    </Box>
  );
};

export default QuestionList;
