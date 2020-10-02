$(document).ready(function () {
  const C_TOKEN = localStorage.getItem("C_TOKEN");
  const U_TOKEN = localStorage.getItem("ID-USER");
  let basURL = getURLClientes();
  ;

  const datosCliente = async (C_TOKEN, U_TOKEN) => {
    var f = new FormData();

    f.append("C_TOKEN", C_TOKEN);
    f.append("U_TOKEN", U_TOKEN);
    f.append("METHOD", "CLIENTES");
    await axios
      .post(basURL, f)
      .then((response) => {
        dato=response.data;
        $('#nombre').html(dato.C_NOMBRE);
        $('#identidad').html(dato.C_IDENTIDAD);
        $('#telefono').html(dato.C_TELEFONO);
        $('#direccion').html(dato.C_DIRECCION);

      })
      .catch((error) => {
        console.log(error);
      });
  };


  datosCliente(C_TOKEN,U_TOKEN)
});
