import React from "react";
import { useQuestionnaires } from "../hooks/useQuestionnaires";
import { Pagination, Box, Typography } from "@mui/material";
import QuestionnaireList from "../components/QuestionnaireList";

const CatalogPage = () => {
  const [page, setPage] = React.useState(1);
  const { data, isLoading, error } = useQuestionnaires();

  const itemsPerPage = 10;
  const paginatedData = data
    ? data.slice((page - 1) * itemsPerPage, page * itemsPerPage)
    : [];

  if (error) {
    return (
      <Typography color="error">
        Error loading questionnaires: {error.message}
      </Typography>
    );
  }

  return (
    <Box p={3}>
      <Typography variant="h4">Questionnaire Catalog</Typography>
      {isLoading ? (
        <Typography>Loading...</Typography>
      ) : (
        <>
          <QuestionnaireList questionnaires={paginatedData} />
          <Pagination
            count={data ? Math.ceil(data.length / itemsPerPage) : 0}
            page={page}
            onChange={(e, value) => setPage(value)}
            sx={{ mt: 2 }}
          />
        </>
      )}
    </Box>
  );
};
export default CatalogPage;
