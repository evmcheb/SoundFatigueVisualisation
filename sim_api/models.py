from sqlalchemy import Boolean, Column, ForeignKey, Integer, String
from sqlalchemy.orm import relationship
from sqlalchemy.sql.sqltypes import Time

from db import Base

class Officer(Base):
    __tablename__ = "officer"
    ID = Column(Integer, primary_key=True)
    Name = Column(String, nullable=False)
    PassHash = Column(String, nullable=False)
    RoleEnum = Column(Integer)

    def __repr__(self):
        return f"<Officer({self.ID}, {self.Name}, {self.RoleEnum})>"

class Room(Base):
    __tablename__ = "room"
    ID = Column(Integer, primary_key=True)
    Name = Column(String, nullable=False)
    Description = Column(String)

class Sensor(Base):
    __tablename__ = "sensor"
    ID = Column(Integer, primary_key=True)
    Name = Column(String)

class RoomSensor(Base):
    __tablename__ = "roomsensor"
    ID = Column(Integer, primary_key=True)
    SensorID = Column(Integer, ForeignKey('sensor.ID'))
    RoomID = Column(Integer, ForeignKey('room.ID'))

class MovementEvent(Base):
    __tablename__ = "movementevent"
    ID = Column(Integer, primary_key=True)
    RoomID = Column(Integer,ForeignKey("room.ID"))
    OfficerID = Column(Integer, ForeignKey("officer.ID"))
    Type = Column(Integer, nullable = False)
    Timestamp = Column(Integer, nullable = False)

    def __init__(self, RID, OID, Type, Timestamp):
        self.RoomID = RID
        self.OfficerID = OID
        self.Type = Type
        self.Timestamp = Timestamp

class Sample(Base):
    __tablename__ = "sample"
    def __init__(self, RSID, Timestamp, Duration, MeasurementsJSON):
        self.RoomSensorID = RSID
        self.Timestamp = Timestamp
        self.Duration = Duration
        self.MeasurementsJSON = MeasurementsJSON

    ID = Column(Integer, primary_key=True)
    RoomSensorID = Column(Integer, ForeignKey("roomsensor.ID"))
    Timestamp = Column(Integer, nullable=False)
    Duration = Column(Integer)
    MeasurementsJSON = Column(String)
