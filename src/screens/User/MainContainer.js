import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AppBar, Toolbar, Typography, Box, Grid, IconButton, Menu, MenuItem, Drawer, List, Divider, ListItem, ListItemText, Button } from "@mui/material";
import LogoutIcon from "@mui/icons-material/Logout";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import MenuIcon from "@mui/icons-material/Menu";
import { Link, useNavigate } from "react-router-dom";
import { logOff } from "../User/actions";
import Avisos from "../../components/Avisos/Avisos";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { User, Home, Servicos, UserProfile, Atendimento, AtendimentosSetor } from "../../components";

function MainContainer() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [screen, setScreen] = useState("home");

  const handleLogOff = () => {
    dispatch(logOff());
  };

  const [anchorEl, setAnchorEl] = useState(null);
  const [mobileOpen, setMobileOpen] = useState(false);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };
  
  const userData = useSelector((state) => state.appReducer.user);
  const isAdm = userData?.accessControl?.adm;
  const readyOnly = userData?.accessControl?.readyOnly;
  const user = userData;

  const drawer = (
    <div>
      <List>
        <ListItem button onClick={() => { navigate("/"); setScreen("home"); handleDrawerToggle(); }}>
          <ListItemText primary="Home" />
        </ListItem>
        <ListItem button onClick={() => { navigate("/atendimento"); setScreen("atendimento"); handleDrawerToggle(); }}>
          <ListItemText primary="Atendimento" />
        </ListItem>
        <ListItem button onClick={() => { navigate("/servicos"); setScreen("servico"); handleDrawerToggle(); }}>
          <ListItemText primary="Serviços" />
        </ListItem>
        <ListItem button onClick={() => { navigate("/avisos"); setScreen("avisos"); handleDrawerToggle(); }}>
          <ListItemText primary="Avisos" />
        </ListItem>
        {isAdm && (
          <ListItem button onClick={() => { navigate("/usuario"); setScreen("user"); handleDrawerToggle(); }}>
            <ListItemText primary="Usuário" />
          </ListItem>
        )}
      </List>
    </div>
  );

  return (
    <Box sx={{ display: "flex", flexDirection: "column", height: "100vh" }}>
      <AppBar position="fixed">
        <Toolbar sx={{ display: "flex", justifyContent: "space-between", position: "relative" }}>
          <IconButton sx={{ color: "#fff", display: { xs: "block", md: "none" } }} onClick={handleDrawerToggle}>
            <MenuIcon />
          </IconButton>
          <Grid container spacing={2} alignItems="center" sx={{ display: { xs: "none", md: "flex" } }}>
            <Grid item>
              <Button
                component={Link}
                sx={{ color: "#fff" }}
                to="/"
                variant="text"
                className={screen === "home" ? "homeButton active" : "homeButton"}
                onClick={() => { navigate("/"); setScreen("home"); }}
              >
                Home
              </Button>
            </Grid>
            <Grid item>
              <Button
                component={Link}
                sx={{ color: "#fff" }}
                to="/atendimento"
                variant="text"
                className={screen === "atendimento" ? "atendimentoButton active" : "atendimentoButton"}
                onClick={() => { navigate("/atendimento"); setScreen("atendimento"); }}
              >
                Atendimento
              </Button>
            </Grid>
            <Grid item>
              <Button
                component={Link}
                sx={{ color: "#fff" }}
                to="/servicos"
                variant="text"
                className={screen === "servico" ? "servicoButton active" : "servicoButton"}
                onClick={() => { navigate("/servicos"); setScreen("servico"); }}
              >
                Serviços
              </Button>
            </Grid>
            <Grid item>
              <Button
                component={Link}
                sx={{ color: "#fff" }}
                to="/avisos"
                variant="text"
                className={screen === "avisos" ? "avisosButton active" : "avisosButton"}
                onClick={() => { navigate("/avisos"); setScreen("avisos"); }}
              >
                Avisos
              </Button>
            </Grid>
            {isAdm && (
              <Grid item>
                <Button
                  component={Link}
                  to="/usuario"
                  sx={{ color: "#fff" }}
                  variant="text"
                  className={screen === "user" ? "userButton active" : "userButton"}
                  onClick={() => { navigate("/usuario"); setScreen("user"); }}
                >
                  Usuário
                </Button>
              </Grid>
            )}
          </Grid>

          <Typography
            variant="h6"
            sx={{
              position: "absolute",
              left: "50%",
              transform: "translateX(-50%)",
              whiteSpace: "nowrap",
            }}
          >
            ForquiSocial
          </Typography>

          {isAdm || readyOnly ? (
            <Box
              sx={{
                display: { xs: "none", md: "flex" },
                alignItems: "start",
              }}
            >
              <Button
                aria-controls="simple-menu"
                aria-haspopup="true"
                onClick={handleClick}
                sx={{
                  color: "#fff",
                  justifyContent: "flex-start",
                  textTransform: "none",
                }}
              >
                <Typography
                  variant="inherit"
                  sx={{
                    color: "#fff",
                    display: "flex",
                    alignItems: "center",
                  }}
                >
                  {user?.name}<ExpandMoreIcon sx={{ marginRight: 1 }} />
                </Typography>
              </Button>
              <Menu
                id="simple-menu"
                anchorEl={anchorEl}
                keepMounted
                open={Boolean(anchorEl)}
                onClose={handleClose}
                anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
                transformOrigin={{ vertical: "top", horizontal: "right" }}
              >
                <MenuItem
                  component={Link}
                  to="/atendimentoSetor"
                  onClick={() => {
                    setScreen("atendimento-setor");
                    handleClose();
                  }}
                >
                  Atendimentos
                </MenuItem>
                <MenuItem
                  component={Link}
                  to="/perfil"
                  onClick={() => {
                    setScreen("perfil");
                    handleClose();
                  }}
                >
                  Perfil
                </MenuItem>
                <MenuItem onClick={handleLogOff}>
                  Sair
                  <LogoutIcon
                    fontSize="inherit"
                    sx={{ marginLeft: 1, fontSize: 16 }}
                  />
                </MenuItem>
              </Menu>
            </Box>
          ) : null}
        </Toolbar>
      </AppBar>

        <nav>
          <Drawer
            variant="temporary"
            open={mobileOpen}
            onClose={handleDrawerToggle}
            ModalProps={{
              keepMounted: true,
            }}
            sx={{
              display: { xs: "block", md: "none" },
              "& .MuiDrawer-paper": { boxSizing: "border-box", width: 240 },
            }}
          >
            {drawer}
            <Divider />
            <List>
              <ListItem
                button
                component={Link}
                to="/atendimentoSetor"
                onClick={() => {
                  setScreen("atendimento-setor");
                  handleDrawerToggle();
                }}
              >
                <ListItemText primary="Atendimentos" />
              </ListItem>
            </List>
            <List>
              <ListItem
                button
                component={Link}
                to="/perfil"

                onClick={() => {
                  setScreen("perfil");
                  handleDrawerToggle();
                }}
              >
                <ListItemText primary="Meu Perfil" />
              </ListItem>
            </List>
            <List>
              <ListItem button onClick={handleLogOff}>
                <ListItemText primary="Sair" />
              </ListItem>
            </List>
          </Drawer>
        </nav>

        <Box
          sx={{
            display: "flex",
            flexDirection: "row",
            flex: 1,
            marginTop: "64px",
            overflow: "hidden",
          }}
        >
          <Box
            sx={{
              flex: 1,
              backgroundColor: "#f5f5f5",
              minHeight: "100vh",
              p: 2,
              justifyContent: "center",
              display: "flex",
              overflowY: "auto",
              transition: "background-color 0.3s ease-in-out",
              "&:hover": {
                backgroundColor: "#e0e0e0",
              },
            }}
          >
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/atendimento" element={<Atendimento />} />
              <Route path="/avisos" element={<Avisos />} />
              <Route path="/atendimentoSetor" element={<AtendimentosSetor />} />
              <Route path="/perfil" element={<UserProfile />} />
              <Route path="/usuario" element={<User />} />
              <Route path="/servicos" element={<Servicos />} />
            </Routes>
          </Box>
        </Box>
      </Box>
  );
}

export default MainContainer;
