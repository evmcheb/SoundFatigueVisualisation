from typing import Optional
import json
import time
from fastapi import FastAPI
from db import engine
import models
from sqlmodel import Field, SQLModel, Session, select, update
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel

SQLModel.metadata.create_all(engine)

app = FastAPI()
origins = ["*"]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.get("/room/{room_id}/")
def query_room(room_id: int, start_time: int = time.time() - 5 * 60, end_time: int = time.time()):
    with Session(engine) as session:
        Room = session.exec(select(models.Room).where(models.Room.ID == room_id)).one()
        ret = []

        max_db = Room.MaxDB
        max_pitch = Room.MaxPitch

        for rs in Room.RoomSensors:
            rs_series = {"SensorID": rs.SensorB.ID, "SensorName":rs.SensorB.Name}
            rs_series["x"] = [x.Timestamp for x in rs.Samples]
            #rs_series["x"] = [x.Timestamp for x in rs.Samples if start_time <= x.Timestamp <= end_time]
            data = [json.loads(x.MeasurementsJSON) for x in rs.Samples]
            rs_series["dB"] = [x['dB'] for x in data ] 
            rs_series["pitch"] = [x["pitch"] for x in data]
            rs_series["notifications"] = []

            for item in rs.Samples:
                if json.loads(item.MeasurementsJSON)['dB'] > max_db:
                    rs_series["notifications"].append({"time": item.Timestamp, "msg": "High decibal warning"})

                    session.exec(update(models.Sample).where(models.Sample.ID == item.ID).values(NotificationSeen=True))
                
                if json.loads(item.MeasurementsJSON)['pitch'] > max_pitch and not item.NotificationSeen:
                    rs_series["notifications"].append({"time": item.Timestamp, "msg": "High pitch warning"})

                    session.exec(update(models.Sample).where(models.Sample.ID == item.ID).values(NotificationSeen=True))



            session.commit()
            ret.append(rs_series)
        return ret
        
@app.get("/sensor/{sensor_id}/")
def query_sensor(room_id: int, start_time: int, end_time: int):
    with Session(engine) as session:
        roomSensors = session.exec(select(models.RoomSensor).where(models.RoomSensor.RoomID == room_id)).all()
        return [x.Samples for x in roomSensors]


@app.get("/notification_history/{room_id}/")
def query_nots(room_id: int, start_time: int = time.time() - 5 * 60, end_time: int = time.time()):
    with Session(engine) as session:
        Room = session.exec(select(models.Room).where(models.Room.ID == room_id)).one()
        ret = []

        max_db = Room.MaxDB
        max_pitch = Room.MaxPitch

        for rs in Room.RoomSensors:
            rs_series = {"SensorID": rs.SensorB.ID, "SensorName":rs.SensorB.Name}
            rs_series["notifications"] = []

            rs_series["max_db"] = max_db
            rs_series["max_pitch"] = max_pitch

            for item in rs.Samples:
                if json.loads(item.MeasurementsJSON)['dB'] > max_db and item.NotificationSeen:
                    rs_series["notifications"].append({"time": item.Timestamp, "msg": "High decibal warning"})
                
                if json.loads(item.MeasurementsJSON)['pitch'] > max_pitch and item.NotificationSeen:
                    rs_series["notifications"].append({"time": item.Timestamp, "msg": "High pitch warning"})


            ret.append(rs_series)
        return ret


class NotificationLimits(BaseModel):
    max_db: int
    max_pitch: int

@app.post("/set_notifications/{room_id}/")
def query_update_nots(room_id: int, limits: NotificationLimits):

    max_db = limits["max_db"]
    max_pitch = limits["max_pitch"]
    print(max_db, max_pitch)

    with Session(engine) as session:

        session.exec(update(models.Room).where(models.Room.ID == room_id).values(MaxDB=max_db, MaxPitch=max_pitch))
        session.commit()
        
        return 1