$(document).ready(function(){
    
    $(document).foundation();

    $("#BtnRevealSuccess").click(function(){
      window.location.assign("/");
    });

    
    $("option").change(function(){
      if (this.value == '')
      {
        $(this).addClass('placeholder');
      }
      else
      {
        $(this).removeClass('placeholder');
      }
    });


});

window.addEventListener("load", function(){
  var BtnUpdate = document.getElementById("BtnUpdate").getSVGDocument();
  BtnUpdate.getElementById("g5083").addEventListener("click", function(){

    var Clave = $("#Clave").val();

    if(Clave === ""){
      $("#Failure").foundation("open");
      $("#FailureMsg").text("Ingrese su clave");
      return;
    }

    var Tipo = $("#Tipo").val();

    var Url = "";
    
    if (Tipo === "Clientes"){
      Url = "/clientes/sync/";
    }
    else if (Tipo === "Vendedores"){
      Url = "/Vendedores/sync/";
    }
    else if (Tipo === "Productos"){
      Url = "/productos/sync/";
    }
    else{
      $("#Failure").foundation("open");
      $("#FailureMsg").text("Seleccione una acción");
      $("#Clave").val("");
      SelectSetValue("Tipo", "");
      return;
    }

    JsonReq (Url, {Clave: Clave}, function(Res){
        if(Res.Result===1){
            $("#Success").foundation("open");
            $("#SuccessMsg").text("Sincronización exitosa");
        }
        else {
            $("#Failure").foundation("open");
            $("#FailureMsg").text(Res.Err);
        }
        $("#Clave").val("");
    });
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