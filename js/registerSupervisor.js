$(document).ready(function(e) {

  var licenceNo = getUrlVars()["LicenceNo"];
  $("#error").hide();

  document.addEventListener("deviceready", onDeviceReady(), false);

  if( licenceNo != null ) {
    console.log("Update licenceNo: " + licenceNo);
    $("#registerSupervisor").hide();
    $("#saveSupervisor").show();
    readSupervisor(licenceNo);
  }
  else {
    console.log("Add new supervisor");
    $("#registerSupervisor").show();
    $("#saveSupervisor").hide();
  }

  $("#registerSupervisor").on('click', function() {
    addSupervisor();
  });

  $("#saveSupervisor").on('click', function() {
    updateSupervisor(licenceNo);
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

var readSupervisor = function(licenceNo) {
  db.transaction( function(trans) {
    trans.executeSql(querySupervisorSQL,[licenceNo], function(trans, result) {
      if( result.rows.length == 0 ) { // Nothing returened
        $("#txtMsg").html("<em>"+licenceNo + " NOT found!</em>");
        $("#error").show();
      }
      else {
        var noOfRecs = result.rows.length;

        for(var i = 0;i < noOfRecs; i++) {
          var row = result.rows.item(i);
          $("#txtFirst").val(row['fldFirstname']);
          $("#txtLast").val(row['fldLastname']);
          $("#txtLicenceNo").val(row['fldLicenceNo']);
          $("#txtPhone").val(row['fldPhone']);
          $("#txtExpiryDate").val(row['fldLicenceExpiry']);
        }
        $("#error").hide();
      }
    });
  });
}

var addSupervisor = function() {
  var check = checkSupervisor();

  if(check) {
    var first = $("#txtFirst").val();
    var last = $("#txtLast").val();
    var licenceNo = $("#txtLicenceNo").val();
    var expiryDate = $("#txtExpiryDate").val();
    var phone = $("#txtPhone").val();

    db.transaction( function(trans) {
      trans.executeSql(insertSupervisorSQL,[licenceNo, first, last, phone, expiryDate]);
    }, onError, openURL("register.html"));
  }
};

var updateSupervisor = function(oldLicenceNo) {
  var check = checkSupervisor();

  if(check) {
    var first = $("#txtFirst").val();
    var last = $("#txtLast").val();
    var licenceNo = $("#txtLicenceNo").val();
    var expiryDate = $("#txtExpiryDate").val();
    var phone = $("#txtPhone").val();

    db.transaction( function(trans) {
      trans.executeSql(updateSupervisorSQL,[licenceNo, first, last, phone, expiryDate, oldLicenceNo]);
    }, onError, openURL("register.html"));
  }
}

var checkSupervisor = function() {
  var first = $("#txtFirst").val();
  var last = $("#txtLast").val();
  var licenceNo = $("#txtLicenceNo").val();
  var expiryDate = $("#txtExpiryDate").val();
  var phone = $("#txtPhone").val();

  console.log(first + " " + last + " " + licenceNo + " " + expiryDate + " " + phone);
  return true;
}
