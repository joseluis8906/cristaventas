$(document).ready(function(){
    $(document).foundation();
});

window.addEventListener("load", function(){
  var BtnUpdate = document.getElementById("BtnUpdate").getSVGDocument();
  BtnUpdate.getElementById("g5083").addEventListener("click", function(){

    var Clave = $("#Clave").val();

    if(Clave === "")
    {
      $("#Failure").foundation("open");
      $("#FailureMsg").html("Escriba una clave.");
      return;
    }

    JsonReq ("/data/Update/", {Clave: Clave}, function(Res){
        if(Res.Result===1){
            $("#Success").foundation("open");
            $("#SuccessMsg").text("Actualización realizada correctamente.");
        }
        else {
            $("#Failure").foundation("open");
            $("#FailureMsg").text(Res.Err);
        }
        $("#Clave").val("");
    });
  });
});
