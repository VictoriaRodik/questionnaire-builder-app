import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import { AppBar, Toolbar, Typography, Container, Button } from '@mui/material';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import CatalogPage from './pages/CatalogPage';
import BuilderPage from './pages/BuilderPage';
import RunnerPage from './pages/RunnerPage';

const queryClient = new QueryClient();

export default function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <Router>
        <AppBar position="static">
          <Toolbar>
            <Typography variant="h6" sx={{ flexGrow: 1 }}>
              Questionnaire Builder
            </Typography>
            <Button color="inherit" component={Link} to="/">
              Catalog
            </Button>
            <Button color="inherit" component={Link} to="/create">
              Create
            </Button>
          </Toolbar>
        </AppBar>
        <Container maxWidth="lg" sx={{ mt: 4 }}>
          <Routes>
            <Route path="/" element={<CatalogPage />} />
            <Route path="/create" element={<BuilderPage />} />
            <Route path="/edit/:id" element={<BuilderPage />} />
            <Route path="/run/:id" element={<RunnerPage />} />
          </Routes>
        </Container>
      </Router>
    </QueryClientProvider>
  );
}