function JsonReq (Url, Obj, Cb)
{
    var xhttp = new XMLHttpRequest ();
    xhttp.open ("POST", Url);
    xhttp.setRequestHeader("Content-Type", "application/json");
    xhttp.onreadystatechange = function()
    {
        if (this.readyState === 4 && this.status == 200)
        {
            //console.log (JSON.parse(xhttp.responseText));
            Cb(JSON.parse(xhttp.responseText));
        }
    };

    xhttp.send (JSON.stringify (Obj));
}
