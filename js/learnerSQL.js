/**
 * Table Name: Learner
 */
var createLearnerTable = "CREATE TABLE IF NOT EXISTS tblLearner ";
createLearnerTable += " ( fldPermitNo TEXT PRIMARY KEY, fldFirstname TEXT, fldLastname TEXT, ";
createLearnerTable += " fldDOB TEXT, fldPhone TEXT, fldPermitDate TEXT );";

var insertLearnerSQL = "INSERT into tblLearner ";
insertLearnerSQL += "( fldPermitNo, fldFirstname, fldLastname, fldDOB, fldPhone, fldPermitDate )";
insertLearnerSQL += " VALUES (?,?,?,?,?,?);";

var updateLearnerTableSQL = "UPDATE tblLearner SET ";
updateLearnerTableSQL += "fldPermitNo=?, fldFirstname=?, fldLastname=?, fldDOB=?, fldPhone=?, fldPermitDate=? ";
updateLearnerTableSQL += " WHERE fldPermitNo=?;";

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

var updateVehicleTableSQL = "UPDATE tblVehicle SET ";
updateVehicleTableSQL += " fldRego=?, fldTransmission=?, fldMake=?, fldModel=? ";
updateVehicleTableSQL += " WHERE fldRego=?;";

var queryVehicleSQL = "SELECT * FROM tblVehicle ";
queryVehicleSQL += " WHERE fldRego=?;";

/**
 * Table Name: Supervisor
 */
var createSupervisorTable = "CREATE TABLE IF NOT EXISTS tblSupervisor ";
createSupervisorTable += " ( fldLicenceNo TEXT PRIMARY KEY, fldFirstname TEXT, fldLastname TEXT, ";
createSupervisorTable += " fldPhone TEXT, fldLicenceExpiry TEXT );";

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
insertLogbookSQL += ",fldParking,fldTraffic,fldWeather,fldRoad,fldLight,fldSignature)";
insertLogbookSQL += " VALUES (?,?,?,?,?,?,?,?,?,?,?,?,?);";

var updateLogbookSQL = "UPDATE tblLogbook SET ";
updateLogbookSQL += " fldPermitNo=?, fldLicenceNo=?, fldRego=?, fldStartDateTime=?, ";
updateLogbookSQL += " fldFinishDateTime=?, fldStartOdometer=? ";
updateLogbookSQL += " WHERE fldId=?;";

var queryLogbookSQL = "SELECT * FROM tblLogbook ";
queryLogbookSQL += " WHERE fldId=?;";
