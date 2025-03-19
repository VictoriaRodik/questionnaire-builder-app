import React, { useState } from "react";
import { Select, MenuItem, FormControl, InputLabel, Box } from "@mui/material";

const QuestionTypeSelector = ({ onAddQuestion }) => {
  const [selectedType, setSelectedType] = useState("");

  const handleChange = (event) => {
    const value = event.target.value;
    setSelectedType(value);
    onAddQuestion(value);
  };

  return (
    <Box sx={{ minWidth: 120 }}>
      <FormControl fullWidth>
        <InputLabel id="select-label">Add Question</InputLabel>
        <Select
          labelId="select-label"
          id="select"
          value={selectedType}
          label="Add Question"
          onChange={handleChange}
          displayEmpty
        >
          <MenuItem value="text">Text</MenuItem>
          <MenuItem value="single">Single Choice</MenuItem>
          <MenuItem value="multiple">Multiple Choice</MenuItem>
        </Select>
      </FormControl>
    </Box>
  );
};

export default QuestionTypeSelector;
