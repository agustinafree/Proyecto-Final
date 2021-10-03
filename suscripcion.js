//----------- Suscripción----------//

$("nav").append("<button id= 'button-suscripcion' class='btn' onClick='suscribir()'>Suscribite a nuestro Newsletter ♥</button>"); 

let clickeado = false
function suscribir() {
    
    if (clickeado == false) { 
    clickeado = !clickeado
    $("#suscripcion").append('<h4>Suscribite a nuestro newsletter</h4>');
    $("#suscripcion").append('<form id="miFormulario"><input type="text" id="email" placeholder="Ingresa aqui tu email"><button type="submit" class="btn btn-warning">Suscribite ahora</button></form>');
    //EVENTO
    $("#miFormulario").submit(function(e) {
        //prevenir el comportamiento del submit
        e.preventDefault();
        //aca habria que validar que el email sea correcto
        //Mensaje con Sweet alert
        Swal.fire(
            'Nueva suscripcion realizada:',
            //tomo lo ingresado en el input
            $("#email").val(),
            'success'
        )
        $("#suscripcion").empty();
    });
    } 
}  