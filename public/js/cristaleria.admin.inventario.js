$(document).ready(function(){
    $(document).foundation();

    //cambiar los placeholder a los select
    $("select").change(function(){
      if (this.value === '')
      {
        $(this).addClass('placeholder');
      }
      else
      {
        $(this).removeClass('placeholder');
      }
    });

    $("select").each(function(){
      if (this.value === '')
      {
        $(this).addClass('placeholder');
      }
      else
      {
        $(this).removeClass('placeholder');
      }
    });

    $("#Nombre").css("color", "#cacaca");

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

      $("#Loading").foundation("open");

      JsonReq ("/inventario/Select/", {Clave: Clave, Referencia: Referencia}, function(Res){
          if(Res === null){
            $("#Loading").foundation("close");
            $("#Failure").foundation("open");
            $("#FailureMsg").text("El producto no existe");
            $("#Nombre").text("Nombre");
            $("#Nombre").css("color", "#cacaca");
            return;
          }

          if(Res.Result === 0)
          {
            $("#Loading").foundation("close");
            $("#Failure").foundation("open");
            $("#FailureMsg").text(Res.Err);
            return;
          }

          if(Res.Referencia === Referencia){
            $("#Loading").foundation("close");
            $("#Nombre").text(Res.Nombre);
            $("#Nombre").css("color", "black");
          }
      },

      function(Err){
        $("#Loading").foundation("close");
        $("#Failure").foundation("open");
        $("#FailureMsg").text("A ocurrido un error inesperado");
      });

    });


    //boton guardar
    $("#BtnGuardar").click(function(){
      var Clave = $("#Clave").val();
      var Referencia = $("#Referencia").val();
      var Nombre = $("#Nombre").text();
      var Cantidad = $("#Cantidad").val();
      var Tipo = $("#Tipo").val();

      if(Clave === "")
      {
        $("#Loading").foundation("close");
        $("#Failure").foundation("open");
        $("#FailureMsg").text("Escriba su clave");
        return;
      }

      if(Referencia === "")
      {
        $("#Loading").foundation("close");
        $("#Failure").foundation("open");
        $("#FailureMsg").text("Escriba una referencia y consulte con el boton lupa");
        return;
      }

      if(Nombre === "")
      {
        $("#Loading").foundation("close");
        $("#Failure").foundation("open");
        $("#FailureMsg").text("Consulte la referencia para verificar existencia");
        return;
      }

      if(Cantidad === "")
      {
        $("#Loading").foundation("close");
        $("#Failure").foundation("open");
        $("#FailureMsg").text("Escriba una cantidad");
        return;
      }

      if(Number(Cantidad) === NaN)
      {
        $("#Loading").foundation("close");
        $("#Failure").foundation("open");
        $("#FailureMsg").text("Escriba una cantidad válida");
        return;
      }

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
        SelectSetValue("#Tipo", "");
        return;
      }

      JsonReq (Url, {Clave: Clave, Referencia: Referencia, Existencia: Cantidad}, function(Res){

          if(Res.Result === 0)
          {
            $("#Loading").foundation("close");
            $("#Failure").foundation("open");
            $("#FailureMsg").text(Res.Err);
            return;
          }

          if(Res.Result === 1){
            $("#Loading").foundation("close");
            $("#Success").foundation("open");
            $("#SuccessMsg").text("Actualizacion Exitosa");
          }
      },

      function(Err){
        $("#Loading").foundation("close");
        $("#Failure").foundation("open");
        $("#FailureMsg").text("A ocurrido un error inesperado");
      });

    });

    $("#BtnRevealSuccess").click(function(){
      $("#Referencia").val("");
      $("#Nombre").text("");
      $("#Cantidad").val("");
      SelectSetValue("#Tipo", "");
      $("#Clave").val("");
      $("#Nombre").text("Nombre");
      $("#Nombre").css("color", "#cacaca");
    });

    $("#BtnRevealFailure").click(function(){
      $("#Referencia").val("");
      $("#Nombre").text("");
      $("#Cantidad").val("");
      SelectSetValue("#Tipo", "");
      $("#Clave").val("");
      $("#Nombre").text("Nombre");
      $("#Nombre").css("color", "#cacaca");
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
