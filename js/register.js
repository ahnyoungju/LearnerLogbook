var permitNo = localStorage.currentPermitNo;
console.log("Current Permit No: " + permitNo);

$(document).ready(function(e) {
  // read data from database
  document.addEventListener("deviceready", onDeviceReady(), false);

});

var onDeviceReady = function() {
  try {
    if( !window.openDatabase )
      alert("This device does NOT support databases");
    else {
      db = window.openDatabase(shortName, version, displayName, maxSize);

      db.transaction(readDB, onError, showLog("openDatabase"));
    } // end else
  }
  catch(err) {
    alert("Error: " + err);
  }
};

var readDB = function(trans) {
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
        user = row['fldFirstname'] + " " + row['fldLastname'] + "(" + row['fldPermitNo'] + ")";
        console.log(user);

        var urlStr = "<li><a href='registerLearner.html?PermitNo=" + row['fldPermitNo'] + "' rel='external' data-rel='popup' data-transition='pop' class='ui-btn ui-shadow ui-corner-all ui-icon-edit ui-btn-icon-right'>";
        urlStr += user + "</a></li>";

        $("#forLearner").append(urlStr);
      }  // end else
    });  // end trans
  });    // end db transaction

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
          var urlStr = "<li><a href='registerSupervisor.html?LicenceNo=" + row['fldLicenceNo'] + "'  rel='external' data-rel='popup' data-transition='pop' class='ui-btn ui-shadow ui-corner-all ui-icon-edit ui-btn-icon-right'>";
          urlStr += supervisor + "</a></li>";

          $("#forSupervisor").append(urlStr);
        } // end for
        $("#forSupervisor").append("<li><a href='registerSupervisor.html' rel='external' data-rel='popup' data-transition='pop' class='ui-btn ui-shadow ui-corner-all ui-icon-plus  ui-btn-icon-right'>Add new supervisor</a></li>");
      } // end if
    }); // end tran
  });    // end db transaction

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
          var urlStr = "<li><a href='registerVehicle.html?Rego=" + row['fldRego'] + "' rel='external' data-rel='popup' data-transition='pop' class='ui-btn ui-shadow ui-corner-all ui-icon-edit ui-btn-icon-right'>" + vehicle + "</a></li>";

          $("#forVehicle").append(urlStr);
        } // end for
        $("#forVehicle").append("<li><a href='registerVehicle.html' rel='external' data-rel='popup' data-transition='pop' class='ui-btn ui-shadow ui-corner-all ui-icon-plus ui-btn-icon-right'>Add new vehicle</a></li>");
      } // end if
    }); // end tran
  });   // end db transaction
};
