import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Grid from "@mui/material/Grid";
import { useDispatch, useSelector } from "react-redux";
import { signUp } from "./actions";
import {
  SIGN_UP_CHANGE_EMAIL,
  SIGN_UP_CHANGE_NAME,
  SIGN_UP_CHANGE_PASSWORD,
  SIGN_UP_CHANGE_PHONE,
  SIGN_UP_CHANGE_JOB_TITLE,
  SIGN_UP_CHANGE_DATANASCIMENTO,
  SIGN_UP_CHANGE_ORGAO,
  SIGN_UP_CHANGE_CPF,
  SIGN_UP_CHANGE_CONFIRMPASSWORD,
} from "../../constants/actionTypes";
import 'react-toastify/dist/ReactToastify.css';
import { MenuItem, Select } from "@mui/material";
import IconButton from '@mui/material/IconButton';
import InputAdornment from '@mui/material/InputAdornment';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';

const SignUp = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();  // Hook do React Router para navegação
  const [setor, setSetor] = useState("");
  const [errors, setErrors] = useState({
    name: "",
    email: "",
    phone: "",
    password: "",
    dataNascimento: "",
    orgao: "",
    cpf: "",
    confirmPassword: "",
    jobTitle: "",
  });
  const { name, nameError, email, emailError, phone, phoneError, password, passwordError, confirmPassword, confirmPasswordError, jobTitle, jobTitleError, orgao, orgaoError, cpf, cpfError, dataNascimento, dataNascimentoError} = useSelector(state => state.signUp);

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const handleChange = (field, value) => {
    dispatch({ type: field, payload: value });
    setErrors({
      ...errors,
      [field]: value.trim() === "" ? "Campo obrigatório" : "",
    });
  };

  const handleRegister = () => {
    dispatch(signUp(navigate));  // Passando navigate para a ação signUp
  };

  const handleClickShowPassword = () => {
    setShowPassword(!showPassword);
  };

  const handleClickShowConfirmPassword = () => {
    setShowConfirmPassword(!showConfirmPassword);
  };

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  const setoresOptions = ["Cras", "Creas", "Família Acolhedora", "Habitação"]; // Opções para o menu de setores

  return (
    <>
      <Grid
        container
        direction="column"
        rowSpacing={2}
        spacing={2}
        className="signUpContainer"
      >
        <Grid item container spacing={2}>
          <Grid item xs={12} sm={12}>
            <TextField
              label="Nome Completo*"
              fullWidth
              onChange={(event) =>
                handleChange(SIGN_UP_CHANGE_NAME, event.target.value)
              }
              error={Boolean(nameError)}
              helperText={nameError}
            />
          </Grid>
        </Grid>
        <Grid item container spacing={2}>
          <Grid item xs={12} sm={4}>
            <TextField
              label="Data de Nascimento*"
              type="text"
              fullWidth
              onChange={(event) => {
                const input = event.target.value;
                const maxLength = 10;
                const regex = /[^0-9]/g; // Para permitir apenas números

                // Remove caracteres não numéricos
                let formattedInput = input.replace(regex, "");

                // Insere as barras automaticamente
                if (
                  formattedInput.length > 2 &&
                  formattedInput.charAt(2) !== "/"
                ) {
                  formattedInput =
                    formattedInput.slice(0, 2) + "/" + formattedInput.slice(2);
                }
                if (
                  formattedInput.length > 5 &&
                  formattedInput.charAt(5) !== "/"
                ) {
                  formattedInput =
                    formattedInput.slice(0, 5) + "/" + formattedInput.slice(5);
                }

                // Limita o comprimento máximo da data
                formattedInput = formattedInput.slice(0, maxLength);

                // Atualiza o valor no campo
                event.target.value = formattedInput;

                // Chama a função de handleChange passando a data formatada
                handleChange(SIGN_UP_CHANGE_DATANASCIMENTO, formattedInput);
              }}
              error={Boolean(dataNascimentoError)}
              helperText={dataNascimentoError}
            />
          </Grid>

          <Grid item xs={12} sm={4}>
            <TextField
              label="CPF*"
              type="text"
              fullWidth
              onChange={(event) => {
                const input = event.target.value;
                const maxLength = 14; // Comprimento máximo do CPF
                const regex = /[^0-9]/g; // Para permitir apenas números

                // Remove caracteres não numéricos
                let formattedInput = input.replace(regex, "");

                // Insere os pontos e o traço automaticamente
                if (
                  formattedInput.length > 3 &&
                  formattedInput.charAt(3) !== "."
                ) {
                  formattedInput =
                    formattedInput.slice(0, 3) + "." + formattedInput.slice(3);
                }
                if (
                  formattedInput.length > 7 &&
                  formattedInput.charAt(7) !== "."
                ) {
                  formattedInput =
                    formattedInput.slice(0, 7) + "." + formattedInput.slice(7);
                }
                if (
                  formattedInput.length > 11 &&
                  formattedInput.charAt(11) !== "-"
                ) {
                  formattedInput =
                    formattedInput.slice(0, 11) +
                    "-" +
                    formattedInput.slice(11);
                }

                // Limita o comprimento máximo do CPF
                formattedInput = formattedInput.slice(0, maxLength);

                // Atualiza o valor no campo
                event.target.value = formattedInput;

                // Chama a função de handleChange passando o CPF formatado
                handleChange(SIGN_UP_CHANGE_CPF, formattedInput);
              }}
              error={Boolean(cpfError)}
              helperText={cpfError}
            />
          </Grid>
          <Grid item xs={12} sm={4}>
            <TextField
              label="Telefone*"
              fullWidth
              onChange={(event) => {
                const input = event.target.value;
                const maxLength = 15; // Comprimento máximo do número de telefone
                const regex = /[^0-9]/g; // Para permitir apenas números

                // Remove caracteres não numéricos
                let formattedInput = input.replace(regex, "");

                // Insere os parênteses, espaço e o traço automaticamente
                if (
                  formattedInput.length > 0 &&
                  formattedInput.charAt(0) !== "("
                ) {
                  formattedInput = "(" + formattedInput;
                }
                if (
                  formattedInput.length > 3 &&
                  formattedInput.charAt(3) !== ")"
                ) {
                  formattedInput =
                    formattedInput.slice(0, 3) + ")" + formattedInput.slice(3);
                }
                if (
                  formattedInput.length > 4 &&
                  formattedInput.charAt(4) !== " "
                ) {
                  formattedInput =
                    formattedInput.slice(0, 4) + " " + formattedInput.slice(4);
                }
                if (
                  formattedInput.length > 10 &&
                  formattedInput.charAt(10) !== "-"
                ) {
                  formattedInput =
                    formattedInput.slice(0, 10) +
                    "-" +
                    formattedInput.slice(10);
                }

                // Limita o comprimento máximo do número de telefone
                formattedInput = formattedInput.slice(0, maxLength);

                // Atualiza o valor no campo
                event.target.value = formattedInput;

                // Chama a função de handleChange passando o número de telefone formatado
                handleChange(SIGN_UP_CHANGE_PHONE, formattedInput);
              }}
              error={Boolean(phoneError)}
              helperText={phoneError}
            />
          </Grid>
        </Grid>
        <Grid item container spacing={2}>
          <Grid item xs={12} sm={6}>
            <TextField
              label="E-mail*"
              type="email"
              fullWidth
              onChange={(event) =>
                handleChange(SIGN_UP_CHANGE_EMAIL, event.target.value)
              }
              error={Boolean(emailError)}
              helperText={emailError}
            />
          </Grid>

          <Grid item xs={12} sm={3}>
            <Select
              fullWidth
              error={Boolean(orgaoError)}
              value={orgao}
              onChange={(e) => handleChange(SIGN_UP_CHANGE_ORGAO, e.target.value)}
              displayEmpty
              placeholder="Setor"
            >
              <MenuItem value="" disabled>
                Setor
              </MenuItem>
              {setoresOptions.map((option, index) => (
                <MenuItem key={index} value={option}>
                  {option}
                </MenuItem>
              ))}
            </Select>
          </Grid>

          <Grid item xs={12} sm={3}>
            <TextField
              label="Cargo*"
              fullWidth
              onChange={(event) =>
                handleChange(SIGN_UP_CHANGE_JOB_TITLE, event.target.value)
              }
              error={Boolean(jobTitleError)}
              helperText={jobTitleError}
            />
          </Grid>
        </Grid>
        <Grid item container spacing={2}>
          <Grid item xs={12} sm={6}>
            <TextField
              label="Senha*"
              type={showPassword ? 'text' : 'password'}
              fullWidth
              onChange={(event) =>
                handleChange(SIGN_UP_CHANGE_PASSWORD, event.target.value)
              }
              error={Boolean(passwordError)}
              helperText={passwordError}
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
          <Grid item xs={12} sm={6}>
            <TextField
              label="Confirmar Senha*"
              type={showConfirmPassword ? 'text' : 'password'}
              fullWidth
              onChange={(event) =>
                handleChange(SIGN_UP_CHANGE_CONFIRMPASSWORD, event.target.value)
              }
              error={Boolean(confirmPasswordError)}
              helperText={confirmPasswordError}
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton
                      aria-label="toggle confirm password visibility"
                      onClick={handleClickShowConfirmPassword}
                      onMouseDown={handleMouseDownPassword}
                      edge="end"
                    >
                      {showConfirmPassword ? <VisibilityOff /> : <Visibility />}
                    </IconButton>
                  </InputAdornment>
                ),
              }}
            />
          </Grid>
        </Grid>
        <Grid item sx={{ display: "flex", justifyContent: "space-evenly" }}>
          <Button
            variant="contained"
            size="large"
            onClick={handleRegister}
            sx={{
              backgroundColor: "#3f51b5",
              color: "#ffffff",
              "&:hover": {
                backgroundColor: "#1a237e" /* Alterando a cor no hover */,
              },
            }}
          >
            Cadastrar
          </Button>
        </Grid>
      </Grid>
    </>
  );
};

export default SignUp;
