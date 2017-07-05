$(document).ready(function(){
    $(document).foundation();
    $("select").change(selectPlaceholder);
});

window.onload = function()
{
    var button = document.getElementById ("btnProbar");
    button.onclick = function ()
    {
        // escribir nombre de la aplicacion sin slash
        var app = 'clientes';

        // escribir nombre del método sin slash
        var metodo = GetValue("Method");

        // el objeto json que se envía
        var objetoJson = {
          Nit: GetValue("Nit"),
          Nombre: GetValue("Nombre"),
          Direccion: GetValue("Direccion"),
          Telefono: GetValue("Telefono"),
          Descuento: GetValue("Descuento"),
          /*NormaTecnica: GetValue("NormaTecnica"),
          Propietario: GetValue("Propietario"),
          Presion: GetValue("Presion"),
          AlturaConValvula: GetValue("AlturaConValvula"),
          PesoConValvula: GetValue("PesoConValvula"),
          Valvula: GetValue("Valvula"),
          TipoValvula: GetValue("TipoValvula"),
          AcabadoColor: GetValue("AcabadoColor"),
          Proveedor: GetValue("Proveedor"),
          FechaCompra: GetValue("FechaCompra"),
          Garantia: GetValue("Garantia"),
          FechaFabricacion: GetValue("FechaFabricacion"),
          PruebaHidrostatica: GetValue("PruebaHidrostatica"),
          Alquilado: GetValue("Alquilado"),
          FechaAlquiler: GetValue("FechaAlquiler"),
          Observaciones: GetValue("Observaciones")*/
          //aqui las propiedades que vayan a enviar en el objeto json
        };


        var xhttp = new XMLHttpRequest ();
        xhttp.open ("POST", "/"+app+"/"+metodo+"/");
        xhttp.setRequestHeader("Content-Type", "application/json");
        xhttp.onreadystatechange = function()
        {
            if (this.readyState === 4 && this.status == 200)
            {
                console.log (JSON.parse(xhttp.responseText));
                //Response(JSON.parse(xhttp.responseText));
            }
        };
        xhttp.send (JSON.stringify (objetoJson));
    }
}

function selectPlaceholder ()
{
   if (this.value == '')
   {
     $(this).addClass('placeholder');
   }
   else
   {
     $(this).removeClass('placeholder');
   }
}

function GetValue (Id)
{
    var value = document.getElementById(Id).value;
    return (value == '') ? null : value;
}

function SelectSetValue (Id, Value)
{
    $(Id+" option").each(function() { this.selected = (this.value == Value);});

    var Elemento = $(Id);
    if (Elemento.val() !== '')
    {
        Elemento.removeClass('placeholder');
    }
    else
    {
        Elemento.addClass('placeholder');
    }
}

function Response (Res)
{
    if(Res === null)
    {
      $("#Nombre").val('');
      $("#Direccion").val('');
      $("#Telefono").val('');
      $("#Descuento").val('');
      return;
    }

    if(Res.Result)
    {
        Foundation.Motion.animateIn('#tablero', 'fade-in');
        $("#tablero").text(JSON.stringify(Res));
        setTimeout(function (){Foundation.Motion.animateOut('#tablero', 'fade-out');}, 10000);

        $("#Nombre").val('');
        $("#Direccion").val('');
        $("#Telefono").val('');
        $("#Descuento").val('');
    }
    else
    {
        $("#Nombre").val(Res.Nombre);
        $("#Direccion").val(Res.Direccion);
        $("#Telefono").val(Res.Telefono);
        $("#Descuento").val(Res.Descuento);
    }
}
