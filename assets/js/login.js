$(document).ready(function () {
  $("#frm-login").submit(function (e) {
    let correo = $("#correo").val();
    let clave = $("#clave").val();
    if(ValidarInuts(correo,clave)){
        const datos={
            "CORREO": correo,
            "CLAVE": clave,
            "METHOD": "LOGIN",
        }
        alert('sdsdsddd'); 
   
       //peticionPost(correo,clave);
       $.post("http://localhost/APICREDIAPP/USERS/",datos,function(response) {
       alert('sdd'); 
       if(response==='CORREOERROR'){
            swal(
                "Correo Incorrecto",
                "El correo ingresado no existe!",
                "error"
              );
        }else if(response==='CLAVEERROR'){
            swal(
                "Contraseña Incorrecta",
                "La contraseña es incorrecta, escribela correctamente!",
                "error"
              );
        }else{
            swal(
                "Datos Correctos",
                "Inicio de sesion correcto!",
                "success"
              );
              console.log(response);
        }
       });
    }
    e.preventDefault();
  });

  const basURL = "http://localhost/APICREDIAPP/USERS/";


  const peticionGet = async () => {
    await axios.get(basURL).then((response) => {
        console.log(response.data);
      });
  };

   //Peticion POST
   const peticionPost = async (correo,clave) => {
    var f = new FormData();
    f.append("CORREO", correo);
    f.append("CLAVE", clave);
    f.append("METHOD", "LOGIN");
    await axios
      .post(basURL, f)
      .then((response) => {
        if(response.data==='CORREOERROR'){
            swal(
                "Correo Incorrecto",
                "El correo ingresado no existe!",
                "error"
              );
        }else if(response.data==='CLAVEERROR'){
            swal(
                "Contraseña Incorrecta",
                "La contraseña es incorrecta, escribela correctamente!",
                "error"
              );
        }else{
            swal(
                "Datos Correctos",
                "Inicio de sesion correcto!",
                "success"
              );
              console.log(response.data);
        }
      })
      .catch((error) => {
        console.log(error);
      });
  };

  // Validar Input
  function ValidarInuts(correo,clave) {
    
    var regex = /^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/;

    var patronC = /^[a-zA-Z0-9\_\-\@].{6,12}$/;
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
