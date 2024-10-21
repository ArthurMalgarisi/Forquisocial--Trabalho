import React, { useState } from "react";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Grid from "@mui/material/Grid";
import { useDispatch, useSelector } from "react-redux";
import { SIGN_IN_CHANGE_VALUE } from "../../constants/actionTypes";
import { sendPasswordResetEmail } from "./actions";

const PasswordReset = ({ setResetPassword }) => {
  const dispatch = useDispatch();
  const { email, emailError } = useSelector((state) => state.signIn);
  const [emailSent, setEmailSent] = useState(false);

  const handleChangeValue = (value, property) => {
    dispatch({
      type: SIGN_IN_CHANGE_VALUE,
      property: property,
      payload: value,
    });
  };

  const handlePasswordReset = () => {
    if (email) {
      dispatch(sendPasswordResetEmail(email, setEmailSent));
    } else {
      dispatch({
        type: SIGN_IN_CHANGE_VALUE,
        property: "emailError",
        payload: "Preencha o e-mail",
      });
    }
  };

  return (
    <Grid container direction="column" spacing={2}>
      {emailSent ? (
        <Grid item>
          <h3>Email para resetar a senha foi enviado!</h3>
          <Button
            variant="text"
            size="small"
            onClick={() => setResetPassword(false)}
          >
            Voltar ao Login
          </Button>
        </Grid>
      ) : (
        <>
          <Grid item>
            <TextField
              value={email}
              label="E-mail*"
              fullWidth
              onChange={(event) =>
                handleChangeValue(event.target.value, "email")
              }
              error={Boolean(emailError)}
              helperText={emailError}
              variant="outlined"
            />
          </Grid>
          <Grid item sx={{ display: "flex", justifyContent: "center" }}>
            <Button
              variant="contained"
              size="large"
              onClick={handlePasswordReset}
              sx={{
                backgroundColor: "#3f51b5",
                color: "#ffffff",
                "&:hover": {
                  backgroundColor: "#1a237e",
                },
              }}
            >
              Enviar Link de Reset de Senha
            </Button>
          </Grid>
          <Grid item sx={{ display: "flex", justifyContent: "center" }}>
            <Button
              variant="text"
              size="small"
              onClick={() => setResetPassword(false)}
            >
              Voltar ao Login
            </Button>
          </Grid>
        </>
      )}
    </Grid>
  );
};

export default PasswordReset;
