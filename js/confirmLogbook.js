$(document).ready( function() {
  var id = getUrlVars()["ID"];

  var output = readLogbook(id);

  var sigDiv = $("#signature").jSignature({
    // color:"#f00",  // line color
    lineWidth:2,   // line width
    'UndoButton':true
  });

  $("#confirmLogbook").click( function() {
    var dataSig = sigDiv.jSignature("getData","svg");
    console.log(dataSig);

    saveSignature(id,dataSig);
    openURL("summary.html");
  });
  $("#clearSig").click( function() {
    sigDiv.jSignature('reset')
  });

});

var readLogbook = function(id) {
  connectDB();

  db.transaction(function(trans) {
    trans.executeSql(queryLogbookSQL,[id], function(trans, result) {
      var output = "";
      if(result.rows.length == 0)
        console.log("Logbook NOT registered!");
      else {
        var noOfRecs = result.rows.length;
        var row = result.rows.item(0);
        console.log("Learner Logbook result rows: " + noOfRecs);
        output += "PermitNo: " + row['fldPermitNo']+"<br/>";
        output += "LicenceNo: " + row['fldLicenceNo']+"<br/>";
        output += "Rego: " + row['fldRego']+"<br/>";
        output += "StartDateTime: " + row['fldStartDateTime']+"<br/>";
        output += "FinishDateTime: " + row['fldFinishDateTime']+"<br/>";
        output += "StartOdometer: " + row['fldStartOdometer']+"<br/>";
        output += "FinishOdometer: " + row['fldFinishOdometer']+"<br/>";
        output += "Parking: " + row['fldParking']+"<br/>";
        output += "Traffic: " + row['fldTraffic']+"<br/>";
        output += "Light: " + row['fldLight']+"<br/>";
        output += "Weather: " + row['fldWeather']+"<br/>";
        output += "Road: " + row['fldRoad']+"<br/>";
      }

      $("#logbookDetails").html(output);
    }); // end tran
  }); // end db transaction
}

var saveSignature = function(id, dataSig) {
  db.transaction(function(trans) {
    trans.executeSql(updateLogbookSQL2,[dataSig,id]);
  });
}
