$(document).ready(function(){
    $(document).foundation();

    //cambiar los placeholder a los select
    $("select").change(function(){
      console.log(this.value);
      if (this.value === '')
      {
        $(this).addClass('placeholder');
      }
      else
      {
        $(this).removeClass('placeholder');
      }
    });

    //boton buscar
    $("#BtnBuscar").click(function(){
      var Clave = $("#Clave").val();

      if(Clave === "")
      {
        $("#Failure").foundation("open");
        $("#FailureMsg").text("Escriba su clave");
        return;
      }

      var Referencia = $("#Referencia").val();

      if(Referencia === "")
      {
        $("#Failure").foundation("open");
        $("#FailureMsg").text("Escriba una referencia");
        return;
      }

      JsonReq ("/inventario/Select/", {Clave: Clave, Referencia: Referencia}, function(Res){
          if(Res === null){
            $("#Failure").foundation("open");
            $("#FailureMsg").text("El producto no existe");
            $("#Nombre").text("");
            return;
          }

          if(Res.Result === 0)
          {
            $("#Failure").foundation("open");
            $("#FailureMsg").text(Res.Err);
            return;
          }

          if(Res.Referencia === Referencia){
            $("#Nombre").text(Res.Nombre);
          }
      });

    });


    //boton guardar
    $("#BtnGuardar").click(function(){
      var Clave = $("#Clave").val();
      var Referencia = $("#Referencia").val();
      var Nombre = $("#Nombre").text();
      var Cantidad = $("#Cantidad").val();

      if(Clave === "")
      {
        $("#Failure").foundation("open");
        $("#FailureMsg").text("Escriba su clave");
        return;
      }

      if(Referencia === "")
      {
        $("#Failure").foundation("open");
        $("#FailureMsg").text("Escriba una referencia y consulte con el boton lupa");
        return;
      }

      if(Nombre === "")
      {
        $("#Failure").foundation("open");
        $("#FailureMsg").text("Consulte la referencia para verificar existencia");
        return;
      }

      if(Cantidad === "")
      {
        $("#Failure").foundation("open");
        $("#FailureMsg").text("Escriba una cantidad");
        return;
      }

      if(Number(Cantidad) === NaN)
      {
        $("#Failure").foundation("open");
        $("#FailureMsg").text("Escriba una cantidad válida");
        return;
      }

      var Tipo = $("#Tipo").val();

      var Url = "";
    
      if (Tipo === "Agregar"){
        Url = "/inventario/Update/Add/";
      }
      else if (Tipo === "Descontar"){
        Url = "/inventario/Update/Sub/";
      }
      else{
        $("#Failure").foundation("open");
        $("#FailureMsg").text("Seleccione una acción");
        $("#Clave").val("");
        SelectSetValue("Tipo", "");
        return;
      }

      JsonReq (Url, {Clave: Clave, Referencia: Referencia, Existencia: Cantidad}, function(Res){

          if(Res.Result === 0)
          {
            $("#Failure").foundation("open");
            $("#FailureMsg").text(Res.Err);
            return;
          }

          if(Res.Result === 1){
            $("#Success").foundation("open");
            $("#SuccessMsg").text("Actualizacion Exitosa");
          }
      });

    });

    $("#BtnRevealSuccess").click(function(){
      $("#Referencia").val("");
      $("#Nombre").text("");
      $("#Cantidad").val("");
      SelectSetValue("Tipo", "");
      $("#Clave").val("");
    });

    $("#BtnRevealFailure").click(function(){
      $("#Referencia").val("");
      $("#Nombre").text("");
      $("#Cantidad").val("");
      SelectSetValue("Tipo", "");
      $("#Clave").val("");
    });

});

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