function showPosition(position) {

    document.getElementById("latitude").innerText = position.coords.latitude;
    document.getElementById("longitude").innerText = position.coords.longitude;
    document.getElementById("accuracy").innerText = position.coords.accuracy;

    showAddress(position.coords.latitude, position.coords.longitude);
}

function showException(error) {
    switch (error.code) {
        case error.PERMISSION_DENIED:
            console.error("Usuário negou a solicitação de geolocalização.");
            break;
        case error.POSITION_UNAVAILABLE:
            console.error("As informações de localização não estão disponíveis.");
            break;
        case error.TIMEOUT:
            console.error("A solicitação para obter a localização expirou.");
            break;
        case error.UNKNOWN_ERROR:
            console.error("Ocorreu um erro desconhecido.");
            break;
    }
}

function showAddress(latitude, longitude) {

    // latitude = 52.520645;
    // longitude = 13.409779;

    // latitude = 52.52089;
    // longitude = 13.40943;

    // const url = `https://nominatim.openstreetmap.org/reverse?lat=${latitude}&lon=${longitude}&format=json`;
    const url = `https://nominatim.openstreetmap.org/reverse.php?lat=${latitude}&lon=${longitude}&zoom=18&format=jsonv2`;
    console.log(url);
    // const url = `https://nominatim.openstreetmap.org/reverse.php?lat=52.52089&lon=13.40943&zoom=18&format=jsonv2`

    fetch(url, {
      headers: {
        'User-Agent': 'ExemploGeolocalizacao/1.0'
      }
    })
    .then(resposta => resposta.json())
    .then(dados => {
    //   console.log(dados);
    //   alert("Você está em: " + dados.address.city + ", " + dados.address.country);
    
    console.log(dados);

    document.getElementById("ISO3166-2-lvl4").innerText = dados.address["ISO3166-2-lvl4"];
    document.getElementById("tourism").innerText = dados.address.tourism;
    document.getElementById("suburb").innerText = dados.address.suburb;
    document.getElementById("state").innerText = dados.address.state;
    document.getElementById("road").innerText = dados.address.road;
    document.getElementById("region").innerText = dados.address.region;
    document.getElementById("postcode").innerText = dados.address.postcode;
    document.getElementById("municipality").innerText = dados.address.municipality;
    document.getElementById("county").innerText = dados.address.county;
    document.getElementById("country_code").innerText = dados.address.country_code;
    document.getElementById("country").innerText = dados.address.country;
    document.getElementById("city").innerText = dados.address.city;
    document.getElementById("house_number").innerText = dados.address.house_number || 'n/a';


    })
    .catch(erro => {
      console.error("Erro ao buscar endereço:", erro);
    });
}

function showDistance(latitude1, longitude1, latitude2, longitude2) {
    const R = 6371; // Raio da Terra em km. Use 6371000 para metros.

    // Converter graus para radianos
    const toRad = angle => angle * Math.PI / 180;

    const dLat = toRad(lat2 - lat1);
    const dLon = toRad(lon2 - lon1);

    const a = Math.sin(dLat / 2) ** 2 +
              Math.cos(toRad(lat1)) * Math.cos(toRad(lat2)) *
              Math.sin(dLon / 2) ** 2;

    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));

    const distanciaKm = R * c;
    return distanciaKm;
}

function getGeolocation() {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(showPosition, showException);
    } else {
        console.error("Geolocalização não é suportada pelo seu navegador.");
    }
}

window.getGeolocation2 = function(dotnetHelper) {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
            (position) => {
                const {latitude, longitude, accuracy} = position.coords;
                const geolocation = { ...{latitude, longitude, accuracy}};
                dotnetHelper.invokeMethodAsync("geolocation", geolocation);
            }, 
            (error) => {
                switch (error.code) {
                    case error.PERMISSION_DENIED:
                        console.error("Usuário negou a solicitação de geolocalização.");
                        break;
                    case error.POSITION_UNAVAILABLE:
                        console.error("As informações de localização não estão disponíveis.");
                        break;
                    case error.TIMEOUT:
                        console.error("A solicitação para obter a localização expirou.");
                        break;
                    case error.UNKNOWN_ERROR:
                        console.error("Ocorreu um erro desconhecido.");
                        break;
                }
            });
    } else {
        console.error("Geolocalização não é suportada pelo seu navegador.");
    }
}

getGeolocation();