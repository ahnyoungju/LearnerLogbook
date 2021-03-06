/**
 * Table Name: Learner
 */
var createLearnerTable = "CREATE TABLE IF NOT EXISTS tblLearner ";
createLearnerTable += " ( fldPermitNo TEXT PRIMARY KEY, fldFirstname TEXT, fldLastname TEXT, ";
createLearnerTable += " fldDOB DATETIME, fldPhone TEXT, fldPermitDate DATETIME );";

var insertLearnerSQL = "INSERT into tblLearner ";
insertLearnerSQL += "( fldPermitNo, fldFirstname, fldLastname, fldDOB, fldPhone, fldPermitDate )";
insertLearnerSQL += " VALUES (?,?,?,?,?,?);";

var updateLearnerSQL = "UPDATE tblLearner SET ";
updateLearnerSQL += "fldPermitNo=?, fldFirstname=?, fldLastname=?, fldDOB=?, fldPhone=?, fldPermitDate=? ";
updateLearnerSQL += " WHERE fldPermitNo=?;";

var queryLearnerSQL = "SELECT * FROM tblLearner ";
queryLearnerSQL += " WHERE fldPermitNo=?;";

/**
 * Table Name: Vehicle
 */
var createVehicleTable = "CREATE TABLE IF NOT EXISTS tblVehicle ";
createVehicleTable += " ( fldRego TEXT PRIMARY KEY, fldTransmission TEXT, fldMake TEXT, ";
createVehicleTable += " fldModel TEXT );";

var insertVehicleSQL = "INSERT into tblVehicle ";
insertVehicleSQL += "( fldRego, fldTransmission, fldMake, fldModel )";
insertVehicleSQL += " VALUES (?,?,?,?);";

var updateVehicleSQL = "UPDATE tblVehicle SET ";
updateVehicleSQL += " fldRego=?, fldTransmission=?, fldMake=?, fldModel=? ";
updateVehicleSQL += " WHERE fldRego=?;";

var queryVehicleSQL = "SELECT * FROM tblVehicle ";
queryVehicleSQL += " WHERE fldRego=?;";

var queryVehicleSQL2 = "SELECT * FROM tblVehicle ";

/**
 * Table Name: Supervisor
 */
var createSupervisorTable = "CREATE TABLE IF NOT EXISTS tblSupervisor ";
createSupervisorTable += " ( fldLicenceNo TEXT PRIMARY KEY, fldFirstname TEXT, fldLastname TEXT, ";
createSupervisorTable += " fldPhone TEXT, fldLicenceExpiry DATETIME );";

var insertSupervisorSQL = "INSERT into tblSupervisor ";
insertSupervisorSQL += "( fldLicenceNo, fldFirstname, fldLastname, fldPhone, fldLicenceExpiry )";
insertSupervisorSQL += " VALUES (?,?,?,?,?);";

var updateSupervisorSQL = "UPDATE tblSupervisor SET ";
updateSupervisorSQL += " fldLicenceNo=?, fldFirstname=?, fldLastname=?, fldPhone=?, fldLicenceExpiry=? ";
updateSupervisorSQL += " WHERE fldLicenceExpiry=?;";

var querySupervisorSQL = "SELECT * FROM tblSupervisor ";
querySupervisorSQL += " WHERE fldLicenceNo=?;";

var querySupervisorSQL2 = "SELECT * FROM tblSupervisor ";

/**
 * Table Name: Logbook
 */
var createLogbookTable = "CREATE TABLE IF NOT EXISTS tblLogbook ";
createLogbookTable += " ( fldId INTEGER PRIMARY KEY AUTOINCREMENT, fldPermitNo TEXT, fldLicenceNo TEXT, ";
createLogbookTable += " fldRego TEXT, fldStartDateTime TEXT,";
createLogbookTable += " fldFinishDateTime TEXT, fldStartOdometer INTEGER, fldFinishOdometer INTEGER, ";
createLogbookTable += " fldParking INTEGER, fldTraffic INTEGER, fldWeather INTEGER, ";
createLogbookTable += " fldRoad INTEGER, fldLight INTEGER, fldSignature TEXT );";

var insertLogbookSQL = "INSERT into tblLogbook ";
insertLogbookSQL += "(fldPermitNo,fldLicenceNo,fldRego,fldStartDateTime";
insertLogbookSQL += ",fldFinishDateTime,fldStartOdometer,fldFinishOdometer";
insertLogbookSQL += ",fldParking,fldTraffic,fldWeather,fldRoad,fldLight)";
insertLogbookSQL += " VALUES (?,?,?,?,?,?,?,?,?,?,?,?);";

var updateLogbookSQL = "UPDATE tblLogbook SET ";
updateLogbookSQL += " fldLicenceNo=?, fldRego=?, fldStartDateTime=?, ";
updateLogbookSQL += " fldFinishDateTime=?, fldStartOdometer=? ";
updateLogbookSQL += " WHERE fldId=?;";

var updateLogbookSQL2 = "UPDATE tblLogbook SET ";
updateLogbookSQL2 += " fldSignature=? ";
updateLogbookSQL2 += " WHERE fldId=?;";

var queryLogbookSQL = "SELECT * FROM tblLogbook ";
queryLogbookSQL += " WHERE fldId=?;";

var queryLogbookSQL2 = "SELECT * FROM tblLogbook ";

var queryLogbookSQL3 = "SELECT l.fldId, s.fldFirstname, s.fldLastname, ";
queryLogbookSQL3 += " l.fldRego, l.fldStartDateTime, l.fldFinishDateTime ";
queryLogbookSQL3 += " FROM   tblLogbook l, tblSupervisor s ";
queryLogbookSQL3 += " WHERE  l.fldLicenceNo = s.fldLicenceNo;"
