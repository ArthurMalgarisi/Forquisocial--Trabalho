import React, { useState, useEffect } from 'react';
import { SignIn, SignUp } from '../../components';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import './AuthContainer.css';
import { ToastContainer } from 'react-toastify';
import { useNavigate, useLocation } from 'react-router-dom';

function AuthContainer({ initialScreen }) {
  const [screen, setScreen] = useState(initialScreen);
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    if (location.pathname === '/login') {
      setScreen('login');
    } else if (location.pathname === '/cadastro') {
      setScreen('cadastro');
    }
  }, [location.pathname]);

  return (
    <Box className="auth-container">
      <ToastContainer />
      <Box className="auth-inner-container">
        <Typography fontFamily="monospace" variant="h4" className="auth-title">
          ForquiSocial
        </Typography>
        <Box className="auth-toggle-buttons" sx={{ display: 'flex', justifyContent: 'center', marginTop: '3%' }}>
          <Button
            className={screen === 'login' ? "loginButton active" : "loginButton"}
            variant="contained"
            size='small'
            onClick={() => { navigate("/login"); setScreen('login')}}
          >
            Login
          </Button>
          <Button
            className={screen === 'cadastro' ? "signupButton active" : "signupButton"}
            variant="contained"
            size='small'
            onClick={() => { navigate("/cadastro"); setScreen('cadastro')}}
          >
            Cadastro
          </Button>
        </Box>
        {screen === 'cadastro' ? <SignUp /> : null}
        {screen === 'login' ? <SignIn /> : null}
      </Box>
    </Box>
  );
}

export default AuthContainer;
