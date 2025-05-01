function showPosition(position) {
    console.info(position.coords);

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
    const url = `https://nominatim.openstreetmap.org/reverse?lat=${latitude}&lon=${longitude}&format=json`;

    fetch(url, {
      headers: {
        'User-Agent': 'ExemploGeolocalizacao/1.0'
      }
    })
    .then(resposta => resposta.json())
    .then(dados => {
      console.log(dados);
    //   alert("Você está em: " + dados.address.city + ", " + dados.address.country);
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

window.onload = () => {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(showPosition, showException);
    } else {
        console.error("Geolocalização não é suportada pelo seu navegador.");
    }
}