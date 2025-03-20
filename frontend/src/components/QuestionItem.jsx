import React from "react";
import { TextField, Button, Box, IconButton } from "@mui/material";
import DeleteTwoToneIcon from "@mui/icons-material/DeleteTwoTone";

const QuestionItem = ({
  question,
  index,
  updateQuestion,
  deleteQuestion,
  onDragStart,
  onDrop,
}) => {
  const handleTextChange = (e) => {
    updateQuestion(index, { ...question, text: e.target.value });
  };

  const handleOptionChange = (optIdx, e) => {
    const newOptions = [...question.options];
    newOptions[optIdx] = e.target.value;
    updateQuestion(index, { ...question, options: newOptions });
  };

  const addOption = () => {
    updateQuestion(index, { ...question, options: [...question.options, ""] });
  };

  return (
    <Box
      draggable
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
          onChange={handleTextChange}
          label={`${question.type.charAt(0).toUpperCase()}${question.type.slice(
            1
          )} question`}
          sx={{ flexGrow: 0.95 }}
        />
        <IconButton onClick={() => deleteQuestion(index)}>
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
