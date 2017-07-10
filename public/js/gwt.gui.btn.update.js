window.addEventListener("load", function(){

    var objs = document.getElementsByClassName("gwt_gui_btn_update");

    for (var i = 0; i < objs.length; i++)
    {
        var svg = objs[i].getSVGDocument();

        var transform = svg.getElementById("g5083").getAttribute("transform")

        svg.addEventListener("mousedown", function(){
          svg.getElementById("g5083").setAttribute("transform", transform + " scale(0.98) translate(6, 10)");
          svg.getElementById("circle4140").style.fill = "#ffae00";
        });
        svg.addEventListener("click", function(){
          svg.getElementById("g5083").setAttribute("transform", transform);
          svg.getElementById("circle4140").style.fill = "#64c8a0";
        });
    }
});
