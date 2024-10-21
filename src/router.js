import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Avisos from "./components/Avisos/Avisos";
import AtendimentosSetor from "./components/AtendimentosSetor/AtendimentosSetor";
import Home from "./components/Home/Home";
import Servicos from "./components/Servicos/Servicos";
import SignIn from "./components/SignIn/SignIn";
import SignUp from "./components/SignUp/SignUp";
import User from "./components/User/User";
import { Atendimento, UserProfile } from "./components";

const Router = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/atendimento" element={<Atendimento />} />
        <Route path="/avisos" element={<Avisos />} />
        <Route path="/servicos" element={<Servicos />} />
        <Route path="/atendimentoSetor" element={<AtendimentosSetor />} />
        <Route path="/login" element={<SignIn />} />
        <Route path="/cadastro" element={<SignUp />} />
        <Route path="/usuario" element={<User />} />
        <Route path="/perfil" element={<UserProfile />} />
      </Routes>
    </BrowserRouter>
  );
};

export default Router;
