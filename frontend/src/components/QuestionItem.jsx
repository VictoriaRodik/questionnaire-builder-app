import React from "react";
import { TextField, Button, Box, IconButton } from "@mui/material";
import DeleteTwoToneIcon from "@mui/icons-material/DeleteTwoTone";

const QuestionItem = ({
  question,
  index,
  setQuestions,
  onDragStart,
  onDrop,
  onDelete,
}) => {
  const handleQuestionTextChange = (e) => {
    setQuestions((prevQuestions) =>
      prevQuestions.map((q, i) =>
        i === index ? { ...q, text: e.target.value } : q
      )
    );
  };

  const handleOptionChange = (optIdx, e) => {
    setQuestions((prevQuestions) =>
      prevQuestions.map((q, i) =>
        i === index
          ? {
              ...q,
              options: q.options.map((opt, j) =>
                j === optIdx ? e.target.value : opt
              ),
            }
          : q
      )
    );
  };

  const addOption = () => {
    setQuestions((prevQuestions) =>
      prevQuestions.map((q, i) =>
        i === index ? { ...q, options: [...q.options, ""] } : q
      )
    );
  };

  return (
    <Box
      draggable
      role="listitem"
      tabIndex={0}
      onDragStart={(e) => onDragStart(e, index)}
      onDragOver={(e) => e.preventDefault()}
      onDrop={(e) => onDrop(e, index)}
      sx={{
        border: "1px solid #ccc",
        padding: 2,
        marginBottom: 2,
        backgroundColor: "#f9f9f9",
        cursor: "move",
      }}
    >
      <Box sx={{ display: "flex", justifyContent: "space-between" }}>
        <TextField
          value={question.text}
          onChange={handleQuestionTextChange}
          label="Question"
          sx={{ flexGrow: 0.95 }}
        />
        <IconButton onClick={() => onDelete(index)}>
          <DeleteTwoToneIcon />
        </IconButton>
      </Box>
      {question.type !== "text" && (
        <Box mt={1}>
          {question.options.map((opt, optIdx) => (
            <TextField
              key={optIdx}
              value={opt}
              onChange={(e) => handleOptionChange(optIdx, e)}
              label={`Option ${optIdx + 1}`}
              fullWidth
              sx={{ mt: 1 }}
            />
          ))}
          <Button onClick={addOption} sx={{ mt: 1 }}>
            Add Option
          </Button>
        </Box>
      )}
    </Box>
  );
};

export default QuestionItem;
