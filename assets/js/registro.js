$(document).ready(function () {
  let basURL = getURLUser();
 

  $("#frm-registrar").submit(function (e) {
    let nombre = $("#nombre").val();
    let correo = $("#correo").val();
    let clave = $("#clave").val();
    let confClave = $("#confClave").val();
    let rpt = validarIputs(nombre, correo, clave, confClave);
    if(rpt){
      peticionRegistro(nombre, correo, clave);
    }
    e.preventDefault();
  });

  function validarIputs(nombre, correo, clave, cofClave) {
    var patronCorreo = /^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/;
    var patronClave = /^[a-zA-Z0-9\_\-\@].{6,50}$/;
    var patronNombre = /^[a-zA-Z].{6,75}$/;
    if (patronNombre.test(nombre) && nombre !== "") {
      if (patronCorreo.test(correo)) {
        if (patronClave.test(clave)) {
          if (clave === cofClave) {
            return true;
          } else {
            swal(
              "Las Contraseñas no considen",
              "Verifica que las contraseñas sean iguales y entes correctamente escritas",
              "error"
            );
            return false;
          }
        } else {
          swal(
            "Contraseña Incorrecta",
            "Ingrese una contraña que contenga mas de 6 digitos,numeros,letras simbolos(@,-,_).",
            "error"
          );
          return false;
        }
      } else {
        swal(
          "Correo Incorrecto",
          "Ingrese una dirreccion de correo valida.",
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

  //// funcion sde registro
  const peticionRegistro = async (nombre, correo, clave) => {
    var f = new FormData();
    f.append("NOMBRE", nombre);
    f.append("CORREO", correo);
    f.append("CLAVE", clave);
    f.append("METHOD", "POST");
    await axios
      .post(basURL, f)
      .then((response) => {
        if (response.data === "CORREO") {
          swal(
            "Error en el correo",
            "El correo que ingresaste ya fue registro anteriormente!",
            "error"
          );
        } else {
          swal("Datos Correctos", "Ya puedes iniciar sesion!", "success");
          console.log(response.data);
          setTimeout(() => {
            var url = "../login/";
            $(location).attr("href", url);
          }, 1500);
        }
      })
      .catch((error) => {
        console.log(error);
      });
  };
});
