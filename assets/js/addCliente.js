$(document).ready(function () {
    let basURL = getURLClientes();
    const nombre = localStorage.getItem("U_NOMBRE");
    const u_token = localStorage.getItem("ID-USER");

    //Validamos Inicio de sesion
if(!localStorage.getItem('ID-USER')){
  var url = "../login/"; 
  $(location).attr('href',url); 
}
console.log(basURL);


    $("#frm-registrar").submit(function (e) {
        let nombre = $("#nombre").val();
        let identidad = $("#identidad").val();
        let direccion = $("#direccion").val();
        let telefono = $("#telefono").val();
         let rpt = validarIputs(nombre, identidad, direccion, telefono);
        if(rpt){
          postCliente(nombre, identidad, direccion, telefono,u_token);
        } 
        e.preventDefault();
      });

      //peticion post

      const postCliente= async (nombre, identidad, direccion, telefono,token) =>{
        var f = new FormData();
        f.append("NOMBRE", nombre);
        f.append("IDENTIDAD", identidad);
        f.append("DIRECCION", direccion);
        f.append("TELEFONO", telefono);
        f.append("TOKEN", token);
        f.append("METHOD", "ADDC");

        await axios.post(basURL,f).then((response)=>{
        if (response.data === "IDENTIDAD") {
          swal(
            "Error en el Indentidad",
            "La identidad que ingresate ya fue registrada anteriormente con otro cliente!",
            "error"
          );
        }else{
          swal(
            "Registro Correcto",
            "El cliente fue registrado con exito!",
            "success"
          );
          setTimeout(() => {
            var url = "../clientes/";
            $(location).attr("href", url);
          }, 1000);
        }

        })
      }


      /// validar campos

      function validarIputs(nombre, identidad, direccion, telefono) {
        var patronTelefono = /^[0-9].{8,25}$/;
        var patronNombre = /^[a-zA-Z0-9].{6,75}$/;
        if (patronNombre.test(nombre) && nombre !== "") {
          if (patronNombre.test(identidad) && identidad !== "") {
            if (patronNombre.test(direccion)&& direccion !== "") {
              if (patronTelefono.test(telefono)&& telefono !== "" ) {
                
                return true;
                
              } else {
                swal(
                  "Telefono Incorrecto",
                  "Ingrese un telefono valido.",
                  "error"
                );
                return false;
              }
            } else {
              swal(
                "Dirreccion Incorrecta",
                "Ingrese una dirreccion  valida.",
                "error"
              );
              return false;
            }
          } else {
            swal(
              "Identidad Incorrecto",
              "Ingrese una identidad valida.",
              "error"
            );
            return false;
          }
        } else {
          swal(
            "Error en el campo nombre",
            "Solo puede llevar letras, no puede estar vacio y contener mas de 6 digitos.",
            "error"
          );
          return false;
        }
      }
    
});