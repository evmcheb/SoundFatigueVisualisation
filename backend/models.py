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
    MaxDB: int
    MaxPitch: int
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
    Timestamp: int

class Sample(SQLModel, table=True):
    ID: int = Field(primary_key=True)
    RoomSensorID: int = Field(default=None, foreign_key="roomsensor.ID")
    Timestamp: int
    Duration: int
    MeasurementsJSON: str
    Notification: bool
    NotificationSeen: bool
    RoomSensorB: Optional[RoomSensor] = Relationship(back_populates="Samples")

class Notification(SQLModel, table=True):
    ID: int = Field(primary_key=True)
    msg: str
    StartTime: int
    EndTime: int
    peak: int
    RoomID: int = Field(default=None, foreign_key="sample.ID")
