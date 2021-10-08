BEGIN TRANSACTION;
CREATE TABLE IF NOT EXISTS "Officer" (
	"ID"	INTEGER NOT NULL,
	"Name"	TEXT,
	"Username"	TEXT NOT NULL,
	"PassHash"	TEXT NOT NULL,
	"RoleEnum"	INTEGER,
	PRIMARY KEY("ID" AUTOINCREMENT)
);
CREATE TABLE IF NOT EXISTS "Room" (
	"ID"	INTEGER NOT NULL,
	"Name"	TEXT NOT NULL,
	"Description"	TEXT,
    "MaxPitch" INTEGER,
    "MaxDB" INTEGER,
	PRIMARY KEY("ID" AUTOINCREMENT)
);

CREATE TABLE IF NOT EXISTS "Sensor" (
	"ID"	INTEGER NOT NULL,
	"Name"	INTEGER,
    "Description" TEXT,
	PRIMARY KEY("ID" AUTOINCREMENT)
);
CREATE TABLE IF NOT EXISTS "RoomSensor" (
	"ID"	INTEGER NOT NULL,
	"SensorID"	INTEGER NOT NULL,
	"RoomID"	INTEGER NOT NULL,
	FOREIGN KEY("RoomID") REFERENCES "Room"("ID"),
	FOREIGN KEY("SensorID") REFERENCES "Sensor"("ID"),
	PRIMARY KEY("ID" AUTOINCREMENT)
);
CREATE TABLE IF NOT EXISTS "MovementEvent" (
	"ID"	INTEGER NOT NULL,
	"RoomID"	INTEGER,
	"OfficerID"	INTEGER,
	"Timestamp"	INTEGER NOT NULL,
	FOREIGN KEY("RoomID") REFERENCES "Room"("ID"),
	FOREIGN KEY("OfficerID") REFERENCES "Officer"("ID"),
	PRIMARY KEY("ID" AUTOINCREMENT)
);

CREATE TABLE IF NOT EXISTS "Notification" (
    "ID" INTEGER NOT NULL,
    "msg" TEXT,
    "StartTime" INTEGER,
    "EndTime" INTEGER,
    "peak" INTEGER,
    "RoomID" INTEGER NOT NULL,
	FOREIGN KEY("RoomID") REFERENCES "Room"("ID"),
	PRIMARY KEY("ID" AUTOINCREMENT)
);

CREATE TABLE IF NOT EXISTS "Sample" (
	"ID"	INTEGER NOT NULL,
	"Timestamp"	INTEGER NOT NULL DEFAULT 0,
	"Duration"	INTEGER DEFAULT 0,
	"RoomSensorID"	INTEGER NOT NULL,
	"MeasurementsJSON"	TEXT,
    "Notification" INTEGER,
    "NotificationSeen" INTEGER,
	FOREIGN KEY("RoomSensorID") REFERENCES "RoomSensor"("ID"),
	PRIMARY KEY("ID")
);
COMMIT;

BEGIN TRANSACTION;
INSERT INTO Officer(Name, Username, PassHash, RoleEnum) VALUES(
    "Caleb",
    "caleb1",
    "1234",
    "0"
);
INSERT INTO Officer(Name, Username, PassHash, RoleEnum) VALUES(
    "Darby",
    "darby1",
    "1234",
    "0"
);
INSERT INTO Officer(Name, Username, PassHash, RoleEnum) VALUES(
    "Aditi",
    "aditi1",
    "1234",
    "1"
);
INSERT INTO Officer(Name, Username, PassHash, RoleEnum) VALUES(
    "Shane",
    "shane1",
    "1234",
    "2"
);
INSERT INTO Officer(Name, Username, PassHash, RoleEnum) VALUES(
    "Kese",
    "kese1",
    "1234",
    "1"
);

INSERT INTO Room(Name, Description, MaxDB, MaxPitch) VALUES (
    "EngineRoom1",
    "The first engine room",
    "100",
    "100"
);
INSERT INTO Room(Name, Description, MaxDB, MaxPitch) VALUES (
    "EngineRoom2",
    "The second engine room",
    "100",
    "100"
);
INSERT INTO Room(Name, Description, MaxDB, MaxPitch) VALUES (
    "CommonRoom",
    "The common room",
    "100",
    "100"
);

INSERT INTO Room(Name, Description, MaxDB, MaxPitch) VALUES (
    "Kitchen",
    "The Kitchen",
    "100",
    "100"
);
INSERT INTO Room(Name, Description, MaxDB, MaxPitch) VALUES (
    "Cabin1",
    "Cabin",
    "100",
    "100"
);
INSERT INTO Room(Name, Description, MaxDB, MaxPitch) VALUES (
    "Cabin2",
    "Cabin",
    "100",
    "100"
);

INSERT INTO Sensor(Name, Description) VALUES (
    "SNS01",
    "WiFi Sound Meter v1"
);
INSERT INTO Sensor(Name, Description) VALUES (
    "SNS02",
    "WiFi Sound Meter v1"
);
INSERT INTO Sensor(Name, Description) VALUES (
    "SNS03",
    "WiFi Sound Meter v1"
);
INSERT INTO Sensor(Name, Description) VALUES (
    "SNS04",
    "WiFi Sound Meter v1"
);
INSERT INTO Sensor(Name, Description) VALUES (
    "SNS05",
    "WiFi Sound Meter v1"
);
INSERT INTO Sensor(Name, Description) VALUES (
    "SNS06",
    "WiFi Sound Meter v1"
);

INSERT INTO RoomSensor(SensorID, RoomID) VALUES (
    1, 1
);
INSERT INTO RoomSensor(SensorID, RoomID) VALUES (
    2, 2
);
INSERT INTO RoomSensor(SensorID, RoomID) VALUES (
    3, 2
);
INSERT INTO RoomSensor(SensorID, RoomID) VALUES (
    3, 3
);

INSERT INTO RoomSensor(SensorID, RoomID) VALUES (
    4, 4
);
INSERT INTO RoomSensor(SensorID, RoomID) VALUES (
    5, 5
);
INSERT INTO RoomSensor(SensorID, RoomID) VALUES (
    6, 6
);

COMMIT;