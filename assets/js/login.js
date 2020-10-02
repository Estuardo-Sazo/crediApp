
$(document).ready(function () {
  $("#frm-login").submit(function (e) {
    let correo = $("#correo").val();
    let clave = $("#clave").val();
    if (ValidarInuts(correo, clave)) {
      peticionPost(correo, clave);
    }
    e.preventDefault();
  });

  
  let basURL= getURLUser();

  const peticionGet = async () => {
    await axios.get(basURL).then((response) => {
      console.log(response.data);
    });
  };

  //Peticion POST
  const peticionPost = async (correo, clave) => {
    var f = new FormData();
    f.append("CORREO", correo);
    f.append("CLAVE", clave);
    f.append("METHOD", "LOGIN");
    await axios
      .post(basURL, f)
      .then((response) => {
        if (response.data === "CORREOERROR") {
          swal("Correo Incorrecto", "El correo ingresado no existe!", "error");
        } else if (response.data === "CLAVEERROR") {
          swal(
            "Contraseña Incorrecta",
            "La contraseña es incorrecta, escribela correctamente!",
            "error"
          );
        } else {
          swal("Datos Correctos", "Inicio de sesion correcto!", "success");
          localStorage.setItem("ID-USER", response.data.U_TOKEN);
          localStorage.setItem("U_NOMBRE", response.data.U_NOMBRE);
          setTimeout(() => {
            var url = "../inicio/";
            $(location).attr("href", url);
          }, 1500);
        }
      })
      .catch((error) => {
        console.log(error);
      });
  };

  // Validar Input
  function ValidarInuts(correo, clave) {
    var regex = /^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/;

    var patronC = /^[a-zA-Z0-9\_\-\@].{6,50}$/;
    if (regex.test(correo)) {
      if (patronC.test(clave)) {
        return true;
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
  }
});
