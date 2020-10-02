// Ver detalle de cliente

const verCliente = (token) => {
  console.log(token);
  localStorage.setItem("C_TOKEN", token);
  var url = "verCliente.html";
  $(location).attr("href", url);
};
$(document).ready(function () {
  const nombre = localStorage.getItem("U_NOMBRE");
  const u_token = localStorage.getItem("ID-USER");
  let baseURL = getURLClientes();
  $(".clienteNuevo").click(function () {
    var url = "addCliente.html";
    $(location).attr("href", url);
  });


  //Filtrado de Clientes
  
    $("#buscar").on("keyup", function() {
      var value = $(this).val().toLowerCase();
      $("#clintesC .col-md-5").filter(function() {
        $(this).toggle($(this).text().toLowerCase().indexOf(value) > -1)
      });
    });
  

  const getClientes = async (u_token) => {
    var f = new FormData();
    f.append("METHOD", "CLIENTES");

    await axios
      .post(baseURL, f, { params: { U_TOKEN: u_token } })
      .then((response) => {
        let Datos = response.data;
        let template = "";
        Datos.forEach((d) => {
          template += `
              <div class="col-md-5 mt-3 ">
              <div class="cliente">
                  <div class="row">
                      <div class="col-8">
                          <p class="nombre">${d.C_NOMBRE}</p>
                      <p class="direccion">Direccion: ${d.C_DIRECCION}</p>
                      </div>
                      <div class="col-4">
                          <button class=" btn btn-danger btn-block btn-ver" onclick="verCliente(${d.C_TOKEN});">Ver</button>
                      </div>
                  </div>
              </div>
            </div>
              `;
        });

        $("#clintesC").html(template);
      })
      .catch((error) => {
        console.log(error);
      });
  };
  getClientes(u_token);
});
