/* eslint-disable jsx-a11y/anchor-is-valid */
import React from "react";
import { Typography, Container, Box, Grid, Button } from "@mui/material";
import { Div } from "..";
import "./Home.css";
import LocationOnIcon from "@material-ui/icons/LocationOn";
import InstagramIcon from "@material-ui/icons/Instagram";
import FacebookIcon from "@material-ui/icons/Facebook";
import WhatsAppIcon from "@material-ui/icons/WhatsApp";

const Home = () => {
  return (
    <div className="home-container">
      <div className="welcome-container">
        <Div elevation={6} className="servico-paper">
          <Typography variant="h1" className="text-center mb-4">
            Bem-vindo ao ForquiSocial
          </Typography>
          <Typography variant="body1" className="text-center mb-4">
            Colocar uma Descrição
          </Typography>
        </Div>
      </div>
      <Container>
        <Grid container spacing={4} className="home-grid">
          <Grid item xs={12} className="home-item-grid">
            <Grid elevation={3} className="home-item" style={{ padding: "20px", backgroundColor: "#FFFFFF", color: "#000000" }}>
              <Typography variant="h6">Prefeitura de Forquilhinha</Typography>
              <Grid style={{ marginTop: "1.5rem" }}>
                <Typography>
                  A Prefeitura Municipal de [Nome da Cidade] é a principal
                  autoridade administrativa local responsável por fornecer uma
                  variedade de serviços e recursos essenciais para os residentes
                  da cidade. Seu papel abrange desde a gestão de infraestrutura
                  urbana até o desenvolvimento econômico e social da comunidade.
                </Typography>
                <Typography>
                  Como centro de governo local, a prefeitura desempenha diversas
                  funções, incluindo a prestação de serviços públicos, como
                  saúde, educação, transporte, coleta de resíduos e segurança
                  pública. Além disso, ela é responsável por regulamentar
                  questões urbanas, como zoneamento, licenciamento comercial e
                  planejamento urbano.
                </Typography>
                <Typography>
                  A prefeitura também serve como ponto de contato para os
                  cidadãos interagirem com o governo local, seja para solicitar
                  serviços, relatar problemas comunitários ou participar do
                  processo democrático por meio de eleições e consultas
                  públicas.
                </Typography>
                <Typography>
                  Por meio do seu website e outros canais de comunicação, a
                  Prefeitura Municipal de [Nome da Cidade] busca promover a
                  transparência, a participação cívica e o engajamento da
                  comunidade, fornecendo informações atualizadas, oportunidades
                  de envolvimento e acesso fácil aos serviços municipais.
                </Typography>
                <Typography>
                  No cerne de suas operações, a prefeitura está comprometida em
                  servir e melhorar a qualidade de vida de todos os residentes,
                  trabalhando em colaboração com parceiros locais, empresas e
                  organizações da sociedade civil para construir uma cidade mais
                  inclusiva, próspera e sustentável.
                </Typography>
              </Grid>
              <Grid direction="column" style={{ marginTop: "1rem" }}>
                <Typography
                  variant="body2"
                  style={{
                    marginTop: "1rem",
                    display: "flex",
                    justifyContent: "flex-end",
                  }}
                >
                  <Button>
                    <a
                      style={{ color: "gray", textDecoration: "none" }}
                      href="#"
                      onClick={() =>
                        window.open(
                          "https://www.google.com.br/maps/place/Av.+25+de+Julho,+3400+-+Centro,+Forquilhinha+-+SC,+88850-000/@-28.7534547,-49.4756197,17z/data=!3m1!4b1!4m6!3m5!1s0x95218426c34bdf47:0x3fddaf8ddd45fc1e!8m2!3d-28.7534547!4d-49.4730448!16s%2Fg%2F11h2d4pl5z?entry=ttu"
                        )
                      }
                    >
                      <LocationOnIcon /> Av. 25 de Julho, 3400 - Centro,
                      Forquilhinha - SC, 88850-000
                    </a>
                  </Button>
                  <div style={{ marginLeft: "auto", display: "flex" }}>
                    <a style={{ marginRight: "0.5rem" }}>
                      <InstagramIcon />
                    </a>
                    <a style={{ marginRight: "0.5rem" }}>
                      <FacebookIcon />
                    </a>
                    <a>
                      <WhatsAppIcon />
                    </a>
                  </div>
                </Typography>
              </Grid>
            </Grid>
          </Grid>
          <Grid item xs={12} className="home-item-grid">
            <Grid elevation={3} className="home-item" style={{ padding: "20px", backgroundColor: "#FFFFFF", color: "#000000" }}>
              <Typography variant="h6">Cras</Typography>
              <Grid style={{ marginTop: "1.5rem" }}>
                <Typography>
                  O Centro de Referência de Assistência Social (CRAS) de [Nome
                  da Cidade] é uma instituição fundamental para o suporte e
                  assistência social da comunidade local. Como parte integrante
                  da rede de proteção social, o CRAS desempenha um papel central
                  na promoção do bem-estar e na melhoria da qualidade de vida
                  dos cidadãos.
                </Typography>
                <Typography>
                  O CRAS oferece uma variedade de serviços e programas
                  essenciais, incluindo apoio psicossocial, orientação familiar,
                  acompanhamento de casos, distribuição de benefícios sociais,
                  como o Bolsa Família, e encaminhamento para outros serviços e
                  recursos da rede socioassistencial.
                </Typography>
                <Typography>
                  Além disso, o CRAS é um espaço acolhedor e acessível onde os
                  indivíduos e famílias podem buscar ajuda em momentos de
                  dificuldade, seja por questões financeiras, emocionais ou
                  sociais. Por meio de atividades e oficinas, o CRAS também
                  promove o fortalecimento de vínculos familiares e
                  comunitários, incentivando a participação ativa e o
                  desenvolvimento pessoal.
                </Typography>
                <Typography>
                  Como ponto de referência para a assistência social, o CRAS
                  desempenha um papel vital na identificação e atendimento das
                  necessidades da comunidade, trabalhando em estreita
                  colaboração com outras instituições e órgãos governamentais
                  para garantir uma resposta eficaz e abrangente às demandas
                  locais.
                </Typography>
              </Grid>
              <Grid direction="column" style={{ marginTop: "1rem" }}>
                <Typography
                  variant="body2"
                  style={{
                    marginTop: "1rem",
                    display: "flex",
                    justifyContent: "flex-end",
                  }}
                >
                  <Button>
                    <a
                      style={{ color: "gray", textDecoration: "none" }}
                      href="#"
                      onClick={() =>
                        window.open(
                          "https://www.google.com.br/maps/search/+Rua+Jo%C3%A3o+Pedro+Saturno,+293+-+Saturno,+Av.+Prof.+Eurico+Back,+N%C2%B0+1661+-+Saturno,+Forquilhinha+-+SC,+88850-000/@-28.7451754,-49.464176,17.25z?entry=ttu"
                        )
                      }
                    >
                      <LocationOnIcon />
                      Rua João Pedro Saturno, 293 - Saturno, Av. Prof. Eurico
                      Back, N° 1661 - Saturno, Forquilhinha - SC, 88850-00
                    </a>
                  </Button>
                  <div style={{ marginLeft: "auto", display: "flex", cursor: "pointer" }}>
                    <a style={{ marginRight: "0.5rem" }} onClick={() => window.open("https://www.instagram.com/crasforquilhinhasc/")}>
                      <InstagramIcon />
                    </a>
                    <a style={{ marginRight: "0.5rem" }} onClick={() => window.open("https://www.facebook.com/crasforquilhinha/?locale=pt_BR")}>
                      <FacebookIcon />
                    </a>
                    <a>
                      <WhatsAppIcon />
                    </a>
                  </div>
                </Typography>
              </Grid>
            </Grid>
          </Grid>
          <Grid item xs={12} className="home-item-grid">
            <Grid elevation={3} className="home-item" style={{ padding: "20px", backgroundColor: "#FFFFFF", color: "#000000" }}>
              <Typography variant="h6">Creas</Typography>
              <Grid style={{ marginTop: "1.5rem" }}>
                <Typography variant="body1">
                  O CRAS (Centro de Referência de Assistência Social) é uma
                  instituição essencial na nossa comunidade, promovendo o
                  bem-estar e melhorando a qualidade de vida dos cidadãos.
                  Oferece serviços variados, como apoio psicossocial, orientação
                  familiar e distribuição de benefícios como o Bolsa Família.
                  Além disso, é um ambiente acolhedor onde pessoas e famílias
                  podem encontrar ajuda em momentos difíceis, promovendo o
                  fortalecimento de laços e o desenvolvimento pessoal. Como
                  ponto de referência na assistência social, trabalha em
                  colaboração com outras instituições e órgãos governamentais
                  para atender às necessidades da comunidade de forma eficaz e
                  abrangente.
                </Typography>
              </Grid>
              <Grid direction="column" style={{ marginTop: "1rem" }}>
                <Typography
                  variant="body2"
                  style={{
                    marginTop: "1rem",
                    display: "flex",
                    justifyContent: "flex-end",
                  }}
                >
                  <Button>
                    <a
                      style={{ color: "gray", textDecoration: "none" }}
                      href="#"
                      onClick={() =>
                        window.open(
                          "https://www.google.com.br/maps/search/+Rua+Jo%C3%A3o+Pedro+Saturno,+293+-+Saturno,+Av.+Prof.+Eurico+Back,+N%C2%B0+1661+-+Saturno,+Forquilhinha+-+SC,+88850-000/@-28.7451754,-49.464176,17.25z?entry=ttu"
                        )
                      }
                    >
                      <LocationOnIcon />
                      Rua João Pedro Saturno, 293 - Saturno, Av. Prof. Eurico
                      Back, N° 1661 - Saturno, Forquilhinha - SC, 88850-00
                    </a>
                  </Button>
                  <div style={{ marginLeft: "auto", display: "flex" }}>
                    <a style={{ marginRight: "0.5rem" }}>
                      <InstagramIcon />
                    </a>
                    <a style={{ marginRight: "0.5rem" }}>
                      <FacebookIcon />
                    </a>
                    <a>
                      <WhatsAppIcon />
                    </a>
                  </div>
                </Typography>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
        <Box mb={8} />
      </Container>
    </div>
  );
};

export default Home;