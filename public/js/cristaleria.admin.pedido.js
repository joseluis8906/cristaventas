$(document).ready(function() {
    $(document).foundation();

    //boton guardar
    $("#BtnGuardar").click(function() {
        var Clave = $("#Clave").val();
        var CodigoVendedor = $("#CodigoVendedor").val();
        var NumeroPedido = $("#NumeroPedido").val();

        if (Clave === "") {
            $("#Loading").foundation("close");
            $("#Failure").foundation("open");
            $("#FailureMsg").text("Escriba su clave");
            return;
        }

        if (CodigoVendedor === "") {
            $("#Loading").foundation("close");
            $("#Failure").foundation("open");
            $("#FailureMsg").text("Escriba un código de vendedor");
            return;
        }

        if (NumeroPedido === "") {
            $("#Loading").foundation("close");
            $("#Failure").foundation("open");
            $("#FailureMsg").text("Escriba el número del pedido");
            return;
        }

        var Url = "/pedido/eliminar/";
        console.log(zfill(NumeroPedido, 15, '0'));
        JsonReq(Url, { Clave: Clave, CodigoVendedor: CodigoVendedor, NumeroPedido: zfill(NumeroPedido, 15, '0') }, function(Res) {

                if (Res.Result === 0) {
                    $("#Loading").foundation("close");
                    $("#Failure").foundation("open");
                    $("#FailureMsg").text(Res.Err);
                    return;
                }

                if (Res.Result === 1) {
                    $("#Loading").foundation("close");
                    $("#Success").foundation("open");
                    $("#SuccessMsg").text("Peido eliminado exitosamente");
                }
            },

            function(Err) {
                $("#Loading").foundation("close");
                $("#Failure").foundation("open");
                $("#FailureMsg").text("A ocurrido un error inesperado");
            });

    });

    $("#BtnRevealSuccess").click(function() {
        $("#CodigoVendedor").val("");
        $("#NumeroPedido").val("");
        $("#Clave").val("");
    });

    $("#BtnRevealFailure").click(function() {
        $("#CodigoVendedor").val("");
        $("#NumeroPedido").val("");
        $("#Clave").val("");
    });

});

function zfill(num, size, character) {
    var s = num + "";
    while (s.length < size) s = character + s;
    return s;
}