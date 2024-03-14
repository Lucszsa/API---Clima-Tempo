const express = require("express");
const axios = require("axios");
const path = require("path");
const cors = require("cors");
const config = require("./config.json");
const apikey = config.apikey;

const app = express();
app.listen(3000);

app.use(cors());
app.use(express.json());
app.use(express.static(path.join(__dirname, "public")));

app.get("/climatempo/:cidade", async (req, res) => {
  const city = req.params.cidade;

  try {
    const response = await axios.get(
      `https://api.openweathermap.org/data/2.5/weather?q=${city}&lang=pt_br&appid=${apikey}&units=metric`
    );
    if (response.status === 200) {
      const clima = response.data.weather[0].description;
      const climaFormatado = clima.charAt(0).toUpperCase() + clima.slice(1);
      const icon = `http://openweathermap.org/img/wn/${response.data.weather[0].icon}.png`;
      const flag = `https://flagsapi.com/${response.data.sys.country}/flat/64.png`;

      const watherData = {
        Temperatura: response.data.main.temp_min,
        Umidade: response.data.main.humidity,
        VelocidadeDoVento: response.data.wind.speed,
        Clima: climaFormatado,
        Icone: icon,
        Flag: flag,
      };

      res.send(watherData);
    } else {
      res
        .status(response.status)
        .send({ erro: "Erro ao obter dados metereológicos" });
    }
  } catch (error) {
    res.status(500).send({ erro: "Erro ao obter dados metereológicos", error });
  }
});
