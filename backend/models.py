from sqlalchemy import Boolean, Column, ForeignKey, Integer, String
from sqlalchemy.orm import relationship

from .db import Base

def Officer(Base):
    __tablename__ = "officer"
    ID = Column(Integer, primary_key=True)
    Name = Column(String, nullable=False)
    PassHash = Column(String, nullable=False)
    RoleEnum = Column(Integer)

    def __repr__(self):
        return f"<Officer({self.ID}, {self.Name}, {self.RoleEnum})>"

def Room(Base):
    __tablename__ = "room"
    ID = Column(Integer, primary_key=True)
    Name = Column(String, nullable=False)
    Description = Column(String)

def Sensor(Base):
    __tablename__ = "sensor"
    ID = Column(Integer, primary_key=True)
    Name = Column(String)

def RoomSensor(Base):
    __tablename__ = "roomsensor"
    ID = Column(Integer, primary_key=True)
    SensorID = Column(Integer, ForeignKey('sensor.ID'))
    RoomID = Column(Integer, ForeignKey('room.ID'))

def MovementEvent(Base):
    __tablename__ = "movementevent"
    ID = Column(Integer, primary_key=True)
    RoomID = Column(Integer,ForeignKey("room.ID"))
    OfficerID = Column(Integer, ForeignKey("officer.ID"))
    Type = Column(Integer, nullable = False)
    Timestamp = Column(Integer, nullable = False)

def Sample(Base):
    __tablename__ = "sample"
    ID = Column(Integer, primary_key=True)
    RoomSensorID = Column(Integer, ForeignKey("roomsensor.ID"))
    Timestamp = Column(Integer, nullable=False)
    Duration = Column(Integer)
    MeasurementsJSON = Column(String)
