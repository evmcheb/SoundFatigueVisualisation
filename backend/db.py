"""
db.py
Caleb Cheng
24/08/2021

The purpose of db.py is to provide a generic interface to allow 
reading/writing to storage using an ORM wrapper.
This means that any sort of database type (SQLite, Postgre, MySQL) 
can be implemented with ease.
"""

import sqlalchemy
from sqlalchemy import create_engine,text
from sqlalchemy import Column, Integer, String
from sqlalchemy.orm import declarative_base
from sqlalchemy.sql.schema import ForeignKey

class Storage():
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





    def __init__(self, engine):
        self.engine = create_engine('', echo=True)
        self.Base = declarative_base()