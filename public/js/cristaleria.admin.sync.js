$(document).ready(function(){

    $(document).foundation();

    $("select").change(function(){
      if (this.value == '')
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


    $("#BtnRevealSuccess").click(function(){
      $("#Clave").val("");
      SelectSetValue("#Tipo", "");
    });

    $("#BtnRevealFailure").click(function(){
      $("#Clave").val("");
      SelectSetValue("#Tipo", "");
    });

});

window.addEventListener("load", function(){
  var BtnUpdate = document.getElementById("BtnUpdate").getSVGDocument();
  BtnUpdate.getElementById("g5083").addEventListener("click", function(){

    var Clave = $("#Clave").val();

    if(Clave === ""){
      $("#Failure").foundation("open");
      $("#FailureMsg").text("Ingrese su clave");
      $("#Clave").val("");
      SelectSetValue ("#Tipo", "");
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
      SelectSetValue("#Tipo", "");
      return;
    }

    $("#Loading").foundation("open");

    JsonReq (Url, {Clave: Clave}, function(Res){
        if(Res.Result===1){
            $("#Loading").foundation("close");
            $("#Success").foundation("open");
            $("#SuccessMsg").text("Sincronización exitosa");
        }
        else {
            $("#Loading").foundation("close");
            $("#Failure").foundation("open");
            $("#FailureMsg").text(Res.Err);
        }
        $("#Clave").val("");
        SelectSetValue("#Tipo", "");
    },

    function(Err){
      $("#Loading").foundation("close");
      $("#Failure").foundation("open");
      $("#FailureMsg").text("A ocurrido un error inesperado");
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
