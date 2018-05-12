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
      // db = window.sqlitePlugin.deleteDatabase({
      //  name: shortName,
      //  location: version
      //  }, function() {
      //    console.log("%c " + db + " is deleted", "background: green; color: white");
      //  }, function(error) {
      //    console.log("%c " + db + " could not be deleted", "background: red; color: white", error);
      //  });

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
    trans.executeSql(insertLearnerSQL,["L01004", "Huiyoung","Chung","27-08-2001","1234567","01-01-2018"] );
    trans.executeSql(insertSupervisorSQL,["DR12345", "Youngju","Ahn","0451123456","01-01-2024"] );
    trans.executeSql(insertSupervisorSQL,["DR67890", "Chungbo","Chung","0451321123","01-01-2025"] );
    trans.executeSql(insertVehicleSQL,["VIC-123", "Auto","Tesla","Autopilot"] );
    trans.executeSql(insertVehicleSQL,["VIC-456", "Auto","Audi","La Crosse"] );

 }, onError, showLog("populateDB") );
};
