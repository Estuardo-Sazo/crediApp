$( document ).ready(function() {
//Validamos Inicio de sesion
if(!localStorage.getItem('ID-USER')){
    var url = "../login/"; 
    $(location).attr('href',url); 
}

///Cerrar Sesion

$('#cerrar').click(function(){
    swal({
        title: "Cerrar Sesion",
        text: "Estas seguro de cerrar la sesion?",
        icon: "warning",
        buttons: true,
        dangerMode: true,
      })
      .then((willDelete) => {
        if (willDelete) {
            localStorage.removeItem('ID-USER');
            localStorage.removeItem('U_NOMBRE');
            var url = "../login/"; 
            $(location).attr('href',url); 
        } else {
            
        }
      });
    

});
    
    
    const nombre=localStorage.getItem('U_NOMBRE');

    $('#nombre').html(nombre);
    
});