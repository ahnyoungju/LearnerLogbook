// $.getScript("dbConn.js");
// $.getScript("utilities.js");
// $.getScript("learnerSQL.js");

$(document).ready( function(e) {

  document.addEventListener("deviceready", onDeviceReady(), false);
});

var onDeviceReady = function() {
  try {
    if( !window.openDatabase )
      alert("This device does NOT support databases");
    else {
      db = window.openDatabase(shortName, version, displayName, maxSize);

      db.transaction(populateDB, onError, showLog("openDatabase"));
    } // end else
  }
  catch(err) {
    alert("Error: " + err);
  }
};

var populateDB = function() {
  db.transaction( function(trans) {
    trans.executeSql(createLearnerTable,[]);
    trans.executeSql(createSupervisorTable,[]);
    trans.executeSql(createVehicleTable,[]);
    trans.executeSql(createLogbookTable,[]);

    /* For Test */
    trans.executeSql(insertLearnerSQL,["L01004", //"Huiyoung","Chung","27-08-2001","1234567","01-01-2018"] );
    "Huiyoung","Chung","2001-08-01","1234567","2018-01-01"] );
    trans.executeSql(insertSupervisorSQL,["DR12345", //"Youngju","Ahn","0451123456","01-01-2024"] );
    "Youngju","Ahn","0451123456","2024-01-01"] );
    trans.executeSql(insertSupervisorSQL,["DR67890", //"Chungbo","Chung","0451321123","01-01-2025"] );
    "Chungbo","Chung","0451321123","2025-01-01"] );
    trans.executeSql(insertVehicleSQL,["VIC-123", "Auto","Tesla","Autopilot"] );
    trans.executeSql(insertVehicleSQL,["VIC-456", "Manual","Audi","La Crosse"] );

    /* set user for the test */
    localStorage.setItem("currentPermitNo", "L01004");
    localStorage.setItem("currentUser", "Huiyoung");

 }, onError, showLog("populateDB") );
};
