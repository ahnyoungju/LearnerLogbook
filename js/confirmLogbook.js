$(document).ready( function() {
  // var sigDiv = $("#signatureParent").jSignature({'UndoButton':true});
  var sigDiv = $("#signature").jSignature({
    // color:"#f00",  // line color
    lineWidth:2,   // line width
    'UndoButton':true
  });

  $("#confirmLogbook").click( function() {
    var dataSig = sigDiv.jSignature("getData","svg");
    console.log(dataSig);
  });
  $("#clearSig").click( function() {
    sigDiv.jSignature('reset')
  });

});
