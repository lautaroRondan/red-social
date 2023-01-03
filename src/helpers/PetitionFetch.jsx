export const PetitionFetch = async (url, metodo, datosGuardar = "", archivos = false) => {
  let cargando = true;

  let opciones = {
    method: "GET",
  };

  if (metodo == "GET" || metodo == "DELETE") {

    opciones = {
      method: metodo,
    };


  }

  if (metodo == "POST" || metodo == "PUT") {

    if (archivos) {
      opciones = {
        method: metodo,
        body: datosGuardar
      };
    } else {
      opciones = {
        method: metodo,
        body: JSON.stringify(datosGuardar),
        headers: {
          "Content-Type": "application/json",
        },
      };
    }
  }

  const peticion = await fetch(url, opciones);
  const datos = await peticion.json();
  console.log(datos);
  cargando = false;

  return {
    datos,
    cargando
  };
};

export const PetitionFetchToken = async (url, metodo, token, datosGuardar = "", archivos = false) => {
  let cargando = true;

  let opciones = {
    method: "GET",
  };

  if (metodo == "GET" || metodo == "DELETE") {

    opciones = {
      method: metodo,
      headers: {
        "Content-Type": "application/json",
        "Authorization": token
      },
    };


  }

  if (metodo == "POST" || metodo == "PUT") {

    if (archivos) {
      opciones = {
        method: metodo,
        body: datosGuardar,
        mode: "no-cors",
        headers: {
          'Access-Control-Allow-Origin': '*',
          "Authorization": token
        },
      };
    } else {
      opciones = {
        method: metodo,
        body: JSON.stringify(datosGuardar),
        headers: {
          "Content-Type": "application/json",
          "Authorization": token
        },
      };
    }
  }

  const peticion = await fetch(url, opciones);
  const datos = await peticion.json();
  console.log(datos);
  cargando = false;

  return {
    datos,
    cargando
  };
};
