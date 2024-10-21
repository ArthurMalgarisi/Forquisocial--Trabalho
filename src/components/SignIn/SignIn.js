import React, { useState } from 'react';
import TextField from "@mui/material/TextField";
import { useDispatch, useSelector } from "react-redux";
import Button from '@mui/material/Button';
import { signIn } from './actions';
import Grid from "@mui/material/Grid";
import './SignIn.css';
import PasswordReset from './PasswordReset ';
import { SIGN_IN_CHANGE_VALUE } from '../../constants/actionTypes';
import { IconButton, InputAdornment } from '@mui/material';
import { Visibility, VisibilityOff } from '@mui/icons-material';

const SignIn = () => {
    const dispatch = useDispatch();
    const { email, emailError, password, passwordError, generalError, loading } = useSelector(state => state.signIn);
    const [resetPassword, setResetPassword] = useState(false);

    const [showPassword, setShowPassword] = useState(false);

    const handleChangeValue = (value, property) => {
        dispatch({ type: SIGN_IN_CHANGE_VALUE, property: property, payload: value });
    }

    const handleMouseDownPassword = (event) => {
        event.preventDefault();
    };

    const handleClickShowPassword = () => {
        setShowPassword(!showPassword);
    };

    const handleLogin = () => {
        dispatch(signIn());
    }

    return (
        <Grid container direction='column' spacing={2}>
            {!resetPassword ? (
                <>
                    <Grid item>
                        <TextField
                            value={email}
                            label='E-mail*'
                            fullWidth
                            onChange={event => handleChangeValue(event.target.value, "email")}
                            error={Boolean(emailError)}
                            helperText={emailError}
                            variant="outlined"
                        />
                    </Grid>
                    <Grid item>
                        <TextField
                            value={password}
                            label='Senha*'
                            fullWidth
                            type={showPassword ? 'text' : 'password'}
                            onChange={event => handleChangeValue(event.target.value, "password")}
                            error={Boolean(passwordError)}
                            helperText={passwordError}
                            variant="outlined"
                            InputProps={{
                                endAdornment: (
                                  <InputAdornment position="end">
                                    <IconButton
                                      aria-label="toggle password visibility"
                                      onClick={handleClickShowPassword}
                                      onMouseDown={handleMouseDownPassword}
                                      edge="end"
                                    >
                                      {showPassword ? <VisibilityOff /> : <Visibility />}
                                    </IconButton>
                                  </InputAdornment>
                                ),
                              }}
                        />
                    </Grid>
                    {generalError && (
                        <Grid item>
                            <p style={{ color: 'red' }}>{generalError}</p>
                        </Grid>
                    )}
                    <Grid item sx={{ display: "flex", justifyContent: 'center' }}>
                        <Button
                            variant="contained"
                            size='large'
                            onClick={handleLogin}
                            disabled={loading}
                            sx={{
                                backgroundColor: '#3f51b5',
                                color: '#ffffff',
                                '&:hover': {
                                    backgroundColor: '#1a237e',
                                }
                            }}
                        >
                            {loading ? 'Carregando...' : 'Logar'}
                        </Button>
                    </Grid>
                    <Grid item sx={{ display: "flex", justifyContent: 'center' }}>
                        <Button
                            variant="text"
                            size='small'
                            onClick={() => setResetPassword(true)}
                        >
                            Esqueceu sua senha?
                        </Button>
                    </Grid>
                </>
            ) : (
                <PasswordReset setResetPassword={setResetPassword} />
            )}
        </Grid>
    )
}

export default SignIn;
