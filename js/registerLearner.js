$(document).ready(function(e) {

  var permitNo = getUrlVars()["PermitNo"];
  $("#error").hide();

  document.addEventListener("deviceready", onDeviceReady(), false);

  if( permitNo != null ) {
    console.log("Update permitNo: " + permitNo);
    $("#registerLearner").hide();
    $("#saveLearner").show();
    readLearner(permitNo);
  }
  else {
    console.log("Insert new learner");
    $("#registerLearner").show();
    $("#saveLearner").hide();
  }

  $("#registerLearner").on('click', function() {
    addLearner();
  });

  $("#saveLearner").on('click', function() {
    updateLearner(permitNo);
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

var readLearner = function(permitNo) {
  db.transaction( function(trans) {
    trans.executeSql(queryLearnerSQL, [permitNo], function(trans, result) {
      if( result.rows.length == 0 ) { // Nothing returened
        $("#txtMsg").html("<em>"+permitNo + " NOT found!</em>");
        $("#error").show();
      }
      else {
        var noOfRecs = result.rows.length;

        for(var i = 0;i < noOfRecs; i++) {
          var row = result.rows.item(i);
          $("#txtFirst").val(row['fldFirstname']);
          $("#txtLast").val(row['fldLastname']);
          $("#txtPermitNo").val(row['fldPermitNo']);
          $("#txtPermitDate").val(row['fldPermitDate']);
          $("#txtDOB").val(row['fldDOB']);
          $("#txtPhone").val(row['fldPhone']);
        }
        $("#error").hide();
      }
    });
  });
};

var addLearner = function() {
  var check = checkLearner();

  if(check) {
    var first = $("#txtFirst").val();
    var last = $("#txtLast").val();
    var permitNo = $("#txtPermitNo").val();
    var permitDate = $("#txtPermitDate").val();
    var dob = $("#txtDOB").val();
    var phone = $("#txtPhone").val();

    db.transaction( function(trans) {
      trans.executeSql(insertLearnerSQL, [permitNo, first,last,dob,phone,permitDate]);
    }, onError,  openURL("register.html"));
  }
};

var updateLearner = function(oldPermitNo) {
  var check = checkLearner();

  if(check) {
    var first = $("#txtFirst").val();
    var last = $("#txtLast").val();
    var permitNo = $("#txtPermitNo").val();
    var permitDate = $("#txtPermitDate").val();
    var dob = $("#txtDOB").val();
    var phone = $("#txtPhone").val();

    db.transaction( function(trans) {
      trans.executeSql(updateLearnerSQL, [permitNo, first,last,dob,phone,permitDate,oldPermitNo]);
    }, onError, openURL("register.html"));

		readLearner(permitNo);
  }
};

var checkLearner = function() {
  var first = $("#txtFirst").val();
  var last = $("#txtLast").val();
  var permitNo = $("#txtPermitNo").val();
  var permitDate = $("#txtPermitDate").val();
  var dob = $("#txtDOB").val();
  var phone = $("#txtPhone").val();

  console.log(first + " " + last + " " + permitNo + " " + permitDate + " "+ dob + " " + phone);
  return true;
};
