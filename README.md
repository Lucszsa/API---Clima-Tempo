# Documentação do Sistema de Consulta de Clima

Este documento fornece uma visão geral e instruções de uso para o sistema de consulta de clima, que utiliza a API do OpenWeatherMap.

## Visão Geral

O sistema de consulta de clima permite aos usuários verificar as condições meteorológicas atuais de uma cidade específica. Ele exibe informações como temperatura, umidade, velocidade do vento e descrição do clima.

## Funcionamento

O sistema é composto por um frontend em HTML/CSS/JavaScript e um backend em Node.js utilizando o framework Express. A comunicação entre o frontend e o backend é feita através de requisições HTTP.

### Frontend

O frontend consiste em uma página web com um formulário para inserir o nome da cidade desejada. Ao enviar o formulário, o JavaScript executa uma requisição assíncrona para o backend, que retorna os dados meteorológicos da cidade fornecida. Os dados são então exibidos na página.

Exemplo de código JavaScript utilizado para enviar a requisição:

```javascript
document
  .getElementById("formClima")
  .addEventListener("submit", function (event) {
    event.preventDefault();

    const city = document.getElementById("cityInput").value;
    const cidadeFormatada = city.charAt(0).toUpperCase() + city.slice(1);

    fetch(`http://localhost:3000/climatempo/${city}`)
      .then((response) => response.json())
      .then((data) => {
        // Manipulação dos dados e atualização da interface
      });
  });

**Backend**

O backend é responsável por receber a requisição do frontend, consultar a API do OpenWeatherMap para obter os dados meteorológicos da cidade especificada e enviar a resposta de volta para o frontend.
Exemplo de código Node.js utilizado para lidar com a requisição:

const express = require("express");
const axios = require("axios");
const path = require("path");
const cors = require("cors");
const config = require("./config.json");
const apikey = config.apikey;

const app = express();
app.listen(3000);

// Configurações do Express
app.use(cors());
app.use(express.json());
app.use(express.static(path.join(__dirname, "public")));

// Rota para consultar dados meteorológicos
app.get("/climatempo/:cidade", async (req, res) => {
  // Obtenção do nome da cidade fornecida na URL
  const city = req.params.cidade;

  try {
    // Requisição à API do OpenWeatherMap
    const response = await axios.get(
      `https://api.openweathermap.org/data/2.5/weather?q=${city}&lang=pt_br&appid=${apikey}&units=metric`
    );

    if (response.status === 200) {
      // Formatação dos dados e envio da resposta
      res.send(formatWeatherData(response.data));
    } else {
      // Tratamento de erros
      res.status(response.status).send({ erro: "Erro ao obter dados meteorológicos" });
    }
  } catch (error) {
    // Tratamento de erros
    res.status(500).send({ erro: "Erro ao obter dados meteorológicos", error });
  }
});

// Função para formatar os dados meteorológicos
function formatWeatherData(data) {
  const climaFormatado = data.weather[0].description.charAt(0).toUpperCase() + data.weather[0].description.slice(1);
  const icon = `http://openweathermap.org/img/wn/${data.weather[0].icon}.png`;
  const flag = `https://flagsapi.com/${data.sys.country}/flat/64.png`;

  return {
    Temperatura: data.main.temp,
    Umidade: data.main.humidity,
    VelocidadeDoVento: data.wind.speed,
    Clima: climaFormatado,
    Icone: icon,
    Flag: flag,
  };
}

**Execução**
Para executar o sistema de consulta de clima, siga os seguintes passos:

1. Certifique-se de ter o Node.js instalado em seu sistema.
2. Clone ou baixe os arquivos do projeto.
3. No terminal, navegue até o diretório do projeto.
4. Execute o comando npm install para instalar as dependências.
5. Execute o comando node server.js para iniciar o servidor.
6. Abra o navegador e acesse http://localhost:3000.

**Observações**
Certifique-se de possuir uma chave de API válida do OpenWeatherMap e insira-a no arquivo config.json.
Este sistema utiliza o CORS para permitir requisições do frontend para o backend. Em produção, é importante configurar corretamente as políticas de CORS de acordo com as necessidades de segurança do seu sistema.
