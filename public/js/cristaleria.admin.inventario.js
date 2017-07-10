$(document).ready(function(){
    $(document).foundation();

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

      JsonReq ("/inventario/Update/Add/", {Clave: Clave, Referencia: Referencia, Existencia: Cantidad}, function(Res){

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
      $("#Clave").val("");
    });

    $("#BtnRevealFailure").click(function(){
      $("#Referencia").val("");
      $("#Nombre").text("");
      $("#Cantidad").val("");
      $("#Clave").val("");
    });

});
