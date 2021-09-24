from typing import List, Optional
from sqlmodel import Field, SQLModel, Relationship

from db import Base

class Officer(SQLModel, table=True):
    ID: int = Field(primary_key=True)
    Name: str
    PassHash: str
    RoleEnum: int

class Room(SQLModel, table=True):
    ID: int = Field(primary_key=True)
    Name: str
    Description: str
    RoomSensors: List["RoomSensor"] = Relationship(back_populates="RoomB")

class Sensor(SQLModel, table=True):
    ID: int = Field(primary_key=True)
    Name: str
    Description: str
    RoomSensors: List["RoomSensor"] = Relationship(back_populates="SensorB")

class RoomSensor(SQLModel, table=True):
    ID: int = Field(primary_key=True)
    SensorID: int = Field(default=None, foreign_key="sensor.ID")
    RoomID: int = Field(default=None, foreign_key="room.ID")
    Samples: List["Sample"] = Relationship(back_populates="RoomSensorB")
    RoomB: Optional[Room] = Relationship(back_populates="RoomSensors")
    SensorB: Optional[Sensor] = Relationship(back_populates="RoomSensors")

class MovementEvent(SQLModel, table=True):
    ID: int = Field(primary_key=True)
    RoomID: int = Field(default=None, foreign_key="room.ID")
    OfficerID: int = Field(default=None, foreign_key="officer.ID")
    Type: int
    Timestamp: int

class Sample(SQLModel, table=True):
    ID: int = Field(primary_key=True)
    RoomSensorID: int = Field(default=None, foreign_key="roomsensor.ID")
    Timestamp: int
    Duration: int
    MeasurementsJSON: str
    RoomSensorB: Optional[RoomSensor] = Relationship(back_populates="Samples")