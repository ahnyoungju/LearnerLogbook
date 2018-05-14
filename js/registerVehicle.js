$(document).ready(function(e) {

  var rego = getUrlVars()["Rego"];
  $("#error").hide();

  document.addEventListener("deviceready", onDeviceReady(), false);

  if( rego != null ) {
    console.log("Update Rego: " + rego);
    $("#registerVehicle").hide();
    $("#saveVehicle").show();
    readVehicle(rego);
  }
  else {
    console.log("Add new vehicle");
    $("#registerVehicle").show();
    $("#saveVehicle").hide();
  }

  $("#registerVehicle").on('click', function() {
    addVehicle();
  });

  $("#saveVehicle").on('click', function() {
    updateVehicle(rego);
  });
});

var onDeviceReady = function() {
  try {
    if( !window.openDatabase )
      alert("This device does NOT support databases");
    else {
      db = window.openDatabase(shortName, version, displayName, maxSize);
    } // end else
  }
  catch(err) {
    alert("Error: " + err);
  }
};

var readVehicle = function(licenceNo) {
  db.transaction( function(trans) {
    trans.executeSql(queryVehicleSQL,[licenceNo], function(trans, result) {
      if( result.rows.length == 0 ) { // Nothing returened
        $("#txtMsg").html("<em>"+ rego + " NOT found!</em>");
        $("#error").show();
      }
      else {
        var noOfRecs = result.rows.length;

        for(var i = 0;i < noOfRecs; i++) {
          var row = result.rows.item(i);
          $("#txtRego").val(row['fldRego']);
          console.log(row['fldTransmission']);
          if(row['fldTransmission'] == "Auto" ) {
            $("#rdoTransManual").prop("checked",false).checkboxradio('refresh');
            $("#rdoTransAuto").prop('checked', true).checkboxradio('refresh');
          }
          else {
            $("#rdoTransAuto").prop("checked",false).checkboxradio('refresh');
            $("#rdoTransManual").prop("checked",true).checkboxradio('refresh');
          }
          console.log($("#rdoTransAuto").prop("checked"));
          console.log($("#rdoTransManual").prop("checked"));
          $("#txtMake").val(row['fldMake']);
          $("#txtModel").val(row['fldModel']);
        }
        $("#error").hide();
      }
    });
  });
}

var addVehicle = function() {
  var check = checkVehicle();

  if(check) {
    var rego = $("#txtRego").val();
    var trans = ($("#rdoTransAuto").prop("checked"))?"Auto":"Manual";
    var make = $("#txtMake").val();
    var model = $("#txtModel").val();

    db.transaction( function(trans) {
      trans.executeSql(insertVehicleSQL,[rego,trans,make,model]);
    }, onError, openURL("register.html"));
  }
}

var updateVehicle = function(oldRego) {
  var check = checkVehicle();

  if(check) {
    var rego = $("#txtRego").val();
    var trans = ($("#rdoTransAuto").prop("checked"))?"Auto":"Manual";
    var make = $("#txtMake").val();
    var model = $("#txtModel").val();

    db.transaction( function(trans) {
      trans.executeSql(updateVehicleSQL,[rego,trans,make,model,oldRego]);
    }, onError, openURL("register.html"));
  }
}

var checkVehicle = function() {
  var rego = $("#txtRego").val();
  var trans = ($("#rdoTransAuto").prop("checked"))?"Auto":"Manual";
  var make = $("#txtMake").val();
  var model = $("#txtModel").val();

  console.log(rego + " " + trans + " " + make + " " + model);
  return true;
}
