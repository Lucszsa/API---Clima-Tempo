document
  .getElementById("formClima")
  .addEventListener("submit", function (event) {
    event.preventDefault();

    const city = document.getElementById("cityInput").value;
    const cidadeFormatada = city.charAt(0).toUpperCase() + city.slice(1);

    fetch(`http://localhost:3000/climatempo/${city}`)
      .then((response) => response.json())
      .then((data) => {
        const tempoResult = document.getElementById("climaResult");

        document.getElementById("climaResult").style.display = "block";

        if (data.Temperatura) {
          tempoResult.innerHTML = `
            
          <div class="clima-city-name">
          <i class="ph-fill ph-map-pin" id="pin_map"></i>
          <p id="cityResult">${cidadeFormatada}</p>
          <img src="${data.Flag}" class="flag-city">
        </div>
        <div class="clima-city-temp">
          <i class="ph ph-thermometer-simple"></i>
          <p id="tempResult">${data.Temperatura}ºC</p>
        </div>
        <div class="clima-city-icon">
          <p id="climaDescriptionResult">${data.Clima}</p>
          <img src="${data.Icone}">
        </div>
        <div class="clima-city-bot">
          <div class="clima-city-umidade">
            <i class="ph ph-drop"></i>
            <p id="umidadeResult">${data.Umidade}%</p>
          </div>
          <p class="espacamento">|</p>
          <div class="clima-city-vento">
            <i class="ph ph-wind"></i>
            <p id="ventoResult">${data.VelocidadeDoVento} m/s</p>
          </div>
          </div>
        
            `;
        } else {
          tempoResult.innerHTML = "Erro ao obter dados metereológicos!";
        }
      });
  });
