var permitNo;
var licenceNo;
var regoNo;
var startDate;
var startTime;
var finishDate;
var finishTime;
var startOdometer;
var finishOdometer;
var parking;
var traffic;
var light;
var weather;
var road;

$(document).ready(function(e) {
  // read data from database
  document.addEventListener("deviceready", onDeviceReady(), false);

  $("#register").on("click", function() {
    checkLogbook();
  });
});

var onDeviceReady = function() {
  try {
    if( !window.openDatabase )
      alert("This device does NOT support databases");
    else {
      db = window.openDatabase(shortName, version, displayName, maxSize);

      db.transaction(readDB, onError, showLog("readDB"));
    } // finish else
  }
  catch(err) {
    alert("Error: " + err);
  }
};

var readDB = function(trans) {
  /* read info */
  permitNo = localStorage.getItem("currentPermitNo");
  /* read Learner */
  db.transaction(function(trans) {
    trans.executeSql(queryLearnerSQL,[permitNo], function(trans, result) {
      var user = "";

      if(result.rows.length == 0)
        console.log("No one registered!");
      else {
        var noOfRecs = result.rows.length;
        console.log( "Learner query result rows: " + noOfRecs );
        var row = result.rows.item(0);
        user = row['fldFirstname'];
        console.log(user);

        $("#learnerName").html(user);
      }  // finish else
    });  // finish trans
  });

  /* read Supervisor */
  db.transaction(function(trans) {
    trans.executeSql(querySupervisorSQL2,[], function(trans,result) {
      if(result.rows.length == 0)
        console.log("No one registered!");
      else {
        var noOfRecs = result.rows.length;
        console.log( "Supervisor query result rows: " + noOfRecs );

        for(var i = 0; i < noOfRecs; i++) {
          var row = result.rows.item(i);
          var supervisor = row['fldFirstname'] + " " + row['fldLastname'] + "(" + row['fldLicenceNo'] + ")";
          console.log(supervisor);
          var optStr = "<option value='" + row['fldLicenceNo'] + "'>"+supervisor;
          optStr += "</option>";

          $("#selSupervisor").append(optStr);
        } // finish for
        $("#selSupervisor").find("option:first").attr("selected","selected");
        $("#selSupervisor").selectmenu("refresh", true);
      } // finish if
    }); // finish tran
  });    // finish db transaction

  /* read Vehicle */
  db.transaction(function(trans) {
    trans.executeSql(queryVehicleSQL2,[], function(trans,result) {
      if(result.rows.length == 0)
        console.log("No vehicle registered!");
      else {
        var noOfRecs = result.rows.length;
        console.log( "Vehicle query result rows: " + noOfRecs );

        for(var i = 0; i < noOfRecs; i++) {
          var row = result.rows.item(i);
          var vehicle = row['fldRego'] + "(" + row['fldMake'] + "-" + row['fldModel'] + ")";
          console.log(vehicle);
          var optStr = "<option value='" + row['fldRego'] + "'>"+vehicle;
          optStr += "</option>";

          $("#selCar").append(optStr);
        } // finish for
        $("#selCar").find("option:first").attr("selected","selected");
        $("#selCar").selectmenu("refresh", true);
      } // finish if
    }); // finish tran
  });   // finish db transaction
} // finish readDB

var checkLogbook = function() {
  var check = checkDetails();

  if( check ) {
    // after checking input, goes to confirmLogbook for signature
    addLogbook();
    // window.location.href = "confirmLogbook.html?ID=1";
  }
  else {
    console.log("Error: add logbook");
  }
}

var addLogbook = function() {
  console.log( "here");
  db.transaction( function(trans) {
      trans.executeSql(insertLogbookSQL,[permitNo, licenceNo, regoNo,
      startDate, finishDate, startOdometer, finishOdometer,
      parking, traffic, weather, road, light] );
    //}, onError, openURL("summary.html"));
  }, onError );
}

var checkDetails = function() {
  licenceNo = $("#selSupervisor").val();
  regoNo = $("#selCar").val();
  startDate = $("#txtStartDateTime").val();
  //startTime = $("#txtStartDateTime").val();
  finishDate = $("#txtFinishDateTime").val();
  //endTime = $("#txtEndDateTime").val();
  startOdometer = $("#txtStartOdometer").val();
  finishOdometer = $("#txtFinishOdometer").val();

  parking = 0;
  if($("#chkParking").prop("checked"))
    parking = 1;

  traffic = 0;
  if($("#chkTLight").prop("checked"))
    traffic += 100;
  if($("#chkTModerate").prop("checked"))
    traffic += 10;
  if($("#chkHeavy").prop("checked"))
    traffic += 1;

  weather = 0;
  if($("#chkWDry").prop("checked"))
    weather += 10;
  if($("#chkWWet").prop("checked"))
    weather += 1;

  light = 0;
  if($("#chkLDay").prop("checked"))
    light += 100;
  if($("#chkLDawn").prop("checked"))
    light += 10;
  if($("#chkLNight").prop("checked"))
    light += 1;

  road = 0;
  if($("#chkRLocal").prop("checked"))
    road += 1000000;
  if($("#chkRMain").prop("checked"))
    road += 100000;
  if($("#chkRCity").prop("checked"))
    road += 10000;
  if($("#chkRFreeway").prop("checked"))
    road += 1000;
  if($("#chkRRuralH").prop("checked"))
    road += 100;
  if($("#chkRRuralO").prop("checked"))
    road += 10;
  if($("#chkRGravel").prop("checked"))
    road += 1;

  console.log( "startDate: " + startDate );
  console.log( "finishDate: " + finishDate );
  console.log( "parking: " + parking);
  console.log( "road: " + road);
  return true;
}
