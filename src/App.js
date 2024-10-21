import React, { useEffect, useState } from 'react';
import { useDispatch } from "react-redux";
import { BrowserRouter as Router, Routes, Route, useNavigate } from 'react-router-dom';
import { CircularProgress, Grid, Typography } from '@mui/material';
import { firebase } from './utils';
import { loadUserData } from './screens/User/actions';
import MainContainer from './screens/User/MainContainer';
import AuthContainer from './screens/Auth/AuthContainer';

function App() {
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const authListener = firebase.auth.onAuthStateChanged(user => {
      if (user) {
        dispatch(loadUserData(user, navigate)); // Pass navigate to loadUserData
      }
      setLoading(false);
    });

    return () => {
      authListener();
    };
  }, [dispatch, navigate]);

  if (loading) {
    return (
      <Grid container justifyContent="center" alignItems="center" style={{ height: "100vh" }}>
        <Grid item style={{ textAlign: "center" }}>
          <CircularProgress size={60} thickness={4} />
          <Typography variant="h5" style={{ marginTop: 20 }}>Carregando...</Typography>
        </Grid>
      </Grid>
    );
  }

  return (
    <Routes>
      <Route path="/login" element={<AuthContainer initialScreen="login" />} />
      <Route path="/cadastro" element={<AuthContainer initialScreen="cadastro" />} />
      <Route path="*" element={<MainContainer />} />
    </Routes>
  );
}

function AppWrapper() {
  return (
    <Router>
      <App />
    </Router>
  );
}

export default AppWrapper;
