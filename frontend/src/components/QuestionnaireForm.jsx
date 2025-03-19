import React from "react";
import { TextField, Button, Box } from "@mui/material";

const QuestionnaireForm = ({ form, isEditing }) => {
  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
      }}
    >
      {form.Field({
        name: "name",
        children: (field) => (
          <TextField
            value={field.state.value}
            onChange={(e) => field.handleChange(e.target.value)}
            onBlur={field.handleBlur}
            label="Name"
          />
        ),
      })}
      {form.Field({
        name: "description",
        children: (field) => (
          <TextField
            value={field.state.value}
            onChange={(e) => field.handleChange(e.target.value)}
            onBlur={field.handleBlur}
            label="Description"
            sx={{ flexGrow: 0.9 }}
          />
        ),
      })}
      <Button onClick={form.handleSubmit} variant="contained">
        {isEditing ? "Update" : "Submit"}
      </Button>
    </Box>
  );
};

export default QuestionnaireForm;
