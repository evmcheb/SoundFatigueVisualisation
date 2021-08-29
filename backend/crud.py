import time
from sqlalchemy.orm import Session
from . import models

class Storage():
    def __init__(self, db):
        self.db = db
    
    def create_sample(self, roomsensor, measurements, timestamp=time.time(), duration=0):
        s = models.Sample(RoomSensorID=roomsensor.ID, Timestamp=timestamp,
                        Duration=duration, MeasurementsJSON=measurements)
        self.db.add(s)
        self.db.commit()
        self.db.refresh(s)
        return s

    def create_movementevent(self, room, officer, type, timestamp=time.time()):
        s = models.MovementEvent(RoomID=room.ID, OfficerID=officer.ID, Type=type, Timestamp=timestamp)
        self.db.add(s)
        self.db.commit()
        self.db.refresh(s)
        return s

