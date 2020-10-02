$( document ).ready(function() {

    
    
    setTimeout(() => {
        if(localStorage.getItem('U_NOMBRE')){
            var url = "views/inicio/"; 
        }else{
            var url = "views/login/"; 
        }
           
    $(location).attr('href',url);   

    }, 2000);
    
});