function JsonReq (Url, Obj, CbSuccess, CbError)
{
    var xhttp = new XMLHttpRequest ();
    xhttp.open ("POST", Url);
    xhttp.setRequestHeader("Content-Type", "application/json");
    xhttp.onreadystatechange = function()
    {
        if (this.readyState === 4 && this.status == 200)
        {
            //console.log (JSON.parse(xhttp.responseText));
            if (CbSuccess !== null){
              CbSuccess(JSON.parse(xhttp.responseText));
            }
        }
    };

    xhttp.addEventListener("error", function(oEvent){
      if (CbError !== null){
        CbError (oEvent);
      }
    });

    xhttp.send (JSON.stringify (Obj));
}
